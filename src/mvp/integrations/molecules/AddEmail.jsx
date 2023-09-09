import React, { useState } from 'react';
import Input from 'core-modules/Input';
import deletIcon from 'assets/images/deletIcon.svg'
import { useDispatch } from 'react-redux';
import { saveEmails } from 'store';
import { toast } from 'react-toastify';
import { removeDuplicateObjects, findMatchingObjects } from 'helpers';

const AddEmail = ({
  state,
  setState,
  user,
  getListOfEmails
}) => {
  const dispatch = useDispatch();
  const [compState, setCompState] = useState({
    email: '',
    arrayOfEmails: [],
    warning: false,
    emptyError: false,
    duplicates: [],
  })

  const handleAddEmail = async () => {
    let setObj = { ...compState };
    if (!compState.email && setObj.arrayOfEmails.length === 0) {
      setCompState({ ...setObj, emptyError: true })
    } else {
      let arrayOfValues = getCommaSeparatedValues();
      if (arrayOfValues === 0) return;
      setObj['email'] = '';
      setObj['warning'] = false;
      setObj['emptyError'] = false;
      setObj.arrayOfEmails = arrayOfValues ? setObj.arrayOfEmails.concat(arrayOfValues) : setObj.arrayOfEmails;
      let newEmails = setObj.arrayOfEmails;
      setObj['duplicates'] = findMatchingObjects(state.emailList, removeDuplicateObjects(newEmails, 'email'), 'email');
      setCompState(setObj);
      if (setObj['duplicates'].length > 0) {
        return;
      }
      let response = await dispatch(saveEmails(newEmails)).unwrap();
      if (response.status === 200) {
        toast.success('Emails saved successfully', { position: toast.POSITION.TOP_CENTER, style: { backgroundColor: 'white', color: 'black' } });
        getListOfEmails();
      }
    }
  }
  const handleChange = ({ target }) => {
    setCompState({ ...compState, [target.name]: target.value, warning: false, emptyError: false, duplicates: [] })
  }

  const addEmails = () => {
    if (compState.email) {
      let arrayOfValues = getCommaSeparatedValues();
      if (arrayOfValues)
        setCompState({
          ...compState,
          arrayOfEmails: [...compState.arrayOfEmails, ...removeDuplicateObjects(arrayOfValues)],
          email: '', warning: ''
        })
    }
  }

  const getCommaSeparatedValues = () => {
    let arrayOfValues = compState.email.replaceAll(' ', '').split(',').filter(Boolean);
    let newArrays = [];
    let warning = false;
    arrayOfValues.forEach(mail => {
      if (!validateEmail(mail) && warning === false) {
        warning = true
      } else {
        newArrays.push({ tenantId: user.tenantId, email: mail });
      }
    })
    if (warning) {
      setCompState({ ...compState, warning })
      focus();
      return 0;
    }
    return newArrays;
  }

  const focus = () => {
    document.getElementById("emailinputField").focus();
  }

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const deleteCommaSeparatedValues = (index) => {
    let list = [...compState.arrayOfEmails]
    list.splice(index, 1);
    setCompState({ ...compState, arrayOfEmails: list })
  }

  return (
    <div className='flex flex-col gap-6 w-full min-h-48 bg-[#2C3033] mx-2'>
      <p className='font-RakutenRegular text-semibold text-white text-2xl'> Add Comma Separated Emails </p>
      <div>
        <Input
          handleChange={handleChange}
          handleKeyDown={(e) => e.key === 'Enter' ? addEmails() : null}
          customClass={"text-white login-fields bg-[#1F2022] border-transparent h-10 w-[98%] " + (compState.warning ? 'border-[#e26b6b]' : '')}
          name='email'
          id="emailinputField"
          value={compState.email || ''}
          type='text'
          isRequired={true}
          placeholder={'Enter email'}
        />
        {compState.warning && <p className="text-[#e26b6b] text-xs"> Please enter valid emails eg. abc@gmail.com </p>}
        {compState.emptyError && <p className="text-[#e26b6b] text-xs"> Please enter emails to Invite </p>}
        {compState.duplicates.length > 0 && <p className="text-[#e26b6b] text-xs">
          {compState.duplicates.map((email, index) => <span key={"email_" + index}> {email} {index === compState.duplicates.length - 1 ? '' : ', '} </span>)}
          {compState.duplicates.length === 1 ? 'email already exists' : 'emails are already exists'}
        </p>
        }
      </div>
      <div className='flex flex-wrap'>
        {(compState?.arrayOfEmails ?? []).map((mail, index) =>
          <div className='flex items-center gap-2' key={'email_id_' + index}>
            <span className='text-white font-RakutenRegular'> {mail.email} </span>
            <img src={deletIcon} alt="deletIcon" className="ml-auto h-4 w-4 cursor-pointer" title="Remove"
              onClick={() => deleteCommaSeparatedValues(index)}
            /><span className='text-white -ml-1 mr-2'>{`${index === compState.arrayOfEmails.length - 1 ? '' : ','}`}</span>
          </div>
        )}
      </div>
      <div className='flex justify-end mr-6'>
        <button className='flex items-center bg-[#f59600] hover:bg-[#bc7709] text-semibold text-black py-2 px-4 rounded-md'
          onClick={handleAddEmail}
        > Invite
        </button>
      </div>

    </div>
  );
};

export default AddEmail;
