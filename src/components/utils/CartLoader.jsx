

const ShimmerBox = ({ className }) => (
    <div className={`${className} bg-gray-200 rounded relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
    </div>
);

const CartLoader = ({ count = 3 }) => {
    return (
        <div className="space-y-6">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-xl border bg-white px-6 py-4 shadow-sm lg:mb-6"
                >
                    {/* Top Section */}
                    <div className="flex justify-between items-center">
                        {/* Left: Icon + Title */}
                        <div className="flex items-center gap-4">
                            <ShimmerBox className="h-10 w-10" />
                            <ShimmerBox className="h-[22px] w-[120px]" />
                        </div>

                        {/* Right: Price + Actions */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                <ShimmerBox className="h-[14px] w-[10px] mr-1" />
                                <ShimmerBox className="h-[20px] w-[50px]" />
                            </div>

                            {/* Vertical Separator */}
                            <div className="w-px h-5 bg-gray-200 mx-2" />

                            {/* Edit/Delete icon placeholders */}
                            <ShimmerBox className="h-5 w-5" />
                            <ShimmerBox className="h-5 w-5" />
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full table-auto border-t border-gray-200 pt-3">
                            <thead>
                                <tr>
                                    {[1, 2, 3].map((_, idx) => (
                                        <th key={idx} className="text-left px-2 py-2 text-[12px] whitespace-nowrap">
                                            <ShimmerBox className="h-[42px] w-[80px]" />
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {[1, 2, 3].map((_, idx) => (
                                        <td key={idx} className="px-2 py-2 text-[14px] whitespace-nowrap">
                                            <ShimmerBox className="h-[16px] w-[100px]" />
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartLoader;
