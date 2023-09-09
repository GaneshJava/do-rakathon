import React, { useState, useEffect } from 'react';
import EmailList from './molecules/EmailList';
import emailIcon from 'mvp/assets/emaillistIcon.svg';
import addIcon from 'mvp/assets/addIcon.svg';
import emaildata from './constants/emaildata.json';
import AddEmail from './molecules/AddEmail';
import Modal from 'react-responsive-modal';
import closeIcon from 'mvp/assets/closeicon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmails, deleteEmail } from 'store';
import { authState } from 'store/slices/authSlice';
import { toast } from 'react-toastify';
import { Spinner } from 'core-modules/Loader';
const IntegrationIndex = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authState);

  const [state, setState] = useState({
    emailList: emaildata,
    showModal: false,
    loading: false
  });

  useEffect(() => {
    getListOfEmails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getListOfEmails = async () => {
    //API call to get email list
    let response = await dispatch(fetchEmails(user.tenantId)).unwrap();
    if (response.status === 200) {
      setState({ ...state, emailList: response.data, showModal: false, loading: true });
    } else {
      setState({ ...state, loading: true });
    }
  };

  const handleAddEmail = () => {
    setState({ ...state, showModal: true });
  };
  const handleClose = () => {
    setState({ ...state, showModal: false });
  };

  const deleteSelectedMails = async (email) => {
    let emailId = email?.row?.original?.emailId ?? 0;
    let response = await dispatch(deleteEmail(emailId)).unwrap();
    if (response.status === 200) {
      toast.success('Email deleted successfully', {
        position: toast.POSITION.TOP_CENTER,
        style: { backgroundColor: 'white', color: 'black' }
      });
    }
    let emailList = [...state.emailList];
    emailList.splice(email.row.index, 1);
    setState({ ...state, emailList });
  };

  const addEmailModal = () => {
    return (
      <div>
        <Modal
          center
          closeOnEsc
          closeIcon={<img className="mt-3 mr-3" src={closeIcon} alt="" />}
          open={state.showModal}
          classNames={{ modal: 'bg-[#2C3033] rounded-2xl w-full' }}
          onClose={() => handleClose()}>
          <AddEmail
            state={state}
            setState={setState}
            user={user}
            getListOfEmails={getListOfEmails}
          />
        </Modal>
      </div>
    );
  };

  return (
    <div className="mx-[2rem] mt-[2rem]">
      <div>
        <div className="flex flex-row justify-between">
          <div className="basis-1/2  flex gap-4 py-1">
            <img src={emailIcon} alt="emailIcon" className="w-7 h-7" />
            <span className=" text-xl font-RakutenSemibold">Email List</span>
          </div>
          <div className="basis-[5rem] bg-[#F59500] w-8 h-9 rounded-md flex-row">
            <button type="button" className="flex" onClick={handleAddEmail}>
              <img src={addIcon} alt="addIcon" className="py-3 px-2" />
              <p className="py-1 text-[#1F2022] text-lg font-RakutenSemibold">Add</p>
            </button>
          </div>
        </div>
      </div>
      {state.showModal === true && addEmailModal()}
      <div className="">
        {state.loading === true ? (
          <EmailList state={state} setState={setState} deleteSelectedMails={deleteSelectedMails} />
        ) : (
          <div className="flex w-full justify-center items-center mt-40">
            <Spinner customStyles={{ borderLeftColor: '#2e3032' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default IntegrationIndex;
