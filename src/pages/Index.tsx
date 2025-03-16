
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, ChevronRight, FileText, Share2, Download, Users, PenTool, Sparkles } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  // Features section data
  const features = [
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "Professional Templates",
      description: "Choose from a variety of professional, HR-approved resume templates."
    },
    {
      icon: <PenTool className="h-6 w-6 text-primary" />,
      title: "Easy Customization",
      description: "Customize every aspect of your resume with our intuitive editor."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      title: "AI-Powered Assistance",
      description: "Get AI suggestions for your resume content to stand out from the crowd."
    },
    {
      icon: <Download className="h-6 w-6 text-primary" />,
      title: "Multiple Export Options",
      description: "Download your resume in PDF or editable formats for any situation."
    },
    {
      icon: <Share2 className="h-6 w-6 text-primary" />,
      title: "Easy Sharing",
      description: "Share your resume with others for collaboration or viewing."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Collaboration",
      description: "Work together with friends or mentors to perfect your resume."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <main className="flex-grow pt-16">
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/50">
          <div className="container mx-auto px-4 pt-20 pb-32 md:pt-32 md:pb-40">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
                Craft the Perfect Resume in Minutes
              </h1>
              <p className="mt-6 text-xl text-muted-foreground animate-fade-in">
                Build professional resumes that stand out and get noticed by employers.
                Our intuitive platform makes resume creation simple and effective.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
                <Button size="lg" onClick={() => navigate('/login')} className="px-8">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/templates')}>
                  View Templates
                </Button>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-16 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-background z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 bg-background relative overflow-hidden">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Everything You Need to Create Standout Resumes
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our platform provides all the tools and features to build professional resumes that help you land your dream job.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="glass p-6 rounded-xl hover:shadow-soft transition-all duration-300 animate-in stagger-1"
                  style={{ '--index': index } as React.CSSProperties}
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Decorative gradient */}
          <div className="absolute top-1/3 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-1/4 left-0 w-1/4 h-1/4 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        </section>

        {/* Templates Preview Section */}
        <section className="py-24 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Professional Resume Templates
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose from our collection of professionally designed templates that employers love.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="group relative overflow-hidden rounded-xl bg-white shadow-soft hover:shadow-md transition-all duration-300 animate-scale-in">
                  <div className="aspect-[8.5/11] bg-gray-100">
                    {/* Resume template preview */}
                    <div className="h-full w-full p-6 flex flex-col">
                      <div className="h-[15%] border-b border-gray-200 flex flex-col justify-center">
                        <div className="h-4 w-1/2 bg-gray-300 rounded-full"></div>
                        <div className="h-3 w-3/4 bg-gray-200 rounded-full mt-2"></div>
                      </div>
                      <div className="flex flex-1 gap-4 mt-4">
                        <div className="w-1/3">
                          <div className="h-3 w-full bg-gray-200 rounded-full mb-2"></div>
                          <div className="h-3 w-5/6 bg-gray-200 rounded-full mb-2"></div>
                          <div className="h-3 w-full bg-gray-200 rounded-full mb-6"></div>
                          
                          <div className="h-3 w-full bg-gray-200 rounded-full mb-2"></div>
                          <div className="h-3 w-5/6 bg-gray-200 rounded-full mb-2"></div>
                          <div className="h-3 w-full bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="w-2/3">
                          <div className="h-4 w-1/3 bg-gray-300 rounded-full mb-3"></div>
                          <div className="h-3 w-full bg-gray-200 rounded-full mb-2"></div>
                          <div className="h-3 w-full bg-gray-200 rounded-full mb-2"></div>
                          <div className="h-3 w-5/6 bg-gray-200 rounded-full mb-6"></div>
                          
                          <div className="h-4 w-1/3 bg-gray-300 rounded-full mb-3"></div>
                          <div className="h-3 w-full bg-gray-200 rounded-full mb-2"></div>
                          <div className="h-3 w-full bg-gray-200 rounded-full mb-2"></div>
                          <div className="h-3 w-5/6 bg-gray-200 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" onClick={() => navigate('/login')}>
                      Use Template
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="outline" onClick={() => navigate('/templates')} className="group">
                View All Templates
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div className="container mx-auto">
            <div className="relative z-10 max-w-3xl mx-auto text-center glass rounded-2xl px-8 py-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Ready to Create Your Perfect Resume?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of job seekers who have successfully landed interviews
                with resumes created on our platform.
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/login')}
                className="mt-8 px-8"
              >
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
