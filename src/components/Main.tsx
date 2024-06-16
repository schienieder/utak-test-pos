import React, { useEffect, useState } from 'react';
import MyTable from './MyTable';
import MyInput from './MyInput';
import MyGridItems from './MyGridItems';
import useItemStore from '../store/useItemStore';

const Main = () => {
  const [searchedItem, setSearchedItem] = useState<string>('');
  const [isGridView, setIsGridView] = useState<boolean>(true);
  const { getItems, subscribeItems } = useItemStore();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedItem(e.target.value);
  };

  const onChangeView = () => {
    setIsGridView(!isGridView);
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    subscribeItems();
  }, [subscribeItems]);

  return (
    <div className="w-full flex flex-col items-start p-5 gap-5 mt-16">
      <div className="w-full flex justify-between items-center">
        {/* TEXT PART */}
        <div className="flex flex-col">
          <h4 className="text-2xl font-black text-gray-800">Hello there,</h4>
          <p className="font-medium">
            This is a Simple POS by Justine Rhei Torres
          </p>
        </div>
        {/* CONTROLS */}
        <div className="flex gap-x-3 items-center">
          <div className="flex gap-x-2">
            <button className="p-1" onClick={onChangeView}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-6 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
              </svg>
            </button>
            <button className="p-1" onClick={onChangeView}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-6 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </button>
          </div>
          <MyInput
            label=""
            type="text"
            name="searchedItem"
            required={false}
            onChangeValue={onChangeInput}
            value={searchedItem ?? ''}
            placeholder="Search Item . . ."
          />
        </div>
      </div>
      {isGridView ? <MyGridItems /> : <MyTable />}
    </div>
  );
};

export default Main;
