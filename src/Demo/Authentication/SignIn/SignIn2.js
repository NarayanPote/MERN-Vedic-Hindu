import React from 'react';
import {NavLink} from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";

import authLogo from '../../../assets/images/auth/auth-logo.png';
import authLogoDark from '../../../assets/images/auth/auth-logo-dark.png';

class SignIn2 extends React.Component {
    render () {
        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper align-items-stretch aut-bg-img">
                    <div className="flex-grow-1">
                        <div className="h-100 d-md-flex align-items-center auth-side-img">
                            <div className="col-sm-10 auth-content w-auto">
                                <img src={authLogo} alt="" className="img-fluid" />
                                <h1 className="text-white my-4">Welcome Back!</h1>
                                <h4 className="text-white font-weight-normal">Signin to your account and get explore the Able Pro Dashboard Template.<br/>Do not forget to play with live customizer</h4>
                            </div>
                        </div>
                        <div className="auth-side-form">
                            <div className=" auth-content">
                                <img src={authLogoDark} alt="" className="img-fluid mb-4 d-block d-xl-none d-lg-none" />
                                <h3 className="mb-4 f-w-400">Signin</h3>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email address" />
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="Password" />
                                </div>
                                <div className="form-group text-left mt-2">
                                    <div className="checkbox checkbox-primary d-inline">
                                        <input type="checkbox" name="checkbox-p-1" id="checkbox-p-1" checked="" />
                                        <label htmlFor="checkbox-p-1" className="cr">Save credentials</label>
                                    </div>
                                </div>
                                <button className="btn btn-block btn-primary mb-0">Signin</button>
                                <div className="text-center">
                                    <div className="saprator my-4"><span>OR</span></div>
                                    <button className="btn text-white bg-facebook mb-2 mr-2  wid-40 px-0 hei-40 rounded-circle"><i className="fab fa-facebook-f"/></button>
                                    <button className="btn text-white bg-googleplus mb-2 mr-2 wid-40 px-0 hei-40 rounded-circle"><i className="fab fa-google-plus-g"/></button>
                                    <button className="btn text-white bg-twitter mb-2  wid-40 px-0 hei-40 rounded-circle"><i className="fab fa-twitter"/></button>
                                    <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-2" className="f-w-400">Reset</NavLink></p>
                                    <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-2" className="f-w-400">Signup</NavLink></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default SignIn2;