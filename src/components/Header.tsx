
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Menu } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  isLoggedIn = false, 
  userName = '' 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  // Mock logout function - would connect to auth provider in real app
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-lg border-b border-border/40">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" className="fill-primary" />
            <path d="M7 8H17M7 12H17M7 16H13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="hidden sm:inline">ResumeCraft</span>
        </Link>
        
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className={`hidden md:flex items-center gap-6 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/templates" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/templates' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Templates
          </Link>
          {isLoggedIn && (
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Dashboard
            </Link>
          )}
          
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">{userName}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Button onClick={() => navigate('/login')} variant="default" size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}
        </nav>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass absolute top-16 left-0 right-0 p-4 border-b border-border/40 animate-slide-down">
          <nav className="flex flex-col gap-4">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/templates" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/templates' ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Templates
            </Link>
            {isLoggedIn && (
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            
            {isLoggedIn ? (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{userName}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={() => {
                navigate('/login');
                setMobileMenuOpen(false);
              }} variant="default" size="sm">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
