import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Form, Button, Table, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import { ValidationForm, TextInput, BaseFormControl, SelectGroup, FileInput, Checkbox, Radio } from 'react-bootstrap4-form-validation';
import Aux from "../../../hoc/_Aux";
import axios from 'axios'
import MaskedInput from 'react-text-mask';
import validator from 'validator';

import DEMO from "../../../store/constant";
import Category from "./Category";
import $ from "jquery";
$.DataTable = require("datatables.net-bs");
require("datatables.net-responsive-bs");

function atable() {
  let tableZero = "#data-table-zero";
 // $.fn.dataTable.ext.errMode = "throw";

  $(tableZero).DataTable();
}


class AddCategories extends React.Component {

  

    // componentDidMount() {
    //     fetch("http://localhost:5000/api/addcategories")
    //       .then((res) => res.json())
    //       .then((json) => {
    //         this.setState({
    //           items: json,
    //           DataisLoaded: true,
    //         });
    //       });
    //     //atable();
    //   }

      constructor(props) {
        super(props);

        this.onChangeCategoryNameEnglish = this.onChangeCategoryNameEnglish.bind(this);
        this.onChangeCategoryNameHindi = this.onChangeCategoryNameHindi.bind(this);
        this.onChangePhoto = this.onChangePhoto.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    
        this.state = {
            categorynameinenglish: '',
            categorynameinhindi: '',
            photo: "",
            validated: false,
            validatedTooltip: false,
            supportedCheckbox: false,
            supportedRadio: false,
            supportedSelect: 0,
            supportedFile: 0,
            file: null,
            search: "",
            items: "",
        
        }
    }

    onChangeCategoryNameEnglish = (e) => {
		this.setState({
			categorynameinenglish: e.target.value
		});

	}

  onChangeCategoryNameHindi = (e) => {
		this.setState({
			categorynameinhindi: e.target.value
		});

	}

 onChangePhoto = (e) => {
        this.setState({
          photo: e.target.files[0],
        });
      };



      onSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { categorynameinenglish, categorynameinhindi, photo } = this.state;
          if (photo) {
            const formData = new FormData();
            formData.append("categorynameinenglish", categorynameinenglish);
            formData.append("categorynameinhindi", categorynameinhindi);
            formData.append("photo", photo);;
            console.log(formData);
            await axios.post("http://localhost:5000/addcategories", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            window.location.reload();
          }
        } catch (error) {
          return error.response;
        }  
      };

    handleSubmitTooltip(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({ validatedTooltip: true });
    }

    supportedSelectHandler = (event) => {
        this.setState({ supportedSelect: parseInt(event.target.value) });
    };

    supportedFileHandler = (event) => {
        this.setState({ supportedFile: !!(event.target.value) });
    };

    onchange = e => {
      this.setState({ search: e.target.value });
    };

//  componentDidMount(){

//   axios.get("http://localhost:5000/categories").then(res => 
//   {
  
//   this.setState({items: res.data});
//   console.log(res.data);
//      }); 
  
//   }

componentDidMount() {
  atable()
}



async getUsersData() {
const res = await axios.get("http://localhost:5000/categories");
console.log(res.data);
this.setState({ loading: false, users: res.data });
}


componentDidMount() {
  this.getUsersData().then(() => this.syncTable());
  }


syncTable() {
this.$el = $(this.el);
this.$el.DataTable({
  data: this.state.users, //option 1
  // data: this.getUsersData1(), //option 2
  columns: [
   // { title: "Photo", data: "photo" },
    { title: "Name In English", data: "categorynameinenglish" },
    { title: "Name In Hindi", data: "categorynameinhindi" }
  ]
});
}
    
    render() {

         const { items,validated, validatedTooltip, search  } = this.state;
         const result = Object.values(items);

        const productDataList = result.filter(country => {
          return country.categorynameinenglish.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                 country.categorynameinhindi.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
    

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Add Categories</Card.Title>
                            </Card.Header>
                            <Card.Body>  
                            <ValidationForm onSubmit={this.onSubmit} onErrorSubmit={this.handleErrorSubmit} encType="multipart/form-data">    
                                <Row>
                                    <Col md={6}>
                                        <h5 className="mt-5">In English</h5>
                                        <hr/>
                                  
                                    <Form.Row>
                                        <Form.Group as={Col} md="12">
                                            <Form.Label htmlFor="firstName">Name of Categories</Form.Label>
                                            <TextInput
                                                name="categorynameinenglish"
                                                id="categorynameinenglish"
                                                placeholder="In English"
                                                required
                                                value={this.state.categorynameinenglish} 
                                                onChange={this.onChangeCategoryNameEnglish}
                                                autoComplete="off"                                       
                                            />
                                        </Form.Group>
                                    </Form.Row>
                              
                                    </Col>
                                    <Col md={6}>
                                        <h5 className="mt-5">In Hindi</h5>
                                        <hr/>
                                    
                                    <Form.Row>
                                        <Form.Group as={Col} md="12">
                                            <Form.Label htmlFor="firstName">Name of categories</Form.Label>
                                            <TextInput
                                                name="categorynameinhindi"
                                                id="categorynameinhindi"
                                                placeholder="हिंदी में"
                                                required 
                                                value={this.state.categorynameinhindi}
                                                onChange={this.onChangeCategoryNameHindi}
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                      
                                    </Form.Row>
                                    </Col>
                                    <Form.Group as={Col} md="6">
                                    <Form.Label htmlFor="upload_avatar">Upload Photo</Form.Label>
                                    <div className="custom-file">
                                    <FileInput
                                      name="photo"
                                      id="avatar"
                                      required
                                      fileType={["png", "jpg", "jpeg"]}
                                      maxFileSize="100 kb"
                                      errorMessage={
                                      { required: "Please upload a file",
                                      fileType:"Only .png or .jpg file is allowed",
                                      maxFileSize: "Max file size is 100 kb"
                                      }
                                      }
                                      onChange={this.onChangePhoto}
                                    />
                                      </div>
                                  </Form.Group>
                                    <Form.Group as={Col} sm={12} className="mt-3">
                                            <Button type="submit">Submit</Button>
                                    </Form.Group>
                                </Row>      
                                </ValidationForm>
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">List Categories</Card.Title>
                            </Card.Header>
                            <Card.Body>  
                            {/* <Col md={4}>
                              <input className="form-control mb-2" placeholder="Search Dieties..."  onChange={this.onchange} />
                            </Col> */}
                            {/* <Table ref="tbl" striped hover responsive id="data-table-zero">
                  <thead className="thead-light">
                    <tr>
                      <th>Icon</th>
                      <th>Name In English</th>
                      <th>Name In Hindi</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productDataList.map((repos, index) => (
                      <tr key={index}>
                        <td className="align-middle">
                        <Category id={repos._id}  alt="category-img" title="contact-img" className="rounded mr-3" height="48" />
                        </td>
                        <td className="align-middle">
                          {repos.categorynameinenglish}
                        </td>
                        <td className="align-middle">
                          {repos.categorynameinhindi}
                        </td>

                        <td className="table-action">
                          <NavLink  
                            // to= {`/admin/edit-dieties/${repos._id}`} 
                             to= {`${DEMO.CATEGORIES_EDIT_LIST}/${repos._id}`}    
                             className="btn btn-icon btn-outline-success">
                             <i className="feather icon-edit" />
                          </NavLink>
                          <NavLink 
                            to= ""
                            className="btn btn-icon btn-outline-danger">
                            <i className="feather icon-trash-2" />
                          </NavLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                           </Table> */}

                           <Table ref="tbl" striped hover responsive id="data-table-zero"  ref={(el) => (this.el = el)}>
                                   
                          </Table>


                            </Card.Body>
                        </Card>
                      
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default AddCategories;
