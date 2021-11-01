import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useRouter} from 'next/router'
import Link from 'next/link'
import { toast } from 'react-toastify';
const options = [
  
  'DELETE',
  'EDIT',
];

const ITEM_HEIGHT = 48;

export default function LongMenu({id,token,deleteF}) {

  const router=useRouter()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async() => {

    
        const res =await fetch(`${process.env.PORT}/events/${id}`,{method:"DELETE"  
      ,headers:{
        Authorization: `Bearer ${token}`,
       }
    })
        if(!res.ok){
            toast.error('Something went wrong')
        }
        else{
            toast.error('Successfully Deleted')
            deleteF(id)
        }
        
        







    setAnchorEl(null);
    

  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >   <MenuItem>
            <Link href={`/event/edit/${id}`}  >
               EDIT
          </Link>
         </MenuItem>
         
       <MenuItem  onClick={handleClose}  >DELETE</MenuItem>
      </Menu>
    </div>
  );
}