import React from "react";
import { Row, Col, Card, Modal, Button, Table } from "react-bootstrap";

import Aux from "../../hoc/_Aux";

import $ from "jquery";
import DEMO from "../../store/constant";

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
      items: "",
       isOpen: false,
    };

   
  }

  

  componentDidMount() {
    
    fetch("http://localhost:5000/api/admin")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true,
        });
      });  
      
      
  }



//   componentDidMount() {
//        atable();
//        getclubList();

//      }



  render() {
    const { DataisLoaded, items } = this.state;

    const result = Object.values(items);

    return (
      <Aux>
        <Row className="btn-page">
          <Col sm={12}>
            <Card>
              <Card.Body>
                <Row className="align-items-center m-l-0">
                  <Col />
                </Row>
                <Table ref="tbl" striped hover responsive id="data-table-zero">
                  <thead className="thead-light">
                    <tr>
                      <th>Club Name</th>
                      <th>Contact Person Name</th>
                      <th>Mobile</th>
                      <th>State</th>
                      <th>City</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {result.map((repos, index) => (
                      <tr key={index}>
                        
                        <td className="align-middle">{repos.name}</td>
                        <td className="align-middle">
                          {repos.contactpersonname}
                        </td>
                        <td className="align-middle">
                          {repos.contactpersonnumber}
                        </td>
                        <td className="align-middle">{repos.state}</td>
                        <td className="align-middle">{repos.city}</td>
                        <td className="table-action">
                          <a
                            href={`${DEMO.USER_VIEW_LIST}/${repos._id}`}
                            className="btn btn-icon btn-outline-primary"
                          >
                            <i className="feather icon-eye" />
                          </a>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
         
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default UserList;
