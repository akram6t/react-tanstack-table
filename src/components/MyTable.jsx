import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';

const MyTable = ({ data }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const columns = useMemo(() => [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Age',
      accessorKey: 'age',
    },
    {
      header: 'Country',
      accessorKey: 'country',
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    globalFilterFn: 'includesString',
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-2xl">
      <div className="mb-6 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-2/3 p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition duration-150 ease-in-out"
        />
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            aria-label="Toggle Columns"
          >
            <ColumnsIcon />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-10">
              {table.getAllLeafColumns().map(column => (
                <label key={column.id} className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                    className="mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-200">{column.columnDef.header?.toString()}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="p-4 text-left bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-600">
                    <span
                      onClick={header.column.getToggleSortingHandler()}
                      className="flex items-center cursor-pointer text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 font-semibold transition duration-150 ease-in-out"
                    >
                      {header.column.columnDef.header?.toString()}
                      {{
                        asc: <ChevronUpIcon />,
                        desc: <ChevronDownIcon />,
                      }[header.column.getIsSorted()] ?? null}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-4 border-b dark:border-gray-600 text-gray-700 dark:text-gray-200">
                    {cell.getValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="space-x-2">
          <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out">
            {'<<'}
          </button>
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out">
            {'<'}
          </button>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out">
            {'>'}
          </button>
          <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out">
            {'>>'}
          </button>
        </div>
        <span className="text-sm space-x-2 font-medium text-gray-600 dark:text-gray-300">
          <span>Page</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {table.getState().pagination.pageIndex + 1}
          </span>
          <span>of</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {table.getPageCount()}
          </span>
        </span>
      </div>      

    </div>
  );
};

export default MyTable;

// You'll need to import these icons or use your own
const ChevronUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const ColumnsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
  </svg>
);
