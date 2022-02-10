import React, { useState } from 'react';
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

const data = {
	countries: [

		{
			name: "India",
			states: [
				{ name: "Maharashatra", cities: ["Pune", "Nagpur", "Mumbai", "Nashik"] },
				{ name: "Gujrat", cities: ["Surat", "Shelvas"] }
			]
		}
	]
};


const Newmember1 = ({ history }) => {

	const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [adultmember, setAdultmember] = useState("");
  const [belowmember, setBelowmember] = useState("");
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
        "/api/member",
        {
          name,
          mobile,
          email,
          address,
          country,
          state,
          city,
          adultmember,
          belowmember,
          password,
          confirmpassword,
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

    history.push("/auth/member");
  };

	return (
		<div className="row align-items-center text-left">
		
					 <ValidationForm id="" onSubmit={handleSubmit}>
                    <Form.Row>
                    <Form.Group as={Col} md="6">
                        <Form.Label htmlFor="clubname">Name</Form.Label>
                        <TextInput
                          name="clubname"
                          id="clubname"
                          placeholder=" Name"
                          autoComplete="off"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6">
                        <Form.Label htmlFor="clubname">Mobile Number</Form.Label>
                        <TextInput
                          name="clubname"
                          id="clubname"
                          placeholder="Club Name"
                          autoComplete="off"
                          onChange={(e) => setMobile(e.target.value)}
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
                        <Form.Label htmlFor="lastName">
                          Family members(Adult)
                        </Form.Label>
                        <TextInput
                          name="clubregnumber"
                          id="clubregnumber"
                          type="number"
                          placeholder=" Number"
                          minLength="4"
                          autoComplete="off"
                          onChange={(e) =>
                            setAdultmember(e.target.value)
                          }
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6">
                        <Form.Label htmlFor="lastName">
                          Family Members(Below 18)
                        </Form.Label>
                        <TextInput
                          name="clubregnumber"
                          id="clubregnumber"
                          type="number"
                          placeholder="Registration Number"
                          minLength="4"
                          autoComplete="off"
                          onChange={(e) =>
                            setBelowmember(e.target.value)
                          }
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
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                      >
                        Sign up
                      </button>
           
                    </Form.Row>
                  </ValidationForm>
				  </div>
			

	)
}

export default Newmember1;
