import React, { useEffect, useRef } from "react";
import PropsTypes from 'prop-types';

const Drawer = ({
    children = <></>,
    isOpen = false,
    setIsOpen = () => null,
    title = '',
    customClass = '',
    closeServiceDrawer = () => null
}) => {

    const drawerRef = useRef(null);
    useEffect(() => {
        document.addEventListener('click', hideOnClickOutside, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hideOnClickOutside = (e) => {
        if (drawerRef.current && !drawerRef.current.contains(e.target)) {
            // closeServiceDrawer(false);
        }
    };

    return (
        <main
            className={
                " fixed overflow-hidden z-[1000] bg-[#18181b] bg-opacity-80 inset-0 transform ease-in-out " +
                (isOpen
                    ? " transition-opacity opacity-100 duration-500 translate-x-0  "
                    : " transition-all delay-500 opacity-0 translate-x-full  ")
            }
        >
            <section
                className={
                    "w-screen right-0 max-w-[60%] absolute h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform -mr-1 " +
                    (isOpen ? " translate-x-0 " : " translate-x-full ") + customClass
                }
            >
                <article ref={ref => drawerRef.current = ref} className="relative w-screen max-w-full pb-2 flex flex-col overflow-y-scroll h-[95vh] bg-[#2d3032]">
                    {isOpen && children}
                </article>
            </section>
        </main>
    );
}

Drawer.propTypes = {
    children: PropsTypes.element,
    isOpen: PropsTypes.bool,
    setIsOpen: PropsTypes.func,
    title: PropsTypes.string
};

export default Drawer
