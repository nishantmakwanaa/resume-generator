
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthButtons from '@/components/ui/AuthButtons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock login function - would connect to auth provider in real app
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Invalid Input",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Login Successful",
        description: "You have been logged in to your account.",
      });
      setIsLoading(false);
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center pt-16 pb-16 px-4">
        <div className="w-full max-w-md">
          <div className="glass rounded-2xl p-8 backdrop-blur-lg animate-scale-in">
            {!isEmailLogin ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold">Welcome Back</h1>
                  <p className="text-sm text-muted-foreground mt-2">
                    Sign in to continue to ResumeCraft
                  </p>
                </div>
                
                <AuthButtons />
                
                <div className="mt-6 text-center text-sm">
                  <p className="text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary font-medium hover:underline">
                      Sign up
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEmailLogin(false)}
                    className="pl-0 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  
                  <h1 className="text-2xl font-bold mt-2">Sign in with Email</h1>
                  <p className="text-sm text-muted-foreground mt-2">
                    Enter your email and password to continue
                  </p>
                </div>
                
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
                
                <div className="mt-6 text-center text-sm">
                  <p className="text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary font-medium hover:underline">
                      Sign up
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
          
          {!isEmailLogin && (
            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setIsEmailLogin(true)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Sign in with email and password
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
