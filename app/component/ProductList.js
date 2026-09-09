"use client";

import Link from "next/link";
import { useState } from 'react';
import getAPIServer from "../APIServer";
import Image from "next/image";
import { toast } from "sonner";

const ProductList = ({ data }) => {
    const [searchItem, setSearchItem] = useState("");
    const [productData, setProductData] = useState(data);

    const handleSearch = (e) => {
        setSearchItem(e.target.value)

        const filteredData = data.filter((item) => item.title.toLowerCase().includes(e.target.value.toLowerCase()));
        setProductData(filteredData)
    }

    const getImage = (imagePath) => {
        // Replace Windows backslashes with forward slashes for correct URL formatting
        const formattedPath = imagePath.replace(/\\/g, '/');
        const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, ''); // Remove trailing slash if present
        return `${baseUrl}/${formattedPath}`;
    }

    const deleteProduct = async (id) => {
        if (!confirm("Are you sure you want to delete this product?")) {
            return;
        }
        try {
            const response = await getAPIServer(`api/product/deleteproduct/${id}`, 'DELETE');

            if (response.message == "Product deleted successfully") {
                toast.success("Product deleted successfully");
                setProductData(productData.filter((item) => item._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <h1 className="text-2xl text-center my-4">My Products</h1>

            <input type="search" placeholder="Search product" className="border border-gray-200 rounded-lg p-2 my-2" onChange={handleSearch} />

            <div>
                <ul className="grid grid-cols-3 gap-12">
                    {productData && productData.length ?
                        productData.map((item) => {
                            return (
                                // <ProductDisplay productData={item} key={item.id} />
                                <div key={item._id} className="border border-gray-200 rounded-xl shadow-md p-4">
                                    {item?.image &&
                                        <Image
                                            src={getImage(item?.image)}
                                            alt="product image"
                                            className="w-52 h-52 rounded-md mt-2"
                                            width={100}
                                            height={100}
                                        />
                                    }
                                    <div className="my-2">
                                        <p>Name : {item.name}</p>
                                        <p>Price : ${item.price}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={`/dashboard/products/product-details/${item._id}`} className="p-2 border my-8 rounded-lg bg-green-700 text-white hover:bg-green-500 hover:text-white">Go to Product Details &#8594;</Link>
                                        <Link href={`/dashboard/products/edit-product/${item._id}`} className="p-2 border my-8 rounded-lg bg-green-700 text-white hover:bg-green-500 hover:text-white">Edit Product &#8594;</Link>
                                        <button onClick={() => deleteProduct(item._id)} className="py-1 px-4 border my-8 hover:cursor-pointer rounded-lg bg-red-700 text-white hover:bg-red-500 hover:text-white">Delete</button>
                                    </div>
                                </div>
                            )
                        }) : <p>Loading...</p>}
                </ul>
            </div>
        </>
    )
}

// const ProductDisplay = ({ productData }) => {
//     return (
//         <>
//             <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black mb-10">
//                 <img src={productData?.images[0]} alt="" className="w-52 h-52" />
//                 <p>Product Name : {productData?.title}</p>
//                 <p>Product Description : {productData?.description}</p>
//                 <p>Product Price : {productData?.price}</p>
//                 <p>Product Brand : {productData?.brand}</p>
//                 <div>
//                     <button className="p-2 border m-2 rounded-lg bg-green-700 text-white hover:bg-green-500 hover:text-white">Add to Cart</button>
//                     <button className="p-2 border rounded-lg bg-green-700 text-white hover:bg-green-500 hover:text-white">Buy Now</button>
//                 </div>
//             </div>
//         </>
//     )
// }

export default ProductList;
