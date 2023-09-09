import React from "react";
import { Menubar } from 'primereact/menubar';
import { items } from '../reducers/navigationReducer';
import logo from '../../../../assets/images/rakutenLogo.svg';
import '../../header/navigationbar.css';
import settingsIcon from '../../../assets/settingsIcon.svg';
import notificationIcon from "../../../assets/notificationIcon.svg";
import collaboratorIcon from '../../../assets/collaborator.svg';

const NavigationBar = () => {
    return <div className="flex flex-row bg-tertiaryBgColor h-[4rem] px-[2rem] w-full">
        <div className="flex w-full">
            <Menubar className="navigation-list text-xl gap-8" model={items} start={
                <div className="flex flex-row gap-2 items-center">
                    <img src={logo} alt="RakutenLogo" className="w-20 h-[4rem]flex " />
                    <span className="text-base text-primaryTextColor flex items-center -mt-1">DO Platform</span>
                </div>
            } end={
                <div className="flex flex-row gap-8 cursor-pointer">

                </div>
            } />
        </div>

    </div>
}

export default React.memo(NavigationBar);