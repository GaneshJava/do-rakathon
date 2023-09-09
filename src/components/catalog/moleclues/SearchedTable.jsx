import '../catalog.css';
import searchedData from '../constants/SearchedData.json';
import * as React from 'react';
import { useTable } from 'react-table';
import tableIcon from 'assets/images/tableIcon.svg';

const SearchedTables = () => {
  const data = React.useMemo(() => searchedData, []);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Table Name',
        accessor: 'table_name',
        Cell: (obj) => {
          return (
            <div className="flex gap-3">
              <img src={tableIcon} alt="tableIcon" /> {obj.cell.value}{' '}
            </div>
          );
        }
      },

      {
        Header: 'Last searched on',
        accessor: 'last_searched_on'
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <div className="flex flex-col w-full bg-[#161617] rounded-lg h-[23rem]">
      <div className="flex flex-row  p-4 ">
        <div className=" font-RakutenSemibold w-[50%]">Recently searched tables</div>
        <div className="w-[50%] flex justify-end font-RakutenRegular text-sm text-[#ed9000] cursor-pointer">
          View all tables
        </div>
      </div>
      <div className="h-[1px] bg-[#676767] mx-4 "></div>
      <div className="overflow-y-auto rounded-lg px-4">
        <table {...getTableProps()}>
          <thead className="sticky top-0 font-RakutenSansUI ">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    <div className={`${!['table_name'].includes(column.id) ? 'pl-[12rem]' : ''}`}>
                      {column.render('Header')}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="font-RakutenRegular text-sm ">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="body-border">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {' '}
                      <span
                        className={`${
                          !['table_name'].includes(cell.column.id) ? 'pl-[12rem]' : ''
                        }`}>
                        {' '}
                        {cell.render('Cell')}{' '}
                      </span>{' '}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchedTables;
