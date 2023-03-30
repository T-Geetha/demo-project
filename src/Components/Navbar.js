

import React from 'react';
import {  Link } from "react-router-dom";
const navbar= () =>{
  return (
  <div class="sidenav">
    <li >
      <Link to="/Login">Login</Link>
    </li>
    <li>
      <Link to="/EditUser">EditUser</Link>
    </li>
    
  </div>
  );
}
export default navbar;