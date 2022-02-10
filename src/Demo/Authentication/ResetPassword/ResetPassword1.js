import React, { useState } from "react";
import axios from "axios";
import {NavLink} from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import logoDark from '../../../assets/images/logo-dark.png';


const ResetPassword1 = () => {
    
    const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:8080/api/password-reset`;
			const { data } = await axios.post(url, { email });
			setMsg(data.message);
			setError("");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};
    
        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="card">
                            <div className="row align-items-center text-center">
                                <div className="col-md-12">
                                    <div className="card-body">
                                        <img src={logoDark} alt="" className="img-fluid mb-4"/>
                                        <form  onSubmit={handleSubmit}>
                                        <h4 className="mb-3 f-w-400">Reset your password</h4>
                                        <div className="input-group mb-4">
                                            <input type="email" name="email"
				                            	onChange={(e) => setEmail(e.target.value)}
					                            value={email}
					                            requiredclassName="form-control" placeholder="Email address" />
                                        </div>
                                        <button className="btn btn-block btn-primary mb-4">Reset password</button>
                                        </form>
                                        <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1" className="f-w-400">Signup</NavLink></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }

export default ResetPassword1;