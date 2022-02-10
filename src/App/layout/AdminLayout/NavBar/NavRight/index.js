import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {
    Row,
    Col,
    Button,
    OverlayTrigger,
    Tooltip,
    ButtonToolbar,
    ToggleButtonGroup,
    ToggleButton,
    Dropdown,
    DropdownButton,
    SplitButton,
    ButtonGroup
} from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
import Avatar2 from '../../../../../assets/images/user/avatar-2.jpg';
import { i18n } from "./../../../../../translations/i18n";
import { ExampleComponent } from "./../../../../../ExampleComponent";

class NavRight extends Component {
    
    constructor(prop){
    
        super(prop)
        this.handleOnclick = this.handleOnclick.bind(this);
    
        this.state = {
            listOpen: false,
            lang : "en",
            isLoading: true 
        };
    
    }
      
    
 
   
    handleOnclick = (e) => {
        e.preventDefault();
        this.setState({
          lang : e.target.value,
          isLoading: false 
  
        })
        i18n.changeLanguage(e.target.value);
      };


    logout = () => {
        localStorage.clear();
        // you can also like localStorage.removeItem('Token');
        window.location.href = "/auth/admin";
      };


    render() {
        // let user = JSON.parse(localStorage.getItem("user-info"));
        // console.warn(user);

        return (
            <Aux> 
            {/* <div>
           <button value="en" onClick={this.handleOnclick}>
        English
      </button>
      <button value="es" onClick={this.handleOnclick}>
        Hindi
      </button>
      </div> */}
                <ul className="navbar-nav ml-auto">
                <li>
                        <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-flag"/>
                                {/* <span>Language</span> */}
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                 {/* <div className="pro-head">
                                 <button value="en" onClick={this.handleOnclick}> English </button>
                                 <button value="es" onClick={this.handleOnclick}>Hindi</button>

                                </div> */}
                                          
                                <ul className="pro-body">
                                    <li> <button  className="dropdown-item" value="en" onClick={this.handleOnclick}><i className="feather icon-globe"/>&nbsp;&nbsp;&nbsp;&nbsp;English</button></li>
                                    <li> <button  className="dropdown-item" value="es" onClick={this.handleOnclick}><i className="feather icon-globe"/>&nbsp;&nbsp;&nbsp;&nbsp;Hindi</button></li>
                               
                                    {/* <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-globe"/> English</a></li>
                                    <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-globe"/> Hindi</a></li> */}
                                   
                                </ul> 
                                

                                
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>



                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout}>
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="feather icon-bell icon"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="notification">
                                <div className="noti-head">
                                    <h6 className="d-inline-block m-b-0">Notifications</h6>
                                    <div className="float-right">
                                        <a href={DEMO.BLANK_LINK} className="m-r-10">mark as read</a>
                                        <a href={DEMO.BLANK_LINK}>clear all</a>
                                    </div>
                                </div>
                                <div style={{height: '300px'}}>
                                    <PerfectScrollbar>
                                        <ul className="noti-body">
                                            <li className="n-title">
                                                <p className="m-b-0">NEW</p>
                                            </li>
                                            <li className="notification">
                                                <div className="media">
                                                    <img className="img-radius" src={Avatar1} alt="Generic placeholder"/>
                                                    <div className="media-body">
                                                        <p><strong>John Doe</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10"/>5 min</span></p>
                                                        <p>New ticket Added</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="n-title">
                                                <p className="m-b-0">EARLIER</p>
                                            </li>
                                            <li className="notification">
                                                <div className="media">
                                                    <img className="img-radius" src={Avatar2} alt="Generic placeholder" />
                                                    <div className="media-body">
                                                        <p><strong>Joseph William</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10"/>10 min</span></p>
                                                        <p>Prchace New Theme and make payment</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="notification">
                                                <div className="media">
                                                    <img className="img-radius" src={Avatar1} alt="Generic placeholder" />
                                                    <div className="media-body">
                                                        <p><strong>Sara Soudein</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10"/>12 min</span></p>
                                                        <p>currently login</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="notification">
                                                <div className="media">
                                                    <img className="img-radius" src={Avatar2} alt="Generic placeholder" />
                                                    <div className="media-body">
                                                        <p><strong>Joseph William</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                                        <p>Prchace New Theme and make payment</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </PerfectScrollbar>
                                </div>
                                <div className="noti-footer">
                                    <a href={DEMO.BLANK_LINK}>show all</a>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-user"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div className="pro-head">
                                    <img src={Avatar1} className="img-radius" alt="User Profile"/>
                                    <span>John Doe</span>
                                    <a href={DEMO.BLANK_LINK} className="dud-logout" title="Logout">
                                        <i className="feather icon-log-out"/>
                                    </a>
                                </div>
                                {/* <ul className="pro-body">
                                    <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-settings"/> Settings</a></li>
                                    <li><a href={"/users/user-profile"} className="dropdown-item"><i className="feather icon-user"/> Profile</a></li>
                                    <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-mail"/> My Messages</a></li>
                                    <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-lock"/> Lock Screen</a></li>
                                    <li><a href={DEMO.LOGIN_LINK} className="dropdown-item"><i className="feather icon-lock"/> Log In</a></li>
                                    <li><a href={DEMO.Registeras} className="dropdown-item"><i className="feather icon-lock"/> Register As</a></li>
                                    <li><NavLink to="#" className="dropdown-item" onClick={this.logout}><i className="feather icon-lock"/>Log Out</NavLink></li>
                                </ul> */}

                                {  localStorage.getItem('user') ?
                                <ul className="pro-body">
                                    <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-settings"/> Settings</a></li>
                                    <li><a href={"/users/user-profile"} className="dropdown-item"><i className="feather icon-user"/> Profile</a></li>
                                    <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-mail"/> My Messages</a></li>
                                    <li><NavLink to="#" className="dropdown-item" onClick={this.logout}><i className="feather icon-lock"/>Log Out</NavLink></li>
                                </ul>
                                :
                                <ul className="pro-body">
                               
                                    <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-mail"/> My Messages</a></li>
                                    <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-lock"/> Lock Screen</a></li>
                                   
                                </ul> 
                                }

                                
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
            </Aux>
        );
    }
}

export default NavRight;
