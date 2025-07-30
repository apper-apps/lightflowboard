import React from "react";

const Loading = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Filter bar skeleton */}
      <div className="flex gap-3 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>

      {/* Task list skeleton */}
      <div className="bg-white rounded-xl shadow-elevation-2 overflow-hidden">
        {/* Header skeleton */}
        <div className="border-b border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Table header skeleton */}
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>

        {/* Task rows skeleton */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="grid grid-cols-5 gap-4 p-4 border-b border-gray-50">
            <div className="h-5 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;