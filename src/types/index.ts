// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  avatar?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  error?: string;
}

// Blog Types
export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  published: boolean;
  featured: boolean;
  views: number;
  readTime?: number;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  author: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export interface CreateBlogInput {
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  published?: boolean;
  featured?: boolean;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface UpdateBlogInput extends Partial<CreateBlogInput> {}

// Project Types
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  thumbnail?: string;
  images: string[];
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED';
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export interface CreateProjectInput {
  title: string;
  description: string;
  content?: string;
  thumbnail?: string;
  images?: string[];
  technologies?: string[];
  features?: string[];
  liveUrl?: string;
  githubUrl?: string;
  status?: 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED';
  featured?: boolean;
  order?: number;
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {}

// Resume Types
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
}

export interface Experience {
  position: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  achievements?: string[];
}

export interface Education {
  degree: string;
  field?: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  achievements?: string[];
}

export interface Skill {
  name: string;
  level?: string;
  category: string;
}

export interface ResumeProject {
  name: string;
  description: string;
  technologies?: string[];
  url?: string;
  github?: string;
  highlights?: string[];
}

export interface Resume {
  id: string;
  title: string;
  personalInfo: PersonalInfo;
  experience?: Experience[];
  education?: Education[];
  skills?: Skill[];
  projects?: ResumeProject[];
  template: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateResumeInput {
  title: string;
  personalInfo: PersonalInfo;
  experience?: Experience[];
  education?: Education[];
  skills?: Skill[];
  projects?: ResumeProject[];
  template?: string;
}

export interface UpdateResumeInput extends Partial<CreateResumeInput> {}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Dashboard Types
export interface DashboardStats {
  blogs: {
    total: number;
    published: number;
    draft: number;
    totalViews: number;
  };
  projects: {
    total: number;
    completed: number;
    inProgress: number;
    archived: number;
  };
  resumes: {
    total: number;
  };
  users?: {
    total: number;
    verified: number;
  };
}

// Form Types
export interface FormError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

// Navigation Types
export interface NavLink {
  href: string;
  label: string;
  icon?: React.ComponentType<any>;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}