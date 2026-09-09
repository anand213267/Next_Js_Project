"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductDetails = ({ data }) => {
    const router = useRouter();
    return (
        <>
            <button onClick={() => router.back()} className="px-4 py-2 border my-2 rounded-lg bg-red-700 text-white hover:bg-red-500 hover:text-white hover:cursor-pointer">
                &#8592; Back
            </button>
            {data && (
                <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="md:grid-cols-2 gap-8 p-8">

                        {/* Product Image */}
                        <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6">
                            {/* <Image
                                src={data.images[0]}
                                width={400}
                                height={400}
                                alt={data.title}
                                className="object-contain max-h-80"
                            /> */}
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col justify-center">

                            <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold mb-2">
                                {data.category}
                            </p>

                            <h1 className="text-3xl text-black mb-4">
                                {data.name}
                            </h1>

                            <p className="text-gray-600 leading-relaxed mb-6">
                                {data.description}
                            </p>

                            <div className="space-y-3 text-lg">

                                <p>
                                    <span className="font-semibold text-gray-800">Price:</span>{" "}
                                    <span className="text-green-600 font-bold">
                                        ${data.price}
                                    </span>
                                </p>

                            </div>

                            <button className="mt-8 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition">
                                Add to Cart
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductDetails;