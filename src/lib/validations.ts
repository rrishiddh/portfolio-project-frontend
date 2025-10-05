
import { z } from 'zod';

// Auth Validations
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password must be less than 100 characters'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters').max(100, 'Password must be less than 100 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Blog Validations
export const createBlogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().max(500, 'Excerpt must be less than 500 characters').optional(),
  coverImage: z.string().url('Invalid cover image URL').optional().or(z.literal('')),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  seoTitle: z.string().max(60, 'SEO title must be less than 60 characters').optional(),
  seoDescription: z.string().max(160, 'SEO description must be less than 160 characters').optional(),
});

export const updateBlogSchema = createBlogSchema.partial();

// Project Validations
export const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  content: z.string().optional(),
  thumbnail: z.string().url('Invalid thumbnail URL').optional().or(z.literal('')),
  images: z.array(z.string().url('Invalid image URL')).default([]),
  technologies: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  liveUrl: z.string().url('Invalid live URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  status: z.enum(['IN_PROGRESS', 'COMPLETED', 'ARCHIVED']).default('COMPLETED'),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

export const updateProjectSchema = createProjectSchema.partial();

// Resume Validations
export const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  github: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  summary: z.string().optional(),
});

export const experienceSchema = z.object({
  position: z.string().min(1, 'Position is required'),
  company: z.string().min(1, 'Company is required'),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
  achievements: z.array(z.string()).default([]),
});

export const educationSchema = z.object({
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().optional(),
  institution: z.string().min(1, 'Institution is required'),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  gpa: z.string().optional(),
  achievements: z.array(z.string()).default([]),
});

export const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  level: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
});

export const createResumeSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  personalInfo: personalInfoSchema,
  experience: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  skills: z.array(skillSchema).default([]),
  projects: z.array(z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().min(1, 'Description is required'),
    technologies: z.array(z.string()).default([]),
    url: z.string().url('Invalid project URL').optional().or(z.literal('')),
    github: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
    highlights: z.array(z.string()).default([]),
  })).default([]),
  template: z.string().default('modern'),
});

export const updateResumeSchema = createResumeSchema.partial();

// Contact Form Validation
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(100, 'Subject must be less than 100 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
});

// Helper function to validate data
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      // ✅ Type 'err' explicitly as ZodIssue
      error.issues.forEach((err: z.ZodIssue) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { general: 'Validation failed' } };
  }
}
