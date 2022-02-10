import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import DualListBox from "react-dual-listbox";
import {
  ValidationForm,
  TextInput,
  BaseFormControl,
  SelectGroup,
  FileInput,
  Checkbox,
  Radio,
} from "react-bootstrap4-form-validation";
import axios from "axios";
import Existingmember from "./Existingmember";
import Clubregister2 from "./Clubregister2";
import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import DEMO from "../../../store/constant";

import logoDark from "../../../assets/images/logo-dark.png";

const Registeras = () => {
  const [selected, setSelected] = useState("");
  const [selected1, setSelected1] = useState("");

  const changeHandler = (e) => {
    setSelected(e.target.value);
  };

  const changeHandler1 = (e) => {
    setSelected1(e.target.value);
  };

 

  return (
    <Aux>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content" style={{ width: "800px" }}>
          <div className="card">
            <div className="row align-items-center text-left">
              <div className="col-md-12">
                <div className="card-body">
                  <img src={logoDark} alt="" className="img-fluid mb-4" />
                  <h4 className="mb-3 f-w-400">Are You Member of any club ?</h4>

                  <ValidationForm id="">
                    <Form.Row>
                      <Form.Group as={Col} md="6">
                        <Radio.RadioItem
                          type="radio"
                          name="yes"
                          value="yes"
                          id="yes"
                          checked={selected === "yes"}
                          onChange={changeHandler}
                          label="Yes"
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="6">
                        <Radio.RadioItem
                          type="radio"
                          name="no"
                          value="no"
                          id="no"
                          checked={selected1 === "no"}
                          onChange={changeHandler1}
                          label="No"
                        />
                      </Form.Group>

                    </Form.Row>
                  </ValidationForm>

                  <div>
                    {selected ? <Existingmember /> : ""}
                  </div>

                  <div>
                    {selected1 ? <Clubregister2 /> : ""}
                  </div>

               


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default Registeras;
