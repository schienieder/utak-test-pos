import React from 'react';
import useItemStore, { ItemShape } from '../store/useItemStore';
import MyGridItem from './MyGridItem';
import GridItemSkeleton from './GridItemSkeleton';

const MyGridItems = () => {
  const { filteredItems, isItemsLoading } = useItemStore();

  if (isItemsLoading) {
    return (
      <div className="w-full grid grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index: number) => {
          return <GridItemSkeleton key={`skeleton-item-${index}`} />;
        })}
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-3 gap-8">
      {filteredItems.map((item: ItemShape, index: number) => {
        return (
          <MyGridItem key={`grid-item-${item.itemName}-${index}`} item={item} />
        );
      })}
    </div>
  );
};

export default MyGridItems;
