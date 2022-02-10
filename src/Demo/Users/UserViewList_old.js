import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Redirect, Link, Route, Switch } from "react-router-dom";
import { Row, Col, Card, Form, Button, Collapse, Table } from "react-bootstrap";
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
import { useDispatch, useSelector } from "react-redux";
import "./../../assets/scss/style.scss";
import Aux from "../../hoc/_Aux";
import AnimatedModal from "../../App/components/AnimatedModal.js";
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";
//import DEMO from "../../../store/constant";
//import { register } from '../../../store/clubActions';
import logoDark from "../../assets/images/logo-dark.png";
import DEMO from "../../store/constant";
import UserList from "./UserList";

class UserViewList extends React.Component {
  constructor(props) {
    super(props);
    this.divstatus2 = this.divstatus2.bind(this);
    this.divstatus1 = this.divstatus1.bind(this);
    this.divstatus3 = this.divstatus3.bind(this);
    this.divstatus4 = this.divstatus4.bind(this);
    this.divstatus5 = this.divstatus5.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      items: [],
      DataisLoaded: false,
      store: this.props.match.params.id,
      amount: "",
      monthly: "",
      quarterly: "",
      halfyearly: "",
      yearly: "",
      name: "",
      email: "",
      contactpersonname: "",
      contactpersonnumber: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      website: "",
      clubregistrationnumber: "",
      gregister: "",
      aregister: "",
      yearofestablishment: "",
      trustformed: "",
      address: "",
      mname: "",
      qname: "",
      hyname: "",
      yname: "",
      createdAt: "",
    };
  }

  componentDidMount = () => {
    this.getEmployeeById();
  };

  divstatus1 = (e) => {
    this.setState({ amount: e.target.value });
    //  console.log( e.target.value);
  };

  divstatus2 = (e) => {
    this.setState({ monthly: e.target.value, mname: e.target.id });
  };

  divstatus3 = (e) => {
    this.setState({ quarterly: e.target.value, qname: e.target.id });
  };

  divstatus4 = (e) => {
    this.setState({ halfyearly: e.target.value, hyname: e.target.id });
  };
  divstatus5 = (e) => {
    this.setState({ yearly: e.target.value, yname: e.target.id });
    //  console.log( e.target.id);
  };

  onSubmit(e) {
    e.preventDefault();

    const userObject = {
      amount: this.state.amount,
      monthly: this.state.monthly,
      quarterly: this.state.quarterly,
      halfyearly: this.state.halfyearly,
      yearly: this.state.yearly,
      mname: this.state.mname,
      qname: this.state.qname,
      hyname: this.state.hyname,
      yname: this.state.yname,
    };

    axios
      .put(
        "http://localhost:5000/api/clubusers/" + this.props.match.params.id,
        userObject
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //window.location.href="DEMO.USER_VIEW_LIST";
    // this.props.history.push('DEMO.USER_VIEW_LIST');

    this.setState({
      amount: "",
      monthly: "",
      quarterly: "",
      halfyearly: "",
      yearly: "",
      mname: "",
      qname: "",
      hyname: "",
      yname: "",
    });
  }

  getEmployeeById() {
    axios
      .get("http://localhost:5000/api/clubusers/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
          pincode: response.data.pincode,
          contactpersonname: response.data.contactpersonname,
          contactpersonnumber: response.data.contactpersonnumber,
          email: response.data.email,
          country: response.data.country,
          state: response.data.state,
          city: response.data.city,
          website: response.data.website,
          clubregistrationnumber: response.data.clubregistrationnumber,
          gregister: response.data.gregister,
          aregister: response.data.aregister,
          yearofestablishment: response.data.yearofestablishment,
          trustformed: response.data.trustformed,
          address: response.data.address,
          amount: response.data.amount,
          monthly: response.data.monthly,
          quarterly: response.data.quarterly,
          halfyearly: response.data.halfyearly,
          yearly: response.data.yearly,
          mname: response.data.mname,
          qname: response.data.qname,
          hyname: response.data.hyname,
          yname: response.data.yname,
          createdAt: response.data.createdAt,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      name,
      email,
      contactpersonname,
      contactpersonnumber,
      country,
      state,
      city,
      pincode,
      website,
      clubregistrationnumber,
      gregister,
      aregister,
      yearofestablishment,
      trustformed,
      address,
      monthly,
      quarterly,
      halfyearly,
      yearly,
      amount,
      mname,
      qname,
      hyname,
      yname,
      createdAt,
    } = this.state;

    return (
      <Aux>
        <Breadcrumb />
        <Card>
          <Card.Header>
            <Card.Title as="h5">Club Details</Card.Title>
            {/* <h1>{this.props.match.params.id}</h1> */}
          </Card.Header>
          <Card.Body>
            <Row className="justify-content-center">
              <Col md={8}>
                {/* { console.log(result)} */}

                <ValidationForm key="index">
                  {/* {console.log(repos)} */}
                  <Form.Row>
                    <Form.Group as={Col} md="6">
                      <h5>Club name </h5>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      {name}
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <h5>Address </h5>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      {address}
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <h5>Country </h5>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      {country}
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <h5>State </h5>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      {state}
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <h5>City </h5>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      {city}
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <h5>Pin Code </h5>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      {pincode}
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <h5>Contact Person Name </h5>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      {contactpersonname}
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <h5>Contact Person Number </h5>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      {contactpersonnumber}
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <h5>Email </h5>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      {email}
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <h5>Website </h5>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      {website}
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <h5>Club Registration Number </h5>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      {clubregistrationnumber}
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <h5>Year of Establishment </h5>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      {yearofestablishment}
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <h5>Trust Formed </h5>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      {trustformed}
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <h5>Do you have 12A registered</h5>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      {aregister}
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <h5>Do you have 80G registered</h5>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      {gregister}
                    </Form.Group>
                  </Form.Row>
                </ValidationForm>

                <Col sm={12}>
                  <hr />
                  <Card>
                    <Card.Body>
                      <Form.Row>
                        <Form.Group as={Col} md="6">
                          <h5>Amount Payable</h5>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                          {amount}
                        </Form.Group>

                        <Form.Group as={Col} md="6">
                          <h5>Amount </h5>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                          {monthly || quarterly || halfyearly || yearly}
                        </Form.Group>

                        <Form.Group as={Col} md="6">
                          <h5>Payment type </h5>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                          {mname || qname || hyname || yname}
                        </Form.Group>

                        <Form.Group as={Col} md="6">
                          <h5>Start Date</h5>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                          <input
                            type="date"
                            className="form-control"
                            defaultValue="1994-12-16"
                          />
                        </Form.Group>

                        <Form.Group as={Col} md="6">
                          <h5>Due Date</h5>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                          <input
                            type="date"
                            className="form-control"
                            defaultValue="1994-12-16"
                          />
                        </Form.Group>
                      </Form.Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Col>

              <Col sm={12}>
                <hr />
                <Card>
                  <Card.Body>
                    <ValidationForm id="" onSubmit={this.onSubmit}>
                      <Form.Row>
                        <Form.Group as={Col} md="4">
                          <Form.Label htmlFor="amount">Amount</Form.Label>
                          <TextInput
                            name="amount"
                            id="amount"
                            placeholder="amount"
                            onChange={this.divstatus1}
                          />
                        </Form.Group>

                        <Col md={2}>
                          <Form.Check
                            type="radio"
                            label="Monthly"
                            name="formHorizontalRadios1"
                            id="Monthly"
                            value={this.state.amount * 1}
                            onChange={this.divstatus2}
                          />
                          <span>{this.state.amount * 1}</span>
                        </Col>

                        <Col md={2}>
                          <Form.Check
                            type="radio"
                            label="Quarterly"
                            name="formHorizontalRadios1"
                            id="Quarterly"
                            value={this.state.amount * 3}
                            onChange={this.divstatus3}
                          />
                          <span>{this.state.amount * 3}</span>
                        </Col>

                        <Col md={2}>
                          <Form.Check
                            type="radio"
                            label="Half Yearly"
                            name="formHorizontalRadios1"
                            id="Half Yearly"
                            value={this.state.amount * 6}
                            onChange={this.divstatus4}
                          />
                          <span>{this.state.amount * 6}</span>
                        </Col>

                        <Col md={2}>
                          <Form.Check
                            type="radio"
                            label="Yearly"
                            name="formHorizontalRadios1"
                            id="Yearly"
                            value={this.state.amount * 12}
                            onChange={this.divstatus5}
                          />
                          <span>{this.state.amount * 12}</span>
                        </Col>

                        <Form.Group as={Col} sm={12} className="mt-3">
                          <Button type="submit">Submit</Button>
                        </Form.Group>
                      </Form.Row>
                    </ValidationForm>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Aux>
    );
  }
}

export default UserViewList;
