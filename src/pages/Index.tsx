
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Edit, User, Share2, Download, ThumbsUp } from 'lucide-react';

const Index = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden bg-background">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                Create professional resumes in minutes, not hours
              </h1>
              <p className="text-xl text-muted-foreground">
                Our powerful resume builder helps you craft standout resumes that get noticed by employers. Land your dream job faster.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button size="lg" className="rounded-full">
                    Get Started
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg" className="rounded-full">
                    Try Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-white rounded-lg shadow-xl p-4 transform rotate-1 animate-float">
                <img 
                  src="/placeholder.svg" 
                  alt="Resume Example" 
                  className="w-full h-auto rounded"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 opacity-10 blur-3xl bg-primary rounded-full"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 opacity-10 blur-3xl bg-primary rounded-full"></div>
      </section>
      
      {/* Features Section */}
      <section className="px-6 py-20 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to build winning resumes</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform provides all the tools and features to help you create, manage, and share professional resumes that stand out.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Edit className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Intuitive Editor</h3>
              <p className="text-muted-foreground">
                Our drag-and-drop editor makes it easy to customize your resume with a professional layout and design.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Templates</h3>
              <p className="text-muted-foreground">
                Choose from a variety of professional templates designed to impress employers in different industries.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Profile Storage</h3>
              <p className="text-muted-foreground">
                Save your information securely and reuse it for multiple resumes without starting from scratch.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
              <p className="text-muted-foreground">
                Share your resume securely with potential employers or collaborate with others on edits.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
              <p className="text-muted-foreground">
                Download your resume in various formats including PDF, ready to be sent to employers.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ThumbsUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Recommendations</h3>
              <p className="text-muted-foreground">
                Get AI-powered suggestions to improve your resume and increase your chances of getting hired.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="px-6 py-20 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What our users say</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Thousands of job seekers have used our platform to create professional resumes and land their dream jobs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">Software Developer</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "I landed interviews at three top tech companies after creating my resume here. The templates are professional and the editor is so easy to use!"
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Michael Chen</h4>
                  <p className="text-sm text-muted-foreground">Marketing Manager</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The ability to create multiple versions of my resume for different positions has been a game-changer. Highly recommend this platform!"
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Emily Rodriguez</h4>
                  <p className="text-sm text-muted-foreground">Graphic Designer</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "As a designer, I'm picky about how my resume looks. This platform gave me the creative control I wanted while still keeping it professional."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="px-6 py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to create your professional resume?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of job seekers who have successfully landed their dream jobs with our resume builder.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="rounded-full">
                Get Started Now
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="rounded-full bg-transparent border-primary-foreground hover:bg-primary-foreground/10">
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
