import React, { useState } from "react";
import classNames from "classnames";
import PipelineIndex from '../airflowPipelines/index'; 
import MatillionMain from './MatillionMain';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const COMPONENTS = [
    {key:'airflow', label: 'Airflow'}, 
    {key:'matillion', label: 'Matillion'}
];

const MatallianIndex = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const componentKey = queryParams.get('_key') || 'airflow';
    const [selectedComponent, setComponent] = useState(componentKey)

    useEffect(() => {
        setComponent(componentKey)
    }, [componentKey])

    const handleTabChange = (key) => {
        navigate(`/pipeline?_key=${key}`);
    }
    return (
        <div className="flex -mt-3 flex-col">
            <div className="flex justify-center">
                {COMPONENTS.map(item =>
                    <div
                        key={'key_' + item.key}
                        onClick={() => handleTabChange(item.key)}
                        className={classNames("duration-500 ease-in-out py-2 px-3 rounded-lg cursor-pointer", 'font-RakutenSemibold',
                            selectedComponent === item.key ? 'bg-secondaryBtnText text-black' : 'bg-secondaryBgColor'
                        )}>
                        <p> {item.label} </p>
                    </div>)
                }
            </div>
            <div>
                {selectedComponent === 'airflow' ? 
                <PipelineIndex /> : <MatillionMain /> 
                }
            </div>
        </div >
    );
}

export default MatallianIndex;