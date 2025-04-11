import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Header.css';
import setting from "../images/setting.png";
import sign from '../images/Logo.png';


//import { useAuth } from './AuthContext.jsx'
//import userIcon from '../img/user.png';;

const Header = (props) => {

  const navigate = useNavigate();
  
  return (
    <header id="header" className={props.attr} role="heading" aria-level="1">
      <div className="header__inner container">
        <div className="header_logo">
          <Link to="/"><img src={sign} height="100px" width="100px"/></Link>
        </div>
        <div className="header__nav" role="navigation">
          <ul className="main_ul">
            <li>
              <Link to="/transport">번역하기</Link>
            </li>
            <li>
              <Link to="/tosign">수어로 번역하기</Link>
            </li>
            <li>
              <Link to="/quiz">게임하기</Link>
            </li>
            <li>
              <Link to="/education">단어찾기</Link>
            </li>
          </ul>
        </div>
        <div>
              <Link to="/login"> <img src={setting} width={"30px"}/></Link>
            
        </div>
     </div>
    </header>
  );
};

export default Header;