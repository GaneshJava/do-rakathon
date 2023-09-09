import '../catalog.css';
import table from '../constants/CriticalData.json';
import * as React from 'react';
import { useTable } from 'react-table';
import freshnessIcon from 'assets/images/freshnessIcon.svg';
import volumeIcon from 'assets/images/volumeIcon.svg';
import distributionIcon from 'assets/images/distributionIcon.svg';
import schemaIcon from 'assets/images/schemaIcon.svg';
import tableIcon from 'assets/images/tableIcon.svg';
import { Link } from 'react-router-dom';

const CriticalTables = () => {
  const data = React.useMemo(() => table, []);
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
        Header: 'Number of Alerts',
        accessor: 'no_of_alerts'
      },
      {
        Header: () => {
          return (
            <div className="flex gap-2 items-center">
              {' '}
              <img
                src={freshnessIcon}
                alt="freshnessIcon"
                className=" w-7 h-7 pt-[0.6rem] pb-[0.2rem] bg-[#434343] rounded-full"
              />{' '}
              Freshness{' '}
            </div>
          );
        },
        accessor: 'freshness'
      },
      {
        Header: () => {
          return (
            <div className="flex gap-2 items-center">
              {' '}
              <img
                src={volumeIcon}
                alt="volumeIcon"
                className=" w-7 h-7 px-[0.4rem]  bg-[#434343] rounded-full"
              />{' '}
              Volume{' '}
            </div>
          );
        },
        accessor: 'volume'
      },
      {
        Header: () => {
          return (
            <div className="flex gap-2  items-center">
              {' '}
              <img
                src={distributionIcon}
                alt="distributionIcon"
                className=" w-7 h-7 px-[0.4rem]  bg-[#434343] rounded-full"
              />{' '}
              Distribution{' '}
            </div>
          );
        },
        accessor: 'distribution'
      },
      {
        Header: () => {
          return (
            <div className="flex gap-2  items-center">
              {' '}
              <img
                src={schemaIcon}
                alt="schemaIcon"
                className=" w-7 h-7 px-[0.4rem]  bg-[#434343] rounded-full"
              />{' '}
              Schema{' '}
            </div>
          );
        },
        accessor: 'schema'
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <div className="flex flex-col w-full bg-[#161617]  rounded-lg ">
      <div className="flex flex-row  py-3 px-4 ">
        <div className=" font-RakutenSemibold w-[50%]">Most critical tables</div>
        <div className="w-[50%] flex justify-end font-RakutenRegular text-sm text-[#ed9000] cursor-pointer">
          <Link to={'tables'}>
            <span className="hover:border-b border-[#ed9000]">View all critical tables</span>
          </Link>
        </div>
      </div>
      <div className="h-[1px] bg-[#676767] mx-4 "></div>
      <div className="rounded-lg px-4  h-[30vh] overflow-y-auto">
        <table {...getTableProps()}>
          <thead className="sticky top-0 font-RakutenSansUI ">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    <div
                      className={`${
                        !['table_name'].includes(column.id) ? 'w-[7rem]' : 'w-[30rem]'
                      }`}>
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
                <tr {...row.getRowProps()} className="body-border ">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {' '}
                      <span
                        className={`${
                          !['no_of_alerts', 'table_name'].includes(cell.column.id) ? 'pl-9' : ''
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

export default CriticalTables;
