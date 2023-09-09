/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { Divider } from "primereact/divider";
import { monitorsData } from "../../reducers";
import Monitors from "./Monitors";
import slashIcon from '../../../../assets/slash.svg';
import Coverage from "../Coverage";
import CalendarComponent from "_DO-1.0/components/anomaliesList/molecules/Calendar";
import { dateDropDownOption } from "_DO-1.0/components/anomaliesList/reducers";
import { Button } from 'primereact/button';
import dateIcon from '../../../../assets/date.svg';
import downIcon from '../../../../assets/downArrow.svg';
import selectedRightIcon from '../../../../assets/selectedRight.svg';
import { customMenuTemplate } from "_DO-1.0/sharedComponents/customMenuTemplate";
import { Menu } from "primereact/menu";
import { getDatesInUTC } from '_DO-1.0/reducers';
import { useDispatch, useSelector } from "react-redux";
import { authState, fetchDashboardAssetCount, fetchDashboardEventsData } from "store";
import { volumeDataRoundUp } from "_DO-1.0/components/anomaliesView/reducers/chartReducer";
const EngDashboardIndex = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(authState);
    const menuLeft = useRef(null);
    const [open, setOpen] = useState(true);
    const refOne = useRef(null);
    const [loaded, setLoaded] = useState(false)
    const [state, setState] = useState({
        dateSelected: 'last15days',
        dateSelectedLabel: 'Last 15 days',
        dateRange: [getDatesInUTC('last15days')],
        downloadSelected: null,
        menuOptions: []
    });

    const [assetCountState, setAssetCountState] = useState({})

    useEffect(() => {
        let domElement = document.getElementById('dateSelected');
        document.addEventListener('click', closeDatePicker, true);
        domElement.innerHTML = domElement.innerHTML || state.dateSelectedLabel;
    }, []);

    useEffect(() => { getDatabaseAssetCount() }, [])

    const getDatabaseAssetCount = async () => {
        const response = await dispatch(fetchDashboardAssetCount(user.tenantId)).unwrap();
        if (response.status === 200)
            setAssetCountState(response?.data ?? {})
        setLoaded(true)
    }

    const closeDatePicker = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false);
        }
    };

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

    const handleOptionSelect = ({ option }) => {
        let setObj = { ...state };
        if (state.triggerFrom === 'date' && option.key !== 'custom')
            setObj['dateRange'] = [getDatesInUTC(option.key)]
        setObj[`${state.triggerFrom}Selected`] = option.key;
        setObj[`${state.triggerFrom}SelectedLabel`] = option.label;
        setState(setObj);
        if (option.key === 'custom') toggleCustomDate(true);
    };

    const updateCustomDate = (date) => {
        setState({ ...state, dateRange: date })
        toggleCustomDate(false);
    }

    const toggleCustomDate = (show) => setOpen(show);

    return (
        <>
            <div className="mx-5 flex justify-between items-center">
                <div className="flex flex-col">
                    <p className="text-primaryTextColor font-RakutenSemibold text-3xl"> Data Health </p>
                    <span className="text-secondaryTextColor"> Monitors & Health Scores across your data sources </span>
                </div>
                <div>
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
                    {state.triggerFrom === 'date' && state.dateSelected === 'custom' && open === true && (
                        <div ref={refOne} className="absolute right-[1rem] top-[3rem] z-10">
                            <CalendarComponent
                                dateRange={state.dateRange}
                                updateCustomDate={updateCustomDate}
                                toggleCustomDate={toggleCustomDate}
                            />
                        </div>
                    )}
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
            </div>
            <Divider />
            <div className="mx-10 mt-12">
                <ul className="w-3/4 flex justify-between">
                    {monitorsData.map(eachItem => {
                        let entityCount = volumeDataRoundUp(assetCountState[eachItem.key]);
                        entityCount = loaded ? (isNaN(entityCount) ? 0 : entityCount) : '';
                        return (
                            <li key={eachItem.key} >
                                <div className="flex flex-col">
                                    <label className="text-tertiaryTextColor"> {eachItem.label} </label>
                                    <p className="flex gap-2 items-baseline ">
                                        <span className="text-primaryTextColor font-RakutenSemibold text-3xl ml-2"> {entityCount} </span>
                                        {/* <img src={slashIcon} alt="/" />
                                        <span> {entityCount} </span> */}
                                    </p>
                                </div>
                            </li>
                        );
                    }
                    )}
                </ul>
                <Divider />
            </div>
            <Monitors
                dateRange={state.dateRange[0]}
                user={user}
            />
            <Coverage />
        </>
    )
}

export default React.memo(EngDashboardIndex);