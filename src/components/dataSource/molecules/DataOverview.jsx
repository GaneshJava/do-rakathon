import React from 'react';
import mysqlLogo from 'assets/images/mySql.svg';
import snowflakeLogo from 'assets/images/snowflake.svg';
import Button from 'core-modules/Button';
import plusIcon from 'assets/images/plusIcon.svg';
import DataCard from './DataCard';
import Chart from 'components/charts';
import { TableCharts } from 'components/catalog/constants';

const DataOverview = (props) => {
  const name = 'ichiba_details';
  const type = 'mysql';


  const getTableCharts = () => {
    return (
      <div className="flex gap-6 w-full text-white grid grid-cols-2 gap-2 chart-card">
        {TableCharts.map((chart) => {
         if(!['data-observability-freshness', 'data-observability-distribution'].includes(chart.id)) return null;
         return (
          <div
            id={chart.id}
            key={chart.id}
            style={{
              padding: '13.5px 0px 20.6px 0px',
              borderRadius: '12px',
              boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
              backgroundColor: '#0d0d0d'
            }}>
            <Chart
              title={chart.name}
              type={chart.type}
              options={chart.options}
              series={chart.series}
              showCustomLegendTable={false}
              height="315rem"
              titleIcon={chart.titleIcon}
            />
          </div>
         )
        }
        )}
      </div>
    );
  };


  return (
    <div className="w-full ">
      <div className="flex w-full h-20">
        <div className="flex w-full gap-2 mt-2">
          <img src={type === 'mysql' ? mysqlLogo : snowflakeLogo} alt="" className="w-8 h-8 " />
          <p className="font-RakutenSansUISemiBold text-2xl">{name}</p>
        </div>
        <div className="flex gap-4 justify-end -mt-[2rem] w-full">
          <Button
            subText={<img src={plusIcon} alt="plusIcon" />}
            subTextClass="pt-1"
            text=" Create metrics"
            className="border-[#f59600] text-[#f59600] h-[2.5rem] w-36 gap-2  font-RakutenRegular px-[0.2rem] rounded"
          />
          <Button
            subText=" "
            subTextClass=""
            text="Manage metrics"
            className=" border-[#f59600]  gap-2 text-[#f59600] font-RakutenRegular px-[0.2rem] h-[2.5rem] w-36 rounded"
          />
          <Button
            subText=" "
            subTextClass=""
            text="Monitor metrics"
            className=" border-[#f59600]  gap-2 text-[#f59600] font-RakutenRegular px-[0.2rem] h-[2.5rem] w-36 rounded"
          />
        </div>
      </div>
      <div className="flex flex-row gap-6">
        <DataCard />
      </div>
      <div className='w-full flex mt-5'>
            {getTableCharts()}
      </div>
    </div>
  );
};
export default DataOverview;
