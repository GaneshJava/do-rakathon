/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Menubar } from 'primereact/menubar';
import { items } from './reducers';
import logo from '../../../assets/images/rakutenLogo.svg';
import './navigationbar.css';
import settingsIcon from '../../assets/settingsIcon.svg';
import notificationIcon from "../../assets/notificationIcon.svg";
import collaboratorIcon from '../../assets/collaborator.svg';
import { updateNavBarChanges } from "store";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { userSignOut } from "store";

const NavigationBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const selectedNavKey = useSelector(state => state.navbar).selectedNavKey || extractNavPath(location?.pathname);

    const handleLogout = () => {
        dispatch(userSignOut());
    }

    useEffect(() => {
        setHeaders(items(handleClick, selectedNavKey))
    }, [selectedNavKey])

    const handleClick = ({ item, originalEvent }) => {
        originalEvent.preventDefault();
        dispatch(updateNavBarChanges({ selectedNavKey: item.uri, selectedNavLabel: item.label }))
        navigate(item.url)
    }

    const [headers, setHeaders] = useState(items(handleClick, selectedNavKey));


    return (
        <div className="flex w-full">
            <Menubar className="navigation-list text-xl gap-8"
                model={headers}
                start={
                    <Link to={'/'}>
                        <div className="flex flex-row gap-2 items-center">
                            <img src={logo} alt="RakutenLogo" className="w-20 h-[4rem]flex " />
                            <span className="text-base text-primaryTextColor flex items-center -mt-1">DO Platform</span>
                        </div>
                    </Link>
                }
                end={
                    <div className="flex flex-row gap-8 cursor-pointer">
                    </div>
                } />
        </div>
    )
}
const extractNavPath = url => url === '/' ? '/do-dashboard' : url.indexOf("/", 1) === -1 ?
    url :
    url.substring(0, url.indexOf("/", 1))

export default React.memo(NavigationBar);