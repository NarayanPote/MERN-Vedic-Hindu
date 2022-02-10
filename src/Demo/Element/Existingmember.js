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

const data = {
  countries: [
    {
      name: "India",
      states: [
        {
          name: "Maharashatra",
          cities: ["Pune", "Nagpur", "Mumbai", "Nashik"],
        },
        { name: "Gujrat", cities: ["Surat", "Shelvas"] },
      ],
    },
  ],
};

const data1 = {
  countries: [
    {
      name: "India",
      states: [
        {
          name: "Maharashatra",
          cities: ["Pune", "Nagpur", "Mumbai", "Nashik"],
        },
        { name: "Gujrat", cities: ["Surat", "Shelvas"] },
      ],
    },
  ],
};

const Existingmember = ({ history }) => {
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [club, setClub] = useState();
  const [membername, setMembername] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country1, setCountry1] = useState();
  const [state1, setState1] = useState();
  const [city1, setCity1] = useState();
  const [adultmember, setAdultmember] = useState("");
  const [belowmember, setBelowmember] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [list, setList] = useState({ hits: [] });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [advice, setAdvice] = useState({
    name: [],
  });
  const availableState = data.countries.find((c) => c.name === country);
  const availableCities = availableState?.states?.find((s) => s.name === state);

  const availableState1 = data1.countries.find((c) => c.name === country1);
  const availableCities1 = availableState1?.states?.find(
    (s) => s.name === state1
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/existingmember",
        {
          country,
          state,
          city,
          club,
          membername,
          mobilenumber,
          email,
          address,
          country1,
          state1,
          city1,
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

  // const clublist = async (e) => {
  //    fetch("http://localhost:5000/api/admin")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       console.log(json);
  //       setState({
  //         items: json,
  //       });
  //     });
  // };

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/admin")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setList(json);
  //     });
  // }, []);

  //  const result = Object.values(list);
  // console.log(list);

  useEffect(() => {
    const url = "http://localhost:5000/api/admin";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        //console.log(json);
        setAdvice(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);


  const result = Object.values(advice);
  

  return (
    <div className="row align-items-center text-left">
      <div className="col-md-12">
        <ValidationForm id="" onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="exampleForm.ControlSelect1">
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

            <Form.Group as={Col} md="6" controlId="exampleForm.ControlSelect1">
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

            <Form.Group as={Col} md="6" controlId="exampleForm.ControlSelect1">
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

            <Form.Group as={Col} md="6" controlId="exampleForm.ControlSelect1">
              <Form.Label>Club</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setClub(e.target.value)}
              >
                {/* {console.log(advice)} */}
                <option>Select</option>
                {result.map((repos, index) => {
                    return (
                       <option value={index}>{repos.name}</option>
                      )
                 })}
              </Form.Control>
            </Form.Group>

            {/* {state.advice.map((data) => (
              <div style={{ border: "1px black solid" }}>
                <p>{data.name}</p>
              </div>
            ))}



            {result.map((data) => (
              <div style={{ border: "1px black solid" }}>
                <p>{data.name}</p>
              </div>
            ))} */}



            <hr />
            <Form.Group as={Col} md="6">
              <Form.Label htmlFor="lastName">Member Name</Form.Label>
              <TextInput
                name="personname"
                id="personname"
                placeholder="Member Name"
                minLength="4"
                autoComplete="off"
                onChange={(e) => setMembername(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label htmlFor="lastName">Register Mobile Number</Form.Label>
              <TextInput
                name="personnumber"
                id="personnumber"
                placeholder="Mobile Number"
                minLength="4"
                autoComplete="off"
                onChange={(e) => setMobilenumber(e.target.value)}
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
                placeholder="address"
                minLength="4"
                autoComplete="off"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="exampleForm.ControlSelect1">
              <Form.Label>Select Country</Form.Label>
              <Form.Control
                as="select"
                placeholder="Country"
                value={country1}
                onChange={(e) => setCountry1(e.target.value)}
              >
                <option>Select </option>
                {data1.countries.map((value, key) => {
                  return (
                    <option value={value.name} key={key}>
                      {value.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="exampleForm.ControlSelect1">
              <Form.Label>Select State</Form.Label>
              <Form.Control
                as="select"
                placeholder="State"
                value={state1}
                onChange={(e) => setState1(e.target.value)}
              >
                <option>Select </option>
                {availableState1?.states.map((e, key) => {
                  return (
                    <option value={e.name} key={key}>
                      {e.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="exampleForm.ControlSelect1">
              <Form.Label>Select City</Form.Label>
              <Form.Control
                as="select"
                placeholder="City"
                value={city1}
                onChange={(e) => setCity1(e.target.value)}
              >
                <option>Select </option>
                {availableCities1?.cities.map((e, key) => {
                  return (
                    <option value={e.name} key={key}>
                      {e}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label htmlFor="lastName">Family members(Adult)</Form.Label>
              <TextInput
                name="clubregnumber"
                id="clubregnumber"
                type="number"
                placeholder=" Number"
                minLength="4"
                autoComplete="off"
                onChange={(e) => setAdultmember(e.target.value)}
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
                onChange={(e) => setBelowmember(e.target.value)}
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
            <button type="submit" className="btn btn-primary btn-block mb-4">
              Sign up
            </button>
          </Form.Row>
        </ValidationForm>
      </div>
    </div>
  );
};

export default Existingmember;
