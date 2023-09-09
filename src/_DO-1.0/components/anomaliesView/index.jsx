/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import ViewHeader from './molecules/ViewHeader';
import ViewData from './molecules/ViewData';
import InfoComponent from './molecules/InfoComponent';
import './anomalyView.css';
import { useLocation } from "react-router-dom";
import { getEntityData } from './reducers';
import { encodeDecoder, getQueryParamsObj } from 'helpers';
//
import { fetchAnomalyHeaderData } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { API_KEY, DQ_RULES, INPROGRESS, OPEN } from "_DO-1.0/reducers";
import { authState } from 'store';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  FRESHNESS,
  VOLUME,
  SCHEMA_CHANGE,
  FIELD_HEALTH
} from "_DO-1.0/reducers";

const freshnessData = getEntityData({
  "entity_level1": "default",
  "entity_level2": "avacado",
  "entity_level3": "chunk0.csv",
  "event_type": FRESHNESS,
  "event_description": "Table did not update in the last 31 mins",
  "current_status": OPEN
})
const volumeData = getEntityData({
  "entity_level1": "default",
  "entity_level2": "avacado",
  "entity_level3": "chunk0.csv",
  "event_type": VOLUME,
  "event_description": "Table size increased beyond 5K rows",
  "current_status": OPEN
})
const fieldData = getEntityData({
  "entity_level1": "default",
  "entity_level2": "avacado",
  "entity_level3": "chunk0.csv",
  "entity_level4": "ID",
  "event_type": FIELD_HEALTH,
  "event_description": `'ID' uniques is 98%`,
  "current_status": INPROGRESS
})

const schemaData = getEntityData({
  "entity_level1": "default",
  "entity_level2": "avacado",
  "entity_level3": "chunk0.csv",
  "event_type": SCHEMA_CHANGE,
  "event_description": `3 Schema changes detected`,
  "current_status": OPEN
});

const dqData = getEntityData({
  "entity_level1": "default",
  "entity_level2": "avacado",
  "entity_level3": "chunk0.csv",
  "event_type": DQ_RULES,
  "event_description": `PII Data - 98% Pass, 2% in warning`,
  "current_status": INPROGRESS
});

const Details = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(encodeDecoder(location.search, 1));
  const keys = ['eventId', 'eventType', 'connId', 'entityLevel1', 'entityLevel2', 'entityLevel3'];
  const queryParamsObj = getQueryParamsObj(queryParams, keys);
  const eventType = queryParamsObj.eventType;

  const dispatch = useDispatch();
  const { user } = useSelector(authState);
  const [state, setState] = useState({
    user: user,
    loaded: false,
    anomalyObject: {},
    timeLine: {},
  })

  const anomalyDataOfEntity =
    eventType === FRESHNESS ? freshnessData :
      eventType === VOLUME ? volumeData :
        eventType === FIELD_HEALTH ? fieldData :
          eventType === SCHEMA_CHANGE ? schemaData : dqData;

  useEffect(() => {
    getAnomalyHeaderData();
  }, [])

  const getAnomalyHeaderData = async () => {
    let setObj = { ...state };
    let response = await dispatch(fetchAnomalyHeaderData({ key: API_KEY.fetchAllAnomalyHeader, eventId: queryParamsObj.eventId })).unwrap();
    if (response.status === 200) {
      setObj['anomalyObject'] = response?.data?.anomaly_data ?? {};
      setObj['timeLine'] = response?.data?.status ?? {};
    }
    // else {
    //   setObj['anomalyObject'] = anomalyDataOfEntity;
    //   setObj['timeLine'] = [VOLUME, SCHEMA_CHANGE].includes(eventType) ? timeLine : timeLine2;
    // }
    console.log('individual alerts api => ', response);
    setObj['loaded'] = true;
    setState(setObj);
  }

  return (
    <div className="flex mx-5 gap-4">
      {state.loaded === true ? <>
        <div className="w-[75%]">
          <div className="">
            <ViewHeader state={state} getAnomalyHeaderData={getAnomalyHeaderData} {...queryParamsObj} />
          </div>
          <div className="">
            <ViewData
              anomalyObject={state.anomalyObject}
              schemaChanges={state?.anomalyObject?.attributes ?? []}
              queryParamsObj={queryParamsObj}
              user={user}
            />
          </div>
        </div>
        <div className="w-[25%]">
          <InfoComponent />
        </div>
      </> : null}
    </div>
  );
};

export default Details;
