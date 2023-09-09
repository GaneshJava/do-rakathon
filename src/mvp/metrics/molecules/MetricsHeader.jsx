/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRuleConfigData } from "store";
import { stateData, authState } from 'store';
import Button from 'core-modules/Button';
import { Link } from 'react-router-dom';
import MetricDataCard from './MetricDataCard';
import { getDataIcons, updateNodeValuesUsingNodeId, getCountOfEntities } from '../constants';
import ExceptionCharts from './ExceptionCharts';
import { getDispatchObject } from "mvp/dashboard/molecules/Graph";

const MetricsHeader = () => {
  const dispatch = useDispatch();
  const matricTreeState = useSelector(stateData['metrics']);
  let {type, label, key} = matricTreeState.activeNodeObj;
  const { user } = useSelector(authState);

  const { treeArray } = useSelector(stateData.treeArray);
  const [ state, setState ] = useState({});

  useEffect(() => {
      getCountOfRules(matricTreeState.activeNodeObj);
  }, [key]);

  const getCountOfRules = async (postObj) => {
    let dispatchObj = getDispatchObject('', user, postObj);
    let totalNumberOfEntities = getCountOfEntities(treeArray, dispatchObj);
    let response = await dispatch(getRuleConfigData(dispatchObj)).unwrap();
    let { status, data = {}} = response;
    let totalNumberRules = 0;
    if(status === 200) {
      totalNumberRules = Array.isArray(data) ? data.length : Object.keys(data).length;
      updateNodeValuesUsingNodeId({totalNumberRules, totalNumberOfEntities});
    }
  }

  const exceptionsData = (data, exceptionsCount = 0) => {
    setState({...state, distributionData: data, });
  }

  return (
    <div className="flex flex-col justify-between gap-8 bg-[#2C3033] mt-8 ml-5">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          {getDataIcons(type)}
          <span className="text-xl font-RakutenSemibold"> {label} </span>
        </div>
        {<div>
          <Link to="manage" state={{ component: 'manageMetrics' }}>
            <Button
              handleSubmit={() => console.log('true')}
              text="Manage Rules"
              className="font-RakutenSemibold button-color rounded"
            />
          </Link>
        </div>}
      </div>
      <div className='flex gap-14'>
        <MetricDataCard type={type} key={key}/>
      </div>
      <ExceptionCharts exceptionsData={exceptionsData}/>
    </div>
  );
};

export default MetricsHeader;
