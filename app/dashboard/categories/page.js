import Category from "../../component/Category";
import getAPIServer from "../../APIServer";
import Link from "next/link";

const CategoriesPage = async () => {
    try {
        const data = await getAPIServer("api/category/getcategory");

        return (
            <div>
                <Link href="/dashboard"><button className="p-2 border m-2 rounded-lg bg-red-700 text-white hover:bg-red-500 hover:text-white hover:cursor-pointer">&#8592; Back to Home</button></Link>
                <Link href="/dashboard/add-category"><button className="p-2 border m-2 rounded-lg bg-blue-700 text-white hover:bg-blue-500 hover:text-white hover:cursor-pointer">Add Category</button></Link>
                {data && data.length > 0 ? (
                    <Category data={data} />
                ) : (
                    <p className="text-center text-red-600">
                        Category not found
                    </p>
                )}
            </div>
        );
    } catch (error) {
        console.error("Error fetching categories:", error);

        return (
            <p className="text-center text-red-600">
                Failed to fetch categories
            </p>
        );
    }
};

export default CategoriesPage;