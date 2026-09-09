import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../component/Navbar";

export default async function DashboardLayout({ children }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const userData = cookieStore.get("userData")?.value;
    if (!token) {
        return redirect("/login");
    }
    return <>
        <Navbar userData={userData} />
        {children}
    </>;
}  