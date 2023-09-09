import { TbDatabasePlus } from 'react-icons/tb';

export const items = [
    {
        key:'dataHealth',
        className: 'navbar-item',
        label: 'Data Health',
    },
    {
        key:'monitors',
        className: 'navbar-item',
        label: 'Monitors',
    },
    {
        key:'anomalies',
        className: 'navbar-item',
        label: 'Anomalies',   
    },
    {
        key:'dataSource',
        className: 'navbar-item',
        label: <div className='flex flex-row gap-2'>  <TbDatabasePlus />
        Data Source</div>,   
    },
    
];