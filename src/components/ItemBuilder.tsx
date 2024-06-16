import React, { useState } from 'react';
import MyInput from './MyInput';
import useItemStore from '../store/useItemStore';

const ItemBuilder = () => {
  const {
    currentItem,
    isEditing,
    onChangeItemValue,
    createNewItem,
    cancelEditItem,
    updateItem,
  } = useItemStore();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChangeItemValue(name, value);
  };

  const onSubmitItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      updateItem();
      return;
    }

    createNewItem();
  };

  return (
    <form
      className="h-screen w-full bg-white shadow p-5 flex flex-col gap-y-8 text-gray-800"
      onSubmit={onSubmitItem}
    >
      <h4 className="text-2xl font-black">{isEditing ? 'Edit' : 'Add'} Item</h4>
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
        label="Cost"
        type="text"
        name="itemCost"
        onChangeValue={onChangeInput}
        value={currentItem.itemCost ?? ''}
        placeholder="Cost"
      />
      <MyInput
        label="Stock"
        type="text"
        name="itemStock"
        onChangeValue={onChangeInput}
        value={currentItem.itemStock ?? ''}
        placeholder="Stock"
      />
      <button
        type="submit"
        className="w-full bg-orange-500 hover:brightness-90 px-3 py-2 text-white font-bold rounded-lg tracking-wider"
      >
        {isEditing ? 'Update' : 'Create'} Item
      </button>
      {isEditing && (
        <button
          type="button"
          className="-mt-3 w-full bg-gray-200/70 hover:brightness-90 px-3 py-2 text-orange-500 font-bold rounded-lg tracking-wider"
          onClick={cancelEditItem}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default ItemBuilder;
