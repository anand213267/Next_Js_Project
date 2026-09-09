"use client";

import { useState } from "react";

const Category = ({ data }) => {
    const [searchItem, setSearchItem] = useState("");
    const [categoryData, setCategoryData] = useState(data);

    const handleSearch = (e) => {
        const value = e.target.value;

        setSearchItem(value);

        const filteredData = data.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );

        setCategoryData(filteredData);
    };

    return (
        <>
            <h1 className="text-2xl text-center my-4">
                My Categories
            </h1>

            <div className="flex justify-center mb-6">
                <input
                    type="search"
                    placeholder="Search category"
                    value={searchItem}
                    onChange={handleSearch}
                    className="border border-gray-300 rounded-lg p-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                {categoryData && categoryData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryData.map((item) => (
                            <div
                                key={item._id}
                                className="border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow"
                            >
                                <h2 className="text-xl font-semibold mb-2">
                                    {item.name}
                                </h2>

                                <p className="text-gray-600">
                                    <span className="font-medium">
                                        Description:
                                    </span>{" "}
                                    {item.description || "No Description"}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">
                        No categories found
                    </p>
                )}
            </div>
        </>
    );
};

export default Category;