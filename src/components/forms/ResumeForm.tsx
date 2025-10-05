/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Experience, Education, Skill } from '@/types';

interface ResumeFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isLoading?: boolean;
}

export default function ResumeForm({ onSubmit, initialData, isLoading = false }: ResumeFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || 'My Resume',
    personalInfo: initialData?.personalInfo || {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      summary: '',
    },
    experience: initialData?.experience || [
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
    ] as Experience[],
    education: initialData?.education || [
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
    ] as Education[],
    skills: initialData?.skills || [
      { name: '', level: '', category: '' },
    ] as Skill[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setFormData({
      ...formData,
      personalInfo: { ...formData.personalInfo, [field]: value },
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
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
      ],
    });
  };

  const removeExperience = (index: number) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((_: any, i: number) => i !== index),
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string | boolean) => {
    const updated = [...formData.experience];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, experience: updated });
  };

  const addAchievement = (expIndex: number) => {
    const updated = [...formData.experience];
    updated[expIndex].achievements = [...(updated[expIndex].achievements || []), ''];
    setFormData({ ...formData, experience: updated });
  };

  const updateAchievement = (expIndex: number, achIndex: number, value: string) => {
    const updated = [...formData.experience];
    if (updated[expIndex].achievements) {
      updated[expIndex].achievements![achIndex] = value;
    }
    setFormData({ ...formData, experience: updated });
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    const updated = [...formData.experience];
    if (updated[expIndex].achievements) {
      updated[expIndex].achievements = updated[expIndex].achievements!.filter((_: any, i: number) => i !== achIndex);
    }
    setFormData({ ...formData, experience: updated });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
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
      ],
    });
  };

  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_: any, i: number) => i !== index),
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string | boolean)  => {
    const updated = [...formData.education];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, education: updated });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: '', level: '', category: '' }],
    });
  };

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_: any, i: number) => i !== index),
    });
  };

  const updateSkill = (index: number, field: keyof Skill, value: string)=> {
    const updated = [...formData.skills];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, skills: updated });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <Card>
        <CardHeader>
          <CardTitle>Resume Title</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="e.g., Software Developer Resume"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.personalInfo.location}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.personalInfo.website}
                onChange={(e) => updatePersonalInfo('website', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={formData.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={formData.personalInfo.github}
                onChange={(e) => updatePersonalInfo('github', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              rows={4}
              value={formData.personalInfo.summary}
              onChange={(e) => updatePersonalInfo('summary', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Work Experience</h3>
        {formData.experience.map((exp: Experience, index: number) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Experience {index + 1}</CardTitle>
                {formData.experience.length > 1 && (
                  <Button
                    type="button"
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
                    value={exp.position}
                    onChange={(e) => updateExperience(index, 'position', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    value={exp.startDate}
                    onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    value={exp.endDate}
                    onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                    disabled={exp.current}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                  className="mr-2"
                />
                <Label>Currently working here</Label>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Achievements</Label>
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
                {exp.achievements?.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex gap-2">
                    <Input
                      value={achievement}
                      onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                    />
                    {(exp.achievements?.length || 0) > 1 && (
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

      {/* Education */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Education</h3>
        {formData.education.map((edu: Education, index: number)  => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Education {index + 1}</CardTitle>
                {formData.education.length > 1 && (
                  <Button
                    type="button"
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
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Field</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(index, 'field', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Institution *</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>GPA</Label>
                  <Input
                    value={edu.gpa}
                    onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                  />
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

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.skills.map((skill: Skill, index: number)  => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1 space-y-2">
                <Label>Skill Name</Label>
                <Input
                  value={skill.name}
                  onChange={(e) => updateSkill(index, 'name', e.target.value)}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label>Level</Label>
                <Input
                  value={skill.level}
                  onChange={(e) => updateSkill(index, 'level', e.target.value)}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label>Category</Label>
                <Input
                  value={skill.category}
                  onChange={(e) => updateSkill(index, 'category', e.target.value)}
                />
              </div>
              {formData.skills.length > 1 && (
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

      <Button type="submit" disabled={isLoading} className="w-full" size="lg">
        {isLoading ? 'Saving...' : 'Save Resume'}
      </Button>
    </form>
  );
}