import React from 'react';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import { ValidationForm, TextInput, BaseFormControl, SelectGroup, FileInput, Checkbox, Radio } from 'react-bootstrap4-form-validation';
import Aux from "../../../hoc/_Aux";
import axios from 'axios'
import MaskedInput from 'react-text-mask';
import validator from 'validator';
import DEMO from "../../../store/constant";


class EditDieties extends React.Component {

    
    constructor(props) {
        super(props);

        this.onChangeDietyNameEnglish = this.onChangeDietyNameEnglish.bind(this);
        this.onChangeAliasNameEnglish = this.onChangeAliasNameEnglish.bind(this);
        this.onChangeDietyNameHindi = this.onChangeDietyNameHindi.bind(this);
        this.onChangeAliasNameHindi = this.onChangeAliasNameHindi.bind(this);
       this.onChangeStatus = this.onChangeStatus.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      // this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            items: "",
           // DataisLoaded: false,
           // store: this.props.match.params.id,
            dietynameinenglish: '',
            aliasnameinenglish: '',
            dietynameinhindi: '',
            aliasnameinhindi: '',
            status: '',
            // validated: false,
            // validatedTooltip: false,
            // supportedCheckbox: false,
            // supportedRadio: false,
            // supportedSelect: 0,
            // supportedFile: 0
        
        }
      //  console.log(this.state);
    }
   
    componentDidMount = () => {
        this.getEmployeeById();
      };
      
    onChangeDietyNameEnglish = (e) => {
		this.setState({
			dietynameinenglish: e.target.value
		});

	}

    onChangeAliasNameEnglish = (e) => {
		this.setState({
			aliasnameinenglish: e.target.value
		});

	}

	onChangeDietyNameHindi = (e) => {
		this.setState({
			dietynameinhindi: e.target.value
		});

	}


    onChangeAliasNameHindi = (e) => {
		this.setState({
			aliasnameinhindi: e.target.value
		});

	}

    onChangeStatus = (e) => {
		this.setState({
			status: e.target.value
		});
        console.log(e.target.value);
	}

    // onChangeStatus(repos) {
    //     this.setState((prevState) => ({
    //       status: !prevState.status,
    //     }));
    //     console.log("status", this.state.status);
    //   }

    
    
    onSubmit(e) {
        e.preventDefault();
          console.log(this.state.status)
    
        const userObject = {
          dietynameinenglish: this.state.dietynameinenglish,
          aliasnameinenglish: this.state.aliasnameinenglish,
          dietynameinhindi: this.state.dietynameinhindi,
          aliasnameinhindi: this.state.aliasnameinhindi,
          status: this.state.status,
          dateString: this.state.dateString,
         };
        // console.log(userObject);
         
        axios
          .put(
            "http://localhost:5000/updatephotos/" + this.props.match.params.id,
            userObject
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
         //window.location.reload();
         window.location.href=DEMO.DIETIES_LIST;

        }



    getEmployeeById() {
        axios
          .get("http://localhost:5000/getphotos/" + this.props.match.params.id)
          .then((response) => {
            this.setState({
                dietynameinenglish: response.data.dietynameinenglish,
                aliasnameinenglish: response.data.aliasnameinenglish,
                dietynameinhindi: response.data.dietynameinhindi,
                aliasnameinhindi: response.data.aliasnameinhindi,
                //status: response.data.status,
               // dateString: this.state.dateString,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }



  
     

    


   

    render() {

        //  const { dietynameinenglish,aliasnameinenglish,dietynameinhindi,aliasnameinhindi
        //    } = this.state;
         
         // console.log(this.state);
        // const { items, validated, validatedTooltip } = this.state;
        // const result = Object.values(items);
        // console.log(items);
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Update Dieties</Card.Title>
                            </Card.Header>
                            <Card.Body>  
                            <ValidationForm onSubmit={this.onSubmit} onErrorSubmit={this.handleErrorSubmit} encType="multipart/form-data">    
                         
                                <Row >
                                    <Col md={6}>
                                        <h5 className="mt-5">In English</h5>
                                        <hr/>
                                  
                                    <Form.Row>

                                        <Form.Group as={Col} md="12">
                                            <Form.Label htmlFor="firstName">Name of Diety</Form.Label>
                                            <TextInput
                                                name="dietyname"
                                                id="dietyname"
                                                placeholder="In English"
                                                
                                                value={this.state.dietynameinenglish}
                                                onChange={this.onChangeDietyNameEnglish}
                                                autoComplete="off"                                       
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm="12">
                                            <Form.Label htmlFor="description">Alias</Form.Label>
                                            <TextInput
                                                name="description"
                                                id="description"
                                                placeholder="In English"
                                                multiline
                                                
                                                value={this.state.aliasnameinenglish}
                                                onChange={this.onChangeAliasNameEnglish}
                                                rows="3"
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm="12">
                                            <Form.Check
                                                inline
                                                custom
                                                type="radio"
                                                label="Active"
                                                name="status"
                                                id="status21"
                                                onChange={this.onChangeStatus}
                                                value="active"
                                                required
                                                inline={true}      
                                                
                                            />
                                            <Form.Check
                                                inline
                                                custom
                                                type="radio"
                                                label="Inactive"
                                                name="status"
                                                id="status22"
                                                required
                                                onChange={this.onChangeStatus}
                                                value="inactive"
                                                inline={true}
                                                
                                            />
                                            <Form.Text className="text-muted">
                                                   This field is manadatory*.
                                                </Form.Text>
                                        </Form.Group>

                                        {/* <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="upload_avatar">Upload Avatar</Form.Label>
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
                                                  //  value={this.state.selectedFile}
                                                  //  onChange={this.onChangeDietyIcon}
                                                    />
                                            </div>
                                        </Form.Group> */}
                                    </Form.Row>
                              
                                    </Col>
                                    <Col md={6}>
                                        <h5 className="mt-5">In Hindi</h5>
                                        <hr/>
                                    
                                    <Form.Row>
                                        <Form.Group as={Col} md="12">
                                            <Form.Label htmlFor="firstName">Name of Diety</Form.Label>
                                            <TextInput
                                                name="firstName"
                                                id="firstName"
                                                placeholder="हिंदी में"
                                                 
                                                value={this.state.dietynameinhindi}
                                                onChange={this.onChangeDietyNameHindi}
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm="12">
                                            <Form.Label htmlFor="description">Alias</Form.Label>
                                            <TextInput
                                                name="description"
                                                id="description"
                                                placeholder="हिंदी में"
                                                multiline
                                                
                                                value={this.state.aliasnameinhindi}
                                                onChange={this.onChangeAliasNameHindi}
                                                rows="3"
                                                autoComplete="off"
                                            />
                                        </Form.Group>          
                                      
                                    </Form.Row>
                                    </Col>
                                    <Form.Group as={Col} sm={12} className="mt-3">
                                            <Button type="submit">Update</Button>
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

export default EditDieties;
