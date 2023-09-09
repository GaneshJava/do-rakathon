import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import expandmenuIcon from 'assets/imagesMvp/expandmenuIcon.svg';
import { upperLinks, bottomLinks } from "./navlinks";
import { useDispatch } from "react-redux";
import { userSignOut } from "store";
import '../layout.css';

const LeftSideNav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    let breadCumbs = useLocation().pathname.split('/').filter(Boolean);
    const currentPath = breadCumbs.length ? `/${breadCumbs[0]}` : '/home';

    const handleLogout = () => {
        dispatch(userSignOut());
    }

    const getNavLinks = (menu, i) => {
        const navObj = { key: i, i, open, currentPath, menu, handleLogout }
        return <GetNavigationLink {...navObj} />
    }

    return (
        <section className="flex relative gap-6">
            <div className={`bg-[#121212] min-h-screen w-14 duration-500`}>
                <div className={`flex flex-col ${open ? 'w-60' : 'w-12'} transition-all duration-500 ${open ? 'absolute ease-in-out z-50 bg-[#121212]' : ''}`}>
                    <div className={`pt-6 px-[0.5rem] ml-2 pb-14 flex`}>
                        <img
                            src={open ? expandmenuIcon: expandmenuIcon}
                            className="cursor-pointer"
                            onClick={() => setOpen(!open)}
                            alt="Nav-bar"
                        />
                    </div>
                    <div className={`flex flex-col`}>
                        <span> D</span>
                        <span className={`transition-all duration-500 ${open ? 'visible' : 'hidden'} justify-center`}>Demo user</span>
                    </div>
                    <div className={`flex flex-col duration-500 h-screen`}>
                        <div className="flex flex-col gap-6 relative basis-[70%]">
                            {upperLinks.map((menu, i) => getNavLinks(menu, i))}
                        </div>
                        <div className="flex flex-col gap-6">
                            {bottomLinks.map((menu, i) => getNavLinks(menu, i))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const GetNavigationLink = ({ open, currentPath, menu, i, setOpen, handleLogout = () => null }) => {
    let clicked = currentPath === menu.link;
    return (
        <Link
            to={menu.link === '/logout' ? '/login' : menu.link}
            // onClick={() => menu.link === '/logout' ? handleLogout() : setOpen(!open)}
            key={i}
            className={`${menu.customClass} ${open ? 'w-56' : 'w-10'} ${clicked ? '-active bg-gray-800 ' : (menu.link !== '/logout' ? ' group ' : '')} ${clicked ? '' : menu.hoverClass}`}
        >
            <div className="">
                <img
                    src={menu.icon}
                    className="pl-[0.11rem] group-hover:hidden"
                    alt={menu.name}
                    style={{ maxWidth: 'none', width: menu.imageWidth, height: menu.imageHeight }}
                  
                />
                <img src={menu.iconhovered} className="pl-[0.11rem] hidden group-hover:block "  alt={menu.name} style={{ maxWidth: 'none', width: menu.imageWidth, height: menu.imageHeight  }}/>
            </div>
           
            <h2 className={`ml-6 whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`} >
                {menu.name}
            </h2>
        </Link>
    );
}

export default LeftSideNav;