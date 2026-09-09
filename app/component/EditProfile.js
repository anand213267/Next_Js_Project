"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const EditProfile = ({ data }) => {
    const { userData, isLogin, setUserData } = useContext(AuthContext);
    const [editRequest, setEditRequest] = useState({
        name: data.name,
        email: data.email,
    });
    const [error, setError] = useState([]);
    const [btntext, setBtnText] = useState("Update");
    const router = useRouter();
    const handleUpdate = async () => {
        setBtnText("Please wait...");
        let validationErrors = [];
        if (!editRequest.name) {
            validationErrors.push("Name is required");
        }
        if (!editRequest.email) {
            validationErrors.push("Email is required");
        }
        if (validationErrors.length > 0) {
            setError(validationErrors);
            setBtnText("Update");
            return;
        }
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/editprofile/${userData.id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: editRequest.name,
                    email: editRequest.email,
                }),
            });
            const data = await resp.json();
            console.log(data.message)
            if (data.message == "Profile updated successfully") {
                setUserData(data.user);
                localStorage.setItem("userData", JSON.stringify(data.user));
                router.push("/");
            } else {
                setError([data.message]);
                setBtnText("Update");
            }
        } catch (e) {
            console.log(e);
            setBtnText("Register");
            setError(["Error : " + e]);
        }
    }
    useEffect(() => {
        if (!isLogin) {
            router.push('/login')
        }
    }, [isLogin])
    return (
        <>
            <div className="flex justify-center w-full">
                <div className="border border-gray-200 shadow-lg bg-white rounded-lg p-6 flex flex-col items-center w-md mx-8">
                    <h1 className="text-xl text-center m-4">Edit Profile</h1>

                    {error &&
                        <>
                            {error.map((err) => (
                                <p key={err} className="bg-red-600 text-white rounded-lg text-red-500 text-center m-2 p-2">{err}</p>
                            ))}
                        </>
                    }

                    <div className="m-4 w-full">
                        <input className="p-2 bg-white border border-gray-200 rounded-lg w-full" type="text" placeholder="Name" value={editRequest.name} onChange={(e) => setEditRequest({ ...editRequest, name: e.target.value })} />
                    </div>

                    <div className="m-4 w-full">
                        <input className="p-2 bg-white border border-gray-200 rounded-lg w-full" type="email" placeholder="Email" value={editRequest.email} onChange={(e) => setEditRequest({ ...editRequest, email: e.target.value })} />
                    </div>

                    <div className="text-center mb-4">
                        <button className="px-8 py-2 bg-green-500 text-white hover:bg-green-700 hover:text-white border border-gray-200 rounded-lg" type="button" onClick={() => { handleUpdate() }}>
                            {btntext}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile;