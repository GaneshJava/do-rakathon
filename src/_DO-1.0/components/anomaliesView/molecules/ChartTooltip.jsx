import ReactDOMServer from 'react-dom/server';
import { Divider } from 'primereact/divider';
import { convertMillisecondsToDate } from '../reducers/chartReducer';
const SCHEMA_CHANGE_TYPE = {
    add: 'Added',
    del: 'Deleted',
    alter: 'Altered'
}
const TooltipComponent = ({ tooltipInfo, dataPointIndex, eventType, value, categories }) => {
    const toolTipObj = tooltipInfo[dataPointIndex] || {};
    const dateTime = categories[dataPointIndex] || '';
    let formatedDate = dateTime ? convertMillisecondsToDate(dateTime, 1) : '';
    const entries = Object.entries(toolTipObj).map(([key, value]) => ({ key, value }));
    return (
        <>
            <div className="custom-tooltip-component flex flex-col rounded-lg py-3">
                <span className="px-5 text-base font-RakutenSemibold"> {value === 0 ? 'No Schema changes' : `Schema Changes count ${formatedDate ? `on ${formatedDate}` : '' }`} </span>
                <Divider />
                <div className='flex flex-col gap-2 px-5'>
                    {entries?.map(item => item.value ?
                        <div className='flex gap-2 justify-between w-3/4 font-RakutenSemibold'>
                            <span className=""> {SCHEMA_CHANGE_TYPE[item.key]} </span>
                            <span className=""> {item.value} </span>
                        </div> : null
                    )
                    }
                </div>
                {value > 1 &&
                    <>
                        <Divider />
                        <div className='flex flex-col gap-2 px-5'>
                            <div className='font-RakutenSemibold flex w-3/4 justify-between'>
                                <span className=""> Total </span>
                                <span className=""> {value} </span>
                            </div>
                        </div>
                    </>}
            </div>
        </>
    );
}

export const ChartTooltip = ({ tooltipInfo, dataPointIndex, eventType, value, categories }) => {
    return ReactDOMServer.renderToStaticMarkup(
        <TooltipComponent
            {...{ tooltipInfo, dataPointIndex, eventType, value, categories }}
        />
    )
};
