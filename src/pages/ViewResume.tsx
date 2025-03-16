
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Edit, Share2, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface HeaderContent {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  summary: string;
}

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

interface ProjectItem {
  id: string;
  title: string;
  link?: string;
  duration: string;
  description: string;
}

interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

interface ResumeSection {
  type: 'header' | 'experience' | 'education' | 'skills' | 'projects' | 'achievements';
  title?: string;
  content: HeaderContent | ExperienceItem[] | EducationItem[] | { categories: SkillCategory[] } | ProjectItem[] | AchievementItem[];
}

const ViewResume = () => {
  const { id } = useParams<{ id: string }>();
  const resumeRef = React.useRef<HTMLDivElement>(null);
  
  // In a real app, you would fetch the resume data based on the ID
  // This is placeholder data
  const resumeData = {
    id,
    title: 'Software Engineer Resume',
    sections: [
      {
        type: 'header',
        content: {
          fullName: 'John Doe',
          title: 'Senior Software Engineer',
          email: 'john.doe@example.com',
          phone: '(555) 123-4567',
          website: 'www.johndoe.com',
          location: 'San Francisco, CA',
          summary: 'Experienced software engineer with 8+ years of experience in developing web applications using modern technologies. Strong problem-solving skills and a passion for clean, efficient code.'
        }
      },
      {
        type: 'experience',
        title: 'Work Experience',
        content: [
          {
            company: 'Tech Innovations Inc.',
            position: 'Senior Software Engineer',
            location: 'San Francisco, CA',
            startDate: 'Jan 2020',
            endDate: 'Present',
            description: '• Led a team of 5 developers to build a new e-commerce platform\n• Improved site performance by 40% through code optimizations\n• Implemented CI/CD pipelines to streamline deployment process'
          }
        ]
      },
      {
        type: 'education',
        title: 'Education',
        content: [
          {
            institution: 'Stanford University',
            degree: 'Master of Science in Computer Science',
            location: 'Stanford, CA',
            startDate: 'Sep 2016',
            endDate: 'Jun 2018',
            description: 'Specialized in Artificial Intelligence and Machine Learning. Graduated with honors.'
          }
        ]
      },
      {
        type: 'skills',
        title: 'Skills',
        content: {
          categories: [
            {
              name: 'Programming Languages',
              skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL']
            },
            {
              name: 'Frameworks & Libraries',
              skills: ['React', 'Node.js', 'Express', 'Django', 'TensorFlow']
            }
          ]
        }
      }
    ]
  };

  // Download resume as PDF
  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('resume.pdf');
      
      toast({
        title: "Resume downloaded!",
        description: "Your resume has been saved as a PDF.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error downloading resume",
        description: "There was a problem generating your PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Share resume
  const shareResume = () => {
    // This would generate a shareable link in a real app
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied to clipboard!",
      description: "You can now share this link with others.",
    });
  };

  return (
    <div className="min-h-screen bg-muted">
      <div className="bg-background border-b border-border py-2 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-lg font-medium">{resumeData.title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Link to={`/editor/${id}`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={shareResume}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button size="sm" onClick={downloadPDF}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
      
      <div className="container mx-auto p-6 max-w-4xl flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white shadow-md mb-6 rounded-lg p-4">
          <h2 className="text-xl font-medium mb-2">Resume Preview</h2>
          <p className="text-sm text-muted-foreground">
            This is how your resume appears to others when shared.
          </p>
        </div>
        
        <div className="resume-page" ref={resumeRef}>
          {resumeData.sections.map((section, index) => {
            switch (section.type) {
              case 'header':
                const header = section.content as HeaderContent;
                return (
                  <div key={index} className="mb-6">
                    <h1 className="text-2xl font-bold mb-1">{header.fullName}</h1>
                    <p className="text-lg text-gray-600 mb-2">{header.title}</p>
                    <div className="flex flex-wrap gap-3 text-sm mb-3">
                      {header.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {header.email}
                        </span>
                      )}
                      {header.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {header.phone}
                        </span>
                      )}
                      {header.website && (
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" /> {header.website}
                        </span>
                      )}
                      {header.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {header.location}
                        </span>
                      )}
                    </div>
                    {header.summary && <p className="text-sm">{header.summary}</p>}
                  </div>
                );
              case 'experience':
                return (
                  <div key={index} className="mb-6">
                    <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">{section.title}</h2>
                    {(section.content as ExperienceItem[]).map((exp, i) => (
                      <div key={i} className="mb-3">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold">{exp.company}</h3>
                            <p className="text-sm">{exp.position}</p>
                          </div>
                          <div className="text-right text-sm">
                            <p>{exp.location}</p>
                            <p>{exp.startDate} - {exp.endDate}</p>
                          </div>
                        </div>
                        {exp.description && (
                          <div className="text-sm mt-1 whitespace-pre-line">{exp.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              case 'education':
                return (
                  <div key={index} className="mb-6">
                    <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">{section.title}</h2>
                    {(section.content as EducationItem[]).map((edu, i) => (
                      <div key={i} className="mb-3">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold">{edu.institution}</h3>
                            <p className="text-sm">{edu.degree}</p>
                          </div>
                          <div className="text-right text-sm">
                            <p>{edu.location}</p>
                            <p>{edu.startDate} - {edu.endDate}</p>
                          </div>
                        </div>
                        {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                );
              case 'skills':
                const skillsData = section.content as { categories: SkillCategory[] };
                return (
                  <div key={index} className="mb-6">
                    <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">{section.title}</h2>
                    {skillsData.categories.map((category, i) => (
                      <div key={i} className="mb-3">
                        <h3 className="font-medium text-sm">{category.name}</h3>
                        <p className="text-sm">{category.skills.join(', ')}</p>
                      </div>
                    ))}
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewResume;
