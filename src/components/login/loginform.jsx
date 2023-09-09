import React, { useState } from 'react';
import Input from 'core-modules/Input';
import LabelField from 'core-modules/LabelField';
import Button from 'core-modules/Button';

import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import WarningText from 'core-modules/WaringText';
import { userSignIn, configLogin } from 'store';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import logo from 'assets/images/rakutenLogo.svg'
import classNames from 'classnames';

const Loginform = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value, [`${name}Warning`]: false });
  };

  const [state, setState] = useState({
    id: '',
    email: '',
    password: '',
    emailWarning: '',
    passwordWarning: '',
    showPassword: false,
    unrecognized: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorObj = validate(state);
    if (Object.keys(errorObj).length === 0) {
      const response = await dispatch(userSignIn({ username: state.email, password: state.password })).unwrap();
      handleLoginResponse(response)
    } else {
      setState({ ...state, ...errorObj });
    }
  };

  const handleLoginResponse = (response) => {
    const { status, data } = response || { status: 400, data: 'Error occured while login.' };
    let alertText = typeof data === 'string' && data.length < 30 ? data : 'Error occured while login';
    if (status !== 200) {
      toast.error(alertText, {
        position: toast.POSITION.BOTTOM_CENTER,style:{backgroundColor:'#F59502', color: 'black'}, className: "bg-toast"
      });
    } else {
      dispatch(configLogin({ data }));
    }
  }

  const validate = (values) => {
    let errors = {};
    const { email, password } = values;
    if (!email || !validateEmail(email)) {
      errors.emailWarning = true;
    }
    if (!password || password.length < 8) {
      errors.passwordWarning = true;
    }
    return errors;
  };

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  return (
    <div className='flex flex-col gap-16 shadow-md shadow-[#141414] px-8 pt-12 py-6'>
      <div className=" flex flex-row gap-3 flex justify-center">
        <img src={logo} alt="logo" width={170} height={130} />
        <div className='flex text-4xl font-RakutenSemibold'>DO Platform</div>
      </div>
      <form onSubmit={handleSubmit} className="">
        <div className="flex flex-col gap-7">
          <div className='h-[6rem]'>
            <div className="text-white ">
              <LabelField title={'Email'} titleClass="text-base" mandotory={false} className="" />
            </div>
            <div className=" relative mb-15 ">
              <Input
                handleChange={handleChange}
                handleKeyDown={(e) => e.key === 'Enter' ? handleSubmit(e) : null}
                labelText="Email"
                labelFor="email-address"
                name="email"
                value={state.email}
                type="text"
                isRequired={true}
                placeholder="Email Address"
                customClass={classNames(`h-11 text-white bg-[#1f2023] w-full`, state.emailWarning ? ' border border-errorTextColor' : 'border border-none')}
              />
              {state.emailWarning && (
                <small className="text-errorTextColor">Please enter valid Email</small>
              )}
            </div>
          </div>

          <div className=' h-[4rem]'>
            <div>
              <LabelField title={'Password'} titleClass="text-base" mandotory={false} className="" />
            </div>
            <div className="relative">
              <Input
                handleChange={handleChange}
                handleKeyDown={(e) => e.key === 'Enter' ? handleSubmit(e) : null}
                labelText="Password"
                labelFor="password"
                name="password"
                value={state.password}
                type={state.showPassword === false ? 'password' : 'text'}
                isRequired={true}
                placeholder="Password"
                customClass={classNames(`h-11 text-white bg-[#1f2023] w-full`, state.passwordWarning ? ' border border-errorTextColor' : 'border border-none')}
              />
              {state.passwordWarning && (
                <small className="text-errorTextColor">Please enter valid Password</small>
              )}
              <span
                className="absolute"
                onClick={() => setState({ ...state, showPassword: !state.showPassword })}
                style={{
                  color: 'white',
                  right: '10px',
                  bottom: state.passwordWarning ? '42px' : '14px',
                  zIndex: 100,
                  cursor: 'pointer'
                }}>
                {' '}
                {state.showPassword ? (
                  <BsFillEyeFill className="" />
                ) : (
                  <BsFillEyeSlashFill className="" />
                )}{' '}
              </span>
            </div>
          </div>



          <div className="text-sm  ">
            <a
              href="/#"
              className="font-medium text-slate-100 hover:underline hover:underline-offset-4 hover:text-[#efb053] font-RakutenRegular flex justify-end">
              Forgot Password?
            </a>
          </div>

          <div className="">
            <Button text="Login" handleSubmit={handleSubmit} className="text-base border border-[#f59404] bg-[#efb053] text-black hover:bg-[#f59404]" />
          </div>
          <div className="">
            <WarningText text={state.warningText} />
          </div>
        </div>

      </form>
    </div>
  );
};
export default Loginform;
