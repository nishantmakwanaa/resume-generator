
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AuthButtons from '@/components/ui/AuthButtons';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const { toast } = useToast();

  const handleGoogleLogin = () => {
    // In a real app, this would connect to Google OAuth
    toast({
      title: "Login with Google",
      description: "This would connect to Google OAuth in a production app.",
    });
    // Redirect to dashboard for demo purposes
    window.location.href = '/dashboard';
  };

  const handleGithubLogin = () => {
    // In a real app, this would connect to GitHub OAuth
    toast({
      title: "Login with GitHub",
      description: "This would connect to GitHub OAuth in a production app.",
    });
    // Redirect to dashboard for demo purposes
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md">
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Sign in to access your resume builder account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AuthButtons showEmail={false} />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            {/* Demo mode button */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                toast({
                  title: "Demo mode activated",
                  description: "You're now using the app in demo mode.",
                });
                window.location.href = '/dashboard';
              }}
            >
              Continue in Demo Mode
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4 hover:text-primary">
                Sign up
              </Link>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <Link to="/forgot-password" className="underline underline-offset-4 hover:text-primary">
                Forgot your password?
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
