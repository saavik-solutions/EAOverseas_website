import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from '@workspace/ui';
import MainLayout from '@/layouts/MainLayout';
import LandingPage from '@/pages/website/LandingPage';
import TermsAndConditions from '@/pages/website/TermsAndConditions';
import CookiePolicy from '@/pages/website/CookiePolicyPage';
import PrivacyPolicy from '@/pages/website/PrivacyPolicyPage';
import AboutUs from '@/pages/website/AboutUs';
import Team from '@/pages/website/Team';
import ExpertProfile from '@/pages/website/ExpertProfile';
import Countries from '@/pages/website/Countries';
import ContactUs from '@/pages/website/ContactUs';
import AllDestinations from '@/pages/website/AllDestinations';
import Blogs from '@/pages/website/Blogs';
import BlogDetails from '@/pages/website/BlogDetails';
import Testimonials from '@/pages/website/Testimonials';
import StudentStory from '@/pages/website/StudentStory';
import HomeDashboard from '@/pages/dashboard/HomeDashboard';
import Courses from '@/pages/dashboard/Courses';
// Heavy routes lazy loaded for performance
const Feed = React.lazy(() => import('@/pages/dashboard/Feed'));
const CommunityFeed = React.lazy(() => import('@/pages/dashboard/CommunityFeed'));
const ApplicationDashboard = React.lazy(() => import('@/pages/dashboard/ApplicationDashboard'));
const DocumentsDashboard = React.lazy(() => import('@/pages/dashboard/DocumentsDashboard'));
const CollegeFinder = React.lazy(() => import('@/pages/dashboard/CollegeFinder'));
const CollegeDetails = React.lazy(() => import('@/pages/dashboard/CollegeDetails'));
import CourseDetails from '@/pages/dashboard/CourseDetails';
import ApplicationLayout from '@/pages/dashboard/application/ApplicationLayout';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import PersonalDetails from '@/pages/dashboard/application/PersonalDetails';
import AcademicDetails from '@/pages/dashboard/application/AcademicDetails';
import Documents from '@/pages/dashboard/application/Documents';
import Review from '@/pages/dashboard/application/Review';

import ApplicationSubmitted from '@/pages/dashboard/application/ApplicationSubmitted';
import ApplicationStart from '@/pages/dashboard/application/ApplicationStart';
import InitiateApplication from '@/pages/dashboard/application/InitiateApplication';

import FeedDetails from '@/pages/dashboard/FeedDetails';
import Accommodation from '@/pages/dashboard/Accommodation';
import AccommodationDetails from '@/pages/dashboard/AccommodationDetails';

import MyProfile from '@/pages/dashboard/MyProfile';
import UserProfile from '@/pages/dashboard/UserProfile';
import UniversityProfile from '@/pages/dashboard/UniversityProfile';
import EditProfile from '@/pages/dashboard/EditProfile';
import Consultant from '@/pages/dashboard/Consultant';
import ConsultationWaitingRoom from '@/pages/dashboard/ConsultationWaitingRoom';
import AccountSettings from '@/pages/dashboard/AccountSettings';
import NotificationPreferences from '@/pages/dashboard/NotificationPreferences';
import PrivacySecurity from '@/pages/dashboard/PrivacySecurity';
import AcademicSnapshotDetails from '@/pages/dashboard/AcademicSnapshotDetails';
import Referrals from '@/pages/dashboard/Referrals';
import SavedColleges from '@/pages/dashboard/SavedColleges';
import SavedCourses from '@/pages/dashboard/SavedCourses';
import SavedAccommodations from '@/pages/dashboard/SavedAccommodations';
import SavedPosts from '@/pages/dashboard/SavedPosts';
import VisaPrep from '@/pages/dashboard/VisaPrep';
import LoanRequirements from '@/pages/dashboard/LoanRequirements';
import LoanEligibility from '@/pages/dashboard/LoanEligibility';
import LoanDocuments from '@/pages/dashboard/LoanDocuments';
import LenderSelection from '@/pages/dashboard/LenderSelection';
import LoanApplicationTimeline from '@/pages/dashboard/LoanApplicationTimeline';
import ConfirmAdmission from '@/pages/dashboard/ConfirmAdmission';
import VisaDocumentUpload from '@/pages/dashboard/VisaDocumentUpload';
import AskAI from '@/pages/dashboard/AskAI';
import TestPrep from '@/pages/dashboard/TestPrep';
import TestOverview from '@/pages/dashboard/TestOverview';
import ListeningTest from '@/pages/dashboard/ListeningTest';
import SpeakingTest from '@/pages/dashboard/SpeakingTest';
import ReadingTestInstructions from '@/pages/dashboard/ReadingTestInstructions';
import ReadingTest from '@/pages/dashboard/ReadingTest';
import ReadingTestResult from '@/pages/dashboard/ReadingTestResult';
import ReadingTestSubmitted from '@/pages/dashboard/ReadingTestSubmitted';
import WritingTestInstructions from '@/pages/dashboard/WritingTestInstructions';
import WritingTest from '@/pages/dashboard/WritingTest';
import ConsultantDashboard from '@/pages/dashboard/ConsultantDashboard';
import ConsultantStudents from '@/pages/dashboard/ConsultantStudents';
import ConsultantSchedule from '@/pages/dashboard/ConsultantSchedule';
import ConsultantTasks from '@/pages/dashboard/ConsultantTasks';
import ConsultantLayout from '@/layouts/ConsultantLayout';
import UniversityDirectory from '@/pages/dashboard/UniversityDirectory';
import UniversityDetails from '@/pages/dashboard/UniversityDetails';
import CounsellorProfile from '@/pages/dashboard/CounsellorProfile';
import CounsellingChat from '@/pages/dashboard/CounsellingChat';
import PerformanceRatingOverview from '@/pages/dashboard/PerformanceRatingOverview';
import AssignedStudents from '@/pages/dashboard/AssignedStudents';
import SuperAdminUniversityProfile from '@/pages/dashboard/SuperAdminUniversityProfile';
import ActivePartnersPage from '@/pages/dashboard/ActivePartnersPage';
import AllApplicationsPage from '@/pages/dashboard/AllApplicationsPage';
import SuperAdminUserManagement from '@/pages/dashboard/SuperAdminUserManagement';
import SuperAdminInquiries from '@/pages/dashboard/SuperAdminInquiries';

const SuperAdminUniversityManagement = React.lazy(() => import('@/pages/dashboard/SuperAdminUniversityManagement'));
const SuperAdminPostFeedDashboard = React.lazy(() => import('@/pages/dashboard/SuperAdminPostFeedDashboard'));
const SuperAdminPostDetails = React.lazy(() => import('@/pages/dashboard/SuperAdminPostDetails'));
const SuperAdminNewPost = React.lazy(() => import('@/pages/dashboard/SuperAdminNewPost'));
const SuperAdminStrategicDashboard = React.lazy(() => import('@/pages/dashboard/SuperAdminStrategicDashboard'));
import PostCenter from '@/pages/dashboard/PostCenter';
import UniversityScholarship from '@/pages/dashboard/UniversityScholarship';
import ScholarshipAnalytics from '@/pages/dashboard/ScholarshipAnalytics';
import Scholarships from '@/pages/dashboard/Scholarships';
import ScholarshipDetails from '@/pages/dashboard/ScholarshipDetails';
import MyScholarshipApplications from '@/pages/dashboard/MyScholarshipApplications';
import ConsultantApplications from '@/pages/dashboard/ConsultantApplications';
import SuperAdminAvailableCounsellors from '@/pages/dashboard/SuperAdminAvailableCounsellors';
import SuperAdminActiveTodayCounsellors from '@/pages/dashboard/SuperAdminActiveTodayCounsellors';
import UniversityScraper from '@/pages/dashboard/UniversityScraper';

import UniversityApplications from '@/pages/dashboard/UniversityApplications';
import UniversityPublishedPosts from '@/pages/dashboard/UniversityPublishedPosts';

// PAI Module
import ProfileForm from '@/modules/pai/pages/ProfileForm';
import ResumeUpload from '@/modules/pai/pages/ResumeUpload';
import LinkedInImport from '@/modules/pai/pages/LinkedInImport';
import PAILanding from '@/modules/pai/pages/PAILanding';
import GitHubAnalysis from '@/modules/pai/pages/GitHubAnalysis';
import PortfolioAnalysis from '@/modules/pai/pages/PortfolioAnalysis';
import PAILoadingScreen from '@/modules/pai/pages/PAILoadingScreen';
import ProfileIntelligenceReport from '@/modules/pai/pages/ProfileIntelligenceReport';


// Profile Pages
import ProfileLayout from '@/pages/dashboard/profile/ProfileLayout';
import BasicInfo from '@/pages/dashboard/profile/BasicInfo';
import Education from '@/pages/dashboard/profile/Education';
import Goals from '@/pages/dashboard/profile/Goals';
import ProfileCompleted from '@/pages/dashboard/profile/ProfileCompleted';
import Login from '@/pages/dashboard/Login';
import Signup from '@/pages/dashboard/Signup';
import ForgotPassword from '@/pages/dashboard/ForgotPassword';
import Verification from '@/pages/dashboard/Verification';
import UniversityVerification from '@/pages/dashboard/UniversityVerification';
import UniversityPendingVerification from '@/pages/dashboard/UniversityPendingVerification';

import { SavedItemsProvider } from '@/shared/contexts/SavedItemsContext';
import { UserProfileProvider } from '@/shared/contexts/UserProfileContext';
import { NotificationProvider } from '@/shared/contexts/NotificationContext';
import { PostsProvider } from '@/shared/contexts/PostsContext';
import { ScholarshipsProvider } from '@/shared/contexts/ScholarshipsContext';
import { ApplicationsProvider } from '@/shared/contexts/ApplicationsContext';
import { useAuth } from '@/shared/contexts/AuthContext';
import ProtectedRoute from '@/shared/components/ProtectedRoute';

import CountryDetails from '@/pages/website/CountryDetails';

const HomeRoute = () => {
    // REDIRECTION DISABLED - ALWAYS SHOW LANDING AT ROOT
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
                                    <Routes>
                                        <Route path="/" element={<HomeRoute />} />
                                        <Route path="/landing" element={<Navigate to="/" replace />} />
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
                                        <Route path="/testimonials/:id" element={<StudentStory />} />

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
                                    </Routes>
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

