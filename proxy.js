import { NextResponse } from "next/server";

export function proxy(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/' || path === '/login' || path === '/register';
    const token = request.cookies.get('token');

    if (isPublicPath && token) {
        return NextResponse.redirect(
            new URL('/dashboard', request.url)
        )
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(
            new URL('/login', request.url)
        )
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/products/:path*",
        "/categories/:path*",
        "/add-product/:path*",
        "/product-details/:path*",
        "/add-category/:path*",
        "/TailwindClass",
        "/my-tasks",
        "/edit-profile",
        "/",
        "/login",
        "/register",
        "/dashboard/:path*",
    ],
}