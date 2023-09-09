import React, { useState } from "react";
import classNames from "classnames";
import RulesComponent from "./RulesComponent";
import SetUpComponent from "./SetUpComponent";
import upArrow from 'mvp/assets/upArrow.svg';
import { useSelector } from "react-redux";
import { stateData } from "store";

const ConfigureMetrics = ({
    state,
    setState,
    rulesFetching,
    masterRules,
    masterRuleIds
}) => {
    const { treeArray = [] } = useSelector(stateData['treeArray']);
    const { setupComp } = state;

    const [compState, setCompState] = useState({
        expandMenu: {}
    })

    const handleClick = async (obj) => {
        if (!compState.expandMenu[obj.id]) 
            await rulesFetching(obj);
        setCompState({
            ...compState,
            expandMenu: {
                ...compState.expandMenu,
                [obj.id]: !compState.expandMenu[obj.id]
            }
        });
    };

    return (
        <div className="mt-6">
            {state.enableSetup === false ?
                <>
                    {setupComp === true ?
                        <RulesComponent
                            state={state}
                            setState={setState}
                            masterRules={masterRules}
                            masterRuleIds={masterRuleIds}
                        />
                        :
                        <div className="max-h-[40rem] overflow-scroll pr-2">
                        <ul>
                            {treeArray.map((database, _i) =>
                                <li className="flex flex-col border-t-2 border-[#4c4f51] py-4 px-2 font-semibold" key={'database_' + _i}>
                                    <div className="flex items-center cursor-pointer" onClick={() => handleClick(database)}>
                                        <span className="text-xl" > {database.label} </span> 
                                        <span className="ml-auto">
                                            <img
                                                src={upArrow}
                                                alt=""
                                                name={database.id}
                                                className={classNames(compState.expandMenu[database.id] ? 'rotate-0' : 'rotate-90', 'duration-500')}
                                            />
                                        </span>
                                    </div>
                                    <div
                                        className={classNames(
                                            'flex justify-between duration-500 gap-8 flex-wrap',
                                            compState.expandMenu[database.id] ? 'opacity-100' : ' max-h-0 opacity-0'
                                        )}>
                                        {compState.expandMenu[database.id] && <RulesComponent
                                            state={state}
                                            setState={setState}
                                            currentDatabase={database}
                                            masterRules={masterRules}
                                            masterRuleIds={masterRuleIds}
                                        />}
                                    </div>
                                </li>
                            )}
                        </ul>
                        </div>
                    }
                </>
                :
                <>
                    <SetUpComponent
                        state={state}
                        setState={setState}
                    />
                </>
            }
        </div>
    );
}

export default ConfigureMetrics;