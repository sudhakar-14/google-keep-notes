import React, { useEffect, useState } from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faRotateRight,faTableCells,faGear,faSearch } from '@fortawesome/free-solid-svg-icons'
import { onValue, ref } from 'firebase/database';
import { db } from '../firebase';

function HeaderDiv() {

  const [open,setOpen] = useState(false)

  const handleOpen = () =>{
    setOpen(!open)
  }

  return(
    <div>
      <header>
        <div className='header-left'>
          <FontAwesomeIcon icon={faBars} onClick={handleOpen}/>
          <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" alt=""/>
          <span>keep</span>
        </div>
        <div className='header-middle'>
          <span>
            <FontAwesomeIcon icon={faSearch}/>
          </span>
          <input type="" name="" placeholder='Search'/> 
        </div>
        <div className='header-right'>
            <span>
              <FontAwesomeIcon icon={faRotateRight}/>
            </span>
            <span>
              <FontAwesomeIcon icon={faTableCells}/>
            </span>
            <span>
              <FontAwesomeIcon icon={faGear}/>
            </span>
        </div>
      </header><hr/>
    </div>
  )
}

export default HeaderDiv