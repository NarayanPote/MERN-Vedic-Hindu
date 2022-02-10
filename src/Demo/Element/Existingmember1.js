import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import './../../assets/scss/style.scss';
import Aux from "../../hoc/_Aux";
import "./../../style1.css";

import Newmember from './../Element/Newmember';
import Newmember1 from './../Element/Newmember1';

 const Existingmember1 = ({ history }) => {
    
   
      const [selected1, setSelected] = useState("");
      const changeHandler = (e) => {
          setSelected(e.target.value);
      };
      console.log(selected1);

        return(
            
        
              
                            <div className="row align-items-center text-center">
                                <div className="col-md-12">
                                    <div className="card-body">
                                    
                                         <hr/>
                                        <h5 className="mb-3 f-w-400">Do you want any club membership ?</h5>
                                        <Form.Group>
                                            <Form.Check
                                                inline
                                                custom
                                                type="radio"
                                                label="Yes"
                                                name="yes"
                                                value="yes"
                                                id="yes1"
                                                checked={selected1 === "yes"}
                                                onChange={changeHandler}
                                            />{" "}
                                            <Form.Check
                                                inline
                                                custom
                                                type="radio"
                                                label="No"
                                                value="no"
                                                id="no1"
                                                checked={selected1 === "no"}
                                                name="no"
                                                onChange={changeHandler}
                                            />{" "}
                                        </Form.Group>
                                        <div aria-hidden={selected1 !== "yes" ? true : false}>
                                        <Newmember />
                                        </div>

                                        <div aria-hidden={selected1 !== "no" ? true : false}>
                                        <Newmember1 />
                                        </div>                
                                       
                                    </div>
                                </div>
                            </div>
                  
            
        );
    }

export default Existingmember1;