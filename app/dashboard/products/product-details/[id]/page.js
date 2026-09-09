"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Loader from "@/app/component/Loader";
import ProductDetails from "@/app/component/ProductDetails";
import getAPIServer from "@/app/APIServer";

const ProductDetailsPage = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await getAPIServer(`api/product/getproduct/${id}`);

                console.log(response.product);

                setProduct(response.product);
            } catch (error) {
                console.error("Error fetching product:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductById();
        }
    }, [id]);

    return (
        <>
            <h1 className="text-3xl font-bold text-center mt-8">
                Product Details
            </h1>

            {loading ? (
                <Loader />
            ) : product ? (
                <ProductDetails data={product} />
            ) : (
                <p className="text-center mt-8">
                    Product not found
                </p>
            )}
        </>
    );
};

export default ProductDetailsPage;