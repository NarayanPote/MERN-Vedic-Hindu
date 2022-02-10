import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Table, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import { ValidationForm, TextInput, BaseFormControl, SelectGroup, FileInput, Checkbox, Radio } from 'react-bootstrap4-form-validation';
import Aux from "../../../hoc/_Aux";
import axios from 'axios'
import MaskedInput from 'react-text-mask';
import validator from 'validator';
import DEMO from "../../../store/constant";

class AddPilgrimage extends React.Component {

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
            items: "",
            search: ""
        
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

    onSubmit = (event) => {
        
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({ validated: true });

		const newUser = {
			pilgrimagenameinenglish: this.state.pilgrimagenameinenglish,
			pilgrimagenameinhindi: this.state.pilgrimagenameinhindi,
		}

		axios.post('http://localhost:5000/api/addpilgrimage', newUser)
			.then(res => console.log(res.data));
  
		this.setState({
			pilgrimagenameinenglish: '',
			pilgrimagenameinhindi: '',
		})

    window.location.reload();

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
        fetch("http://localhost:5000/api/addpilgrimage")
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              items: json,
              DataisLoaded: true,
            });
          });
        //atable();
      }
      onchange = e => {
        this.setState({ search: e.target.value });
      };
  

    render() {

        const { items,validated, validatedTooltip, search  } = this.state;
        const result = Object.values(items);
         
        const productDataList = result.filter(country => {
            return country.pilgrimagenameinenglish.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                   country.pilgrimagenameinhindi.toLowerCase().indexOf(search.toLowerCase()) !== -1;
          });
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Add Pilgrimage</Card.Title>
                            </Card.Header>
                            <Card.Body>  
                            <ValidationForm onSubmit={this.onSubmit} onErrorSubmit={this.handleErrorSubmit} encType="multipart/form-data">    
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
                      
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">List Pilgrimage</Card.Title>
                            </Card.Header>
                            <Card.Body>  
                              <Col md={4}>
                              <input className="form-control mb-2" placeholder="Search Pilgrimage..."  onChange={this.onchange} />
                            </Col> 
                            <Table ref="tbl" striped hover responsive id="data-table-zero">
                  <thead className="thead-light">
                    <tr>
                      <th>Name In English</th>
                      <th>Name In Hindi</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productDataList.map((repos, index) => (
                      <tr key={index}>
                        <td className="align-middle">
                          {repos.pilgrimagenameinenglish}
                        </td>
                        <td className="align-middle">
                          {repos.pilgrimagenameinhindi}
                        </td>

                        <td className="table-action">
                          <NavLink  
                            // to= {`/admin/edit-dieties/${repos._id}`} 
                             to= {`${DEMO.PILGRIMAGE_EDIT_LIST}/${repos._id}`}    
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

export default AddPilgrimage;
