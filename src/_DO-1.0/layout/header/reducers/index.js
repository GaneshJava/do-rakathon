import { TbDatabasePlus } from 'react-icons/tb';

export const items = (handleClick, selectedNavKey) => {
    return [
        {
            key: 'dataHealth',
            className: `navbar-item ${selectedNavKey === '/do-dashboard' && 'active-nabar'}`,
            label: 'Data Health',
            url: '/do-dashboard',
            command: (e) => handleClick(e)
        },
        {
            key: 'monitors',
            className: `navbar-item ${selectedNavKey === '/monitors' && 'active-nabar'}`,
            label: 'Monitors',
            url: '/monitors',
            command: (e) => handleClick(e)
        },
        {
            key: 'anomalies',
            className: `navbar-item ${selectedNavKey === '/anomalies' && 'active-nabar'}`,
            label: 'Anomalies',
            url: '/anomalies',
            command: (e) => handleClick(e)
        },
        {
            key: 'dataSource',
            className: `navbar-item ${selectedNavKey === '/data-source' && 'active-nabar'}`,
            label: <div className='flex flex-row gap-2'>  <TbDatabasePlus />
                Data Source</div>,
            url: '/data-source',
            command: (e) => handleClick(e)
        },
        {
            key: 'pipeline',
            className: `navbar-item ${selectedNavKey === '/pipeline' && 'active-nabar'}`,
            label: <div className='flex flex-row gap-2'>
                Pipelines</div>,
            url: '/pipeline',
            command: (e) => handleClick(e)
        },
        {
            key: 'chatbot',
            className: `navbar-item ${selectedNavKey === '/chatbot' && 'active-nabar'}`,
            label: <div className='flex flex-row gap-2'>
                ChatBot</div>,
            url: '/chatbot',
            command: (e) => handleClick(e)
        }
    ]
};