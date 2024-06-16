import React, { useState } from 'react';
import MyInput from './MyInput';

interface ItemShape {
  itemCategory: string;
  itemName: string;
  itemOptions: string;
  itemPrice: string;
  itemStock: string;
}

const ItemBuilder = () => {
  const [currentItem, setCurrentItem] = useState<ItemShape>({
    itemCategory: '',
    itemName: '',
    itemOptions: '',
    itemPrice: '',
    itemStock: '',
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log(`${name}`, value);
    setCurrentItem((prevItemVal) => ({
      ...prevItemVal,
      [name]: value,
    }));
  };

  return (
    <form className="h-screen w-full bg-white shadow p-5 flex flex-col gap-y-8 text-gray-800">
      <h4 className="text-2xl font-black">Add Item</h4>
      <MyInput
        label="Category"
        type="text"
        name="itemCategory"
        onChangeValue={onChangeInput}
        value={currentItem.itemCategory ?? ''}
        placeholder="Category"
      />
      <MyInput
        label="Name"
        type="text"
        name="itemName"
        onChangeValue={onChangeInput}
        value={currentItem.itemName ?? ''}
        placeholder="Name"
      />
      <MyInput
        label="Options"
        type="text"
        name="itemOptions"
        required={false}
        onChangeValue={onChangeInput}
        value={currentItem.itemOptions ?? ''}
        placeholder="e.g. Medium, Large"
      />
      <MyInput
        label="Price"
        type="text"
        name="itemPrice"
        onChangeValue={onChangeInput}
        value={currentItem.itemPrice ?? ''}
        placeholder="Price"
      />
      <MyInput
        label="Stock"
        type="text"
        name="itemStock"
        onChangeValue={onChangeInput}
        value={currentItem.itemStock ?? ''}
        placeholder="Stock"
      />
      <button className="w-full bg-orange-600 hover:brightness-90 px-3 py-2 text-white font-bold rounded-lg tracking-wider">
        Create Item
      </button>
    </form>
  );
};

export default ItemBuilder;
