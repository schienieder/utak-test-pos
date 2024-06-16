import React from 'react';

const GridItemSkeleton = () => {
  return (
    <div className="bg-white p-5 shadow rounded-lg flex flex-col gap-y-5 w-96">
      <div className="bg-gray-200 h-5 w-40 rounded-lg animate-pulse"></div>
      <div className="bg-gray-200 h-4 w-46 rounded-lg animate-pulse"></div>
      <div className="border-t border-gray-300 animate-pulse"></div>
      <div className="flex justify-between">
        <div className="bg-gray-200 h-4 w-16 rounded-lg animate-pulse"></div>
        <div className="bg-gray-200 h-4 w-16 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default GridItemSkeleton;
