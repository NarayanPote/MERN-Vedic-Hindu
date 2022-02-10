import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Form, Button, Table, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import { ValidationForm, TextInput, BaseFormControl, SelectGroup, FileInput, Checkbox, Radio } from 'react-bootstrap4-form-validation';
import Aux from "../../../hoc/_Aux";
import axios from 'axios'
import MaskedInput from 'react-text-mask';
import validator from 'validator';

import DEMO from "../../../store/constant";


class AddCategories extends React.Component {

    
    constructor(props) {
        super(props);

        this.onChangeCategoryNameEnglish = this.onChangeCategoryNameEnglish.bind(this);
        this.onChangeCategoryNameHindi = this.onChangeCategoryNameHindi.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            categorynameinenglish: '',
            categorynameinhindi: '',
            validated: false,
            validatedTooltip: false,
            supportedCheckbox: false,
            supportedRadio: false,
            supportedSelect: 0,
            supportedFile: 0,
            items: ""
        
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

    onSubmit = (event) => {
        
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({ validated: true });

		const newUser = {
			categorynameinenglish: this.state.categorynameinenglish,
			categorynameinhindi: this.state.categorynameinhindi,
		}

		axios.post('http://localhost:5000/api/addcategories', newUser)
			.then(res => console.log(res.data));

		this.setState({
			categorynameinenglish: '',
			categorynameinhindi: '',
		})


	}

   

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

    componentDidMount() {
        fetch("http://localhost:5000/api/addcategories")
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              items: json,
              DataisLoaded: true,
            });
          });
        //atable();
      }

    render() {

        const { items,validated, validatedTooltip  } = this.state;
        const result = Object.values(items);

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
                            <Table ref="tbl" striped hover responsive id="data-table-zero">
                  <thead className="thead-light">
                    <tr>
                      <th>Icon</th>
                      <th>Name In English</th>
                      <th>Name In Hindi</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((repos, index) => (
                      <tr key={index}>
                        <td className="align-middle"></td>
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
