import React from 'react'
import { NavLink, Outlet} from 'react-router-dom';

const NewIn = () => {
  function highlight({isActive}){
    return isActive? 'list-group-item myActive' : 'list-group-item'
  }

  return (
    <div>
      <h3>Here is carousel of NewIn!</h3>
      <div>
        <ul className="nav nav-pills nav-fill">
          <li className='nav-item'>
            <NavLink className={highlight} to="category1">Emerging Artist</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className={highlight} to="category2">Famous Artist</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className={highlight} to="category3">Art Lovers</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className={highlight} to="category4">Others</NavLink>
          </li>
        </ul>
        {/*register routes */}
        <Outlet/>
      </div>
    </div>
  )
}

export default NewIn
