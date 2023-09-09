import dashboardIcon from 'assets/imagesMvp/dashboardIcon.svg';
import settingsIcon from 'assets/imagesMvp/settingIcon.svg';
import serviceIcon from 'assets/imagesMvp/serviceIcon.svg';
import alertsIcon from 'assets/imagesMvp/alertsIcon.svg';
import metricIcon from 'assets/imagesMvp/metricIcon.svg';
import integrationIcon from 'assets/imagesMvp/integrationIcon.svg';
import faqIcon from 'assets/imagesMvp/faqIcon.svg';
import logoutIcon from 'assets/images/logout.svg';
import '../layout.css';


export const upperLinks = [
    { 
        name: "Add Service", 
        link: "/addservice", 
        icon: serviceIcon,
        iconhovered:serviceIcon,
        imageWidth: '22px',
        imageHeight:'22px ',
        customClass: 'ml-2 flex items-center text-sm font-medium px-[0.5rem] py-[0.6rem] hover:bg-gray-800  rounded-full nav-bar-links',
    },
    { 
        name: "Dashboard", 
        link: "", 
        icon: dashboardIcon ,
        iconhovered:dashboardIcon,
        imageWidth: '22px',
        imageHeight: '20px',
        customClass: 'ml-2 flex items-center text-sm font-medium px-[0.5rem] py-[0.6rem] hover:bg-gray-800 rounded-full nav-bar-links',
    },
    { 
        name: "Metrics", 
        link: "/metrics", 
        icon: metricIcon ,
        iconhovered:metricIcon,
        imageWidth: '22px',
        imageHeight: '22px',
        customClass: 'ml-2 flex items-center text-sm font-medium px-[0.5rem] py-[0.6rem] hover:bg-gray-800 rounded-full nav-bar-links',
    },
    { 
        name: "Alerts", 
        link: "/alerts", 
        icon: alertsIcon,
        iconhovered:alertsIcon,
        imageWidth: '22px',
        imageHeight: '22px',
        customClass: 'ml-2 flex items-center text-sm font-medium px-[0.5rem] py-[0.6rem] hover:bg-gray-800 rounded-full nav-bar-links',
    },
    { 
        name: "Integration", 
        link: "", 
        icon: integrationIcon,
        iconhovered:integrationIcon,
        imageWidth: '22px',
        imageHeight: '22px',
        customClass: 'ml-2 flex items-center text-sm font-medium px-[0.5rem] py-[0.6rem] hover:bg-gray-800 rounded-full nav-bar-links',
    },
];

export const bottomLinks = [
    { 
        name: "Questions", 
        link: "", 
        icon: faqIcon,
        iconhovered:faqIcon,
        imageWidth: '22px',
        imageHeight: '22px',
        customClass: 'ml-2 flex items-center text-sm font-medium px-[0.5rem] py-[0.6rem] hover:bg-gray-800 hover:px-[0.6rem] rounded-full nav-bar-links',
    },
    { 
        name: "Settings", 
        link: "/settings", 
        icon: settingsIcon,
        iconhovered:settingsIcon,
        imageWidth: '22px',
        imageHeight: '22px',
        customClass: 'ml-2 flex items-center text-sm font-medium px-[0.5rem] py-[0.6rem] hover:bg-gray-800 rounded-full nav-bar-links',
    },
    { 
        name: "Logout", 
        link: "/logout", 
        icon: logoutIcon,
        imageWidth: '22px',
        imageHeight: '22px',
        customClass:'ml-2 flex items-center text-sm font-medium px-[0.5rem] py-[0.6rem] hover:bg-gray-800 rounded-full nav-bar-links'
    },
];