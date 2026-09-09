import Link from "next/link";

const DashboardPage = () => {
    return (
        <>
            <div className="mx-20">
                <div className="flex gap-5">
                    <div className="bg-white w-80 border border-gray-400 shadow-lg  rounded-lg overflow-hidden">
                        <h1 className="text-2xl text-center my-4">
                            Products
                        </h1>

                        {/* <div className="px-6">
                            <p className="font-semibold">
                                Wireless Headphones
                            </p>

                            <p className="text-gray-500 mt-2">
                                High quality headphones
                            </p>

                            <p className="text-green-600 font-bold text-xl my-6">
                                $99
                            </p>
                        </div> */}

                        <Link href="/dashboard/products">
                            <button className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white py-3 w-full">
                                View Products
                            </button>
                        </Link>
                    </div>
                    <div className="bg-white w-80 border border-gray-400 shadow-lg rounded-lg overflow-hidden">
                        <h1 className="text-2xl text-center my-4">
                            Categories
                        </h1>

                        {/* <div className="px-6">
                            <p className="font-semibold">
                                Category Name
                            </p>

                            <p className="text-gray-500 mt-2">
                                Description
                            </p>

                            <p className="text-green-600 font-bold text-xl my-6">
                                $99
                            </p>
                        </div> */}

                        <Link href="/dashboard/categories">
                            <button className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white py-3 w-full">
                                View Categories
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardPage;