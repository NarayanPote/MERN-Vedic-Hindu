import React from "react";
import {
  Row,
  Col,
  Card,
  Dropdown,
  Carousel,
  Form,
  Button,
  Collapse,
} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
// import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-daterangepicker/daterangepicker.css";
import PerfectScrollbar from "react-perfect-scrollbar";

import {
  ValidationForm,
  TextInput,
  BaseFormControl,
  SelectGroup,
  FileInput,
  Checkbox,
  Radio,
} from "react-bootstrap4-form-validation";
import Gallery from "../../App/components/Gallery";
import Aux from "../../hoc/_Aux";
import axios from "axios";
import DEMO from "../../store/constant";

import avatar1 from "../../assets/images/user/avatar-1.jpg";
import avatar2 from "../../assets/images/user/avatar-2.jpg";
import avatar3 from "../../assets/images/user/avatar-3.jpg";
import avatar4 from "../../assets/images/user/avatar-4.jpg";
import avatar5 from "../../assets/images/user/avatar-5.jpg";

import bg1 from "../../assets/images/profile/bg-1.jpg";
import bg2 from "../../assets/images/profile/bg-2.jpg";
import bg3 from "../../assets/images/profile/bg-3.jpg";

import slider5 from "../../assets/images/widget/slider5.jpg";
import slider7 from "../../assets/images/widget/slider7.jpg";
import slider6 from "../../assets/images/widget/slider6.jpg";

import image1 from "../../assets/images/light-box/l1.jpg";
import image2 from "../../assets/images/light-box/l2.jpg";
import image3 from "../../assets/images/light-box/l3.jpg";
import image4 from "../../assets/images/light-box/l4.jpg";
import image5 from "../../assets/images/light-box/l5.jpg";
import image6 from "../../assets/images/light-box/l6.jpg";

import thumb1 from "../../assets/images/light-box/sl1.jpg";
import thumb2 from "../../assets/images/light-box/sl2.jpg";
import thumb3 from "../../assets/images/light-box/sl3.jpg";
import thumb4 from "../../assets/images/light-box/sl4.jpg";
import thumb5 from "../../assets/images/light-box/sl5.jpg";
import thumb6 from "../../assets/images/light-box/sl6.jpg";

class UserViewList extends React.Component {
  constructor(props) {
    super(props);
    // this.divstatus2 = this.divstatus2.bind(this);
    // this.divstatus1 = this.divstatus1.bind(this);
    // this.divstatus3 = this.divstatus3.bind(this);
    // this.divstatus4 = this.divstatus4.bind(this);
    // this.divstatus5 = this.divstatus5.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      items: [],
      DataisLoaded: false,
      store: this.props.match.params.id,
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
      isBasic: false,
      opened: false,
      value: "",
      type: "",
      amount: "",
      dateString:"",

    };
  }


  

  componentDidMount = () => {
    this.getEmployeeById();
  };

  divstatus1 = (e) => {
    this.setState({ amount: e.target.value });
    //  console.log( e.target.value);
  };

  handleChange = (e) => {
    let val = e.target.value;
    let amount = this.state.amount;
    var date = new Date();
    
    if (val === "Monthly") {
      date.setDate(date.getDate() + 30);
      var dateString = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2)
      this.setState({ value: amount*1,
                      type : "Monthly",
                      amount: amount,
                      // date: date,
                      dateString : dateString
       });
      
    }
    else if (val === "Quarterly"){
      date.setDate(date.getDate() + 90);
      var dateString = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2)
      this.setState({ value: amount*3,
                      type : "Quarterly",
                      amount: amount,
                      // date: date,
                      dateString : dateString
       });
    }
    else if (val === "Half_Yearly"){
      date.setDate(date.getDate() + 182);
      var dateString = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2)


      this.setState({ value: amount*6,
                      type : "Half_Yearly",
                      amount: amount,
                      // date: date,
                      dateString : dateString 
      });
    }
    else if (val === "Yearly"){
      date.setDate(date.getDate() + 365);
      var dateString = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2)
      //console.log(dateString);
      this.setState({ value: amount*12,
                      type : "Yearly",
                      amount: amount,
                      // date: date,
                       dateString : dateString   
      });
    }
    
  };

    // var date = new Date();
    // date.setDate(date.getDate() + 30);
    // var dateString = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2)
    // console.log(dateString);

  

  // divstatus2 = (e) => {
  //   this.setState({ monthly: e.target.value * 1, mname: e.target.id });
  // };

  // divstatus3 = (e) => {
  //   this.setState({ quarterly: e.target.value * 3, qname: e.target.id });
  // };

  // divstatus4 = (e) => {
  //   this.setState({ halfyearly: e.target.value * 6, hyname: e.target.id });
  // };
  // divstatus5 = (e) => {
  //   this.setState({ yearly: e.target.value * 12, yname: e.target.id });
  //     //console.log( e.target.id);
  // };

  onSubmit(e) {
    e.preventDefault();
     // console.log(this.state.date)

    const userObject = {
      amount: this.state.amount,
      value: this.state.value,
      type: this.state.type,
      // date: this.state.date,
       dateString: this.state.dateString,
     };
    // console.log(userObject);
     
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

    // this.setState({
    //   amount: "",
    //   monthly: "",
    //   quarterly: "",
    //   halfyearly: "",
    //   yearly: "",
    //   mname: "",
    //   qname: "",
    //   hyname: "",
    //   yname: "",
    // });
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
          value: response.data.value,
          type: response.data.type,
          // date: this.state.date,
           dateString: this.state.dateString,
          
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleReset = (e) => {
    this.setState({amount: "" });
  };



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
      value,
      amount,
      isBasic,
      type,
      dateString
    } = this.state;
   
    // console.log(date)


    // var date = new Date();
    // date.setDate(date.getDate() + 30);
    // var dateString = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2)
    // console.log(dateString);

    // dateformate = (e) =>{
    //     var date = new Date();
    //     let val = e.target.value;
    //     if (val === "Monthly") {
    //       date.setDate(date.getDate() + 30);
    //       var dateString = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2)
    //       console.log(dateString);
    //       // this.setState({
    //       //                 dateString: dateString
    //       //  });
          
    //     }

    // }

    return (
      <Aux>
        <Row>
          <Col md={12} className="order-md-2">
            <div className="tab-content">
              <Card>
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <h5 className="mb-0">Personal details</h5>
                  {/* <Button onClick={this.dateformate}></Button> */}
                </Card.Body>
                <Card.Body
                  className={
                    this.state.isPersonalEdit
                      ? "border-top pro-det-edit collapse"
                      : "border-top pro-det-edit collapse show"
                  }
                >
                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      Club Name
                    </label>
                    <Col sm={9}>{name}</Col>
                  </Row>
                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      Address
                    </label>
                    <Col sm={9}>{address}</Col>
                  </Row>
                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      Country
                    </label>
                    <Col sm={9}>{country}</Col>
                  </Row>
                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      State
                    </label>
                    <Col sm={9}>{state}</Col>
                  </Row>

                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      City
                    </label>
                    <Col sm={9}>{city}</Col>
                  </Row>

                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      Pin Code
                    </label>
                    <Col sm={9}>{pincode}</Col>
                  </Row>
                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      Contact Person Name{" "}
                    </label>
                    <Col sm={9}>{contactpersonname}</Col>
                  </Row>
                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      Contact Person Number
                    </label>
                    <Col sm={9}>{contactpersonnumber}</Col>
                  </Row>
                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      Email
                    </label>
                    <Col sm={9}>{email}</Col>
                  </Row>
                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      Website
                    </label>
                    <Col sm={9}>{website}</Col>
                  </Row>
                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      Club Registration Number
                    </label>
                    <Col sm={9}>{clubregistrationnumber}</Col>
                  </Row>
                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      Year of Establishment
                    </label>
                    <Col sm={9}>{yearofestablishment}</Col>
                  </Row>
                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      Trust Formed
                    </label>
                    <Col sm={9}>{trustformed}</Col>
                  </Row>
                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      Do you have 12A registered
                    </label>
                    <Col sm={9}>{aregister}</Col>
                  </Row>
                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      Do you have 80G registered
                    </label>
                    <Col sm={9}>{gregister}</Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>
                  <h5>Amount Details</h5>
                </Card.Header>
                <Card.Body>
                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      Amount Payable
                    </label>
                    <Col sm={9}>{amount}</Col>
                  </Row>

                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      Pay Amount
                    </label>
                    <Col sm={9}>
                      
                       {/* {(() => {
                        const { amount, value } = this.state;
                        // console.log(amount,value);
                        let result;
                        if (value === "Monthly") {
                          result = <span>{amount*1}</span>;
                        }
                        else if (value === "Quarterly"){
                          result = <span>{amount*3}</span>;
                        }
                        else if (value === "Half_Yearly"){
                          result = <span>{amount*6}</span>;
                        }
                        else if (value === "Yearly"){
                          result = <span>{amount*12}</span>;
                        }
                        return result;
                      })()} */}
                      {value}

                      
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      Payment type
                    </label>
                    <Col sm={9}>
                     {/* {(() => {
                       let type;
                        const {  value } = this.state;
                        // console.log(amount,value);
                        if (value === "Monthly") {
                          type = <span >Monthly</span>;
                        }
                        else if (value === "Quarterly"){
                          type = <span>Quarterly</span>;
                        }
                        else if (value === "Half_Yearly"){
                          type = <span>Half Yearly</span>;
                        }
                        else if (value === "Yearly"){
                          type = <span>Yearly</span>;
                        }
                        return type;
                       
                      })()} */}

                      {type}
                      
                    </Col>
                  </Row>

                  

                  {/* <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      Start Date
                    </label>
                    <Col sm={4}>
                    
                    </Col>
                  </Row> */}

                  <Row className="form-group">
                    <label className="col-sm-3 col-form-label font-weight-bolder">
                      Due Date
                    </label>
                    <Col sm={4}>
                      {dateString}
                    </Col>
                  </Row>

                  
                </Card.Body>
              </Card>
            </div>

            <Card>  
              <Card.Header>
                <Button onClick={() => this.setState({ isBasic: !isBasic })}>
                  Amount
                </Button>
              </Card.Header>
              <Collapse in={this.state.isBasic}>
                <div id="basic-collapse">
                  <Card.Body>
                    <ValidationForm id="" onSubmit={this.onSubmit}>
                      <Form.Row>
                        <Form.Group as={Col} md="4">
                          <Form.Label htmlFor="amount">Amount</Form.Label>
                          <TextInput
                            name="amount"
                            id="amount"
                            placeholder="amount"
                            value={this.state.amount}
                            onChange={this.divstatus1}
                          />
                        </Form.Group>

                        <Col md={2}>
                          <Form.Check
                            type="radio"
                            label="Monthly"
                            name="formHorizontalRadios1"
                            id="formHorizontalRadios1"
                            value="Monthly"
                            onChange={this.handleChange}
                          />
                          <span>{this.state.result}</span>
                        </Col>

                        <Col md={2}>
                          <Form.Check
                            type="radio"
                            label="Quarterly"
                            name="formHorizontalRadios1"
                            id="formHorizontalRadios1"
                            value="Quarterly"
                            onChange={this.handleChange}
                          />
                        </Col>

                        <Col md={2}>
                          <Form.Check
                            type="radio"
                            label="Half Yearly"
                            name="formHorizontalRadios1"
                            id="formHorizontalRadios1"
                            value="Half_Yearly"
                            onChange={this.handleChange}
                          />
                        </Col>

                        <Col md={2}>
                          <Form.Check
                            type="radio"
                            label="Yearly"
                            name="formHorizontalRadios1"
                            id="formHorizontalRadios1"
                            value="Yearly"
                            onChange={this.handleChange}
                          />
                        </Col>

                        <Form.Group as={Col} sm={12} className="mt-3">
                          <Button type="submit"  >Submit</Button>
                          <Button onClick={this.handleReset}>Reset</Button>
                        </Form.Group>
                      </Form.Row>
                    </ValidationForm>
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default UserViewList;
