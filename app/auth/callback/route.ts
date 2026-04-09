import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const error_description = requestUrl.searchParams.get('error_description');

  if (error) {
    console.error('OAuth Error from Provider/Supabase:', { error, error_description });
    // Keep the error in the URL so the client can read it or show a toast if we want
    return NextResponse.redirect(new URL(`/dashboard?error=${error}&error_description=${encodeURIComponent(error_description || '')}`, request.url));
  }

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect to dashboard or home page after authentication
  return NextResponse.redirect(new URL('/dashboard', request.url));
}