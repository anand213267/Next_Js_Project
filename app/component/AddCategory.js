"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import getAPIServer from "../APIServer";

const AddCategory = () => {
    const [addCategoryRequest, setAddCategoryRequest] = useState({
        name: "",
        description: ""
    });
    const [error, setError] = useState([]);
    const [btntext, setBtnText] = useState("Add Category");
    const router = useRouter();
    const handleAddCategory = async () => {
        setBtnText("Please wait...");
        let validationErrors = [];
        if (!addCategoryRequest.name) {
            validationErrors.push("Name is required");
        }
        if (!addCategoryRequest.description) {
            validationErrors.push("Description is required");
        }
        if (validationErrors.length > 0) {
            setError(validationErrors);
            setBtnText("Add Category");
            return;
        }
        try {
            const data = {
                name: addCategoryRequest.name,
                description: addCategoryRequest.description,
            }
            const resp = await getAPIServer("api/category/addcategory", "POST", data);
            console.log(resp);
            if (resp._id) {
                router.push("/dashboard/categories");
            } else if (resp.message && resp.message.includes("duplicate key error")) {
                setError(["This Category Already Exists."]);
                setBtnText("Add Category");
            } else {
                setError(["Category not added"]);
                setBtnText("Add Category");
            }
        } catch (e) {
            console.log(e);
            setBtnText("Add Category");
            setError(["Error : " + e]);
        }
    }
    return (
        <>
            <Link href="/categories"><button className="p-2 border m-2 rounded-lg bg-red-700 text-white hover:bg-red-500 hover:text-white hover:cursor-pointer">&#8592; Back to Categories</button></Link>
            <div className="flex justify-center w-full">
                <div className="border border-gray-200 shadow-lg bg-white rounded-lg p-6 flex flex-col items-center w-md mx-8">
                    <h1 className="text-xl text-center m-4">Add Category</h1>

                    {error &&
                        <>
                            {error.map((err) => (
                                <p key={err} className="bg-red-600 text-white rounded-lg text-red-500 text-center m-2 p-2">{err}</p>
                            ))}
                        </>
                    }

                    <div className="m-4 w-full">
                        <input className="p-2 bg-white border border-gray-200 rounded-lg w-full" type="text" placeholder="Name" value={addCategoryRequest.name} onChange={(e) => setAddCategoryRequest({ ...addCategoryRequest, name: e.target.value })} />
                    </div>

                    <div className="m-4 w-full">
                        <input className="p-2 bg-white border border-gray-200 rounded-lg w-full" type="text" placeholder="Description" value={addCategoryRequest.description} onChange={(e) => setAddCategoryRequest({ ...addCategoryRequest, description: e.target.value })} />
                    </div>

                    <div className="text-center mb-4">
                        <button className="px-8 py-2 bg-green-500 text-white hover:bg-green-700 hover:text-white border border-gray-200 rounded-lg" type="button" onClick={() => { handleAddCategory() }}>
                            {btntext}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCategory;