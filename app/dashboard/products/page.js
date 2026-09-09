import getAPIServer from "../../APIServer";
import ProductList from "../../component/ProductList";
import Link from "next/link";

const ProductsPage = async () => {
    let data;
    try {
        data = await getAPIServer("api/product/getproduct");
    } catch (error) {
        if (error.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        return (
            <p className="text-center text-red-600">
                Failed to fetch prodcuts
            </p>
        );
    }

    return (
        <div>
            <Link href="/"><button className="p-2 border m-2 rounded-lg bg-red-700 text-white hover:bg-red-500 hover:text-white hover:cursor-pointer">&#8592; Back to Home</button></Link>
            <Link href="/dashboard/add-product"><button className="p-2 border m-2 rounded-lg bg-blue-700 text-white hover:bg-blue-500 hover:text-white hover:cursor-pointer">Add Product</button></Link>
            {data?.products && data.products.length > 0 && !data.error ? (
                <ProductList data={data.products} />
            ) : (
                <p className="text-center text-red-600">
                    Products not found
                </p>
            )}
        </div>
    );
};

export default ProductsPage;