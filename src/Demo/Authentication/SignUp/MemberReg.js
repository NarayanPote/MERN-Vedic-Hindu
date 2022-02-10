import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import DEMO from "../../../store/constant";

import logoDark from '../../../assets/images/logo-dark.png';
import "./../../../style.css";

import Existingmember from '../../Element/Existingmember';
import Existingmember1 from '../../Element/Existingmember1';

 const MemberReg = ({ history }) => {
    
   
    
      const [selected, setSelected] = useState("");
      const changeHandler = (e) => {
        setSelected(e.target.value);
      };
    
      console.log(selected);

   



        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content" style={{'width':'600px'}}>
                        <div className="card">
                            <div className="row align-items-center text-center">
                                <div className="col-md-12">
                                    <div className="card-body">
                                        <img src={logoDark} alt="" className="img-fluid mb-4" />
                                        <h4 className="mb-3 f-w-400">Sign up</h4>
                                        <hr/>
                                        <h5 className="mb-3 f-w-400">Are You Member of any club ?</h5>
                                        <Form.Group>
                                            <Form.Check
                                                inline
                                                custom
                                                type="radio"
                                                label="Yes"
                                                name="yes"
                                                value="yes"
                                                id="yes"
                                                checked={selected === "yes"}
                                                onChange={changeHandler}
                                            />{" "}
                                            <Form.Check
                                                inline
                                                custom
                                                type="radio"
                                                label="No"
                                                value="no"
                                                id="no"
                                                checked={selected === "no"}
                                                name="no"
                                                onChange={changeHandler}
                                            />{" "}
                                        </Form.Group>
                                        <div aria-hidden={selected !== "yes" ? true : false}>
                                         <Existingmember />
                                        </div>

                                        <div aria-hidden={selected !== "no" ? true : false}>
                                        <Existingmember1 />
                                        </div>                
                                    
                                        {/* <button className="btn btn-primary btn-block mb-4">Sign up</button> */}
                                        <p className="mb-2">Already have an account? <NavLink to="/auth/member" className='f-w-400'>Signin</NavLink></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }

export default MemberReg;