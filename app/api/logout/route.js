import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const message = searchParams.get('message') || 'Session expired. Please login again.';
    
    const cookieStore = await cookies();
    cookieStore.delete('token');
    cookieStore.delete('userData');
    
    redirect(`/login?message=${encodeURIComponent(message)}`);
}
