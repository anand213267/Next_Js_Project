"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import getAPIServer from "../APIServer";

const AddProduct = ({ data }) => {
    const [addProductRequest, setAddProductRequest] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        image: null
    });
    const [categoryData, setCategoryData] = useState(data);
    const [error, setError] = useState([]);
    const [btntext, setBtnText] = useState("Add Product");
    const router = useRouter();
    const handleAddProduct = async () => {
        setBtnText("Please wait...");
        let validationErrors = [];
        if (!addProductRequest.name) {
            validationErrors.push("Name is required");
        }
        if (!addProductRequest.description) {
            validationErrors.push("Description is required");
        }
        if (!addProductRequest.category) {
            validationErrors.push("Category is required");
        }
        if (!addProductRequest.price) {
            validationErrors.push("Price is required");
        }
        if (validationErrors.length > 0) {
            setError(validationErrors);
            setBtnText("Add Product");
            return;
        }
        try {
            let errors = [];
            
            const formData = new FormData();
            formData.append("name", addProductRequest.name);
            formData.append("description", addProductRequest.description);
            formData.append("category", addProductRequest.category);
            formData.append("price", addProductRequest.price);
            if (addProductRequest.imgPath) {
                formData.append("image", addProductRequest.imgPath); // "image" or the field name expected by your API
            }

            const resp = await getAPIServer("api/product/addproduct", "POST", formData);
            if (resp.message == "Product added successfully") {
                router.push("/dashboard/products");
            } else if (resp.message && resp.message == "Product with this name already exists") {
                errors = ["Product with this name already exists"];
                setBtnText("Add Product");
            } else {
                errors = ["Product not added"];
                setBtnText("Add Product");
            }
            setError(errors);
        } catch (e) {
            console.log(e);
            setBtnText("Add Product");
            setError(["Error : " + e]);
        }
    }
    return (
        <>
            <Link href="/dashboard/products"><button className="p-2 border m-2 rounded-lg bg-red-700 text-white hover:bg-red-500 hover:text-white hover:cursor-pointer">&#8592; Back to Products</button></Link>
            <div className="flex justify-center w-full">
                <div className="border border-gray-200 shadow-lg bg-white rounded-lg p-6 flex flex-col items-center w-md mx-8">
                    <h1 className="text-xl text-center m-4">Add Product</h1>

                    {error &&
                        <>
                            {error.map((err) => (
                                <p key={err} className="bg-red-600 text-white rounded-lg text-red-500 text-center m-2 p-2">{err}</p>
                            ))}
                        </>
                    }

                    <div className="m-4 w-full">
                        <input className="p-2 bg-white border border-gray-200 rounded-lg w-full" type="text" placeholder="Name" value={addProductRequest.name} onChange={(e) => setAddProductRequest({ ...addProductRequest, name: e.target.value })} />
                    </div>

                    <div className="m-4 w-full">
                        <input className="p-2 bg-white border border-gray-200 rounded-lg w-full" type="text" placeholder="Description" value={addProductRequest.description} onChange={(e) => setAddProductRequest({ ...addProductRequest, description: e.target.value })} />
                    </div>

                    <div className="m-4 w-full">
                        <input className="p-2 bg-white border border-gray-200 rounded-lg w-full" type="text" placeholder="Price" value={addProductRequest.price} onChange={(e) => setAddProductRequest({ ...addProductRequest, price: e.target.value })} />
                    </div>

                    <div className="m-4 w-full">
                        <select className="p-2 bg-white border border-gray-200 rounded-lg w-full" value={addProductRequest.category} onChange={(e) => setAddProductRequest({ ...addProductRequest, category: e.target.value })}>
                            <option value="">Select Category</option>
                            {categoryData && categoryData.length > 0 && categoryData.map((item) => (
                                <option key={item._id} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="m-4 w-full">
                        <input className="p-2 bg-white border border-gray-200 rounded-lg w-full" type="file" accept="image/*" placeholder="Image" onChange={(e) => setAddProductRequest({ ...addProductRequest, imgPath: e.target.files[0] })} />
                    </div>

                    <div className="text-center mb-4">
                        <button className="px-8 py-2 bg-green-500 text-white hover:bg-green-700 hover:text-white border border-gray-200 rounded-lg" type="button" onClick={() => { handleAddProduct() }}>
                            {btntext}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct;