
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface RequestOptions extends RequestInit {
  token?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { token, ...fetchOptions } = options;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...fetchOptions,
      headers,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error');
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name: string, email: string, password: string) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  async refreshToken(refreshToken: string) {
    return this.request('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  async getMe(token: string) {
    return this.request('/api/auth/me', {
      token,
    });
  }

  // Blog endpoints
  async getBlogs(params?: { page?: number; limit?: number; search?: string; tag?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.tag) queryParams.append('tag', params.tag);

    const query = queryParams.toString();
    return this.request(`/api/blogs${query ? `?${query}` : ''}`);
  }

  async getBlog(slug: string) {
    return this.request(`/api/blogs/${slug}`);
  }

  async createBlog(data: any, token: string) {
    return this.request('/api/blogs', {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    });
  }

  async updateBlog(id: string, data: any, token: string) {
    return this.request(`/api/blogs/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      token,
    });
  }

  async deleteBlog(id: string, token: string) {
    return this.request(`/api/blogs/${id}`, {
      method: 'DELETE',
      token,
    });
  }

  async getBlogTags() {
    return this.request('/api/blogs/tags');
  }

  // Project endpoints
  async getProjects(params?: { page?: number; limit?: number; search?: string; technology?: string; status?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.technology) queryParams.append('technology', params.technology);
    if (params?.status) queryParams.append('status', params.status);

    const query = queryParams.toString();
    return this.request(`/api/projects${query ? `?${query}` : ''}`);
  }

  async getProject(slug: string) {
    return this.request(`/api/projects/${slug}`);
  }

  async createProject(data: any, token: string) {
    return this.request('/api/projects', {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    });
  }

  async updateProject(id: string, data: any, token: string) {
    return this.request(`/api/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      token,
    });
  }

  async deleteProject(id: string, token: string) {
    return this.request(`/api/projects/${id}`, {
      method: 'DELETE',
      token,
    });
  }

  async getTechnologies() {
    return this.request('/api/projects/technologies');
  }

  // Resume endpoints
  async getResumes(token: string) {
    return this.request('/api/resumes', { token });
  }

  async getResume(id: string, token: string) {
    return this.request(`/api/resumes/${id}`, { token });
  }

  async createResume(data: any, token: string) {
    return this.request('/api/resumes', {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    });
  }

  async updateResume(id: string, data: any, token: string) {
    return this.request(`/api/resumes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      token,
    });
  }

  async deleteResume(id: string, token: string) {
    return this.request(`/api/resumes/${id}`, {
      method: 'DELETE',
      token,
    });
  }

  async downloadResumePDF(id: string, token: string) {
    const response = await fetch(`${this.baseURL}/api/resumes/${id}/pdf`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to download PDF');
    }

    return response.blob();
  }

  // Analytics endpoints
  async getBlogAnalytics(token: string) {
    return this.request('/api/blogs/analytics/overview', { token });
  }

  async getProjectAnalytics(token: string) {
    return this.request('/api/projects/analytics/overview', { token });
  }

  async getResumeAnalytics(token: string) {
    return this.request('/api/resumes/analytics/overview', { token });
  }

  async getUserAnalytics(token: string) {
    return this.request('/api/users/analytics/overview', { token });
  }

  // User endpoints
  async getUsers(token: string, params?: { page?: number; limit?: number; search?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);

    const query = queryParams.toString();
    return this.request(`/api/users${query ? `?${query}` : ''}`, { token });
  }

  async getUser(id: string, token: string) {
    return this.request(`/api/users/${id}`, { token });
  }

  async updateUserRole(id: string, role: string, token: string) {
    return this.request(`/api/users/${id}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
      token,
    });
  }

  async deleteUser(id: string, token: string) {
    return this.request(`/api/users/${id}`, {
      method: 'DELETE',
      token,
    });
  }
}

export const api = new ApiClient(API_URL);
export default api;