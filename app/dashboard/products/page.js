// "use client";
// import { useEffect, useState } from "react";
// import ProductList from "../../component/ProductList";
// import Link from "next/link";
// import Loader from "../../component/Loader";

// const ProductsPage = () => {
//     const [products, setProducts] = useState([]);
//     const [message, setMessage] = useState([]);

//     useEffect(() => {
//         fetchProducts()
//     }, []);

//     const fetchProducts = async () => {
//         // const response = await fetch('https://dummyjson.com/products');
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/getproduct`, {
//             headers: {
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`,
//                 "Content-Type": "application/json",
//                 "ngrok-skip-browser-warning": "true"
//             },
//         });
//         const data = await response.json();

//         if (data && data.length > 0) {
//             setProducts(data)
//         } else {
//             setMessage(["Product not found"]);
//         }
//     }
//     return (
//         <>
//             <Link href="/"><button className="p-2 border m-2 rounded-lg bg-red-700 text-white hover:bg-red-500 hover:text-white hover:cursor-pointer">&#8592; Back to Home</button></Link>
//             <Link href="/add-product"><button className="p-2 border m-2 rounded-lg bg-blue-700 text-white hover:bg-blue-500 hover:text-white hover:cursor-pointer">Add Product</button></Link>
//             {message && message.length ? message.map((msg) => (
//                 <p key={msg} className="text-red-700 text-center m-2">{msg}</p>
//             )) : products && products.length ? <ProductList data={products} /> : <Loader />}
//         </>
//     )
// }

// export default ProductsPage;

'use server'


import getAPIServer from "../../APIServer";
import ProductList from "../../component/ProductList";
import Link from "next/link";
import Loader from "../../component/Loader";

const ProductsPage = async () => {
    let data;
    try {
        data = await getAPIServer("api/product/getproduct");
    } catch (error) {
        if (error.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        console.error("Error fetching categories:", error);

        return (
            <p className="text-center text-red-600">
                Failed to fetch categories
            </p>
        );
    }

    console.log(data)

    return (
        <div>
            <Link href="/"><button className="p-2 border m-2 rounded-lg bg-red-700 text-white hover:bg-red-500 hover:text-white hover:cursor-pointer">&#8592; Back to Home</button></Link>
            <Link href="/dashboard/add-product"><button className="p-2 border m-2 rounded-lg bg-blue-700 text-white hover:bg-blue-500 hover:text-white hover:cursor-pointer">Add Product</button></Link>
            {data && data.length > 0 && !data.error ? (
                <ProductList data={data} />
            ) : (
                <p className="text-center text-red-600">
                    Category not found
                </p>
            )}
        </div>
    );
};

export default ProductsPage;