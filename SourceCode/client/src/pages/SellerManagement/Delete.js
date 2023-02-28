import React, {useRef} from 'react'
import { useDispatch } from 'react-redux';
import {Error, ErrorOutline} from '@material-ui/icons';
import Alert from '@mui/material/Alert';
import {s_delete} from '../../actions/seller_auth';
import { useNavigate} from 'react-router-dom';

export default function Delete() {
  const dispatch = useDispatch();
  const ref_delete = useRef();
  const navigate = useNavigate();

  const seller = JSON.parse(localStorage.getItem('seller_profile'));
  const sellerId = seller?.result?._id || seller?.result.googleId;

  return (
    <div>
      <p>Do you understand that deleting your account will permanently delete all of your data, including messages, contacts, and other information associated with your account?</p>
      <p>Do you understand that you cannot undo the delete action?</p>
      <button 
        type="submit" 
        className="font-thin text-sm inline-flex mt-6 items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-red-300 hover:bg-red-600 hover:font-bold text-white focus:outline-none focus-visible:ring-2"
        onClick={() => dispatch(s_delete(sellerId, navigate, ref_delete))}
      >
          DELETE
      </button>
      <Alert icon={<ErrorOutline fontSize="inherit"/>} className='invisible mt-4' ref={ref_delete} severity="error"></Alert>
    </div>
  )
}
