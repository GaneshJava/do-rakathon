import React from 'react';
import { useTable, usePagination } from 'react-table';
import Pagination from 'mvp/sharedComponents/Pagination';
import deleteIcon from 'assets/images/deletIcon.svg';
import classNames from 'classnames';

const EmailList = ({
  state, 
  setState,
  deleteSelectedMails
}) => {

  const { emailList } = state;
  const data = React.useMemo(() => emailList, [emailList]);
  let totalEmails = data.length;
  const columns = React.useMemo(
    () => [
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Actions',
        accessor: 'action',
        Cell: (obj) => {
          return (
            <div className="">
              <img src={deleteIcon} onClick={() => deleteSelectedMails(obj)} alt="tableIcon" className="w-5 h-5 cursor-pointer" />
            </div>
          );
        }
      }
    ],
    [deleteSelectedMails]
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 8 }
    },
    usePagination
  );

  const TableContainer = ({ height, children }) => (
    <div style={{ height: height, overflowY: "scroll" }}>{children}</div>
  );

  return (
    <div>
      <div className="mt-16">
        {emailList.length > 0 ? 
         <TableContainer height="600px ">
          <table {...getTableProps()} className="rounded-lg">
            <thead className="">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} style={{ position: "sticky", top: 0, zIndex: 1 }}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className={classNames(
                        ' font-RakutenRegular text-xl text-[#FFFFFF] w-[90%] bg-[#3C3D41] h-[4rem] px-[4rem]',
                        column.id === 'email' ? 'rounded-tl-lg' : 'rounded-tr-lg'
                      )}>
                      <div>{column.render('Header')}</div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="my-[2rem] ">
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className={"font-RakutenRegular h-[4rem] even:bg-[#1F2022] odd:bg-[#292C33]"}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className={classNames("px-[4rem] font-RakutenRegular",
                        ((row.index + 1) % 8 === 0 || (row.index === totalEmails - 1)) ? (cell.value ? 'rounded-bl-lg' : 'rounded-br-lg') : ''
                      )}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableContainer>
        :
        <span className='font-RakutenRegular text-lg'> No Emails found </span>
        }
        {pageSize < data.length && <Pagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          data={data}
          previousPage={previousPage}
          canPreviousPage={canPreviousPage}
          gotoPage={gotoPage}
          pageCount={pageCount}
          canNextPage={canNextPage}
          nextPage={nextPage}
          setPageSize={setPageSize}
        />}
      </div>
    </div>
  );
};

export default EmailList;
