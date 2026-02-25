import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useAuthAction } from '../hooks/useAuthAction';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';
import ShareModal from '../components/ShareModal';

const CommunityFeed = () => {
    // State for interactive elements
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareData, setShareData] = useState(null);
    const [expandedPosts, setExpandedPosts] = useState({});
    const [visibleComments, setVisibleComments] = useState({});
    const [newPostText, setNewPostText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [commentInputs, setCommentInputs] = useState({});
    const [selectedFilter, setSelectedFilter] = useState('All Topics');
    const [searchQuery, setSearchQuery] = useState(''); // Search State
    const [visibleCommentCounts, setVisibleCommentCounts] = useState({}); // Manage visible count per post

    const fileInputRef = useRef(null);
    const currentUser = "Alex Morgan";
    const { executeAction, isLoginModalOpen, closeLoginModal } = useAuthAction();
    const { user } = useAuth();
    const navigate = useNavigate();



    // Mock data moved to initial state
    const [posts, setPosts] = useState([
        {
            id: 101, // Special ID for the Quora-style question
            type: 'question', // New type
            author: "Anonymous", // Questions can be anon
            avatar: "https://i.pravatar.cc/150?u=100", // Generic avatar for anon
            time: "Sep 6",
            title: "Which is the best university for interior design?",
            content: "", // Questions usually have title as main content
            tags: ["Interior Design", "University", "Study Abroad"],
            category: "Admissions",
            votes: 47, // Question follows
            userVote: 0,
            commentsCount: 13,
            answers: [ // Rich answers structure
                {
                    author: "AI Assistant",
                    bio: "AI Assistant",
                    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AIAssistant",
                    text: "Top institutes for interior design include NID, CEPT University, and others mentioned. It's crucial to check their specific entrance exams and curriculum focus.",
                    time: "Just now",
                    upvotes: 0,
                    userVote: 0
                },
                {
                    author: "Roshni Bhardwaj",
                    bio: "Former INTERIOR DESIGNER",
                    avatar: "https://i.pravatar.cc/150?u=101",
                    text: "There are various colleges and institutes offering interior designing courses. Some of the known institutes are listed below - \n1. IIFD,Chandigarh \n2. MIT Institute of DESIGN \n3. National Institute of Design \n4. CEPT University \n5. JJ School of Arts...",
                    time: "5y ago",
                    upvotes: 15,
                    isBestAnswer: true
                },
                {
                    author: "Arshiya Singh",
                    bio: "Software Engineer at Accenture (company) (2017–present)",
                    avatar: "https://i.pravatar.cc/150?u=102",
                    text: "If you are looking for industry-oriented academics, practical-based curriculum, professional corporate culture during college life itself, and better placement in any fortune company, then Lovely Professional University- LPU is totally worth it. The LPU Design programs are designed...",
                    time: "4y ago",
                    upvotes: 8
                }
            ],
            comments: [] // Fallback/Standard comments
        },
        {
            id: 2,
            author: "Rohit_K",
            avatar: "https://i.pravatar.cc/150?u=103",
            time: "2h ago",
            title: "Is the GRE waived for Fall 2024 computer science programs in Canada?",
            content: "I'm seeing mixed information on university websites. Some say optional, some say required for international students. Has anyone applied recently to UofT or UBC?",
            tags: ["Eligibility", "Canada"],
            category: "Admissions",
            votes: 156,
            userVote: 0,
            commentsCount: 13,
            comments: [
                {
                    author: "AI Assistant",
                    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AIAssistant",
                    text: "Regarding GRE waivers for CS in Canada (Fall 2024): Policies vary. UofT often waives it for MCS, while UBC recommends it. Always verify strictly on the official program website.",
                    upvotes: 0,
                    userVote: 0
                },
                {
                    author: "David Kim",
                    avatar: "https://i.pravatar.cc/150?u=104",
                    text: "I applied to UofT last month. They didn't ask for GRE scores for the MCS program.",
                    upvotes: 12,
                    userVote: 0
                },
                {
                    author: "Sarah Jenkins",
                    avatar: "https://i.pravatar.cc/150?u=105",
                    text: "UBC website says it's optional but 'recommended' for international applicants. I'd say take it if you can.",
                    upvotes: 8,
                    userVote: 0
                },
                {
                    author: "Rahul Verma",
                    avatar: "https://i.pravatar.cc/150?u=106",
                    text: "Waterloo is strict about it for engineering but math seems flexible.",
                    upvotes: 15,
                    userVote: 0
                },
                {
                    author: "Priya Sharma",
                    avatar: "https://i.pravatar.cc/150?u=107",
                    text: "I got a waiver from McGill based on my work experience. Worth asking!",
                    upvotes: 22,
                    userVote: 0
                }
            ]
        },
        {
            id: 3,
            author: "Amit_Counselor",
            avatar: "https://i.pravatar.cc/150?u=108",
            isExpert: true,
            time: "8h ago",
            title: "Top 5 Scholarship Deadlines approaching in November",
            tags: ["Scholarships", "Urgent"],
            category: "Scholarships",
            votes: 89,
            userVote: 0,
            commentsCount: 24,
            comments: [
                {
                    author: "AI Assistant",
                    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AIAssistant",
                    text: "November is a critical month for scholarship deadlines. Ensure all documents, including recommendation letters, are ready well in advance for schemes like DAAD.",
                    upvotes: 0,
                    userVote: 0
                },
                {
                    author: "Kenji Sato",
                    avatar: "https://i.pravatar.cc/150?u=109",
                    text: "Thanks for the reminder! Almost missed the DAAD deadline.",
                    upvotes: 15
                },
                {
                    author: "Lisa Wong",
                    avatar: "https://i.pravatar.cc/150?u=110",
                    text: "Are these fully funded? Just checking.",
                    upvotes: 8
                }
            ]
        },
        {
            id: 4,
            author: "Priya_Visa",
            avatar: "https://i.pravatar.cc/150?u=111",
            time: "1d ago",
            title: "US F-1 Visa Interview Experience - Mumbai Consulate (Approved!)",
            content: "Just got my visa approved! Here were the questions asked: 1. Why this university? 2. Who is sponsoring you? 3. What are your plans after graduation? Be confident and honest!",
            tags: ["Visas", "USA"],
            category: "Visas",
            votes: 340,
            userVote: 0,
            commentsCount: 57,
            comments: [
                {
                    author: "AI Assistant",
                    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AIAssistant",
                    text: "Congratulations on the F-1 approval! Key takeaway: Be prepared for questions about university choice, sponsorship, and future plans. Confidence involves clear, honest answers.",
                    upvotes: 0,
                    userVote: 0
                },
                {
                    author: "Amit Patel",
                    avatar: "https://i.pravatar.cc/150?u=112",
                    text: "Congratulations! Did they ask for financial docs?",
                    upvotes: 22
                },
                {
                    author: "Neha Sharma",
                    avatar: "https://i.pravatar.cc/150?u=113",
                    text: "My interview is next week at the same consulate. Fingers crossed!",
                    upvotes: 18
                },
                {
                    author: "Rahul Verma",
                    avatar: "https://i.pravatar.cc/150?u=106",
                    text: "How long was the interview?",
                    upvotes: 10
                },
                {
                    author: "Priya_Visa",
                    avatar: "https://i.pravatar.cc/150?u=111",
                    text: "It was barely 2 minutes! Very quick.",
                    upvotes: 45,
                    isAuthor: true
                },
                {
                    author: "Sneha Gupta",
                    avatar: "https://i.pravatar.cc/150?u=114",
                    text: "Did you need a consultancy or self-prep?",
                    upvotes: 8
                },
                {
                    author: "Mike Ross",
                    avatar: "https://i.pravatar.cc/150?u=115",
                    text: "Great tips! Confidence is definitely key.",
                    upvotes: 14
                },
                {
                    author: "Ananya Roy",
                    avatar: "https://i.pravatar.cc/150?u=116",
                    text: "I'm so nervous about mine. Any specific docs they checked?",
                    upvotes: 6
                },
                {
                    author: "Vikram Singh",
                    avatar: "https://i.pravatar.cc/150?u=117",
                    text: "Congrats! Party time! 🎉",
                    upvotes: 30
                }
            ]
        },
        {
            id: 5,
            author: "Tech_Guru",
            avatar: "https://i.pravatar.cc/150?u=118",
            time: "2d ago",
            title: "Finding off-campus accommodation in Berlin",
            content: "WG-Gesucht is your best friend. Start looking at least 3 months in advance. Avoid transferring money before viewing the apartment/room.",
            tags: ["Accommodation", "Germany"],
            category: "Accommodation",
            votes: 210,
            userVote: 0,
            commentsCount: 16,
            comments: [
                {
                    author: "AI Assistant",
                    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AIAssistant",
                    text: "Based on the question about finding accommodation in Berlin, I suggest checking platforms like WG-Gesucht and initializing your search at least 3 months early. Be cautious of scams demanding advanced payments.",
                    upvotes: 0,
                    userVote: 0
                },
                {
                    author: "Hans Mueller",
                    avatar: "https://i.pravatar.cc/150?u=119",
                    text: "Also check Kleinanzeigen, but be careful of scams.",
                    upvotes: 12
                },
                {
                    author: "Anna Schmidt",
                    avatar: "https://i.pravatar.cc/150?u=120",
                    text: "The housing crisis is real in Berlin. Good luck everyone!",
                    upvotes: 9
                },
                {
                    author: "Maria Schneider",
                    avatar: "https://i.pravatar.cc/150?u=121",
                    text: "I used Wunderflats for my first month. Expensive but easy.",
                    upvotes: 7,
                    userVote: 0
                },
                {
                    author: "Tom Wilson",
                    avatar: "https://i.pravatar.cc/150?u=122",
                    text: "Studentendorf Schlachtensee usually has spots if you apply early.",
                    upvotes: 11,
                    userVote: 0
                }
            ]
        },
        {
            id: 6,
            author: "Career_Coach",
            avatar: "https://i.pravatar.cc/150?u=123",
            isExpert: true,
            time: "3d ago",
            title: "Networking tips for international students in the US",
            content: "Don't just stick to your coursework. Attend career fairs, join student clubs, and reach out to alumni on LinkedIn. Networking is key to landing internships.",
            tags: ["Career Advice", "USA"],
            category: "Career Advice",
            votes: 450,
            userVote: 0,
            commentsCount: 31,
            comments: [
                {
                    author: "AI Assistant",
                    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AIAssistant",
                    text: "Networking in the US is vital. This post highlights leveraging career fairs, student clubs, and alumni networks. Starting early and being proactive is key to securing internships.",
                    upvotes: 0,
                    userVote: 0
                },
                {
                    author: "David Lee",
                    avatar: "https://i.pravatar.cc/150?u=124",
                    text: "This is crucial! My referral came from a senior I met at a club event.",
                    upvotes: 40
                },
                {
                    author: "Wei Chen",
                    avatar: "https://i.pravatar.cc/150?u=125",
                    text: "Any tips for introverts who find networking difficult?",
                    upvotes: 25
                },
                {
                    author: "Sarah Jones",
                    avatar: "https://i.pravatar.cc/150?u=126",
                    text: "Start small! Ask questions in class. Join one club that interests you.",
                    upvotes: 15
                },
                {
                    author: "Ahmed Khan",
                    avatar: "https://i.pravatar.cc/150?u=127",
                    text: "LinkedIn is powerful properly used. Don't just connect, send a note.",
                    upvotes: 20
                },
                {
                    author: "Maria Garcia",
                    avatar: "https://i.pravatar.cc/150?u=128",
                    text: "University career centers are underrated. Use them!",
                    upvotes: 12
                }
            ]
        },
        {
            id: 7,
            author: "Rohan_M",
            avatar: "https://i.pravatar.cc/150?u=129",
            time: "4h ago",
            title: "Anyone starting at TU Delft this September?",
            content: "Looking for potential roommates and study buddies for the MSc in Aerospace Engineering program.",
            tags: ["Routine", "Netherlands"],
            category: "Routine",
            votes: 45,
            userVote: 0,
            commentsCount: 9,
            comments: [
                {
                    author: "AI Assistant",
                    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AIAssistant",
                    text: "For new TU Delft students, connecting with peers in the same program is a great start. This thread facilitates finding roommates and study partners for the Aerospace Engineering cohort.",
                    upvotes: 0,
                    userVote: 0
                },
                {
                    author: "Pieter Jansen",
                    avatar: "https://i.pravatar.cc/150?u=130",
                    text: "Hey! I'm starting in CS. Let's connect.",
                    upvotes: 5,
                    userVote: 0
                },
                {
                    author: "Sven Berg",
                    avatar: "https://i.pravatar.cc/150?u=131",
                    text: "Welcome to Delft! You'll love it here.",
                    upvotes: 7,
                    userVote: 0
                },
                {
                    author: "Anja Weber",
                    avatar: "https://i.pravatar.cc/150?u=132",
                    text: "Have you found a room yet? It's quite tough currently.",
                    upvotes: 12,
                    userVote: 0
                },
                {
                    author: "Rahul M",
                    avatar: "https://i.pravatar.cc/150?u=133",
                    text: "I've applied for the same program! Waiting for decision.",
                    upvotes: 3,
                    userVote: 0
                }
            ]
        },
        {
            id: 8,
            author: "Sneha_S",
            avatar: "https://i.pravatar.cc/150?u=134",
            time: "6h ago",
            title: "Confused between IELTS and TOEFL for UK universities",
            content: "Most unis accept both, but is one preferred over the other? Also, heard TOEFL is harder?",
            tags: ["Admissions", "UK"],
            category: "Admissions",
            votes: 78,
            userVote: 0,
            commentsCount: 21,
            comments: [
                {
                    author: "AI Assistant",
                    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AIAssistant",
                    text: "Regarding IELTS vs TOEFL for UK universities: Both are widely accepted. IELTS is often preferred for UK visas (UKVI), while TOEFL offers a computer-based alternative. Check specific institution requirements.",
                    upvotes: 0,
                    userVote: 0
                },
                {
                    author: "Ravi Kumar",
                    avatar: "https://i.pravatar.cc/150?u=135",
                    text: "IELTS is definitely the safer bet for UK. Almost all unis accept it without issues.",
                    upvotes: 45
                },
                {
                    author: "Jessica Li",
                    avatar: "https://i.pravatar.cc/150?u=136",
                    text: "TOEFL isn't 'harder', just different format. If you're comfortable with computer-based tests, it might be easier for you.",
                    upvotes: 12
                },
                {
                    author: "Ahmed Khan",
                    avatar: "https://i.pravatar.cc/150?u=127",
                    text: "Check your visa requirements too! UKVI has specific rules for some visas.",
                    upvotes: 28
                },
                {
                    author: "Maria Garcia",
                    avatar: "https://i.pravatar.cc/150?u=128",
                    text: "Does Oxford generally prefer one?",
                    upvotes: 5,
                    userVote: 0
                },
                {
                    author: "Tom Wilson",
                    avatar: "https://i.pravatar.cc/150?u=122",
                    text: "Oxford accepts both but checks minimum band scores carefully.",
                    upvotes: 9,
                    userVote: 0
                }
            ]
        },
        {
            id: 9,
            author: "Scholarship_Seeker",
            avatar: "https://i.pravatar.cc/150?u=137",
            time: "12h ago",
            title: "Full-ride scholarships for Masters in Australia?",
            content: "Are there any fully funded scholarships for international students in Australia besides the Australia Awards?",
            tags: ["Scholarships", "Australia"],
            category: "Scholarships",
            votes: 110,
            userVote: 0,
            commentsCount: 19,
            comments: [
                {
                    author: "AI Assistant",
                    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AIAssistant",
                    text: "Fully funded scholarships in Australia include 'Australia Awards' and university-specific schemes like the Vice-Chancellor's Scholarship at USyd. The Research Training Program (RTP) is excellent for research candidates.",
                    upvotes: 0,
                    userVote: 0
                },
                {
                    author: "Maria Garcia",
                    avatar: "https://i.pravatar.cc/150?u=128",
                    text: "Australia Awards is the big one, but check individual university websites. Monash and Melbourne U have their own generous scholarships.",
                    upvotes: 33
                },
                {
                    author: "Tom Wilson",
                    avatar: "https://i.pravatar.cc/150?u=122",
                    text: "Also look at RTP (Research Training Program) if you're doing a research masters. Fully funded!",
                    upvotes: 19
                },
                {
                    author: "Maria Garcia",
                    avatar: "https://i.pravatar.cc/150?u=128",
                    text: "You can find scholarships on ScholarshipPortal too.",
                    upvotes: 6,
                    userVote: 0
                },
                {
                    author: "David Lee",
                    avatar: "https://i.pravatar.cc/150?u=124",
                    text: "University of Sydney has a Vice-Chancellor's Scholarship explicitly for international students.",
                    upvotes: 21,
                    userVote: 0
                }
            ]
        },
        {
            id: 10,
            author: "Travel_Bug",
            avatar: "https://i.pravatar.cc/150?u=138",
            time: "1d ago",
            title: "Packing list for winter in Canada",
            content: "Moveing from a warm country to Toronto. What are the absolute essentials I should pack vs buy there?",
            tags: ["Routine", "Canada"],
            category: "Routine",
            votes: 190,
            userVote: 0,
            commentsCount: 41,
            comments: [
                {
                    author: "AI Assistant",
                    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AIAssistant",
                    text: "For winter packing in Canada: Prioritize thermal layers and waterproof boots. It's often recommended to purchase heavy coats locally in Canada to ensure they meet the -20C rating.",
                    upvotes: 0,
                    userVote: 0
                },
                {
                    author: "Sarah Jenkins",
                    avatar: "https://i.pravatar.cc/150?u=105",
                    text: "Buy your heavy winter coat IN Canada. The ones you get in warm countries aren't rated for -20C.",
                    upvotes: 89
                },
                {
                    author: "Ali Hassan",
                    avatar: "https://i.pravatar.cc/150?u=139",
                    text: "Thermals are a must! Pack lots of layers. And good waterproof boots.",
                    upvotes: 45
                },
                {
                    author: "Maria Garcia",
                    avatar: "https://i.pravatar.cc/150?u=128",
                    text: "Don't forget power adapters! Canada uses different plugs.",
                    upvotes: 15,
                    userVote: 0
                },
                {
                    author: "Tom Wilson",
                    avatar: "https://i.pravatar.cc/150?u=122",
                    text: "Bring your favorite spices. It takes time to find good ethnic grocery stores.",
                    upvotes: 30,
                    userVote: 0
                }
            ]
        },
        {
            id: 11,
            author: "Visa_Expert",
            avatar: "https://i.pravatar.cc/150?u=140",
            isExpert: true,
            time: "2d ago",
            title: "Shenghen Visa delays for Indian students in Germany",
            content: "Current processing times are longer than usual. Apply at least 3 months in advance if you plan to travel within EU.",
            tags: ["Visas", "Germany"],
            category: "Visas",
            votes: 300,
            userVote: 0,
            commentsCount: 26,
            comments: [
                {
                    author: "AI Assistant",
                    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AIAssistant",
                    text: "Schengen Visa processing for Indian students in Germany is currently delayed. The recommended action is to apply at least 3 months in advance of planned travel.",
                    upvotes: 0,
                    userVote: 0
                },
                {
                    author: "Raj Patel",
                    avatar: "https://i.pravatar.cc/150?u=141",
                    text: "Got my appointment after 4 months! This is crazy.",
                    upvotes: 56
                },
                {
                    author: "Klaus Weber",
                    avatar: "https://i.pravatar.cc/150?u=142",
                    text: "Try applying from a different consulate if possible. Sometimes smaller cities are faster.",
                    upvotes: 21
                },
                {
                    author: "Maria Garcia",
                    avatar: "https://i.pravatar.cc/150?u=128",
                    text: "Bangalore consulate has fewer slots than Mumbai currently.",
                    upvotes: 11,
                    userVote: 0
                },
                {
                    author: "Tom Wilson",
                    avatar: "https://i.pravatar.cc/150?u=122",
                    text: "Apply early! Processing can take up to 15 days.",
                    upvotes: 18,
                    userVote: 0
                }
            ]
        },
        {
            id: 12,
            author: "Job_Hunter",
            avatar: "https://i.pravatar.cc/150?u=143",
            time: "3d ago",
            title: "Post-Study Work Visa (PSW) rules changes in UK 2024",
            content: "Breaking down the recent changes to the Graduate Route visa. What you need to know.",
            tags: ["Career Advice", "UK"],
            category: "Career Advice",
            votes: 500,
            commentsCount: 60,
            comments: [
                {
                    author: "Emily Clark",
                    avatar: "https://i.pravatar.cc/150?u=144",
                    text: "So relieved they kept the 2-year duration! Was worried they'd cut it.",
                    upvotes: 120
                },
                {
                    author: "Priya Sharma",
                    avatar: "https://i.pravatar.cc/150?u=107",
                    text: "Does this affect dependents? I heard mixed news about bringing family.",
                    upvotes: 45
                },
                {
                    author: "Maria Garcia",
                    avatar: "https://i.pravatar.cc/150?u=128",
                    text: "You can convert to skilled worker visa if you find a sponsor.",
                    upvotes: 15,
                    userVote: 0
                },
                {
                    author: "Tom Wilson",
                    avatar: "https://i.pravatar.cc/150?u=122",
                    text: "Remember, the minimum salary threshold has increased for skilled worker visas.",
                    upvotes: 35,
                    userVote: 0
                }
            ]
        }
    ]);

    const openShareModal = (post) => {
        executeAction(() => {
            setShareData(post);
            setIsShareModalOpen(true);
        });
    };

    const toggleComments = (postId) => {
        setVisibleComments(prev => {
            const isVisible = !!prev[postId];
            if (isVisible) {
                // Reset count when closing so next open shows default 3
                setVisibleCommentCounts(curr => ({ ...curr, [postId]: 3 }));
            }
            return { ...prev, [postId]: !prev[postId] };
        });
    };

    const toggleReadMore = (postId) => {
        setExpandedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    const loadMoreComments = (postId) => {
        setVisibleCommentCounts(prev => ({
            ...prev,
            [postId]: (prev[postId] || 3) + 3 // Load 3 more comments at a time
        }));
    };

    const handleCommentVote = (postId, commentIdx, direction) => {
        executeAction(() => {
            setPosts(prevPosts => prevPosts.map(post => {
                if (post.id === postId) {
                    const newComments = [...post.comments];
                    const comment = newComments[commentIdx];
                    const currentVote = comment.userVote || 0;
                    let newVote = 0;
                    let voteChange = 0;

                    if (direction === 'up') {
                        if (currentVote === 1) {
                            // Toggle off
                            newVote = 0;
                            voteChange = -1;
                        } else {
                            // Vote up (from 0 or -1)
                            newVote = 1;
                            voteChange = currentVote === -1 ? 2 : 1;
                        }
                    } else {
                        if (currentVote === -1) {
                            // Toggle off
                            newVote = 0;
                            voteChange = 1; // logical adjustment if we were tracking 'score'
                        } else {
                            // Vote down
                            newVote = -1;
                            voteChange = currentVote === 1 ? -2 : -1;
                        }
                    }

                    newComments[commentIdx] = {
                        ...comment,
                        upvotes: (comment.upvotes || 0) + voteChange,
                        userVote: newVote
                    };
                    return { ...post, comments: newComments };
                }
                return post;
            }));
        });
    };



    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handlePostSubmit = () => {
        executeAction(() => {
            if (!newPostText.trim()) return;

            const newPost = {
                id: Date.now(),
                author: currentUser,
                avatar: "https://i.pravatar.cc/150?u=145", // Using default avatar
                time: "Just now",
                title: newPostText, // Using text as title for simplicity in this quick post
                content: "",
                image: selectedImage, // Attach selected image
                tags: ["General"],
                category: "Routine",
                votes: 0,
                commentsCount: 0,
                comments: []
            };

            setPosts([newPost, ...posts]);
            setNewPostText('');
            removeImage(); // Clear image after posting
        });
    };

    const handleDeletePost = (postId) => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    };

    const handleVote = (postId, direction) => {
        executeAction(() => {
            setPosts(prevPosts => prevPosts.map(post => {
                if (post.id === postId) {
                    let newVoteCount = post.votes;
                    let newUserVote = post.userVote || 0; // Default to 0 if undefined

                    if (direction === 'up') {
                        if (newUserVote === 1) {
                            // Already upvoted, remove vote
                            newUserVote = 0;
                            newVoteCount--;
                        } else if (newUserVote === -1) {
                            // Was downvoted, switch to upvote
                            newUserVote = 1;
                            newVoteCount += 2;
                        } else {
                            // No vote, add upvote
                            newUserVote = 1;
                            newVoteCount++;
                        }
                    } else { // direction === 'down'
                        if (newUserVote === -1) {
                            // Already downvoted, remove vote
                            newUserVote = 0;
                            newVoteCount++; // Restore count
                        } else if (newUserVote === 1) {
                            // Was upvoted, switch to downvote
                            newUserVote = -1;
                            newVoteCount -= 2;
                        } else {
                            // No vote, add downvote
                            newUserVote = -1;
                            newVoteCount--;
                        }
                    }
                    return { ...post, votes: newVoteCount, userVote: newUserVote };
                }
                return post;
            }));
        });
    };

    const handleCommentChange = (postId, text) => {
        setCommentInputs(prev => ({ ...prev, [postId]: text }));
    };

    const handleCommentSubmit = (postId) => {
        const text = commentInputs[postId];
        if (!text || !text.trim()) return;

        setPosts(prevPosts => prevPosts.map(post => {
            if (post.id === postId) {
                const newComment = {
                    author: currentUser,
                    avatar: "https://i.pravatar.cc/150?u=145",
                    text: text,
                    time: "Just now",
                    upvotes: 0,
                    userVote: 0
                };
                let updatedComments = [...post.comments];
                const hasAIComment = updatedComments.length > 0 && updatedComments[0].author === 'AI Assistant';

                if (hasAIComment) {
                    updatedComments.splice(1, 0, newComment);
                } else {
                    updatedComments.unshift(newComment);
                }

                return {
                    ...post,
                    commentsCount: post.commentsCount + 1,
                    comments: updatedComments
                };
            }
            return post;
        }));

        setCommentInputs(prev => ({ ...prev, [postId]: '' }));

        // Ensure the new comment is visible by expanding the count
        setVisibleCommentCounts(prev => ({
            ...prev,
            [postId]: (prev[postId] || 3) + 1
        }));
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden">
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
            <div className="hidden lg:block">
                <PageHeader
                    title="Community Feed"
                    actions={
                        !user ? (
                            <button
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm hidden lg:block"
                                onClick={() => navigate('/landing')}
                            >
                                Enter Website
                            </button>
                        ) : null
                    }
                />
            </div>
            <div className="flex flex-1 overflow-hidden">
                {/* CENTER COLUMN: Main Feed */}
                <main className="flex-1 flex flex-col h-full overflow-hidden bg-gray-50 relative">

                    {/* Sticky Search Bar */}
                    <div className="bg-white border-b border-gray-200 px-6 py-3 z-20 sticky top-0">
                        <div className="max-w-3xl mx-auto relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                            <input
                                className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-100 border-none outline-none text-sm placeholder:text-gray-500 focus:bg-white focus:ring-1 focus:ring-blue-200 focus:shadow-sm transition-all font-medium"
                                placeholder="Search for questions, universities, or topics..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Feed Content */}
                    <div className="flex-1 overflow-y-auto scroll-smooth p-6">
                        <div className="max-w-3xl mx-auto flex flex-col gap-6 pb-20">

                            {/* Simple Composer */}
                            <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">

                                {/* Composer Input */}
                                <div className="flex gap-3">
                                    <div className="size-10 rounded-full bg-gray-100 bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDchVeb3pnQlG7miYN4K2qZ3FvzJ_BraFfz7fnE81y6daVb93_nRvdtmIe5JhDRWYUdniaxDtf5aOMeFEmMH_uKnO3jaGZcMIiV1OOqhbDuBV6iZMmHNro2d4fd1I_yoys75ES60YwCpQFin-dgLs6X1pmJKBT70K1ONBeTAzsRG_HEHX5AC6ICuZkdmV5cHJyejbkmy13_hZS_EZFXELG3W2x0JXa01xdub5lXyGmShDjpaGpE5ehLI9I3fJvA-46_b0sixf8Fdg")' }}></div>
                                    <div className="flex-1">
                                        <input
                                            className="w-full h-10 px-0 rounded-lg outline-none text-sm placeholder:text-gray-400 bg-transparent"
                                            placeholder="What do you want to ask or share?"
                                            type="text"
                                            value={newPostText}
                                            onChange={(e) => setNewPostText(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handlePostSubmit()}
                                        />
                                    </div>
                                </div>

                                {/* Image Preview */}
                                {selectedImage && (
                                    <div className="px-4 pb-3 relative inline-block mt-2">
                                        <img src={selectedImage} alt="Preview" className="h-20 w-auto rounded-lg border border-gray-200 object-cover" />
                                        <button
                                            onClick={removeImage}
                                            className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-md border border-gray-200 hover:bg-gray-100 transition-colors"
                                        >
                                            <span className="material-symbols-outlined !text-[14px] text-gray-500 block">close</span>
                                        </button>
                                    </div>
                                )}

                                {/* Toolbar */}
                                <div className="flex items-center justify-between pt-2 mt-2">
                                    <div className="flex gap-2">

                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors text-xs font-semibold text-gray-600"
                                        >
                                            <span className="material-symbols-outlined !text-[18px] text-gray-500">image</span> Photo
                                        </button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                        />
                                    </div>
                                    <button
                                        onClick={handlePostSubmit}
                                        className={`px-4 py-1.5 rounded-full transition-all flex items-center justify-center text-xs font-bold ${newPostText.trim() ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                                        disabled={!newPostText.trim()}
                                    >
                                        Post
                                    </button>
                                </div>
                            </div>

                            {/* Scrollable Filter Chips */}
                            <div className="flex items-center gap-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
                                <button
                                    onClick={() => executeAction(() => setSelectedFilter('All Topics'))}
                                    className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${selectedFilter === 'All Topics' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'}`}
                                >
                                    All Topics
                                </button>
                                {['Admissions', 'Scholarships', 'Visas', 'Accommodation', 'Career Advice', 'Routine'].map(filter => (
                                    <button
                                        key={filter}
                                        onClick={() => executeAction(() => setSelectedFilter(filter))}
                                        className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${selectedFilter === filter ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'}`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>

                            {/* Post List */}
                            <div className="flex flex-col gap-4">
                                {posts
                                    .filter(post => {
                                        // Filter by Category/Tags
                                        const matchCategory = selectedFilter === 'All Topics' || post.category === selectedFilter || post.tags.includes(selectedFilter);
                                        // Filter by Search Query
                                        const matchSearch = !searchQuery.trim() || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase()));
                                        return matchCategory && matchSearch;
                                    })
                                    .map(post => (
                                        <article
                                            key={post.id}
                                            className="bg-white rounded-xl border border-gray-200 shadow-sm transition-all group flex overflow-hidden w-full text-left"
                                        >
                                            {/* Voting */}
                                            <div className="w-12 bg-gray-50 border-r border-gray-100 flex flex-col items-center py-3 gap-1 shrink-0">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleVote(post.id, 'up'); }}
                                                    className="text-gray-400 hover:text-primary hover:bg-blue-50 rounded p-1 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
                                                </button>
                                                <span className={`text-sm font-bold ${post.votes > 0 ? 'text-primary' : post.votes < 0 ? 'text-red-600' : 'text-gray-900'}`}>{post.votes}</span>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleVote(post.id, 'down'); }}
                                                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded p-1 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">arrow_downward</span>
                                                </button>
                                            </div>
                                            {/* Content */}
                                            <div className="flex-1 p-3 sm:p-4 min-w-0">
                                                <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 flex-wrap">
                                                    <div className="size-6 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: `url("${post.avatar}")` }}></div>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); executeAction(() => navigate(`/profile/${post.author}`)); }}
                                                        className="font-medium text-gray-900 hover:underline hover:text-blue-600 transition-colors bg-transparent border-none p-0 cursor-pointer text-left"
                                                    >
                                                        {post.author}
                                                    </button>
                                                    {(post as any).isVerifiedAttributes && (
                                                        <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 whitespace-nowrap">
                                                            <span className="material-symbols-outlined !text-[14px]">verified</span> {(post as any).verifiedLabel}
                                                        </span>
                                                    )}
                                                    {post.isExpert && (
                                                        <span className="flex items-center gap-1 text-[10px] font-bold text-orange-700 whitespace-nowrap">
                                                            <span className="material-symbols-outlined !text-[14px]">star</span> Expert
                                                        </span>
                                                    )}
                                                    <span className="whitespace-nowrap">• {post.time}</span>
                                                </div>
                                                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 leading-snug transition-colors break-words">
                                                    {post.title}
                                                </h3>
                                                {(post as any).image && (
                                                    <div className="h-48 w-full rounded-lg bg-gray-200 mt-2 mb-3 bg-cover bg-center border border-gray-100" style={{ backgroundImage: `url("${(post as any).image}")` }}></div>
                                                )}
                                                {post.content && (
                                                    <p className="text-sm text-gray-600 leading-relaxed mb-3 break-words">
                                                        {/* Simple truncation logic */}
                                                        {!expandedPosts[post.id] && post.content.length > 120 ? (
                                                            <>
                                                                {post.content.substring(0, 120)}... <span className="text-primary font-medium cursor-pointer hover:underline" onClick={(e) => { e.stopPropagation(); toggleReadMore(post.id); }}>more</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                {post.content} {post.content.length > 120 && <span className="text-gray-400 text-xs cursor-pointer hover:underline ml-2" onClick={(e) => { e.stopPropagation(); toggleReadMore(post.id); }}>less</span>}
                                                            </>
                                                        )}
                                                    </p>
                                                )}
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto gap-3 sm:gap-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        {post.tags.map(tag => (
                                                            <span key={tag} className="px-2 py-1 rounded bg-gray-100 text-gray-600 text-[10px] sm:text-xs font-medium whitespace-nowrap">{tag}</span>
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center gap-4 text-gray-500 text-xs font-medium w-full sm:w-auto justify-between sm:justify-start border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-50">
                                                        <button onClick={(e) => { e.stopPropagation(); toggleComments(post.id); }} className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                                                            <span className="material-symbols-outlined text-[18px]">mode_comment</span>
                                                            {post.type === 'question' ? (
                                                                <span>{(post as any).answers?.length || 0} Comments</span>
                                                            ) : (
                                                                <span>{post.commentsCount} Comments</span>
                                                            )}
                                                        </button>
                                                        <div className="flex items-center gap-4">
                                                            <button onClick={(e) => { e.stopPropagation(); openShareModal(post); }} className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                                                                <span className="material-symbols-outlined text-[18px]">share</span> Share
                                                            </button>
                                                            {/* Only show delete for current user */}
                                                            {post.author === currentUser && (
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleDeletePost(post.id);
                                                                    }}
                                                                    className="flex items-center gap-1.5 hover:text-red-600 transition-colors"
                                                                    title="Delete Post"
                                                                    type="button"
                                                                >
                                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Answer/Comment Section */}
                                                {visibleComments[post.id] && (
                                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                                        {/* Standard Comments Input */}
                                                        <div className="flex gap-3 mb-4">
                                                            <div className="size-8 rounded-full bg-gray-200 bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDchVeb3pnQlG7miYN4K2qZ3FvzJ_BraFfz7fnE81y6daVb93_nRvdtmIe5JhDRWYUdniaxDtf5aOMeFEmMH_uKnO3jaGZcMIiV1OOqhbDuBV6iZMmHNro2d4fd1I_yoys75ES60YwCpQFin-dgLs6XN1pmJKBT70K1ONBeTAzsRG_HEHX5AC6ICuZkdmV5cHJyejbkmy13_hZS_EZFXELG3W2x0JXa01xdub5lXyGmShDjpaGpE5ehLI9I3fJvA-46_b0sixf8Fdg")' }}></div>
                                                            <div className="flex-1 flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Add a comment..."
                                                                    className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                                                                    value={commentInputs[post.id] || ''}
                                                                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                                                    onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                                                                />
                                                                <button
                                                                    onClick={() => handleCommentSubmit(post.id)}
                                                                    disabled={!commentInputs[post.id]?.trim()}
                                                                    className="px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                                >
                                                                    Post
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Comments List */}
                                                        <div className="flex flex-col gap-4">
                                                            {(post.type === 'question' ? (post.answers || []) : post.comments).slice(0, visibleCommentCounts[post.id] || 3).map((comment, idx) => (
                                                                <div key={idx} className="flex gap-3">
                                                                    <div className="size-7 rounded-full bg-gray-200 bg-cover bg-center shrink-0" style={{ backgroundImage: `url("${comment.avatar}")` }}></div>
                                                                    <div className="flex-1">
                                                                        <div className={`rounded-lg px-3 py-2 ${comment.author === 'AI Assistant' ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'}`}>
                                                                            <div className="flex justify-between items-start">
                                                                                <div className="flex flex-col">
                                                                                    <div className="flex items-center gap-1.5">
                                                                                        <p className={`text-xs font-bold mb-0.5 ${comment.author === 'AI Assistant' ? 'text-blue-700' : 'text-gray-900'}`}>{comment.author}</p>
                                                                                        {comment.author === 'AI Assistant' && (
                                                                                            <span className="material-symbols-outlined text-[14px] text-blue-600">smart_toy</span>
                                                                                        )}
                                                                                    </div>
                                                                                    {comment.bio && <span className="text-[10px] text-gray-500 mb-0.5">{comment.bio}</span>}
                                                                                </div>
                                                                                <span className="text-[10px] text-gray-400">{comment.time || '2d ago'}</span>
                                                                            </div>
                                                                            <p className={`text-xs leading-relaxed ${comment.author === 'AI Assistant' ? 'text-blue-900' : 'text-gray-700'}`}>{comment.text}</p>
                                                                        </div>



                                                                    </div>
                                                                </div>
                                                            ))}

                                                            {(post.type === 'question' ? (post.answers || []) : post.comments).length > (visibleCommentCounts[post.id] || 3) && (
                                                                <button
                                                                    onClick={() => loadMoreComments(post.id)}
                                                                    className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-blue-600 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 mt-2"
                                                                >
                                                                    View more comments <span className="material-symbols-outlined !text-[16px]">expand_more</span>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </article>
                                    ))}
                            </div>
                        </div>
                    </div>
                </main>

                {/* RIGHT SIDEBAR: Widgets */}
                <aside className="hidden xl:flex w-80 flex-col h-full border-l border-border-subtle bg-white overflow-y-auto shrink-0 z-10 p-5">
                    {/* Search Widget Removed */}

                    {/* Trending Card */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-5 mt-12">
                        <div className="p-4 bg-cover bg-center relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=500&auto=format&fit=crop")' }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <h3 className="relative text-white font-bold text-lg z-10">Trending Today</h3>
                        </div>
                        <div className="flex flex-col">
                            <button className="px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 text-left" onClick={() => executeAction(() => { })}>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-0.5">Visas • Trending</p>
                                <p className="text-sm font-semibold text-gray-900 leading-snug">F-1 Visa Slot Availability Update</p>
                                <p className="text-xs text-gray-500 mt-1">204 posts participating</p>
                            </button>
                            <button className="px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 text-left" onClick={() => executeAction(() => { })}>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-0.5">Destinations • Hot</p>
                                <p className="text-sm font-semibold text-gray-900 leading-snug">Best Student Cities in Europe 2024</p>
                                <p className="text-xs text-gray-500 mt-1">89 new comments</p>
                            </button>
                            <button className="px-4 py-3 hover:bg-gray-50 transition-colors text-left" onClick={() => executeAction(() => { })}>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-0.5">Finance</p>
                                <p className="text-sm font-semibold text-gray-900 leading-snug">Forex Card vs Bank Transfer?</p>
                                <p className="text-xs text-gray-500 mt-1">15 posts today</p>
                            </button>
                        </div>
                    </div>



                    <div className="text-xs text-gray-400 flex flex-wrap gap-2 px-2">
                        <a className="hover:underline" href="#">About</a>
                        <span>•</span>
                        <a className="hover:underline" href="#">Privacy</a>
                        <span>•</span>
                        <a className="hover:underline" href="#">Terms</a>
                        <span>•</span>
                        <span>© 2024 EAOverseas</span>
                    </div>
                </aside>
            </div>

            {/* Share Modal */}
            {shareData && (
                <ShareModal
                    isOpen={isShareModalOpen}
                    onClose={() => setIsShareModalOpen(false)}
                    title="Share Discussion"
                    shareUrl={`https://eaoverseas.com/community/discussion-${shareData.id}`}
                    preview={{
                        title: shareData.title,
                        subtitle: "EAOverseas Community",
                        icon: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png"
                    }}
                />
            )}
        </div >
    );
};

export default CommunityFeed;
