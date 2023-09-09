import AppRoutes from "utils/AppRoutes";
import Header from "./header";

const AppLayout = (props) => {
    return (
        <div>
            <div className="bg-dark-app text-white h-screen w-screen overflow-hidden flex flex-row">
                <div className="flex flex-col flex-1">
                    <div className="flex flex-row bg-tertiaryBgColor h-[4rem] w-full px-10">
                        <Header />
                    </div>
                    <div className="flex-1 px-12 pt-8 pb-4 h-screen overflow-auto">
                        <AppRoutes />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AppLayout;