/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Save, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
}

interface Experience {
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

interface Education {
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa: string;
  achievements: string[];
}

interface Skill {
  name: string;
  level: string;
  category: string;
}

export default function ResumeBuilderPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState('My Resume');

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      position: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [''],
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      degree: '',
      field: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      achievements: [''],
    },
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    { name: '', level: '', category: '' },
  ]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast('Authentication required', {
        description: 'Please login to access resume builder',
      });
      router.push('/login');
    }
  }, [router, toast]);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        position: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: [''],
      },
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  const addAchievement = (expIndex: number) => {
    const updated = [...experiences];
    updated[expIndex].achievements.push('');
    setExperiences(updated);
  };

  const updateAchievement = (expIndex: number, achIndex: number, value: string) => {
    const updated = [...experiences];
    updated[expIndex].achievements[achIndex] = value;
    setExperiences(updated);
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    const updated = [...experiences];
    updated[expIndex].achievements = updated[expIndex].achievements.filter((_, i) => i !== achIndex);
    setExperiences(updated);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        degree: '',
        field: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        gpa: '',
        achievements: [''],
      },
    ]);
  };

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: keyof Education, value: any) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  const addSkill = () => {
    setSkills([...skills, { name: '', level: '', category: '' }]);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    setSkills(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resumes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          personalInfo,
          experience: experiences,
          education,
          skills,
          template: 'modern',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast('Resume saved', {
          description: 'Your resume has been saved successfully',
        });
      } else {
        toast('Error', {
          description: data.error || 'Failed to save resume',
        });
      }
    } catch {
      toast('Error ', {
        description: 'Failed to save resume',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ New: Download PDF function
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(18);
    doc.text(title, 20, y);
    y += 10;

    doc.setFontSize(14);
    doc.text('Personal Info', 20, y);
    y += 8;
    doc.setFontSize(11);
    Object.entries(personalInfo).forEach(([key, value]) => {
      doc.text(`${key}: ${value || '-'}`, 20, y);
      y += 6;
    });

    y += 8;
    doc.setFontSize(14);
    doc.text('Experience', 20, y);
    y += 8;
    experiences.forEach((exp, i) => {
      doc.setFontSize(12);
      doc.text(`${i + 1}. ${exp.position} @ ${exp.company}`, 20, y);
      y += 6;
      doc.setFontSize(11);
      doc.text(`Location: ${exp.location}`, 20, y);
      y += 5;
      doc.text(`Duration: ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, 20, y);
      y += 5;
      doc.text(`Description: ${exp.description}`, 20, y);
      y += 6;
      exp.achievements.forEach((ach) => {
        doc.text(`- ${ach}`, 25, y);
        y += 5;
      });
      y += 5;
    });

    y += 8;
    doc.setFontSize(14);
    doc.text('Education', 20, y);
    y += 8;
    education.forEach((edu, i) => {
      doc.setFontSize(12);
      doc.text(`${i + 1}. ${edu.degree} in ${edu.field}`, 20, y);
      y += 6;
      doc.setFontSize(11);
      doc.text(`${edu.institution} (${edu.startDate} - ${edu.current ? 'Present' : edu.endDate})`, 20, y);
      y += 5;
      doc.text(`GPA: ${edu.gpa}`, 20, y);
      y += 6;
    });

    y += 8;
    doc.setFontSize(14);
    doc.text('Skills', 20, y);
    y += 8;
    skills.forEach((skill, i) => {
      doc.text(`${i + 1}. ${skill.name} - ${skill.level} (${skill.category})`, 20, y);
      y += 6;
    });

    doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Resume Builder</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create a professional resume in minutes
            </p>
          </div>

          {/* Resume Title */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Resume Title</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="e.g., Software Developer Resume"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </CardContent>
          </Card>


            {/* All Tabs content remains unchanged */}
             <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>

            {/* Personal Information */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Enter your contact details and professional summary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        value={personalInfo.fullName}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="San Francisco, CA"
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Personal Website  *</Label>
                      <Input
                        id="website"
                        placeholder="https://johndoe.com"
                        value={personalInfo.website}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, website: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn *</Label>
                      <Input
                        id="linkedin"
                        placeholder="https://linkedin.com/in/johndoe"
                        value={personalInfo.linkedin}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="github">GitHub *</Label>
                      <Input
                        id="github"
                        placeholder="https://github.com/johndoe"
                        value={personalInfo.github}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      placeholder="Brief description of your professional background and goals..."
                      rows={4}
                      value={personalInfo.summary}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experience */}
            <TabsContent value="experience">
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Experience {index + 1}</CardTitle>
                        {experiences.length > 1 && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeExperience(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Position *</Label>
                          <Input
                            placeholder="Software Developer"
                            value={exp.position}
                            onChange={(e) => updateExperience(index, 'position', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Company *</Label>
                          <Input
                            placeholder="Tech Company"
                            value={exp.company}
                            onChange={(e) => updateExperience(index, 'company', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input
                            placeholder="San Francisco, CA"
                            value={exp.location}
                            onChange={(e) => updateExperience(index, 'location', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Start Date *</Label>
                          <Input
                            placeholder="Jan 2022"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            placeholder="Present"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                            disabled={exp.current}
                          />
                        </div>
                        <div className="space-y-2 flex items-center">
                          <input
                            type="checkbox"
                            id={`current-${index}`}
                            checked={exp.current}
                            onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                            className="mr-2"
                          />
                          <Label htmlFor={`current-${index}`}>Currently working here</Label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Brief description of your role..."
                          rows={3}
                          value={exp.description}
                          onChange={(e) => updateExperience(index, 'description', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Key Achievements</Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addAchievement(index)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                        {exp.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="flex gap-2">
                            <Input
                              placeholder="Achievement or responsibility"
                              value={achievement}
                              onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                            />
                            {exp.achievements.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeAchievement(index, achIndex)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button type="button" variant="outline" onClick={addExperience} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </div>
            </TabsContent>

            {/* Education */}
            <TabsContent value="education">
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Education {index + 1}</CardTitle>
                        {education.length > 1 && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeEducation(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Degree *</Label>
                          <Input
                            placeholder="Bachelor of Science"
                            value={edu.degree}
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Field</Label>
                          <Input
                            placeholder="Computer Science"
                            value={edu.field}
                            onChange={(e) => updateEducation(index, 'field', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Institution *</Label>
                          <Input
                            placeholder="University Name"
                            value={edu.institution}
                            onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input
                            placeholder="City, State"
                            value={edu.location}
                            onChange={(e) => updateEducation(index, 'location', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Start Date *</Label>
                          <Input
                            placeholder="2016"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                          />
                        </div>
                      <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            placeholder="2020"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                            disabled={edu.current}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>GPA</Label>
                          <Input
                            placeholder="3.8"
                            value={edu.gpa}
                            onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2 flex items-center">
                          <input
                            type="checkbox"
                            id={`edu-current-${index}`}
                            checked={edu.current}
                            onChange={(e) => updateEducation(index, 'current', e.target.checked)}
                            className="mr-2"
                          />
                          <Label htmlFor={`edu-current-${index}`}>Currently studying</Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button type="button" variant="outline" onClick={addEducation} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </div>
            </TabsContent>

            {/* Skills */}
            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>Add your technical and professional skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex gap-2 items-end">
                      <div className="flex-1 space-y-2">
                        <Label>Skill Name*</Label>
                        <Input
                          placeholder="React"
                          value={skill.name}
                          onChange={(e) => updateSkill(index, 'name', e.target.value)}
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label>Level*</Label>
                        <Input
                          placeholder="Expert"
                          value={skill.level}
                          onChange={(e) => updateSkill(index, 'level', e.target.value)}
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label>Category*</Label>
                        <Input
                          placeholder="Frontend"
                          value={skill.category}
                          onChange={(e) => updateSkill(index, 'category', e.target.value)}
                        />
                      </div>
                      {skills.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkill(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addSkill} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Skill
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1"
              size="lg"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  Save Resume
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              size="lg"
              onClick={handleDownloadPDF} // ✅ enabled and connected
            >
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
