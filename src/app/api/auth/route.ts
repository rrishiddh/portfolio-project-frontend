import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Auth API - Please use the backend API endpoints',
    endpoints: {
      login: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      register: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      logout: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
    },
  });
}
