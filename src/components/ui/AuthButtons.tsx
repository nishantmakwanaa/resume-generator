
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

interface AuthButtonsProps {
  onSuccess?: () => void;
  showEmail?: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ 
  onSuccess, 
  showEmail = true 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signInWithGoogle, signInWithGithub } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  
  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      await signInWithGoogle();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast({
        title: "Google login failed",
        description: "Please check if Google authentication is enabled in your Supabase project.",
        variant: "destructive"
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };
  
  const handleGithubLogin = async () => {
    try {
      setIsGithubLoading(true);
      await signInWithGithub();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('GitHub login error:', error);
      toast({
        title: "GitHub login failed",
        description: "Please check if GitHub authentication is enabled in your Supabase project.",
        variant: "destructive"
      });
    } finally {
      setIsGithubLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <Button 
        variant="outline" 
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading}
        className="bg-white text-gray-800 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all"
      >
        {isGoogleLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
            </g>
          </svg>
        )}
        {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
      </Button>
      
      <Button 
        variant="outline" 
        onClick={handleGithubLogin}
        disabled={isGithubLoading}
        className="bg-[#24292e] text-white border-[#1b1f23] hover:bg-[#2c3136] hover:border-[#24292e] transition-all"
      >
        {isGithubLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <Github className="h-5 w-5 mr-2" />
        )}
        {isGithubLoading ? 'Connecting...' : 'Continue with GitHub'}
      </Button>
      
      {showEmail && (
        <Button 
          variant="outline" 
          onClick={() => navigate('/login/email')}
          className="border-gray-300 hover:border-gray-400 transition-all"
        >
          <Mail className="h-5 w-5 mr-2" />
          Continue with Email
        </Button>
      )}
    </div>
  );
};

export default AuthButtons;
