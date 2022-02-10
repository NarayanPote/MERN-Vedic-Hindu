import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Form, Button, Table, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import { ValidationForm, TextInput, BaseFormControl, SelectGroup, FileInput, Checkbox, Radio } from 'react-bootstrap4-form-validation';
import Aux from "../../../hoc/_Aux";
import axios from 'axios'
import MaskedInput from 'react-text-mask';
import validator from 'validator';

import DEMO from "../../../store/constant";


class EditCategories extends React.Component {

    
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

    componentDidMount = () => {
        this.getCategoryById(); 
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
    

    onSubmit(e) {
        e.preventDefault();
         // console.log(this.state.date)
    
        const userObject = {
            categorynameinenglish: this.state.categorynameinenglish,
            categorynameinhindi: this.state.categorynameinhindi,
         };
        // console.log(userObject);
         
        axios
          .put(
            "http://localhost:5000/updatecategories/" + this.props.match.params.id,
            userObject
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
         window.location.reload();
        // location.href = "admin/list-dieties";

        }  

    getCategoryById() {
        axios
          .get("http://localhost:5000/getcategories/" + this.props.match.params.id)
          .then((response) => {
            this.setState({
                categorynameinenglish: response.data.categorynameinenglish,
                categorynameinhindi: response.data.categorynameinhindi,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }


    render() {

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Update Categories</Card.Title>
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
                                    <Form.Group as={Col} sm={12} className="mt-3">
                                            <Button type="submit">Submit</Button>
                                    </Form.Group>
                                </Row>      
                                </ValidationForm>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default EditCategories;
