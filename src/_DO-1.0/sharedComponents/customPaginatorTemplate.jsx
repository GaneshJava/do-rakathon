import previousIcon from '../assets/previous.svg';
import nextIcon from '../assets/next.svg';
import classNames from "classnames";
import { Dropdown } from 'primereact/dropdown';

export const customPaginatorTemplate = {
    layout: 'PrevPageLink PageLinks NextPageLink',
    PrevPageLink: (options) => {
        return (
            <button type="button" className={classNames(options.className)} onClick={options.onClick} disabled={options.disabled}>
                <div className="flex gap-2 paginator-nav-btn px-1 pb-2">
                    <img src={previousIcon} alt='previous' />
                    <span className="text-secondaryBorderColor font-RakutenSemibold"> Previous </span>
                </div>
            </button>
        );
    },
    NextPageLink: (options) => {
        return (
            <button type="button" className={classNames(options.className)} onClick={options.onClick} disabled={options.disabled}>
                <div className="flex gap-2 paginator-nav-btn px-1 pb-2">
                    <span className="text-secondaryBorderColor font-RakutenSemibold"> Next </span>
                    <img src={nextIcon} alt='next' />
                </div>
            </button>
        );
    },
    PageLinks: (options) => {
        if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
            const className = classNames(options.className, { 'p-disabled': true });
            return (
                <span className={className} style={{ userSelect: 'none' }}>
                    ...
                </span>
            );
        }
        return (
            <button type="button" className={options.className} onClick={options.onClick}>
                {options.page + 1}
            </button>
        );
    },
    RowsPerPageDropdown: (options) => {
        const dropdownOptions = [
            { label: '10', value: 10 },
            { label: '15', value: 15 },
            { label: '20', value: 20 },
            { label: 'All', value: options.totalRecords }
        ];
        return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />
    }
}