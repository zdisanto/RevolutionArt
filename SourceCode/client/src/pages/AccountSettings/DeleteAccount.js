import React, {useRef} from 'react'
import { useDispatch } from 'react-redux';
import {Error, ErrorOutline} from '@material-ui/icons';
import Alert from '@mui/material/Alert';
import {deleteUser} from '../../actions/auth';
import { useNavigate} from 'react-router-dom';

export default function DeleteAccount() {
  const dispatch = useDispatch();
  const ref_delete = useRef();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?._id || user?.result.googleId;

  return (
    <div className='px-20 py-10'>
      <p>Do you understand that deleting your account will permanently delete all of your data, including messages, contacts, and other information associated with your account?</p>
      <button 
        type="submit" 
        className="font-thin text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-red-300 hover:bg-red-700 text-white focus:outline-none focus-visible:ring-2"
        onClick={() => dispatch(deleteUser(userId, navigate, ref_delete))}
      >
          DELETE
      </button>
      <Alert icon={<ErrorOutline fontSize="inherit"/>} className='invisible mt-4' ref={ref_delete} severity="error"></Alert>
    </div>
  )
}
