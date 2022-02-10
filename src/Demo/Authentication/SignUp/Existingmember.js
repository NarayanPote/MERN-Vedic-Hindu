import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
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

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import DEMO from "../../../store/constant";

import logoDark from "../../../assets/images/logo-dark.png";

const data = {
  countries: [
    {
      name: "India",
      states: [
        {
          name: "Maharashatra",
          cities: ["Pune", "Nagpur", "Mumbai", "Nashik"],
        },
      ],
    },
  ],
};

const Existingmember = ({ history }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactpersonname, setContactPersonName] = useState("");
  const [contactpersonnumber, setContactPersonNumber] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPinCode] = useState("");
  const [website, setWebsite] = useState("");
  const [clubregistrationnumber, setClubRegistrationNumber] = useState("");
  const [yearofestablishment, setYearofEstablishment] = useState("");
  const [trustformed, setTrustFormed] = useState("");
  const [aregister, setARegister] = useState("");
  const [gregister, setGRegister] = useState("");
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const availableState = data.countries.find((c) => c.name === country);
  const availableCities = availableState?.states?.find((s) => s.name === state);






  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/clubusers",
        {
          name,
          contactpersonname,
          contactpersonnumber,
          email,
          password,
          confirmpassword,
          address,
          country,
          state,
          city,
          pincode,
          website,
          clubregistrationnumber,
          yearofestablishment,
          trustformed,
          aregister,
          gregister,
        },
        config
      );

      console.log(data);
      setErrorMessage("");
      setSuccessMessage("Successfully Registered !");
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      setErrorMessage("User Already Exists");
      setSuccessMessage("");
    }

    history.push("/auth/signin-1");
  };







  return (
    <Aux>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content" style={{'width':'800px'}}>
          <div className="card">
            <div className="row align-items-center text-left">
              <div className="col-md-12">
                <div className="card-body">
                  <img src={logoDark} alt="" className="img-fluid mb-4" />
                  <h4 className="mb-3 f-w-400">Existing Member</h4>

                  <ValidationForm id="" onSubmit={handleSubmit}>
                    <Form.Row>

                    <Form.Group
                        as={Col}
                        md="6"
                        controlId="exampleForm.ControlSelect1"
                      >
                        <Form.Label>Select Country</Form.Label>
                        <Form.Control
                          as="select"
                          placeholder="Country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          <option>Select </option>
                          {data.countries.map((value, key) => {
                            return (
                              <option value={value.name} key={key}>
                                {value.name}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="exampleForm.ControlSelect1"
                      >
                        <Form.Label>Select State</Form.Label>
                        <Form.Control
                          as="select"
                          placeholder="State"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        >
                          <option>Select </option>
                          {availableState?.states.map((e, key) => {
                            return (
                              <option value={e.name} key={key}>
                                {e.name}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>
                    
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="exampleForm.ControlSelect1"
                      >
                        <Form.Label>Select City</Form.Label>
                        <Form.Control
                          as="select"
                          placeholder="City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        >
                          <option>Select </option>
                          {availableCities?.cities.map((e, key) => {
                            return (
                              <option value={e.name} key={key}>
                                {e}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>


                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="exampleForm.ControlSelect1"
                      >
                        <Form.Label>Club</Form.Label>
                        <Form.Control
                          as="select"
                          placeholder="City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        >
                          <option>Select </option>
                          <option>Pune </option>
                          <option>Mumbai </option>

                        </Form.Control>
                      </Form.Group>




                      <Form.Group as={Col} md="6">
                        <Form.Label htmlFor="clubname">Member Name</Form.Label>
                        <TextInput
                          name="clubname"
                          id="clubname"
                          placeholder="Club Name"
                          autoComplete="off"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="6">
                        <Form.Label htmlFor="lastName">
                        Registered Mobile Number
                        </Form.Label>
                        <TextInput
                          name="personnumber"
                          id="personnumber"
                          placeholder="Person Number"
                          minLength="4"
                          autoComplete="off"
                          onChange={(e) =>
                            setContactPersonNumber(e.target.value)
                          }
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="6">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <TextInput
                          name="email"
                          id="email"
                          type="email"
                          placeholder="Email Address"
                          errorMessage={{
                            validator: "Please enter a valid email",
                          }}
                          autoComplete="off"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>



                      <Form.Group as={Col} md="6">
                        <Form.Label htmlFor="lastName">Address</Form.Label>
                        <TextInput
                          name="address"
                          id="address"
                          placeholder="Address"
                          minLength="4"
                          autoComplete="off"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="exampleForm.ControlSelect1"
                      >
                        <Form.Label>Select Country</Form.Label>
                        <Form.Control
                          as="select"
                          placeholder="Country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          <option>Select </option>
                          {data.countries.map((value, key) => {
                            return (
                              <option value={value.name} key={key}>
                                {value.name}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="exampleForm.ControlSelect1"
                      >
                        <Form.Label>Select State</Form.Label>
                        <Form.Control
                          as="select"
                          placeholder="State"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        >
                          <option>Select </option>
                          {availableState?.states.map((e, key) => {
                            return (
                              <option value={e.name} key={key}>
                                {e.name}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="exampleForm.ControlSelect1"
                      >
                        <Form.Label>Select City</Form.Label>
                        <Form.Control
                          as="select"
                          placeholder="City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        >
                          <option>Select </option>
                          {availableCities?.cities.map((e, key) => {
                            return (
                              <option value={e.name} key={key}>
                                {e}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group as={Col} md="6">
                        <Form.Label htmlFor="lastName">Family Members (Adult)</Form.Label>
                        <TextInput
                          name="pincode"
                          id="pincode"
                          placeholder="Family Members (Adult)"
                          minLength="4"
                          autoComplete="off"
                          onChange={(e) => setPinCode(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="6">
                        <Form.Label htmlFor="lastName">
                        Family Members (Below 18)
                        </Form.Label>
                        <TextInput
                          name="personname"
                          id="personname"
                          placeholder="Family Members (Below 18)"
                          minLength="4"
                          autoComplete="off"
                          onChange={(e) => setContactPersonName(e.target.value)}
                        />
                      </Form.Group>
                      
                      <Form.Group as={Col} md="6">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <TextInput
                          name="password"
                          id="password"
                          type="password"
                          placeholder="Password"
                          required
                          pattern="(?=.*[A-Z]).{6,}"
                          errorMessage={{
                            required: "Password is required",
                            pattern:
                              "Password should be at least 6 characters and contains at least one upper case letter",
                          }}
                          autoComplete="off"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6">
                        <Form.Label htmlFor="confirmPassword">
                          Confirm Password
                        </Form.Label>
                        <TextInput
                          name="confirmPassword"
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm Password"
                          required
                          errorMessage={{
                            required: "Confirm password is required",
                            validator: "Password does not match",
                          }}
                          autoComplete="off"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </Form.Group>

                     
                      {/* <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                      >
                        Sign up
                      </button> */}
                    

                      <Form.Group as={Col} sm={12} className="mt-3">
                                            <Button type="submit">Submit</Button>
                                        </Form.Group>
                    
                    </Form.Row>
                  </ValidationForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default Existingmember;
