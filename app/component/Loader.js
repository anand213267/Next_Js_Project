const Loader = () => {
    return (
        <div className="max-w-4xl mx-auto mt-10 p-8">
            <div className="grid md:grid-cols-2 gap-8 animate-pulse">

                {/* Image Skeleton */}
                <div className="flex items-center justify-center bg-gray-200 rounded-2xl h-80">
                    <div className="w-32 h-32 bg-gray-300 rounded-xl"></div>
                </div>

                {/* Content Skeleton */}
                <div className="space-y-5 flex flex-col justify-center">

                    {/* Category */}
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>

                    {/* Title */}
                    <div className="h-8 w-3/4 bg-gray-200 rounded"></div>

                    {/* Description */}
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                        <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
                    </div>

                    {/* Price */}
                    <div className="h-6 w-32 bg-gray-200 rounded"></div>

                    {/* Discount */}
                    <div className="h-5 w-40 bg-gray-200 rounded"></div>

                    {/* Stock */}
                    <div className="h-5 w-28 bg-gray-200 rounded"></div>

                    {/* Button */}
                    <div className="h-12 w-40 bg-gray-300 rounded-lg"></div>

                </div>
            </div>
        </div>
    );
};

export default Loader;