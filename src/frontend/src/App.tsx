import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useUserProfile';
import LoginButton from './components/LoginButton';
import ProfileSetup from './components/ProfileSetup';
import LocalPersistenceTest from './components/LocalPersistenceTest';
import CrossDeviceSyncTest from './components/CrossDeviceSyncTest';
import LeaderboardTest from './components/LeaderboardTest';
import ExternalApiFetchTest from './components/ExternalApiFetchTest';
import ApiRouteTest from './components/ApiRouteTest';
import EmailCapabilityTest from './components/EmailCapabilityTest';
import AuthenticationTest from './components/AuthenticationTest';
import FileUploadTest from './components/FileUploadTest';
import RealTimeTest from './components/RealTimeTest';
import VersionDeployTest from './components/VersionDeployTest';
import UrlStateTest from './components/UrlStateTest';
import { SiCaffeine } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function App() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  
  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center">
              <SiCaffeine className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Caffeine Capability Test</h1>
              <p className="text-xs text-muted-foreground">Real platform feature testing</p>
            </div>
          </div>
          <LoginButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 bg-clip-text text-transparent">
              Platform Capability Testing Suite
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This app demonstrates real platform features with honest status reporting. 
              Each card shows PASS, LOCAL-ONLY, or NOT SUPPORTED based on actual capabilities.
            </p>
          </section>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LocalPersistenceTest />
            <CrossDeviceSyncTest />
            <LeaderboardTest />
            <ExternalApiFetchTest />
            <ApiRouteTest />
            <EmailCapabilityTest />
            <AuthenticationTest />
            <FileUploadTest />
            <RealTimeTest />
            <VersionDeployTest />
            <UrlStateTest />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 py-8 bg-card/20">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            © {new Date().getFullYear()} • Built with{' '}
            <Heart className="w-4 h-4 text-chart-1 fill-chart-1" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-chart-1 hover:text-chart-2 transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      {/* Profile Setup Modal */}
      {showProfileSetup && <ProfileSetup />}
    </div>
  );
}
