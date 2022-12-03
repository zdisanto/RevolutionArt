import React from 'react'
import { NavLink, useRoutes } from 'react-router-dom';

import routes from '../../routes/routes';

const Sidebar = () => {
  function highlight({isActive}){
    return isActive? 'list-group-item myActive' : 'list-group-item'
  }

  const element=useRoutes(routes)
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-2" >
          <div className="list-group">
            <NavLink className={highlight} to="/newin">NewIn</NavLink>
            <NavLink className={highlight} to="/sale">Sale</NavLink>
            <NavLink className={highlight} to="/artgallery">Art Gallery</NavLink>
            <NavLink className={highlight} to="/discover">Discover</NavLink>
          </div>
        </div>
        <div className='col-md-10'>
          <div className="panel">
            <div className="panel-body">
              {element}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar