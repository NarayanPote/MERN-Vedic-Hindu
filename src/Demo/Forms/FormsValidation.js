import React, {useState} from 'react';
import {Row, Col, Card, Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ValidationForm, TextInput, BaseFormControl, SelectGroup, FileInput, Checkbox, Radio } from 'react-bootstrap4-form-validation';
import MaskedInput from 'react-text-mask';
import validator from 'validator';
import axios from 'axios';

import Aux from "../../hoc/_Aux";
import AnimatedModal from "../../App/components/AnimatedModal";


const FormsValidation = ({ history }) => {

    const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");


	const handleSubmit = async (e) => {
		e.preventDefault();

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};

		try {
			const { data } = await axios.post(
				"/api/users",
				{ firstname, lastname, email, password, confirmpassword, phone },
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

		history.push("/dashboard/default");

	};

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Form Validation</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <ValidationForm  id= "" onSubmit={handleSubmit}>
                                    <Form.Row >
                                        <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="firstName">First name</Form.Label>
                                            <TextInput
                                                name="firstName"
                                                id="firstName"
                                                placeholder="First Name"
                                                autoComplete="off"
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="lastName">Last name</Form.Label>
                                            <TextInput
                                                name="lastName"
                                                id="lastName"
                                                placeholder="Last Name"
                                                minLength="4"
                                                autoComplete="off"
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="email">Email</Form.Label>
                                            <TextInput
                                                name="email"
                                                id="email"
                                                type="email"
                                                placeholder="Email Address"
                                                errorMessage={{validator:"Please enter a valid email"}}
                                                autoComplete="off"
                                                onChange={(e) => setEmail(e.target.value)}
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
                                                errorMessage={{required:"Password is required", pattern: "Password should be at least 6 characters and contains at least one upper case letter"}}
                                                autoComplete="off"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
                                            <TextInput
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                type="password"
                                                placeholder="Confirm Password"
                                                required
                                                errorMessage={{required:"Confirm password is required", validator: "Password does not match"}}
                                                autoComplete="off"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="phone">Phone</Form.Label>
                                           <TextInput
                                                name="phone"
                                                id="phone"
                                                placeholder="Contact Number"
                                                className="form-control"
                                                required
                                                // validator={(value) => value === "(123) 456-7890"}
                                                successMessage="Looks good!"
                                                // errorMessage={{validator: "Please enter (123) 456-7890"}}
                                                // mask={['(', /[1-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                                                autoComplete="off"
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </Form.Group>
                                        

                                        <Form.Group as={Col} sm={12} className="mt-3">
                                            <Button type="submit">Submit</Button>
                                        </Form.Group>
                                    </Form.Row>
                                </ValidationForm>
                              
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }

export default FormsValidation;