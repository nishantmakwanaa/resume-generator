import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download, Share2, ArrowLeft, Eye, Mail, Phone, Globe, MapPin } from 'lucide-react';
import ResumeSection, { SectionType } from '@/components/resume/ResumeSection';
import ResumeSectionHeader from '@/components/resume/ResumeSectionHeader';
import ResumeSectionEducation, { EducationItem } from '@/components/resume/ResumeSectionEducation';
import ResumeSectionExperience, { ExperienceItem } from '@/components/resume/ResumeSectionExperience';
import ResumeSectionSkills from '@/components/resume/ResumeSectionSkills';
import ResumeSectionProjects from '@/components/resume/ResumeSectionProjects';
import ResumeSectionAchievements, { AchievementItem } from '@/components/resume/ResumeSectionAchievements';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface SectionData {
  id: string;
  type: SectionType;
  title: string;
  content: any;
}

const ResumeEditor = () => {
  const [sections, setSections] = useState<SectionData[]>([
    {
      id: 'header-1',
      type: 'header',
      title: 'Personal Details',
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
      id: 'experience-1',
      type: 'experience',
      title: 'Work Experience',
      content: [
        {
          id: 'exp-1',
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
      id: 'education-1',
      type: 'education',
      title: 'Education',
      content: [
        {
          id: 'edu-1',
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
      id: 'skills-1',
      type: 'skills',
      title: 'Skills',
      content: {
        categories: [
          {
            id: 'cat-1',
            name: 'Programming Languages',
            skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL']
          },
          {
            id: 'cat-2',
            name: 'Frameworks & Libraries',
            skills: ['React', 'Node.js', 'Express', 'Django', 'TensorFlow']
          }
        ]
      }
    },
    {
      id: 'projects-1',
      type: 'projects',
      title: 'Projects',
      content: [
        {
          id: 'proj-1',
          title: 'E-commerce Platform',
          link: 'https://example.com/project',
          duration: 'Jan 2021 - Jun 2021',
          description: 'Developed a full-stack e-commerce platform with React and Node.js'
        }
      ]
    },
    {
      id: 'achievements-1',
      type: 'achievements',
      title: 'Achievements',
      content: [
        {
          id: 'ach-1',
          title: 'Employee of the Year',
          issuer: 'Tech Innovations Inc.',
          date: 'December 2022',
          description: 'Recognized for outstanding contributions and leadership'
        }
      ]
    }
  ]);

  const [draggedSection, setDraggedSection] = useState<string | null>(null);
  const [dropIndicator, setDropIndicator] = useState<string | null>(null);
  
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleSectionUpdate = (id: string, content: any) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === id ? { ...section, content } : section
      )
    );
  };

  const handleDragStart = (id: string) => {
    setDraggedSection(id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedSection !== id) {
      setDropIndicator(id);
    }
  };

  const handleDragEnd = () => {
    if (draggedSection && dropIndicator && draggedSection !== dropIndicator) {
      setSections(prevSections => {
        const result = [...prevSections];
        const draggedIndex = result.findIndex(section => section.id === draggedSection);
        const dropIndex = result.findIndex(section => section.id === dropIndicator);
        
        const [removed] = result.splice(draggedIndex, 1);
        result.splice(dropIndex, 0, removed);
        
        return result;
      });
    }
    
    setDraggedSection(null);
    setDropIndicator(null);
  };

  const moveSectionUp = (id: string) => {
    setSections(prevSections => {
      const index = prevSections.findIndex(section => section.id === id);
      if (index <= 0) return prevSections;
      
      const result = [...prevSections];
      const temp = result[index];
      result[index] = result[index - 1];
      result[index - 1] = temp;
      
      return result;
    });
  };

  const moveSectionDown = (id: string) => {
    setSections(prevSections => {
      const index = prevSections.findIndex(section => section.id === id);
      if (index >= prevSections.length - 1) return prevSections;
      
      const result = [...prevSections];
      const temp = result[index];
      result[index] = result[index + 1];
      result[index + 1] = temp;
      
      return result;
    });
  };

  const deleteSection = (id: string) => {
    setSections(prevSections => prevSections.filter(section => section.id !== id));
  };

  const duplicateSection = (id: string) => {
    setSections(prevSections => {
      const sectionToDuplicate = prevSections.find(section => section.id === id);
      if (!sectionToDuplicate) return prevSections;
      
      const newId = `${sectionToDuplicate.type}-${Date.now()}`;
      const newSection = {
        ...sectionToDuplicate,
        id: newId,
        title: `${sectionToDuplicate.title} (Copy)`
      };
      
      const index = prevSections.findIndex(section => section.id === id);
      const result = [...prevSections];
      result.splice(index + 1, 0, newSection);
      
      return result;
    });
  };

  const addSection = (type: SectionType) => {
    let newSection: SectionData;
    const newId = `${type}-${Date.now()}`;
    
    switch (type) {
      case 'education':
        newSection = {
          id: newId,
          type,
          title: 'Education',
          content: []
        };
        break;
      case 'experience':
        newSection = {
          id: newId,
          type,
          title: 'Work Experience',
          content: []
        };
        break;
      case 'skills':
        newSection = {
          id: newId,
          type,
          title: 'Skills',
          content: { categories: [] }
        };
        break;
      case 'projects':
        newSection = {
          id: newId,
          type,
          title: 'Projects',
          content: []
        };
        break;
      case 'achievements':
        newSection = {
          id: newId,
          type,
          title: 'Achievements',
          content: []
        };
        break;
      default:
        return;
    }
    
    setSections(prevSections => [...prevSections, newSection]);
  };

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

  const shareResume = () => {
    toast({
      title: "Share link generated!",
      description: "A shareable link has been copied to your clipboard.",
    });
  };

  const renderSectionContent = (section: SectionData) => {
    switch (section.type) {
      case 'header':
        return (
          <ResumeSectionHeader
            data={section.content}
            onChange={(content) => handleSectionUpdate(section.id, content)}
          />
        );
      case 'education':
        return (
          <ResumeSectionEducation
            items={section.content}
            onChange={(content) => handleSectionUpdate(section.id, content)}
          />
        );
      case 'experience':
        return (
          <ResumeSectionExperience
            items={section.content}
            onChange={(content) => handleSectionUpdate(section.id, content)}
          />
        );
      case 'skills':
        return (
          <ResumeSectionSkills
            data={section.content}
            onChange={(content) => handleSectionUpdate(section.id, content)}
          />
        );
      case 'projects':
        return (
          <ResumeSectionProjects
            items={section.content}
            onChange={(content) => handleSectionUpdate(section.id, content)}
          />
        );
      case 'achievements':
        return (
          <ResumeSectionAchievements
            items={section.content}
            onChange={(content) => handleSectionUpdate(section.id, content)}
          />
        );
      default:
        return null;
    }
  };

  const renderResumePreview = () => {
    return (
      <div className="resume-page" ref={resumeRef}>
        {sections.map(section => {
          switch (section.type) {
            case 'header':
              const header = section.content;
              return (
                <div key={section.id} className="mb-6">
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
            case 'education':
              return (
                <div key={section.id} className="mb-6">
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">{section.title}</h2>
                  {section.content.map((edu: EducationItem) => (
                    <div key={edu.id} className="mb-3">
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
            case 'experience':
              return (
                <div key={section.id} className="mb-6">
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">{section.title}</h2>
                  {section.content.map((exp: ExperienceItem) => (
                    <div key={exp.id} className="mb-3">
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
            case 'skills':
              return (
                <div key={section.id} className="mb-6">
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">{section.title}</h2>
                  {section.content.categories.map((category: any) => (
                    <div key={category.id} className="mb-3">
                      <h3 className="font-medium text-sm">{category.name}</h3>
                      <p className="text-sm">{category.skills.join(', ')}</p>
                    </div>
                  ))}
                </div>
              );
            case 'projects':
              return (
                <div key={section.id} className="mb-6">
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">{section.title}</h2>
                  {section.content.map((project: any) => (
                    <div key={project.id} className="mb-3">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="text-sm">{project.duration}</p>
                      </div>
                      {project.link && (
                        <p className="text-sm text-blue-600">{project.link}</p>
                      )}
                      {project.description && (
                        <p className="text-sm mt-1">{project.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              );
            case 'achievements':
              return (
                <div key={section.id} className="mb-6">
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">{section.title}</h2>
                  {section.content.map((achievement: AchievementItem) => (
                    <div key={achievement.id} className="mb-3">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm">{achievement.date}</p>
                      </div>
                      <p className="text-sm">{achievement.issuer}</p>
                      {achievement.description && (
                        <p className="text-sm mt-1">{achievement.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <div className="bg-background border-b border-border py-2 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-lg font-medium">Resume Editor</h1>
        </div>
        
        <div className="flex items-center gap-2">
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
      
      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-4 lg:p-6 overflow-y-auto">
          <div className="space-y-4 mb-6">
            <h2 className="text-xl font-medium">Edit Resume</h2>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => addSection('education')}>
                <Plus className="h-4 w-4 mr-1" /> Education
              </Button>
              <Button variant="outline" size="sm" onClick={() => addSection('experience')}>
                <Plus className="h-4 w-4 mr-1" /> Experience
              </Button>
              <Button variant="outline" size="sm" onClick={() => addSection('skills')}>
                <Plus className="h-4 w-4 mr-1" /> Skills
              </Button>
              <Button variant="outline" size="sm" onClick={() => addSection('projects')}>
                <Plus className="h-4 w-4 mr-1" /> Projects
              </Button>
              <Button variant="outline" size="sm" onClick={() => addSection('achievements')}>
                <Plus className="h-4 w-4 mr-1" /> Achievements
              </Button>
            </div>
          </div>
          
          <div className="space-y-1">
            {sections.map((section, index) => (
              <React.Fragment key={section.id}>
                <div
                  className={`section-drop-indicator ${
                    dropIndicator === section.id ? 'active' : ''
                  }`}
                />
                <ResumeSection
                  id={section.id}
                  type={section.type}
                  title={section.title}
                  isDragging={draggedSection === section.id}
                  isFirst={index === 0}
                  isLast={index === sections.length - 1}
                  onMoveUp={() => moveSectionUp(section.id)}
                  onMoveDown={() => moveSectionDown(section.id)}
                  onDuplicate={
                    section.type !== 'header' ? () => duplicateSection(section.id) : undefined
                  }
                  onDelete={() => deleteSection(section.id)}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDragEnd={handleDragEnd}
                >
                  {renderSectionContent(section)}
                </ResumeSection>
              </React.Fragment>
            ))}
            <div
              className={`section-drop-indicator ${
                dropIndicator === 'end' ? 'active' : ''
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDropIndicator('end');
              }}
            />
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 bg-gray-100 p-4 lg:p-6 overflow-y-auto flex flex-col items-center">
          <div className="bg-white p-4 mb-4 rounded shadow-sm w-full max-w-md">
            <h2 className="text-xl font-medium mb-2">Preview</h2>
            <p className="text-sm text-muted-foreground">
              This is how your resume will look when downloaded or shared.
            </p>
          </div>
          
          <div className="relative w-full flex justify-center">
            {renderResumePreview()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
