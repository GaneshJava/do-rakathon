import React from 'react';
import { useSelector } from "react-redux";
import { stateData } from "store";
import classNames from 'classnames';
import { detailSections } from '../constants';
import RenderGraph from './Graph';
import upArrow from 'mvp/assets/upArrow.svg';
import { _COLUMN, _DATABASE, _OVERALL, _TABLE } from 'mvp/constants';
import { _DISTRIBUTION } from '../constants';

const VolumeSchema = () => {
    const dashboardTreeState = useSelector(stateData['dashboard']);
    const { activeNodeObj } = dashboardTreeState;

    const [state, setState] = React.useState({
        expandVolume: true,
        expandSchema: true,
        expandDistribution: true,
    });

    const handleClick = ({ target: { id: name } }) => {
        setState({ ...state, [name]: !state[name] });
    };

    const getChartComponent = (section) => {
        const { childNodes = [], stateKey = '' } = section || {};
        let widthOfChartContainer = 'basis-[48%]';
        if (stateKey === "distribution" && activeNodeObj.type === _COLUMN)
            widthOfChartContainer = 'basis-[100%]'
        return (
            childNodes.map((subSection, _index) => <div key={'graphs'+_index} className={widthOfChartContainer}>
                <RenderGraph section={subSection} {...dashboardTreeState} />
            </div>
            )
        );
    }

    return (
        <div className="flex flex-col gap-16">
            {detailSections.map((section, _index) => {
                let { type } = activeNodeObj;
                if ((type === _COLUMN && _index === _DISTRIBUTION) || ([_DATABASE, _TABLE, _OVERALL].includes(type)))
                return (
                    <div className='flex flex-col gap-8' key={`volume_schema-${_index}`}>
                        <div className="flex justify-between cursor-pointer" id={section.expandKey} onClick={handleClick}>
                            <p className={classNames('text-xl', 'font-RakutenRegular')}> {section.label} </p>
                            <span className="cursor-pointer" name={section.expandKey}>
                                <img
                                    src={upArrow}
                                    alt=""
                                    name={section.expandKey}
                                    className={classNames(state[section.expandKey] ? 'rotate-0' : 'rotate-90', 'duration-500')}
                                />
                            </span>
                        </div>
                        <div
                            className={classNames(
                                'flex justify-between duration-500 gap-8 flex-wrap',
                                state[section.expandKey] ? 'opacity-100' : ' max-h-0 opacity-0'
                            )}>
                            {
                                state[section.expandKey] !== false && getChartComponent(section)
                            }
                        </div>
                    </div>
                );
                return true;
            })}

        </div>
    );
};

export default VolumeSchema;
