import { getPaginationRange, pageRangeOptions } from ".";
import MultiSelect from "core-modules/Selectlist";
import arrow from 'mvp/assets/upArrow.svg';


const Pagination = ({
    pageIndex,
    pageSize,
    data,
    previousPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    canNextPage,
    nextPage,
    setPageSize,
    showPageSizeSelect = false
}) => {
    const btnClass = "w-8 h-8 border bg-[#1F2022]"
    const nonActiveBorder = 'border-[#848382]';
    let pageRanges = getPaginationRange(pageIndex, pageCount);
    return (
        <div className="flex justify-end my-3 gap-4">
            <div className="flex justify-end gap-4 w-[50%]">
                <span className="font-RakutenRegular">
                    {pageIndex * pageSize + 1}-{(pageIndex + 1) * pageSize} of{" "}
                    {data.length} items
                </span>
                <button className={`${btnClass} ${nonActiveBorder} p-2 ${!canPreviousPage ? 'opacity-50' : ''}`} onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <img src={arrow} alt="Previous" className="rotate-[270deg]" />
                </button>
                {(pageIndex > 2 && !pageRanges.includes(0)) && (
                    <>
                        <button className={`${btnClass} ${nonActiveBorder}`} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            1
                        </button>
                        <span>•••</span>
                    </>
                )}
                {pageRanges.map((pageNum) => (
                    <button
                        key={pageNum}
                        className={`${btnClass} ${pageNum === pageIndex ? 'border-common-color text-common-color' : nonActiveBorder}`}
                        onClick={() => gotoPage(pageNum)}
                    >
                        {pageNum + 1}
                    </button>
                ))}
                {pageCount - pageIndex > 3 && !pageRanges.includes(pageCount - 1) && (
                    <>
                        <span>•••</span>
                        <button
                            className={`${btnClass} ${nonActiveBorder}`}
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                        >
                            {pageCount}
                        </button>
                    </>
                )}
                <button className={`${btnClass} ${nonActiveBorder} p-2 ${!canNextPage ? 'opacity-50' : ''}`} onClick={() => nextPage()} disabled={!canNextPage}>
                    <img src={arrow} alt="Next" className="rotate-90" />
                </button>
            </div>

            {showPageSizeSelect === true && <span>
                <MultiSelect
                    id='rule-select'
                    options={pageRangeOptions}
                    standards={pageRangeOptions.filter(item => item.value === pageSize)}
                    disabled={false}
                    handleChange={(e) => setPageSize(Number(e.value))}
                    isMulti={false}
                    placeholder={'Select range'}
                    classNamePrefix="rules-select-custom"
                />
            </span>}
        </div>
    )
}

export default Pagination;