import React from "react";
import {NavLink} from 'react-router-dom';
import { Row, Col, Card, Modal, Button, Table } from "react-bootstrap";
import axios from "axios";

import Aux from "../../../hoc/_Aux";
import $ from "jquery";

import DEMO from "../../../store/constant";

$.DataTable = require("datatables.net-bs");
require("datatables.net-responsive-bs");

function atable() {
  let tableZero = "#data-table-zero";
  $.fn.dataTable.ext.errMode = "throw";

  $(tableZero).DataTable();
}

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: ""
    };

    // this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/adddieties")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true,
        });
      });
    atable();
  }

  render() {
    const { items } = this.state;
    const result = Object.values(items);

    return (
      <Aux>
        <Row>
          <Col sm={12}>
            <Card>
              <Card.Body>
                <Table ref="tbl" striped hover responsive id="data-table-zero">
                  <thead className="thead-light">
                    <tr>
                      <th>Icon</th>
                      <th>Name of Diety</th>
                      <th>Alias</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((repos, index) => (
                      <tr key={index}>
                        <td className="align-middle"></td>
                        <td className="align-middle">
                          {repos.dietynameinenglish}
                          <hr></hr>
                          {repos.dietynameinhindi}
                        </td>
                        <td className="align-middle">
                          {repos.aliasnameinenglish}
                          <hr></hr>
                          {repos.aliasnameinhindi}
                        </td>

                        <td className="table-action">
                          {/* <a
                            href={DEMO.BLANK_LINK}
                            className="btn btn-icon btn-outline-primary"
                          >
                            <i className="feather icon-eye" />
                          </a> */}

                          {/* <NavLink to="/admin/edit-dieties" className="f-w-400">Signup</NavLink> */}
                          <NavLink  
                            // to= {`/admin/edit-dieties/${repos._id}`} 
                             to= {`${DEMO.DIETIES_EDIT_LIST}/${repos._id}`}    
                             className="btn btn-icon btn-outline-success">
                             <i className="feather icon-edit" />
                          </NavLink>
                          <NavLink 
                            to=""
                            className="btn btn-icon btn-outline-danger">
                            <i className="feather icon-trash-2" />
                          </NavLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* <Card className="table-card latest-activity-card">
                            <Card.Header>
                                <h5>List</h5>
                            </Card.Header>
                            <Card.Body>
                            <Table responsive>
                                    <thead>
                                    <tr>
                                    <th>Icon</th>
                                    <th>Name of Diety</th>
                                    <th>Alias</th>
                                    <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                    {result.map((repos, index) => (
                      <tr key={index}>
                        <td></td>
                        <td>
                          {repos.dietynameinenglish}
                          <hr></hr>
                          {repos.dietynameinhindi}
                        </td>
                        <td>
                          {repos.aliasnameinenglish}
                          <hr></hr>
                          {repos.aliasnameinhindi}
                        </td>

                        <td>
                        <a href=""><i className="icon feather icon-edit f-w-600 f-16 m-r-15 text-c-green"/></a><a href=""><i className="feather icon-trash-2 f-w-600 f-16 text-c-red"/></a>
                        </td>
                      
                      </tr>
                    ))}
                  </tbody>
                                </Table>
                            </Card.Body>
         </Card> */}
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default UserList;
