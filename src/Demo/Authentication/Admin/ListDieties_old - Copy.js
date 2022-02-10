import React from "react";
import { Row, Col, Card, Table } from "react-bootstrap";

import avatar1 from "../../../assets/images/user/avatar-1.jpg";
import avatar3 from "../../../assets/images/user/avatar-3.jpg";
import axios from "axios";

import Aux from "../../../hoc/_Aux";
import $ from "jquery";
window.jQuery = $;
window.$ = $;
global.jQuery = $;

$.DataTable = require("datatables.net-bs");

const names = [
  {
    id: 1,
    icon: avatar1,
    nameofdiety: "System Architect",
    alias: "Edinburgh",
    status: 1,
  },
];

function atable() {
  let tableZero = "#data-table-zero";
  $.fn.dataTable.ext.errMode = "throw";

  $(tableZero).DataTable({
    data: names,
    order: [[2, "asc"]],
    columns: [
      {
        data: "icon",
        render: function (data, type, row) {
          const html =
            '<div class="d-inline-block align-middle">' +
            "<img src=" +
            data +
            ' alt="user" class="img-radius align-top m-r-15" style="width:75px" />' +
            "</div>";
          return html;
        },
      },
      {
        data: "nameofdiety",
        render: function (data, type, row) {
          return data;
        },
      },
      {
        data: "alias",
        render: function (data, type, row) {
          return data;
        },
      },
      {
        data: "status",
        render: function (data, type, row) {
          let html;
          if (data === 1) {
            html =
              '<span class="badge badge-light-success">Active</span>' +
              '<div class="overlay-edit">' +
              '<button type="button" class="btn btn-icon btn-success"><i class="feather icon-check-circle"> <span class="sr-only"/> </i></button>' +
              '<button type="button" class="btn btn-icon btn-danger"><i class="feather icon-trash-2"><span class="sr-only"/></i></button>' +
              "</div>";
          } else {
            html =
              '<span class="badge badge-light-danger">Inactive</span>' +
              '<div class="overlay-edit">' +
              '<button type="button" class="btn btn-icon btn-success"><i class="feather icon-check-circle"><span class="sr-only"/></i></button>' +
              '<button type="button" class="btn btn-icon btn-danger"><i class="feather icon-trash-2"><span class="sr-only"/></i></button>' +
              "</div>";
          }
          return html;
        },
      },
    ],
  });

  let tableButton = "#datatable-button";
  let tableBtns = [
    {
      text: "Clear Filters",
      className: "clr-filters-btn btn btn-danger",
      action: function (e, dt, node, config) {
        // make function clear all text inputs on page via jquery
        clearfilter();
      },
    },
    {
      extend: "copyHtml5",
      text: "Copy",
      className: "btn btn-secondary",
    },
    {
      extend: "csvHtml5",
      text: "CSV",
      className: "btn btn-secondary",
    },
    {
      extend: "print",
      text: "Print",
      className: "btn btn-secondary",
    },
  ];

  let buttonTable = $(tableButton).DataTable({
    dom: "Bfrti",
    data: names,
    order: [[0, "asc"]],
    columns: [
      {
        data: "id",
        render: function (data, type, row) {
          return data;
        },
      },
      {
        data: "icon",
        render: function (data, type, row) {
          return data;
        },
      },
      {
        data: "Nameofdiety",
        render: function (data, type, row) {
          return data;
        },
      },
      {
        data: "alias",
        render: function (data, type, row) {
          return data;
        },
      },
    ],
    buttons: tableBtns,
  });

  function clearfilter() {
    $(".search-it").find("input:text").val("");
    buttonTable.search("").columns().search("").draw();
  }
}

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: "",
      status: false,
    };

   // this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/adddieties")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          //DataisLoaded: true,
        });
      });

    //atable();
  }

//   changeStatus(repos) {
//     this.setState((prevState) => ({
//       status: !prevState.status,
//     }));
//     console.log("status", this.state.status);
//   }

//   onSubmit = (event) => {
//     event.preventDefault();
//     console.log(this.state.status)
//     const newUser = {
//       status: this.state.status,
//     };

//     axios
//       .post("http://localhost:5000/api/adddieties", newUser)
//       .then((res) => console.log(res.data));
//   };

  render() {
    const { items } = this.state;
    const result = Object.values(items);
    
    return (
      <Aux>
        <Row>
          <Col sm={12} className="btn-page">
            <Card className="user-profile-list">
              <Card.Body>
                <Table ref="tbl" striped hover responsive id="data-table-zero">
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

                        <td className="align-middle" onClick={this.onSubmit}>
                          <span
                            class="badge badge-light-success"
                            onClick={() => this.changeStatus(repos)}
                          >
                            {this.state.status ? "Active" : "Inactive"}
                          </span>

                          {/* <div class="overlay-edit">
                                            <button type="button" class="btn btn-icon btn-success"><i class="feather icon-check-circle"> <span class="sr-only"/> </i></button>
                                            <button type="button" class="btn btn-icon btn-danger"><i class="feather icon-trash-2"><span class="sr-only"/></i></button>
                                            </div> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot>
                    <tr>
                      <th>Icon</th>
                      <th>name of Diety</th>
                      <th>Alias</th>
                      <th>Status</th>
                    </tr>
                  </tfoot>
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
