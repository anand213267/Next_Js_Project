"use server";
const APISERVER = process.env.NEXT_PUBLIC_API_URL;
import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';

export default async function getAPIServer(apiName, method = "GET", body = null) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        const response = await fetch(`${APISERVER}/${apiName}`, {
            method,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },
            body: body ? JSON.stringify(body) : null,
        });

        const data = await response.json();

        // Redirect on invalid/expired token
        if (
            response.status === 401 ||
            data.message === "Invalid or expired token" ||
            data.error === "Invalid or expired token"
        ) {
            redirect("/api/logout?message=Session expired. Please login again.", RedirectType.push);
        }

        return data;
    } catch (error) {
        // IMPORTANT: Let Next.js redirects continue
        if (error.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        console.error("API Error:", error);

        return { error: "Failed to fetch resource" };
    }
}