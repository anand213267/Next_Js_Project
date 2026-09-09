import getAPIServer from "@/app/APIServer";
import AddProduct from "../../component/AddProduct";

const productAddPage = async () => {
    try {
        const data = await getAPIServer("api/category/getcategory");

        return (
            <div>
                {data && data.length > 0 ? (
                    <AddProduct data={data} />
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
}

export default productAddPage;
