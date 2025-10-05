/* eslint-disable @typescript-eslint/no-explicit-any */

import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  exp: number;
}

export const AUTH_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';
export const USER_KEY = 'user';

// Token management
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function removeTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// User management
export function getUser(): any | null {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
}

export function setUser(user: any): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function removeUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_KEY);
}

// Token validation
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}

export function isAuthenticated(): boolean {
  const token = getAccessToken();
  if (!token) return false;
  return !isTokenExpired(token);
}

// Authorization helpers
export function hasRole(requiredRole: string): boolean {
  const user = getUser();
  if (!user) return false;
  return user.role === requiredRole;
}

export function isAdmin(): boolean {
  return hasRole('ADMIN');
}

export function isUser(): boolean {
  return hasRole('USER');
}

// Get user ID from token
export function getUserIdFromToken(): string | null {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.userId;
  } catch  {
    return null;
  }
}

// Auth header helper
export function getAuthHeader(): Record<string, string> {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Check if user owns resource
export function ownsResource(resourceUserId: string): boolean {
  const userId = getUserIdFromToken();
  return userId === resourceUserId;
}

// Permission checker
export function canAccessResource(resourceUserId: string): boolean {
  return isAdmin() || ownsResource(resourceUserId);
}