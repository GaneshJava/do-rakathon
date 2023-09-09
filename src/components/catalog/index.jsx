import React from "react"
import SearchCatalog from "./moleclues/SearchCatalog";
import CriticalTables from "./moleclues/CriticalTable";
import SearchedTables from "./moleclues/SearchedTable";
import TablesConfigured from "./moleclues/TablesConfigured";

const CatalogIndex = () => {
    return (
        <div className="flex flex-col gap-2">
            <SearchCatalog/>
        <div className="flex flex-col gap-4">
            <div className="mt-2 gap-4 flex flex-row items-start h-84">
                <div className="flex basis-[70%] flex-start justify-center">
                    <TablesConfigured />
                </div>
                <div className="flex basis-[30%]">
                   <SearchedTables/>
                </div>
            </div>
            <div className="flex ">
               <CriticalTables />
            </div>
        </div>
        </div>
    );
}

export default CatalogIndex
