import React from 'react';

const BlogSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col h-full bg-white rounded-[2.5rem] p-4 border border-gray-50 shadow-sm">
      {/* Image Skeleton */}
      <div className="aspect-[16/10] rounded-[2rem] bg-gray-200 mb-8 w-full"></div>
      
      {/* Content Skeleton */}
      <div className="px-4 space-y-4 flex-1">
        {/* Title Lines */}
        <div className="h-7 bg-gray-200 rounded-lg w-3/4"></div>
        <div className="h-7 bg-gray-200 rounded-lg w-1/2"></div>
        
        {/* Excerpt Lines */}
        <div className="space-y-2 pt-2">
          <div className="h-4 bg-gray-100 rounded w-full"></div>
          <div className="h-4 bg-gray-100 rounded w-5/6"></div>
        </div>
      </div>
      
      {/* Footer Skeleton */}
      <div className="px-4 pt-8 pb-4 flex items-center justify-between mt-auto">
        <div className="flex gap-4">
          <div className="h-4 bg-gray-100 rounded w-12"></div>
          <div className="h-4 bg-gray-100 rounded w-12"></div>
        </div>
        <div className="h-4 bg-gray-100 rounded w-20"></div>
      </div>
    </div>
  );
};

export const BlogsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <BlogSkeleton key={i} />
      ))}
    </div>
  );
};

export default BlogSkeleton;
