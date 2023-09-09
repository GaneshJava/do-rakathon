/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import { Menu } from 'primereact/menu';
import { customMenuTemplate } from '_DO-1.0/sharedComponents/customMenuTemplate';
import selectedRightIcon from '../../../assets/selectedRight.svg';
import CalendarComponent from '_DO-1.0/components/anomaliesList/molecules/Calendar';
import { Button } from 'primereact/button';
import dateIcon from '../../../assets/date.svg';
import downIcon from '../../../assets/downArrow.svg';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {
  statusTemplate,
  collaboratorsTemplate,
  timeBodyTemplate,
  elapsedTimeBodyTemplate,
  descriptionTemplate,
  eventTypeTemplate,
  severityTemplate
} from '../../anomaliesList/molecules/AnomaliesOverview';
import DQChart from './DQDetails';
import {
  dateDropDownOption,
  issueTypeOptions,
  detailedanomalyTableColumns,
  schemachangecolumns
} from '../../anomaliesList/reducers';
import { overallDetailedData } from '../../anomaliesList/molecules/Service';
import { customPaginatorTemplate } from "_DO-1.0/sharedComponents/customPaginatorTemplate";
import AnomalyChart from './AnomalyChart';
import { anomalyTabs } from '../reducers';
import classNames from 'classnames';
import { Checkbox } from "primereact/checkbox";
import rightArrow from '../../../assets/right-arrow.svg';
//
import { Loading } from "core-modules/Loader";
import { fetchAnomalyListOfAnAsset } from 'store';
import { useDispatch } from 'react-redux';
import { API_KEY, DQ_RULES, FIXED, SCHEMA_CHANGE } from "_DO-1.0/reducers";
import { getDatesInUTC } from '_DO-1.0/reducers';

const getDataBasedOnEntity = () => {
  return overallDetailedData;
}

const ViewData = ({ user, anomalyObject, queryParamsObj, schemaChanges, timeLine }) => {
  const dispatch = useDispatch();
  const { event_type } = anomalyObject;
  const menuLeft = useRef(null);
  const statusRef = useRef(null);
  const [open, setOpen] = useState(true);
  const [state, setState] = useState({
    eventType: event_type,
    dateSelected: 'last15days',
    dateSelectedLabel: 'Last 15 days',
    dateRange: [getDatesInUTC('last15days')],
    menuOptions: [],
    data: [],
    filteredRows: [],
    statusSelected: ['FIXED'],
    issueTypeSelected: [event_type],
    activeTab: event_type,
    collapseDataTable: false,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let domElement = document.getElementById('dateSelected');
    document.addEventListener('click', closeDatePicker, true);
    domElement.innerHTML = domElement.innerHTML || state.dateSelectedLabel;
    getAnomalyOfAnAsset();
  }, [state.dateRange, anomalyObject?.current_status]);

  const getAnomalyOfAnAsset = async () => {
    setLoaded(false)
    let setObj = { ...state };
    let response = await dispatch(fetchAnomalyListOfAnAsset({
      ...queryParamsObj,
      ...state.dateRange[0],
      key: API_KEY.fetchAnomaliesOfAnAsset,
      tenantId: user.tenantId
    })).unwrap();
    console.log('alerts of an asset:', response);
    if (response.status === 200)
      setObj['data'] = setObj['filteredRows'] = response?.data?.data ?? [];
    // else
    // setObj['data'] = setObj['filteredRows'] = getDataBasedOnEntity();
    setObj['filteredRows'] = setObj['data']?.filter(item => item.current_status === FIXED );
    setState(setObj);
    setLoaded(true);
  }

  const handleClick = (e, triggerFrom) => {
    if (triggerFrom === 'date') {
      setState({
        ...state,
        menuOptions: dateDropDownOption,
        closeMenuAfterSelect: true,
        triggerFrom
      });
    } else {
      setState({ ...state, menuOptions: [] });
    }
    menuLeft.current.toggle(e);
  };
  const refOne = useRef(null);

  const closeDatePicker = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      toggleCustomDate(false);
    }
  };

  const handleOptionSelect = ({ option }) => {
    let setObj = { ...state };
    if (state.triggerFrom === 'date' && option.key !== 'custom')
      setObj['dateRange'] = [getDatesInUTC(option.key)]
    setObj[`${state.triggerFrom}Selected`] = option.key;
    setObj[`${state.triggerFrom}SelectedLabel`] = option.label;
    setState(setObj);
    if (option.key === 'custom') toggleCustomDate(true);
  };

  const getBodyTemplate = (rowData, key) => {
    let template = null;
    switch (key) {
      case 'description':
        template = descriptionTemplate(rowData);
        break;
      case 'eventType':
        template = eventTypeTemplate(rowData);
        break;
      case 'severity':
        template = severityTemplate(rowData);
        break;
      case 'status':
        template = statusTemplate(rowData);
        break;
      case 'collaborators':
        template = collaboratorsTemplate(rowData);
        break;
      case 'resolution':
        template = rowData.comments;
        break;
      case 'time':
        template = timeBodyTemplate(rowData);
        break;
      case 'elapsedTime':
        template = elapsedTimeBodyTemplate(rowData);
        break;
      default:
        break;
    }
    return template;
  };

  const getOptionTemplate = (options = issueTypeOptions, stateKey = 'issueTypeSelected') => {
    return <ul className={classNames('bg-primaryBgColor', 'flex flex-col', 'gap-1 py-3', 'font-PrimaryFont text-primaryTextColor')}>
      {options.map((option, _i) =>
        <li key={_i} className={classNames('gap-3 flex pl-5 py-2', 'cursor-pointer', 'hover:bg-quaternaryBgColor')}>
          <Checkbox
            onChange={e => handleOptionSelectStatus({ option, e, stateKey }, options)}
            checked={state[stateKey].includes(option.key)}
          />
          {option.label}
        </li>
      )}
    </ul>
  }

  const handleOptionSelectStatus = ({ option, e, stateKey }, allOptions) => {
    e.stopPropagation()
    let setObj = { ...state };
    let selectedOption = [...setObj[stateKey]];
    if (option.key === 'all')
      handleAllCheckbox(setObj, stateKey, selectedOption, allOptions);
    else {
      if (selectedOption.includes(option.key))
        selectedOption.splice(selectedOption.indexOf(option.key), 1);
      else
        selectedOption.push(option.key);
      selectedOption = handleAllCheckbox(setObj, stateKey, selectedOption, allOptions, 1);
      setObj[stateKey] = selectedOption;
      setObj['filteredRows'] = filterOutAnomalies(setObj['searchTerm'], setObj['statusSelected'], setObj['issueTypeSelected'])
      setState(setObj);
    }
  }

  const handleAllCheckbox = (setObj, stateKey, selectedOption, allOptions, type = 0) => {
    if (type) {
      if (selectedOption.includes('all'))
        selectedOption.splice(selectedOption.indexOf('all'), 1);
      if (selectedOption.length === allOptions.length - 1)
        selectedOption.push('all')
      return selectedOption;
    }
    setObj[stateKey] = selectedOption.includes('all') ? [] : allOptions.map(option => option.key)
    setObj['filteredRows'] = filterOutAnomalies(setObj['searchTerm'], setObj['statusSelected'], setObj['issueTypeSelected'])
    setState(setObj);
  }

  const filterOutAnomalies = (searchTerm = '', selectedStatus, issueTypeSelected = []) => {
    let filteredRows = [];
    if (searchTerm || selectedStatus.length || issueTypeSelected.length) {
      let status = true;
      filteredRows = state.data.filter((item) => validateFilters(item, selectedStatus, issueTypeSelected, searchTerm, status))
    } else filteredRows = state.data;
    return filteredRows;
  }

  const validateFilters = (item, selectedStatus, issueTypeSelected, searchTerm, status) => {
    if (status && selectedStatus.length)
      status = selectedStatus.includes(item.current_status)
    if (status && issueTypeSelected.length)
      status = issueTypeSelected.includes(item.event_type)
    if (status && searchTerm)
      status = `${item['entity_level3']}`.toLowerCase().toString().indexOf(searchTerm.toLowerCase().toString()) !== -1;
    return status;
  }

  const handleTabChange = (tabKey) => { setState({ ...state, activeTab: tabKey }) }

  const updateCustomDate = (date) => {
    setState({ ...state, dateRange: date })
    toggleCustomDate(false);
  }
  const toggleCustomDate = (show) => setOpen(show);

  return (
    <div className='my-6'>
      {event_type === SCHEMA_CHANGE && (
        <div className="bg-[#18181B] p-5 rounded-lg">
          <span className='text-2xl '>Changes</span>
          <DataTable
            value={typeof schemaChanges === 'string' ? JSON.parse(schemaChanges) : []}
            tableStyle={{ minWidth: '50rem' }}
            selectionAutoFocus={false}
            className="anomalies-table  p-[2rem]">
            {schemachangecolumns.map((anomalyCol, _i) => (
              <Column key={'index_' + _i} field={anomalyCol.field} header={anomalyCol.name} />
            ))}
            <Column expander={false} style={{ width: '3rem' }} />
          </DataTable>
        </div>
      )}
      <div className="flex flex-row items-center justify-between m-6">
        <p className='flex flex-col'>
          <span className="text-2xl">Monitors </span>
          <span className="text-secondaryTextColor">Review Monitor trends </span>
        </p>
        <div className='flex'>
          <Button
            outlined
            className="border-secondaryBorderColor rounded-md"
            onClick={(e) => handleClick(e, 'date')}>
            <div className="flex gap-3">
              <img src={dateIcon} alt="date-icon" />
              <p id="dateSelected" className="font-RakutenSemibold text-tertiaryBtnText rounded-md">
                {state[`${state.triggerFrom}SelectedLabel`]}
              </p>
              <img src={downIcon} alt="down" />
            </div>
          </Button>
          <div className="relative w-0">
            {state.triggerFrom === 'date' && state.dateSelected === 'custom' && open === true && (
              <div ref={refOne} className="absolute right-[1rem] top-[3rem] z-10">
                <CalendarComponent
                  dateRange={state.dateRange}
                  updateCustomDate={updateCustomDate}
                  toggleCustomDate={toggleCustomDate}
                />
              </div>
            )}
          </div>
        </div>
        <Menu
          model={customMenuTemplate({
            options: state.menuOptions,
            onClick: handleOptionSelect,
            closeMenuAfterSelect: state.closeMenuAfterSelect,
            selectedOptionIcon: <img src={selectedRightIcon} alt="" />,
            selectedOption: state[`${state.triggerFrom}Selected`]
          })}
          popup
          ref={menuLeft}
          id={'popup_menu_left'}
        />
      </div>
      <div className="bg-[#18181b] rounded-lg p-5">
        <div className="flex flex-col gap-6">
          <ul className="flex flex-row gap-8 border-b">
            {anomalyTabs.map((tab) => (
              <li key={tab.key} className="flex flex-col relative" onClick={() => handleTabChange(tab.key)} >
                <p
                  id={tab.key}
                  className={`mx-2 cursor-pointer inline-block pt-4 pb-2 rounded-t-lg font-RakutenSemibold ${state.activeTab === tab.key
                    ? 'text-[#f59600]'
                    : 'text-[#667085] border-transparent cursor-default	'
                    }`}>
                  {tab.name}
                </p>
                {state.activeTab === tab.key && <span className='absolute -bottom-px left-0 right-0 border-b-2 border-[#f59600]'></span>}
              </li>
            ))}
          </ul>
          {state.activeTab === DQ_RULES ? <DQChart
            eventType={state.activeTab}
            dateRange={state.dateRange[0]}
            anomalyObject={anomalyObject}
            user={user} /> :
            <AnomalyChart
              eventType={state.activeTab}
              dateRange={state.dateRange[0]}
              anomalyObject={anomalyObject}
              user={user}
            />}
        </div>
        <div className='flex justify-between mx-2 mt-6 items-center'>
          <div className='flex gap-3 cursor-pointer' onClick={() => setState({ ...state, collapseDataTable: !state.collapseDataTable })}>
            <p> Show Past Anomalies </p>
            <img src={rightArrow} alt='' className={"transition duration-150 ease-out " + (state.collapseDataTable ? 'rotate-90' : '')} />
          </div>
          {
            [{ label: 'All issues', key: 'issueType' }].map((btn, _index) =>
              <Button outlined className='border-secondaryBorderColor rounded-md' key={_index}
                onClick={e => statusRef.current.toggle(e)}
              >
                <div className='flex gap-3'>
                  <p className='font-RakutenSemibold text-secondaryBtnText rounded-md'>
                    {`${btn.label} ${state[`${btn.key}Selected`].length ? `(${state[`${btn.key}Selected`].length})` : ''}`}
                  </p>
                  <img src={downIcon} alt='down' />
                </div>
              </Button>
            )
          }
        </div>
        <Menu model={
          customMenuTemplate({ optionTemplate: getOptionTemplate() })}
          popup ref={statusRef} id={"popup_menu_left"} />
        <div className={classNames(
          state.collapseDataTable ? 'overflow-auto' : 'max-h-0 overflow-hidden',
          'transition duration-150 ease-out'
        )}>
          <DataTable
            value={loaded ? state.filteredRows : []}
            dataKey="id"
            tableStyle={{ minWidth: '50rem' }}
            selectionAutoFocus={false}
            removableSort
            paginator
            paginatorTemplate={customPaginatorTemplate}
            rows={4}
            className="anomalies-table my-6"
            emptyMessage={loaded ? <p className="flex justify-center"> No Anomalies found </p> : <Loading />}
          >
            {detailedanomalyTableColumns.map((anomalyCol, _i) => (
              <Column
                key={'index_' + _i}
                field={anomalyCol.field}
                header={anomalyCol.name}
                body={(rowData) => getBodyTemplate(rowData, anomalyCol.key)}
                sortable={anomalyCol.key === 'time' ? true : false}
              />
            ))}
            <Column expander={false} style={{ width: '3rem' }} />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default ViewData;
