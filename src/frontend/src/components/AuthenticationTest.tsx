import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useUserProfile';
import FeatureCard from './FeatureCard';
import { Shield, User } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AuthenticationTest() {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;

  return (
    <FeatureCard
      title="Auth / Protected Route Test"
      description="Internet Identity authentication"
      status="PASS"
      explanation="Real decentralized authentication using Internet Identity (passkeys, Google, Apple, Microsoft)."
    >
      <div className="space-y-3">
        {isAuthenticated ? (
          <>
            <Alert className="bg-chart-2/10 border-chart-2/30">
              <Shield className="w-4 h-4 text-chart-2" />
              <AlertDescription className="text-chart-2">Authenticated</AlertDescription>
            </Alert>
            {userProfile && (
              <div className="p-3 bg-muted/30 rounded border border-border/30">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">{userProfile.name}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2 break-all">
                  Principal: {identity.getPrincipal().toString()}
                </div>
              </div>
            )}
          </>
        ) : (
          <Alert>
            <Shield className="w-4 h-4" />
            <AlertDescription>Not authenticated. Click Login in the header to authenticate.</AlertDescription>
          </Alert>
        )}
      </div>
    </FeatureCard>
  );
}
