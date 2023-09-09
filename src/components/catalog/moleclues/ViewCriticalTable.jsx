import Input from 'core-modules/Input';
import React from 'react';
import { useTable } from 'react-table';
import { useNavigate } from 'react-router-dom';
import searchIcon from 'assets/images/searchIcon.svg';
import settingsIcon from 'assets/images/settingsIcon.svg';
import tableIcon from 'assets/images/tableIcon.svg';
import tagsIcon from 'assets/images/tagsIcon.svg';
import viewCriticalTable from '../constants/ViewCriticalTables.json';

const ViewCriticalTables = () => {
  const navigate = useNavigate();
  const data = React.useMemo(() => viewCriticalTable, []);
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
        Header: 'Service name',
        accessor: 'service_name'
      },
      {
        Header: 'Service type',
        accessor: 'service_type'
      },
      {
        Header: 'Alerts ',
        accessor: 'alerts'
      },
      {
        Header: ' Tags',
        accessor: 'tags',
        Cell: (obj) => {
          return (
            <div className="flex gap-3">
              <img src={tagsIcon} alt="tagsIcon" /> {obj.cell.value}{' '}
            </div>
          );
        }
      },
      {
        Header: 'Modified on',
        accessor: 'modified_on'
      },
      {
        Header: 'Created by',
        accessor: 'created_by'
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-row mt-2 mb-3 ">
        <div className="flex flex-row  w-[75%]">
          <Input
            customClass="bg-[#1e2021] rounded-r-none rounded border-[#676767]"
            placeholder="Search service name"
          />
          <div className="bg-[#f19300] h-[2.35rem] w-[2.6rem] rounded-l-none rounded mt-1 cursor-pointer">
            <img src={searchIcon} alt="searchIcon" className="pt-[0.2rem] pl-[0.1rem]" />
          </div>
        </div>
        <div className="flex flex-row ml-6 w-[10%] ">
          <div className="mt-[0.6rem]">
            <input checked type="checkbox" class="w-6 h-6 cursor-pointer accent-[#f59600] " />
          </div>
          <div className="mt-[0.5rem] px-3 font-RakutenRegular text-base">
            <label class=" text-white">Include tags</label>
          </div>
        </div>
        <div className="mt-1 ml-5 flex flex-row bg-[#f59600] h-[2.3rem] rounded cursor-pointer  w-[12%]">
          <img src={settingsIcon} alt="settingsIcon" className="pl-4 py-[0.6rem] " />
          <button className="px-2 pr-4 text-black"> Configure Services </button>
        </div>
      </div>
      <div className="h-[1px] w-full bg-[#676767] mt-3"></div>
      <div className="flex flex-col w-full bg-[#161617]  rounded-lg mt-6 ">
        <div className="flex flex-row  py-3 px-4 ">
          <div className=" font-RakutenSemibold w-[50%]">Most critical tables</div>
        </div>
        <div className="h-[1px] bg-[#676767] mx-4  "></div>
        <div className="rounded-lg px-4 h-[65vh] ">
          <table {...getTableProps()}>
            <thead className="sticky top-0 font-RakutenSansUI ">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      <div className={`${!['table_name'].includes(column.id) ? '' : 'w-[15rem]'}`}>
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
                  <tr
                    {...row.getRowProps()}
                    className="body-border cursor-pointer hover:bg-[#222222] "
                    onClick={() => navigate(row.id, { state: row.original })}
                  >
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>
                        <span> {cell.render('Cell')} </span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewCriticalTables;
