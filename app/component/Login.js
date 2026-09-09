"use client";

import Link from "next/link";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Login = ({ message }) => {
    // const { isLogin, setIsLogin, setUserData } = useContext(AuthContext);
    const [loginReq, setLoginReq] = useState({ email: "", password: "" });
    const [error, setError] = useState([]);
    const [btntext, setBtnText] = useState("Login");
    const router = useRouter();
    const handleLogin = async () => {
        setBtnText("Please wait...");

        let validationErrors = [];
        if (!loginReq.email) {
            validationErrors.push("Email is required");
        }
        if (!loginReq.password) {
            validationErrors.push("Password is required");
        }

        if (validationErrors.length > 0) {
            setError(validationErrors);
            setBtnText("Login");
            return;
        }

        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: loginReq.email,
                    password: loginReq.password,
                }),
            });
            if (resp.ok) {
                const data = await resp.json();
                // localStorage.setItem("token", data.token);
                // localStorage.setItem("userData", JSON.stringify(data.user));
                document.cookie = `token=${encodeURIComponent(data.token)}; path=/`;
                document.cookie = `userData=${encodeURIComponent(JSON.stringify(data.user))}; path=/`;
                // setIsLogin(true);
                // setUserData(data.user);
                toast.success("Login successful!");
                router.push("/dashboard/products");
                router.refresh();
            } else {
                setError(["Invalid credentials"]);
                setBtnText("Login");
            }
        } catch (e) {
            console.log(e);
            setBtnText("Login");
            setError(["Error : " + e]);
        }
    }

    useEffect(() => {
        toast.success(message);
    }, [message])

    return (
        <>
            <div className="flex justify-center w-full">
                <div className="border border-gray-200 shadow-lg bg-white rounded-lg p-6 flex flex-col items-center w-md mx-8">
                    <h1 className="text-xl text-center m-4">Login</h1>

                    {error &&
                        <>
                            {error.map((err) => (
                                <p key={err} className="bg-red-600 text-white rounded-lg text-red-500 text-center m-2 p-2">{err}</p>
                            ))}
                        </>
                    }

                    <div className="m-4 w-full">
                        <input className="p-2 bg-white border border-gray-200 rounded-lg w-full" type="text" placeholder="Username" value={loginReq.email} onChange={(e) => setLoginReq({ ...loginReq, email: e.target.value })} />
                    </div>

                    <div className="m-4 w-full">
                        <input className="p-2 bg-white border border-gray-200 rounded-lg w-full" type="password" placeholder="Password" value={loginReq.password} onChange={(e) => setLoginReq({ ...loginReq, password: e.target.value })} />
                    </div>

                    <div className="text-center mb-4">
                        <button className="px-8 py-2 bg-green-500 text-white hover:bg-green-700 hover:text-white border border-gray-200 rounded-lg cursor-pointer" type="button" onClick={handleLogin}>
                            {btntext}
                        </button>
                    </div>

                    <p className="text-sm text-center"> Don't have an account? <Link className="text-blue-700 hover:cursor-pointer" href="/register">Register</Link></p>
                </div>
            </div>
        </>
    )
}

export default Login;