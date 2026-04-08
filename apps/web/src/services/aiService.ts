/**
 * AI Service for EA Overseas
 * Integrates with our backend to provide context-aware assistance.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';

/**
 * Streaming variant — yields token chunks as they arrive from our backend.
 * Use this in the chat widget to progressively render the response.
 */
export async function* streamAIResponse(
    userMessage: string,
    userContext?: any
): AsyncGenerator<string> {
    const response = await fetch(`${API_URL}/api/ai/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: userMessage,
            userContext: userContext,
        }),
    });

    if (!response.ok) {
        throw new Error("Secure gateway connection failed.");
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error("Connection failed: No response body.");
    
    const decoder = new TextDecoder("utf-8");

    let buffer = "";
    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // SSE lines are separated by '\n\n'
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? ""; // keep incomplete last line

        for (const line of lines) {
            const trimmed = line.replace(/^data:\s*/, "").trim();
            if (!trimmed || trimmed === "[DONE]") continue;
            try {
                const json = JSON.parse(trimmed);
                if (json.error) throw new Error(json.error);
                const token: string = json.content ?? "";
                if (token) yield token;
            } catch (e: any) {
                if (e.message?.includes('connection issue')) throw e;
                // Ignore parse errors on malformed SSE lines
            }
        }
    }
}

/**
 * Non-streaming variant — kept for compatibility or simple calls.
 */
export const generateAIResponse = async (userMessage: string, userContext?: any) => {
    try {
        let fullResponse = "";
        const stream = streamAIResponse(userMessage, userContext);
        for await (const chunk of stream) {
            fullResponse += chunk;
        }
        return fullResponse;
    } catch (error) {
        console.error("AI Service Error:", error);
        return "I'm having a brief connection issue. Please feel free to call our experts at +91 97015 63362 for immediate assistance!";
    }
};
