import React, { Component }from "react";
import {NavLink} from 'react-router-dom';
import { Row, Col, Card, Modal, Button, Table } from "react-bootstrap";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import Pagination from "react-js-pagination";
import Aux from "../../../hoc/_Aux";
import $ from "jquery";
import {CSVLink} from "react-csv";
import DEMO from "../../../store/constant";
import Pagination1 from "../../../store/Pagination1";
import Photo from "./Photo";

import prod1 from '../../../assets/images/product/prod-1.jpg';    
$.DataTable = require("datatables.net-bs");
require("datatables.net-responsive-bs");

function atable() {
  let tableZero = "#data-table-zero";
 // $.fn.dataTable.ext.errMode = "throw";

  $(tableZero).DataTable();
}


class ListDisable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: "",
      status: false,
      search: "",
      isOpen: false,
      users: [],
      loading: true,

     // productDataList: [],    
    };

    // this.onSubmit = this.onSubmit.bind(this)
  }

  




  // getUserList = () => {
  //   fetch('http://localhost:5000/api/adddieties')
  //     .then(res => res.json());
  // }

  // downloadReport = async () => {
  //   const data = await this.getUserList();
  //   this.setState({ data: data }, () => {
  //     setTimeout(() => {
  //       this.csvLinkEl.current.link.click();
  //     });
  //   });
  // }

  // componentDidMount() {
  //   fetch("http://localhost:5000/api/adddieties")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       this.setState({
  //         items: json,
  //         DataisLoaded: true,
  //       });
     
  //     });
  //  // atable();
  // }



  // onChangePage = pageOfItems => {
  //   this.setState({
  //     productDataList: pageOfItems
  //   });
  // };

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
 
onchange = e => {
  this.setState({ search: e.target.value });
};


componentDidMount(){

  axios.get("http://localhost:5000/photos").then(res => 
  {
  
  this.setState({items: res.data});
  console.log(res.data);
     }); 
    // atable()
  //  this.getUsersData().then(() => this.syncTable());
  }

//   componentDidMount() {
//     atable()
// }



// async getUsersData() {
//   const res = await axios.get("http://localhost:5000/photos");
//   console.log(res.data);
//   this.setState({ loading: false, users: res.data });
// }


//   componentDidMount() {
//     this.getUsersData().then(() => this.syncTable());
//     }


// syncTable() {
//   this.$el = $(this.el);
//   this.$el.DataTable({
//     data: this.state.users, //option 1
//     // data: this.getUsersData1(), //option 2
//     columns: [
//       { title: "Name of Diety In English", data: "dietynameinenglish" },
//       { title: "Name of Alias In English", data: "aliasnameinenglish" },
//       { title: "Name of Diety In Hindi", data: "dietynameinhindi" },
//       { title: "Name of Alias In Hindi", data: "aliasnameinhindi" },
//       // { title: "Action", data: "<NavLink  to= {`${DEMO.DIETIES_EDIT_LIST}/${repos._id}`} className="btn btn-icon btn-outline-success"><i className="feather icon-edit" /></NavLink>" }
//     ]
//   });
// }


  render() {
    const { items,search } = this.state;
    const result = Object.values(items);
    //console.log(items)
   
    const productDataList = result.filter(country => {
      return country.dietynameinenglish.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
             country.aliasnameinenglish.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

  
    return (
      <Aux>
        <Row>
          <Col sm={12}>
            <Card>
              <Card.Body>
              <Col md={4}>
               <input className="form-control mb-2" placeholder="Search Dieties..."  onChange={this.onchange} />
              {/* <input type="button" value="Export to CSV (Async)" onClick={this.downloadReport} />
              <CSVLink
          headers={headers}
          filename="Clue_Mediator_Report_Async.csv"
          data={result}
          ref={this.csvLinkEl}
        /> */}
              </Col>
              <Col md={4}></Col>
            
              {/* <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div> */}
       
    
                <Table  striped hover responsive id="data-table-zero" data={items}>
                  <thead className="thead-light">
                    <tr>
                      <th>Icon</th>
                      <th>Name of Diety</th>
                      <th>Alias</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productDataList.map((repos, index) => (
                      
                      repos.status === 'inactive' ? (
                      <tr key={index}>
                 
                        <td className="align-middle">
                        <Photo id={repos._id}  alt="contact-img" title="contact-img" className="rounded mr-3" height="48" />
                        {/* <img src={prod1} alt="contact-img" title="contact-img" className="rounded mr-3" height="48" /> */}
                                           
                        </td>
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
                        <td className="align-middle">
                          <span class="badge badge-light-success" >
                          {repos.status}
                          </span>
                        </td>
                         
                        <td className="table-action">
                          {/* <a
                            href={DEMO.BLANK_LINK}
                            className="btn btn-icon btn-outline-primary"
                          >
                            <i className="feather icon-eye" />
                          </a> 
                             */}
                           {/* <NavLink to="/admin/edit-dieties" className="f-w-400">Signup</NavLink>  */}
                          <NavLink  
                            // to= {`/admin/edit-dieties/${repos._id}`} 
                             to= {`${DEMO.DIETIES_EDIT_LIST}/${repos._id}`}    
                             className="btn btn-icon btn-outline-success">
                             <i className="feather icon-edit" />
                          </NavLink>
                          {/* <NavLink 
                            to=""
                            className="btn btn-icon btn-outline-danger">
                            <i className="feather icon-trash-2" />
                          </NavLink> */}
                       
                        </td>
    
                        
                      </tr>
                      )
                      : null
                    ))}
                  </tbody>
                </Table>

                {/* <Table ref="tbl" striped hover responsive id="data-table-zero"  ref={(el) => (this.el = el)}>
               
                                   
                </Table> */}



                {/* <div className="text-center"> 
													 {(result.map((photo) => 
													 	
														<>
														 {photo.dietynameinenglish}
														 <Photo key={photo._id} id={photo._id}  name={photo.dietynameinenglish} />
														</>
													 ))} 

													</div> */}
  

                {/* <Pagination
                pageSize={2}
                items={productDataList}
                onChangePage={this.onChangePage}
              /> */}
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

export default ListDisable;
