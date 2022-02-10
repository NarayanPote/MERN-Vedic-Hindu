import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import logoDark from "../../../assets/images/logo-dark.png";
import { login } from "../../../store/clubActions";
import axios from "axios";
// import ErrorMessage from "./../component/ErrorMessage";
// import Loading from "./../component/Loading";
import * as actionTypes from "../../../store/clubConstants";

//import axios from "axios";

const Member = ({ setUserInfo, history }) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");

  // const userInfoFromStorage = localStorage.getItem("userInfo")
  //   ? JSON.parse(localStorage.getItem("userInfo"))
  //   : null;


    // const initialState = {

    //     reducer: { userInfo: userInfoFromStorage },
     
    //   };

    //   localStorage.setItem("userInfo", JSON.stringify(data));
    // const userInfoFromStorage =  setUserInfo(JSON.parse(localStorage.getItem("userInfo")));

   
    
    
  // const reducer = useSelector((state) => state.userInfo);
  // // const userinfo = {userinfo : reducer.userinfo};
  // //const  { userInfo } = reducer;

  // console.log(reducer);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (reducer) {
  //     history.push("/dashboard/default");
  //   }
  // }, [history, reducer]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   dispatch(login(email, password));
  // };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
  	e.preventDefault();

  	// history.push("/shop-register");

  	const config = {
  		headers: {
  			"Content-type": "application/json",
  		},
  	};

  	try {
  		const { data } = await axios.post(
  			"/api/member/login",
  			{ email, password },
  			config
  		);

  		console.log(data);
  		setErrorMessage("");
  		setSuccessMessage("Logged In !");
  		history.push("/dashboard/club"); ///tables/bootstrap
  		localStorage.setItem("user", JSON.stringify(data));
  		setUserInfo(JSON.parse(localStorage.getItem("user")));

  	} catch (error) {
  		setErrorMessage("Invalid Email or password");
  		setSuccessMessage("");
  	}

}

  return (
    <Aux>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="card">
            <div className="row align-items-center text-center">
              <div className="col-md-12">
                <div className="card-body">
                  <img src={logoDark} alt="" className="img-fluid mb-4" />
                  <form
                    id="login"
                    onSubmit={handleSubmit}
                    className="tab-pane active col-12 p-a0"
                  >
                    <h4 className="mb-3 f-w-400">Signin</h4>
                    <div
                      className="input-group mb-3"
                      onChange={(e) => setEmail(e.target.value)}
                    >
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email address"
                      />
                    </div>
                    <div
                      className="input-group mb-4"
                      onChange={(e) => setPassword(e.target.value)}
                    >
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                    {errorMessage && (
                      <span style={{ color: "red" }}>{errorMessage}</span>
                    )}

                    {successMessage && (
                      <span style={{ color: "green" }}>{successMessage}</span>
                    )}
                    {/* <div className="form-group text-left mt-2">
                                            <div className="checkbox checkbox-primary d-inline">
                                                <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" checked=""/>
                                                <label htmlFor="checkbox-fill-a1" className="cr">&nbsp; Save credentials</label>
                                            </div>
                                        </div> */}
                    <button className="btn btn-block btn-primary mb-4">
                      Signin
                    </button>
                    <p className="mb-2 text-muted">
                      Forgot password?{" "}
                      <NavLink to="/auth/reset-password-1" className="f-w-400">
                        Reset
                      </NavLink>
                    </p>
                    <p className="mb-0 text-muted">
                      Don’t have an account?{" "}
                      <NavLink to="/auth/memberreg" className="f-w-400">
                        Signup
                      </NavLink>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default Member;
