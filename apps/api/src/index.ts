import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db';
import { Server } from 'socket.io';
import http from 'http';
import { Message } from './models/Message';
import { Conversation } from './models/Conversation';
import { User } from './models/User';
import logger from './config/logger';
import { generalLimiter } from './middleware/rateLimiter';

dotenv.config();

const app = express();

// ── Critical Global Middleware (Must be BEFORE routes) ──────────────────────
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:5177',
    'http://localhost:5178',
    'http://localhost:5179',
    'http://localhost:5180',
    'http://localhost:5181',
    'http://localhost:5182',
    'http://localhost:5183',
    'http://localhost:5184',
    'http://localhost:5185',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://eaoverseas.com',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        logger.info('CORS Origin Check', { origin });
        if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
            callback(null, true);
        } else {
            logger.warn('CORS Origin Denied', { origin });
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const PORT = process.env.PORT || 5000;

import externalRoutes from './routes/externalRoutes';

// ── Absolute Priority Routes ────────────────────────────────────────────────
app.use('/api/v1', externalRoutes);
app.use('/api/external', externalRoutes);
app.get('/api/test-blogs', (req, res) => res.json({ success: true, message: 'Institutional Test Route Active' }));

import feedRoutes from './routes/feed.routes';
import scraperRoutes from './routes/scraper.routes';
import chatRoutes from './routes/chat.routes';
import authRoutes from './routes/auth.routes';
import universityRoutes from './routes/university.routes';
import applicationRoutes from './routes/application.routes';
import inquiryRoutes from './routes/inquiry.routes';
import aiRoutes from './routes/ai.routes';

// ── Security Middleware ──────────────────────────────────────────────────────
app.use(helmet());
app.use(mongoSanitize());
app.use(mongoSanitize());

app.use(generalLimiter);

app.use(express.json({ limit: '10mb' }));

app.use(express.json({ limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`, { ip: req.ip });
    next();
});

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/auth', authRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/scraper', scraperRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/ai', aiRoutes);

// Already mounted above for precedence
// app.use('/api/external', externalRoutes);
// app.use('/api/v1', externalRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is running - Institutional Portal VERIFIED v2' });
});

// ── Error Handling Middleware ────────────────────────────────────────────────
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error('Unhandled Exception', {
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        url: req.url,
        method: req.method
    });

    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        success: false
    });
});

// ── Socket.io Logic ──────────────────────────────────────────────────────────
io.on('connection', (socket) => {
    logger.info('User connected', { socketId: socket.id });

    socket.on('join_conversation', (conversationId) => {
        socket.join(conversationId);
    });

    socket.on('send_message', async (data: { conversationId: string, senderId: string, content: string }) => {
        try {
            const { conversationId, senderId, content } = data;

            const sender = await User.findOne({ firebaseUid: senderId }) || await User.findById(senderId);
            if (!sender) return;

            const newMessage = new Message({
                conversationId,
                senderId: sender._id,
                content
            });
            await newMessage.save();

            await Conversation.findByIdAndUpdate(conversationId, {
                lastMessage: newMessage._id,
                updatedAt: new Date()
            });

            const populatedMessage = await Message.findById(newMessage._id).populate('senderId', 'name avatarUrl');
            io.to(conversationId).emit('receive_message', populatedMessage);
            io.emit('conversation_updated', { conversationId });

        } catch (error) {
            logger.error("Socket error (send_message)", { error });
        }
    });

    socket.on('disconnect', () => {
        logger.info('User disconnected', { socketId: socket.id });
    });
});

// ── Database and Server ──────────────────────────────────────────────────────
connectDB().then(() => {
    logger.info('Institutional Database Link Established');
    console.log('Routes mounted: /api/v1, /api/external');
    server.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });
});
