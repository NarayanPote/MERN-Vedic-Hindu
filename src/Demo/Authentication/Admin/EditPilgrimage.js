import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Form, Button, Table, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import { ValidationForm, TextInput, BaseFormControl, SelectGroup, FileInput, Checkbox, Radio } from 'react-bootstrap4-form-validation';
import Aux from "../../../hoc/_Aux";
import axios from 'axios'
import MaskedInput from 'react-text-mask';
import validator from 'validator';

import DEMO from "../../../store/constant";


class EditPilgrimage extends React.Component {

    
    constructor(props) {
        super(props);

        this.onChangePilgrimageNameEnglish = this.onChangePilgrimageNameEnglish.bind(this);
        this.onChangePilgrimageNameHindi = this.onChangePilgrimageNameHindi.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            pilgrimagenameinenglish: '',
            pilgrimagenameinhindi: '',
            validated: false,
            validatedTooltip: false,
            supportedCheckbox: false,
            supportedRadio: false,
            supportedSelect: 0,
            supportedFile: 0,
            items: ""
        
        }
    }

    onChangePilgrimageNameEnglish = (e) => {
		this.setState({
			pilgrimagenameinenglish: e.target.value
		});

	}

    onChangePilgrimageNameHindi = (e) => {
		this.setState({
			pilgrimagenameinhindi: e.target.value
		});

	}

    getPilgrimageById() {
        axios
          .get("http://localhost:5000/api/addpilgrimage/" + this.props.match.params.id)
          .then((response) => {
            this.setState({
                pilgrimagenameinenglish: response.data.pilgrimagenameinenglish,
                pilgrimagenameinhindi: response.data.pilgrimagenameinhindi,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }  

    componentDidMount = () => {
        this.getPilgrimageById(); 
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
            pilgrimagenameinenglish: this.state.pilgrimagenameinenglish,
            pilgrimagenameinhindi: this.state.pilgrimagenameinhindi,
         };
        // console.log(userObject);
         
        axios
          .put(
            "http://localhost:5000/api/addpilgrimage/" + this.props.match.params.id,
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
        window.location.href=DEMO.PILGRIMAGE_LIST;

        }


    render() {

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Update Pilgrimage</Card.Title>
                            </Card.Header>
                            <Card.Body>  
                            <ValidationForm onSubmit={this.onSubmit} onErrorSubmit={this.handleErrorSubmit}>    
                                <Row>
                                    <Col md={6}>
                                        <h5 className="mt-5">In English</h5>
                                        <hr/>
                                  
                                    <Form.Row>
                                        <Form.Group as={Col} md="12">
                                            <Form.Label htmlFor="firstName">Name of Pilgrimage</Form.Label>
                                            <TextInput
                                                name="categorynameinenglish"
                                                id="categorynameinenglish"
                                                placeholder="In English"
                                                required
                                                value={this.state.pilgrimagenameinenglish} 
                                                onChange={this.onChangePilgrimageNameEnglish}
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
                                            <Form.Label htmlFor="firstName">Name of Pilgrimage</Form.Label>
                                            <TextInput
                                                name="categorynameinhindi"
                                                id="categorynameinhindi"
                                                placeholder="हिंदी में"
                                                required 
                                                value={this.state.pilgrimagenameinhindi}
                                                onChange={this.onChangePilgrimageNameHindi}
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

export default EditPilgrimage;
