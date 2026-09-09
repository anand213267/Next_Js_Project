"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
    const [registerRequest, setRegisterRequest] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState([]);
    const [btntext, setBtnText] = useState("Register");
    const router = useRouter();
    const handleRegister = async () => {
        setBtnText("Please wait...");
        setError([])
        if (!registerRequest.email) {
            setError(["Email is required"]);
            return;
        }
        if (!registerRequest.password) {
            setError(["Password is required"]);
            return;
        }
        if (!registerRequest.confirmPassword) {
            setError(["Confirm Password is required"]);
            return;
        }
        if (registerRequest.password !== registerRequest.confirmPassword) {
            setError(["Passwords do not match"]);
            return;
        }
        if (error.length > 0) {
            return;
        }
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: registerRequest.name,
                    email: registerRequest.email,
                    password: registerRequest.password,
                }),
            });
            if (resp.ok) {
                router.push("/login");
            } else {
                setError(["Registration failed"]);
                setBtnText("Register");
            }
        } catch (e) {
            console.log(e);
            setBtnText("Register");
            setError(["Error : " + e]);
        }
    }
    return (
        <>
            <div className="flex justify-center w-full">
                <div className="border border-gray-200 shadow-lg bg-white rounded-lg p-6 flex flex-col items-center w-md mx-8">
                    <h1 className="text-xl text-center m-4">Register</h1>

                    {error &&
                        <>
                            {error.map((err) => (
                                <p key={err} className="bg-red-600 text-white rounded-lg text-red-500 text-center m-2 p-2">{err}</p>
                            ))}
                        </>
                    }

                    <div className="m-4 w-full">
                        <input className="p-2 bg-white border border-gray-200 rounded-lg w-full" type="text" placeholder="Name" value={registerRequest.name} onChange={(e) => setRegisterRequest({ ...registerRequest, name: e.target.value })} />
                    </div>

                    <div className="m-4 w-full">
                        <input className="p-2 bg-white border border-gray-200 rounded-lg w-full" type="email" placeholder="Email" value={registerRequest.email} onChange={(e) => setRegisterRequest({ ...registerRequest, email: e.target.value })} />
                    </div>

                    <div className="m-4 w-full">
                        <input className="p-2 bg-white border border-gray-200 rounded-lg w-full" type="password" placeholder="Password" value={registerRequest.password} onChange={(e) => setRegisterRequest({ ...registerRequest, password: e.target.value })} />
                    </div>

                    <div className="my-4 w-full">
                        <input className="p-2 bg-white border border-gray-200 rounded-lg w-full" type="password" placeholder="Confirm Password" value={registerRequest.confirmPassword} onChange={(e) => setRegisterRequest({ ...registerRequest, confirmPassword: e.target.value })} />
                    </div>


                    <div className="text-center mb-4">
                        <button className="px-8 py-2 bg-green-500 text-white hover:bg-green-700 hover:text-white border border-gray-200 rounded-lg" type="button" onClick={() => { handleRegister() }}>
                            {btntext}
                        </button>
                    </div>

                    <p className="text-sm text-center"> Already have an account? <Link className="text-blue-700 hover:cursor-pointer" href="/login">Login</Link></p>
                </div>
            </div>
        </>
    )
}

export default Register;