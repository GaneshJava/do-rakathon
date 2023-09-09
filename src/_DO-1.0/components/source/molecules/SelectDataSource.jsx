import React from "react";
import { Fieldset } from 'primereact/fieldset';
import mysqlLogo from 'assets/images/mysqlLogo.svg';
import postgresqlLogo from 'assets/images/postgresqlLogo.svg';
import bigqueryLogo from 'assets/images/bigqueryLogo.svg';
import rightIcon from 'assets/images/tickmarkIcon.svg';
import { SiMicrosoftazure } from 'react-icons/si';
const sourceArray = [
    {
        id: 'data-1',
        key: 'mysql',
        label: 'MYSQL',
        icon: mysqlLogo,
    },
    {
        id: 'data-2',
        key: 'azure',
        label: 'Azure Storage',
        icon: ''
    },
    {
        id: 'data-3',
        key: 'postgres',
        label: 'PostgreSQL',
        icon: postgresqlLogo
    },
    {
        id: 'data-4',
        key: 'bigquery',
        label: 'BigQuery',
        icon: bigqueryLogo
    },
];
const SelectDataSource = ({ state, setState }) => {

    const handleSelect = (item) => {
        let selectedDataSource = item.key === state.selectedDataSource ? '' : item.key;
        setState({
            ...state,
            selectedDataSource,
            currentStep: selectedDataSource ? 2 : 1,
            warning: {}
        })
    }

    return (
        <div className="flex flex-col">
            <Fieldset legend="Select DataSource" className="mt-2 p-6 datasource-fieldset">
                {sourceArray.map((item, index) =>
                    <div key={item.id} className={`relative px-2 py-3 flex justify-center flex-col gap-1 items-center w-60 h-32 border border-secondaryTextColor ${state.selectedDataSource === item.key && 'bg-[#3d352c]'} ${index > 1 ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
                        onClick={() => index > 1 ? null : handleSelect(item)}
                    >
                        {state.selectedDataSource === item.key && <img src={rightIcon} alt="selected" className="p-[6px] bg-primaryTheme rounded-full absolute top-3 right-3" />}
                        {
                            item.key === 'azure' ?
                                <SiMicrosoftazure size={60} color="#0389d0" /> : <img src={item.icon} alt={item.key} />
                        }
                        <label className="font-PrimaryFont text-white"> {item.label} </label>
                    </div>
                )}
            </Fieldset>
        </div>
    );
}
export default React.memo(SelectDataSource);