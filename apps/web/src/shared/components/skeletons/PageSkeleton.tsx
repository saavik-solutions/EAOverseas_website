import React from 'react';

const PageSkeleton = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
            {/* Header Skeleton */}
            <div className="h-16 w-full bg-white border-b border-gray-100 px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-8 w-8 bg-slate-200 rounded-lg animate-pulse" />
                    <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                </div>
                <div className="flex gap-4">
                    <div className="h-8 w-8 bg-slate-200 rounded-full animate-pulse" />
                    <div className="h-8 w-24 bg-slate-200 rounded-lg animate-pulse" />
                </div>
            </div>

            <main className="flex-1 p-6 lg:p-12 max-w-[1400px] mx-auto w-full space-y-8">
                {/* Hero Skeleton */}
                <div className="space-y-4">
                    <div className="h-4 w-24 bg-purple-100 rounded-full animate-pulse" />
                    <div className="h-12 md:h-16 w-3/4 bg-slate-200 rounded-2xl animate-pulse" />
                    <div className="h-6 w-1/2 bg-slate-100 rounded-xl animate-pulse" />
                </div>

                {/* Content Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                            <div className="h-40 w-full bg-slate-100 rounded-2xl animate-pulse" />
                            <div className="h-6 w-2/3 bg-slate-200 rounded-lg animate-pulse" />
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
                                <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
                                <div className="h-4 w-4/5 bg-slate-100 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Section Skeleton */}
                <div className="pt-12 space-y-6">
                    <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-24 bg-slate-50 rounded-2xl border border-gray-50 animate-pulse" />
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer Skeleton */}
            <div className="h-20 w-full bg-white border-t border-gray-100 flex items-center justify-center">
                <div className="h-4 w-48 bg-slate-100 rounded animate-pulse" />
            </div>
        </div>
    );
};

export default PageSkeleton;
