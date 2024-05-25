// components/TabsWithTables.tsx
import React, { useState } from 'react';

const TabsWithTables: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['Supplies', 'Delivered'];
  const tables = [
    {
      header: ['Name', 'Age', 'Occupation'],
      rows: [
        ['John Doe', '30', 'Engineer'],
        ['Jane Smith', '25', 'Designer'],
      ],
    },
    {
      header: ['Product', 'Price', 'Stock'],
      rows: [
        ['Laptop', '$1000', 'Available'],
        ['Phone', '$500', 'Out of Stock'],
      ],
    },
    {
      header: ['Country', 'Capital', 'Population'],
      rows: [
        ['USA', 'Washington D.C.', '331 million'],
        ['Canada', 'Ottawa', '38 million'],
      ],
    },
  ];

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex border-b border-gray-300 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 focus:outline-none ${
              activeTab === index
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              {tables[activeTab].header.map((headerItem, index) => (
                <th
                  key={index}
                  className="px-4 py-2 border-b border-gray-300 bg-gray-100 text-left"
                >
                  {headerItem}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tables[activeTab].rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-2 border-b border-gray-300"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabsWithTables;
