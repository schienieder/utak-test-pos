import React from 'react';
import { tableHeaders } from '../utils/constants';

const MyTable = () => {
  return (
    <div className="w-full flex flex-col bg-white p-5 rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="w-full text-left text-sm font-light text-surface">
              <thead className="border-b border-neutral-200 font-medium bg-gray-200/90 text-gray-800">
                <tr>
                  {tableHeaders.map((headerText: string, index: number) => {
                    return (
                      <th
                        key={`${headerText}-${index + 1}`}
                        scope="col"
                        className="px-6 py-4"
                      >
                        {headerText}
                      </th>
                    );
                  })}
                  <th scope="col" className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="font-medium text-gray-800">
                <tr className="border-b border-neutral-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-4">Drinks</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    Caramel Machiatto
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">Medium</td>
                  <td className="whitespace-nowrap px-6 py-4">PHP 120.00</td>
                  <td className="whitespace-nowrap px-6 py-4">PHP 70.00</td>
                  <td className="whitespace-nowrap px-6 py-4">10</td>
                  <td className="whitespace-nowrap px-6 py-4 flex gap-x-5">
                    <button className="p-2 rounded-lg bg-orange-600 hover:brightness-90">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                    <button className="p-2 rounded-lg bg-orange-600 hover:brightness-90">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTable;
