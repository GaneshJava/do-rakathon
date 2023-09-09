import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateService, serviceState } from 'store';
// import mysqlLogo from 'assets/images/mysqlLogo.svg';
import LabelField from 'core-modules/LabelField';

const ConfigurationService = () => {
  const { service: { name, description }, warning } = useSelector(serviceState);
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    dispatch(updateService({ key: name, value }))
  }

  return (
    <div>
      <div className="px-10">
        <div>
          <LabelField
            title={'Service name'}
            mandotory={true}
            className="font-RakutenSemibold text-[16px] mt-7"
            astrickClass="after:content-['*'] after:text-[#f59600]"
            customStyle={{ fontSize: '16px' }}
          />
          <div>
            <input
              onChange={handleChange}
              name='name'
              value={name}
              placeholder="Enter service name"
              className={`bg-[#2d3032] focus:outline-none focus:border-[#B9B6B6] border border-[#808080] h-[2.4rem] px-2 w-full rounded mt-3 placeholder:text-[#808080] placeholder:text-sm ${warning['nameWarning'] ? 'border-[#e26b6b]' : ''}`} />
            {warning['nameWarning'] && <p className="text-[#e26b6b] text-sm"> Service name is required field </p>}

          </div>
        </div>
        <div>
          <LabelField
            title={'Description'}
            mandotory={false}
            className="font-RakutenSemibold text-[16px] mt-9"
            customStyle={{ fontSize: '16px' }}
          />
          <div>
            <textarea
              onChange={handleChange}
              name='description'
              value={description}
              placeholder='Write your description'
              className='border border-[#808080] bg-[#2d3032] px-2 focus:outline-none focus:border-[#B9B6B6] rounded w-full h-[15rem] mt-3 pt-2 placeholder:text-[#808080] placeholder:text-sm' />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfigurationService;
