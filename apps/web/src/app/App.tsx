import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from '@workspace/ui';
import PageSkeleton from '@/shared/components/skeletons/PageSkeleton';

// Layouts - keeping eager for structural stability
import MainLayout from '@/layouts/MainLayout';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import AdminLayout from '@/layouts/AdminLayout';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import ConsultantLayout from '@/layouts/ConsultantLayout';

// Public Website - Lazy Loaded
const LandingPage = lazy(() => import('@/pages/website/LandingPage'));
const TermsAndConditions = lazy(() => import('@/pages/website/TermsAndConditions'));
const NotFound = lazy(() => import('@/pages/website/NotFound'));
const CookiePolicy = lazy(() => import('@/pages/website/CookiePolicyPage'));
const PrivacyPolicy = lazy(() => import('@/pages/website/PrivacyPolicyPage'));
const AboutUs = lazy(() => import('@/pages/website/AboutUs'));
const Team = lazy(() => import('@/pages/website/Team'));
const ExpertProfile = lazy(() => import('@/pages/website/ExpertProfile'));
const Countries = lazy(() => import('@/pages/website/Countries'));
const ContactUs = lazy(() => import('@/pages/website/ContactUs'));
const AllDestinations = lazy(() => import('@/pages/website/AllDestinations'));
const Blogs = lazy(() => import('@/pages/website/Blogs'));
const BlogDetails = lazy(() => import('@/pages/website/BlogDetails'));
const ThankYou = lazy(() => import('@/pages/website/ThankYou'));
const Testimonials = lazy(() => import('@/pages/website/Testimonials'));
const StudentStory = lazy(() => import('@/pages/website/StudentStory'));
const CountryDetails = lazy(() => import('@/pages/website/CountryDetails'));

// Dashboard Pages - Lazy Loaded
const HomeDashboard = lazy(() => import('@/pages/dashboard/HomeDashboard'));
const Courses = lazy(() => import('@/pages/dashboard/Courses'));
const Feed = lazy(() => import('@/pages/dashboard/Feed'));
const CommunityFeed = lazy(() => import('@/pages/dashboard/CommunityFeed'));
const ApplicationDashboard = lazy(() => import('@/pages/dashboard/ApplicationDashboard'));
const DocumentsDashboard = lazy(() => import('@/pages/dashboard/DocumentsDashboard'));
const CollegeFinder = lazy(() => import('@/pages/dashboard/CollegeFinder'));
const CollegeDetails = lazy(() => import('@/pages/dashboard/CollegeDetails'));
const CourseDetails = lazy(() => import('@/pages/dashboard/CourseDetails'));
const ApplicationLayout = lazy(() => import('@/pages/dashboard/application/ApplicationLayout'));
const PersonalDetails = lazy(() => import('@/pages/dashboard/application/PersonalDetails'));
const AcademicDetails = lazy(() => import('@/pages/dashboard/application/AcademicDetails'));
const Documents = lazy(() => import('@/pages/dashboard/application/Documents'));
const Review = lazy(() => import('@/pages/dashboard/application/Review'));
const ApplicationSubmitted = lazy(() => import('@/pages/dashboard/application/ApplicationSubmitted'));
const ApplicationStart = lazy(() => import('@/pages/dashboard/application/ApplicationStart'));
const InitiateApplication = lazy(() => import('@/pages/dashboard/application/InitiateApplication'));
const FeedDetails = lazy(() => import('@/pages/dashboard/FeedDetails'));
const Accommodation = lazy(() => import('@/pages/dashboard/Accommodation'));
const AccommodationDetails = lazy(() => import('@/pages/dashboard/AccommodationDetails'));
const MyProfile = lazy(() => import('@/pages/dashboard/MyProfile'));
const UserProfile = lazy(() => import('@/pages/dashboard/UserProfile'));
const UniversityProfile = lazy(() => import('@/pages/dashboard/UniversityProfile'));
const EditProfile = lazy(() => import('@/pages/dashboard/EditProfile'));
const Consultant = lazy(() => import('@/pages/dashboard/Consultant'));
const ConsultationWaitingRoom = lazy(() => import('@/pages/dashboard/ConsultationWaitingRoom'));
const AccountSettings = lazy(() => import('@/pages/dashboard/AccountSettings'));
const NotificationPreferences = lazy(() => import('@/pages/dashboard/NotificationPreferences'));
const PrivacySecurity = lazy(() => import('@/pages/dashboard/PrivacySecurity'));
const AcademicSnapshotDetails = lazy(() => import('@/pages/dashboard/AcademicSnapshotDetails'));
const Referrals = lazy(() => import('@/pages/dashboard/Referrals'));
const SavedColleges = lazy(() => import('@/pages/dashboard/SavedColleges'));
const SavedCourses = lazy(() => import('@/pages/dashboard/SavedCourses'));
const SavedAccommodations = lazy(() => import('@/pages/dashboard/SavedAccommodations'));
const SavedPosts = lazy(() => import('@/pages/dashboard/SavedPosts'));
const VisaPrep = lazy(() => import('@/pages/dashboard/VisaPrep'));
const LoanRequirements = lazy(() => import('@/pages/dashboard/LoanRequirements'));
const LoanEligibility = lazy(() => import('@/pages/dashboard/LoanEligibility'));
const LoanDocuments = lazy(() => import('@/pages/dashboard/LoanDocuments'));
const LenderSelection = lazy(() => import('@/pages/dashboard/LenderSelection'));
const LoanApplicationTimeline = lazy(() => import('@/pages/dashboard/LoanApplicationTimeline'));
const ConfirmAdmission = lazy(() => import('@/pages/dashboard/ConfirmAdmission'));
const VisaDocumentUpload = lazy(() => import('@/pages/dashboard/VisaDocumentUpload'));
const AskAI = lazy(() => import('@/pages/dashboard/AskAI'));
const TestPrep = lazy(() => import('@/pages/dashboard/TestPrep'));
const TestOverview = lazy(() => import('@/pages/dashboard/TestOverview'));
const ListeningTest = lazy(() => import('@/pages/dashboard/ListeningTest'));
const SpeakingTest = lazy(() => import('@/pages/dashboard/SpeakingTest'));
const ReadingTestInstructions = lazy(() => import('@/pages/dashboard/ReadingTestInstructions'));
const ReadingTest = lazy(() => import('@/pages/dashboard/ReadingTest'));
const ReadingTestResult = lazy(() => import('@/pages/dashboard/ReadingTestResult'));
const ReadingTestSubmitted = lazy(() => import('@/pages/dashboard/ReadingTestSubmitted'));
const WritingTestInstructions = lazy(() => import('@/pages/dashboard/WritingTestInstructions'));
const WritingTest = lazy(() => import('@/pages/dashboard/WritingTest'));
const ConsultantDashboard = lazy(() => import('@/pages/dashboard/ConsultantDashboard'));
const ConsultantStudents = lazy(() => import('@/pages/dashboard/ConsultantStudents'));
const ConsultantSchedule = lazy(() => import('@/pages/dashboard/ConsultantSchedule'));
const ConsultantTasks = lazy(() => import('@/pages/dashboard/ConsultantTasks'));
const UniversityDirectory = lazy(() => import('@/pages/dashboard/UniversityDirectory'));
const UniversityDetails = lazy(() => import('@/pages/dashboard/UniversityDetails'));
const CounsellorProfile = lazy(() => import('@/pages/dashboard/CounsellorProfile'));
const CounsellingChat = lazy(() => import('@/pages/dashboard/CounsellingChat'));
const PerformanceRatingOverview = lazy(() => import('@/pages/dashboard/PerformanceRatingOverview'));
const AssignedStudents = lazy(() => import('@/pages/dashboard/AssignedStudents'));
const SuperAdminUniversityProfile = lazy(() => import('@/pages/dashboard/SuperAdminUniversityProfile'));
const ActivePartnersPage = lazy(() => import('@/pages/dashboard/ActivePartnersPage'));
const AllApplicationsPage = lazy(() => import('@/pages/dashboard/AllApplicationsPage'));
const SuperAdminUserManagement = lazy(() => import('@/pages/dashboard/SuperAdminUserManagement'));
const SuperAdminInquiries = lazy(() => import('@/pages/dashboard/SuperAdminInquiries'));
const SuperAdminUniversityManagement = lazy(() => import('@/pages/dashboard/SuperAdminUniversityManagement'));
const SuperAdminPostFeedDashboard = lazy(() => import('@/pages/dashboard/SuperAdminPostFeedDashboard'));
const SuperAdminPostDetails = lazy(() => import('@/pages/dashboard/SuperAdminPostDetails'));
const SuperAdminNewPost = lazy(() => import('@/pages/dashboard/SuperAdminNewPost'));
const SuperAdminStrategicDashboard = lazy(() => import('@/pages/dashboard/SuperAdminStrategicDashboard'));
const PostCenter = lazy(() => import('@/pages/dashboard/PostCenter'));
const UniversityScholarship = lazy(() => import('@/pages/dashboard/UniversityScholarship'));
const ScholarshipAnalytics = lazy(() => import('@/pages/dashboard/ScholarshipAnalytics'));
const Scholarships = lazy(() => import('@/pages/dashboard/Scholarships'));
const ScholarshipDetails = lazy(() => import('@/pages/dashboard/ScholarshipDetails'));
const MyScholarshipApplications = lazy(() => import('@/pages/dashboard/MyScholarshipApplications'));
const ConsultantApplications = lazy(() => import('@/pages/dashboard/ConsultantApplications'));
const SuperAdminAvailableCounsellors = lazy(() => import('@/pages/dashboard/SuperAdminAvailableCounsellors'));
const SuperAdminActiveTodayCounsellors = lazy(() => import('@/pages/dashboard/SuperAdminActiveTodayCounsellors'));
const UniversityScraper = lazy(() => import('@/pages/dashboard/UniversityScraper'));
const UniversityApplications = lazy(() => import('@/pages/dashboard/UniversityApplications'));
const UniversityPublishedPosts = lazy(() => import('@/pages/dashboard/UniversityPublishedPosts'));

// PAI Module - Lazy Loaded
const ProfileForm = lazy(() => import('@/modules/pai/pages/ProfileForm'));
const ResumeUpload = lazy(() => import('@/modules/pai/pages/ResumeUpload'));
const LinkedInImport = lazy(() => import('@/modules/pai/pages/LinkedInImport'));
const PAILanding = lazy(() => import('@/modules/pai/pages/PAILanding'));
const GitHubAnalysis = lazy(() => import('@/modules/pai/pages/GitHubAnalysis'));
const PortfolioAnalysis = lazy(() => import('@/modules/pai/pages/PortfolioAnalysis'));
const PAILoadingScreen = lazy(() => import('@/modules/pai/pages/PAILoadingScreen'));
const ProfileIntelligenceReport = lazy(() => import('@/modules/pai/pages/ProfileIntelligenceReport'));

// Admin Pages - Lazy Loaded
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const BlogManagement = lazy(() => import('@/pages/admin/BlogManagement'));
const LeadVault = lazy(() => import('@/pages/admin/LeadVault'));

// Profile Setup - Lazy Loaded
const ProfileLayout = lazy(() => import('@/pages/dashboard/profile/ProfileLayout'));
const BasicInfo = lazy(() => import('@/pages/dashboard/profile/BasicInfo'));
const Education = lazy(() => import('@/pages/dashboard/profile/Education'));
const Goals = lazy(() => import('@/pages/dashboard/profile/Goals'));
const ProfileCompleted = lazy(() => import('@/pages/dashboard/profile/ProfileCompleted'));

// Auth - Lazy Loaded
const Login = lazy(() => import('@/pages/dashboard/Login'));
const Signup = lazy(() => import('@/pages/dashboard/Signup'));
const ForgotPassword = lazy(() => import('@/pages/dashboard/ForgotPassword'));
const Verification = lazy(() => import('@/pages/dashboard/Verification'));
const UniversityVerification = lazy(() => import('@/pages/dashboard/UniversityVerification'));
const UniversityPendingVerification = lazy(() => import('@/pages/dashboard/UniversityPendingVerification'));

import { SavedItemsProvider } from '@/shared/contexts/SavedItemsContext';
import { UserProfileProvider } from '@/shared/contexts/UserProfileContext';
import { NotificationProvider } from '@/shared/contexts/NotificationContext';
import { PostsProvider } from '@/shared/contexts/PostsContext';
import { ScholarshipsProvider } from '@/shared/contexts/ScholarshipsContext';
import { ApplicationsProvider } from '@/shared/contexts/ApplicationsContext';
import { useAuth } from '@/shared/contexts/AuthContext';
import ProtectedRoute from '@/shared/components/ProtectedRoute';

const HomeRoute = () => {
    return <LandingPage />;
};

const SuperAdminIndex = () => {
    const { user } = useAuth();
    if (user?.role === 'Counsellor') {
        return <Navigate to="counsellor-portal/dashboard" replace />;
    }
    return <SuperAdminStrategicDashboard />;
};

function App() {
    return (
        <NotificationProvider>
            <SavedItemsProvider>
                <UserProfileProvider>
                    <PostsProvider>
                        <ScholarshipsProvider>
                            <ApplicationsProvider>
                                <BrowserRouter>
                                    <ScrollToTop />
                                    <Suspense fallback={<PageSkeleton />}>
                                        <Routes>
                                            <Route path="/" element={<HomeRoute />} />
                                            <Route path="/landing" element={<Navigate to="/" replace />} />

                                            {/* Public Website Sub-pages */}
                                            <Route element={<WebsiteLayout />}>
                                                <Route path="/terms" element={<TermsAndConditions />} />
                                                <Route path="/cookie-policy" element={<CookiePolicy />} />
                                                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                                <Route path="/about" element={<AboutUs />} />
                                                <Route path="/team" element={<Team />} />
                                                <Route path="/expert-profile" element={<Navigate to="/team" replace />} />
                                                <Route path="/expert-profile/:expertId" element={<ExpertProfile />} />
                                                <Route path="/countries" element={<Countries />} />
                                                <Route path="/country/:countryCode" element={<CountryDetails />} />
                                                <Route path="/contact" element={<ContactUs />} />
                                                <Route path="/all-destinations" element={<AllDestinations />} />
                                                <Route path="/blogs" element={<Blogs />} />
                                                <Route path="/blogs/:id" element={<BlogDetails />} />
                                                <Route path="/testimonials" element={<Testimonials />} />
                                                <Route path="/thank-you" element={<ThankYou />} />
                                                <Route path="/testimonials/:id" element={<StudentStory />} />
                                            </Route>

                                            {/* Enterprise Admin Dashboard */}
                                            <Route path="/admin" element={<AdminLayout />}>
                                                <Route index element={<Navigate to="dashboard" replace />} />
                                                <Route path="dashboard" element={<AdminDashboard />} />
                                                <Route path="blogs" element={<BlogManagement />} />
                                                <Route path="leads" element={<LeadVault />} />
                                                <Route path="settings" element={<div className="p-10 text-2xl font-black">System Settings Under Construction</div>} />
                                            </Route>

                                            {/* Auth Routes */}
                                            <Route path="/login" element={<Login />} />
                                            <Route path="/signup" element={<Signup />} />
                                            <Route path="/forgot-password" element={<ForgotPassword />} />
                                            <Route path="/verification" element={<Verification />} />
                                            <Route path="/university-verification" element={<UniversityVerification />} />
                                            <Route path="/university-pending-verification" element={<UniversityPendingVerification />} />

                                            {/* Gated Student Portal */}
                                            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                                                <Route path="/dashboard" element={<HomeDashboard />} />
                                                <Route path="/courses" element={<Courses />} />
                                                <Route path="/feed" element={<Feed />} />
                                                <Route path="/community-feed" element={<CommunityFeed />} />
                                                <Route path="feed-details/:id" element={<FeedDetails />} />
                                                <Route path="colleges" element={<CollegeFinder />} />
                                                <Route path="college-details" element={<CollegeDetails />} />
                                                <Route path="course-details" element={<CourseDetails />} />
                                                <Route path="scholarships" element={<Scholarships />} />
                                                <Route path="scholarship-details/:id" element={<ScholarshipDetails />} />
                                                <Route path="scholarship-applications" element={<MyScholarshipApplications />} />

                                                <Route path="test-prep" element={<TestPrep />} />
                                                <Route path="test-prep/overview" element={<TestOverview />} />
                                                <Route path="accommodation" element={<Accommodation />} />
                                                <Route path="accommodation-details" element={<AccommodationDetails />} />
                                                <Route path="applications" element={<ApplicationDashboard />} />
                                                <Route path="documents" element={<DocumentsDashboard />} />
                                                <Route path="profile" element={<MyProfile />} />
                                                <Route path="profile/edit" element={<EditProfile />} />
                                                <Route path="account-settings" element={<AccountSettings />} />
                                                <Route path="notification-preferences" element={<NotificationPreferences />} />
                                                <Route path="privacy-security" element={<PrivacySecurity />} />
                                                <Route path="profile/academic-snapshot" element={<AcademicSnapshotDetails />} />
                                                <Route path="referrals" element={<Referrals />} />
                                                <Route path="saved-colleges" element={<SavedColleges />} />
                                                <Route path="saved-courses" element={<SavedCourses />} />
                                                <Route path="saved-accommodations" element={<SavedAccommodations />} />
                                                <Route path="saved-posts" element={<SavedPosts />} />
                                                <Route path="visas" element={<VisaPrep />} />
                                                <Route path="loans" element={<LoanRequirements />} />
                                                <Route path="loan-eligibility" element={<LoanEligibility />} />
                                                <Route path="loan-documents" element={<LoanDocuments />} />
                                                <Route path="lender-selection" element={<LenderSelection />} />
                                                <Route path="loan-application-timeline" element={<LoanApplicationTimeline />} />
                                                <Route path="/visa-application/confirm" element={<ConfirmAdmission />} />
                                                <Route path="/visa-application/documents" element={<VisaDocumentUpload />} />
                                                <Route path="ai-profile" element={<AskAI />} />
                                                <Route path="test-prep/reading-instructions" element={<ReadingTestInstructions />} />
                                                <Route path="test-prep/reading/submitted" element={<ReadingTestSubmitted />} />
                                                <Route path="test-prep/writing-instructions" element={<WritingTestInstructions />} />
                                                <Route path="test-prep/writing" element={<WritingTest />} />

                                                <Route path="explore/feed" element={<Feed />} />
                                                <Route path="explore/community" element={<CommunityFeed />} />
                                                <Route path="explore/courses" element={<Courses />} />
                                                <Route path="explore/colleges" element={<CollegeFinder />} />
                                                <Route path="explore/dashboard" element={<HomeDashboard />} />
                                                <Route path="explore/test-prep" element={<TestPrep />} />
                                                <Route path="explore/accommodation" element={<Accommodation />} />

                                                {/* PAI Module Routes */}
                                                <Route path="pai">
                                                    <Route index element={<PAILanding />} />
                                                    <Route path="landing" element={<PAILanding />} />
                                                    <Route path="profile-form" element={<ProfileForm />} />
                                                    <Route path="resume-upload" element={<ResumeUpload />} />
                                                    <Route path="linkedin-import" element={<LinkedInImport />} />
                                                    <Route path="github-analysis" element={<GitHubAnalysis />} />
                                                    <Route path="portfolio-analysis" element={<PortfolioAnalysis />} />
                                                    <Route path="loading" element={<PAILoadingScreen />} />
                                                    <Route path="intelligence-report" element={<ProfileIntelligenceReport />} />
                                                </Route>
                                            </Route>

                                            <Route path="/test-prep/listening" element={<ListeningTest />} />
                                            <Route path="/test-prep/reading" element={<ReadingTest />} />
                                            <Route path="/test-prep/reading/result" element={<ReadingTestResult />} />
                                            <Route path="/test-prep/speaking" element={<SpeakingTest />} />

                                            <Route path="/profile-setup" element={<ProtectedRoute><ProfileLayout /></ProtectedRoute>}>
                                                <Route index element={<Navigate to="basic" replace />} />
                                                <Route path="basic" element={<BasicInfo />} />
                                                <Route path="education" element={<Education />} />
                                                <Route path="goals" element={<Goals />} />
                                                <Route path="completed" element={<ProfileCompleted />} />
                                            </Route>

                                            <Route path="/application" element={<ProtectedRoute><ApplicationLayout /></ProtectedRoute>}>
                                                <Route index element={<Navigate to="details" replace />} />
                                                <Route path="details" element={<PersonalDetails />} />
                                                <Route path="academic" element={<AcademicDetails />} />
                                                <Route path="documents" element={<Documents />} />
                                                <Route path="review" element={<Review />} />
                                            </Route>

                                            <Route path="/application/start" element={<ApplicationStart />} />
                                            <Route path="/application/initiate" element={<InitiateApplication />} />
                                            <Route path="/application/submitted" element={<ApplicationSubmitted />} />

                                            <Route element={<ProtectedRoute requiredRoles={['counsellor']}><ConsultantLayout /></ProtectedRoute>}>
                                                <Route path="/counsellor-dashboard" element={<ConsultantDashboard />} />
                                                <Route path="/counsellor-students" element={<ConsultantStudents />} />
                                                <Route path="/counsellor-applications" element={<ConsultantApplications />} />
                                                <Route path="/counsellor-schedule" element={<ConsultantSchedule />} />
                                                <Route path="/counsellor-tasks" element={<ConsultantTasks />} />
                                                <Route path="/consultant/university-directory" element={<UniversityDirectory />} />
                                                <Route path="/consultant/university-details/:id" element={<UniversityDetails />} />
                                                <Route path="/counsellor-documents" element={<CounsellingChat />} />
                                                <Route path="/counsellor-profile" element={<CounsellorProfile />} />
                                                <Route path="/counsellor-performance" element={<PerformanceRatingOverview />} />
                                                <Route path="/counsellor-assigned-students" element={<AssignedStudents />} />
                                                <Route path="/counsellor-student-profile" element={<MyProfile />} />
                                            </Route>

                                            <Route path="/Superadmin" element={<SuperAdminLayout title="Super Admin Dashboard" />}>
                                                <Route index element={<SuperAdminIndex />} />
                                                <Route path="universities" element={<SuperAdminUniversityManagement />} />
                                                <Route path="counsellors" element={<SuperAdminAvailableCounsellors />} />
                                                <Route path="active-today" element={<SuperAdminActiveTodayCounsellors />} />
                                                <Route path="scraper" element={<UniversityScraper />} />
                                                <Route path="active-partners" element={<ActivePartnersPage />} />
                                                <Route path="applications/all" element={<AllApplicationsPage />} />
                                                <Route path="university/:id" element={<SuperAdminUniversityProfile />} />
                                                <Route path="users" element={<SuperAdminUserManagement />} />
                                                <Route path="inquiries" element={<SuperAdminInquiries />} />

                                                {/* Nested University Portal routes */}
                                                <Route path="university-portal">
                                                    <Route path="posts-feed" element={<SuperAdminPostFeedDashboard />} />
                                                    <Route path="posts-feed/new" element={<SuperAdminNewPost />} />
                                                    <Route path="posts-feed/:postId" element={<SuperAdminPostDetails />} />
                                                    <Route path="scholarships" element={<UniversityScholarship isEmbedded={true} />} />
                                                    <Route path="post-center" element={<PostCenter isEmbedded={true} />} />
                                                    <Route path="programs" element={<Navigate to="../posts-feed" replace />} />
                                                </Route>

                                                {/* Nested Counsellor Portal routes */}
                                                <Route path="counsellor-portal">
                                                    <Route path="dashboard" element={<ConsultantDashboard isEmbedded={true} />} />
                                                    <Route path="students" element={<ConsultantStudents isEmbedded={true} />} />
                                                    <Route path="applications" element={<ConsultantApplications isEmbedded={true} />} />
                                                    <Route path="university-directory" element={<UniversityDirectory isEmbedded={true} />} />
                                                    <Route path="university-details/:id" element={<UniversityDetails isEmbedded={true} />} />
                                                    <Route path="chat" element={<CounsellingChat isEmbedded={true} />} />
                                                    <Route path="schedule" element={<ConsultantSchedule isEmbedded={true} />} />
                                                    <Route path="tasks" element={<ConsultantTasks isEmbedded={true} />} />
                                                    <Route path="profile" element={<CounsellorProfile isEmbedded={true} />} />
                                                    <Route path="performance" element={<PerformanceRatingOverview isEmbedded={true} />} />
                                                    <Route path="assigned-students" element={<AssignedStudents isEmbedded={true} />} />
                                                    <Route path="student-profile" element={<MyProfile isEmbedded={true} />} />
                                                </Route>
                                            </Route>
                                            <Route path="/superadmin/*" element={<Navigate to="/Superadmin" replace />} />
                                            <Route path="/university/dashboard" element={<Navigate to="/university/applications" replace />} />
                                            <Route path="/university/applications" element={<UniversityApplications />} />
                                            <Route path="/university/published-posts" element={<UniversityPublishedPosts />} />
                                            <Route path="/university/management" element={<UniversityScholarship />} />
                                            <Route path="/university/post-center" element={<PostCenter />} />
                                            <Route path="/university/scholarship-analytics" element={<ScholarshipAnalytics />} />
                                            <Route path="/university/programs" element={<Navigate to="/Superadmin/university-portal/posts-feed" replace />} />

                                            {/* Catch-all 404 Route */}
                                            <Route path="*" element={<NotFound />} />
                                        </Routes>
                                    </Suspense>
                                </BrowserRouter>
                            </ApplicationsProvider>
                        </ScholarshipsProvider>
                    </PostsProvider>
                </UserProfileProvider>
            </SavedItemsProvider>
        </NotificationProvider>
    );
}

export default App;
