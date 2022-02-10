import React from 'react';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import { ValidationForm, TextInput, BaseFormControl, SelectGroup, FileInput, Checkbox, Radio } from 'react-bootstrap4-form-validation';
import Aux from "../../../hoc/_Aux";
import axios from 'axios'
import MaskedInput from 'react-text-mask';
import validator from 'validator';

class AddDieties extends React.Component {
     
    fileObj = [];
    fileArray = [];
    
    constructor(props) {
        super(props);

        this.onChangeDietyNameEnglish = this.onChangeDietyNameEnglish.bind(this);
        this.onChangeAliasNameEnglish = this.onChangeAliasNameEnglish.bind(this);
        this.onChangeDietyNameHindi = this.onChangeDietyNameHindi.bind(this);
        this.onChangeAliasNameHindi = this.onChangeAliasNameHindi.bind(this);
        this.onChangeDietyIcon = this.onChangeDietyIcon.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.uploadSingleFile = this.uploadSingleFile.bind(this);
        //this.upload = this.upload.bind(this);

        this.state = {
            dietynameinenglish: '',
            aliasnameinenglish: '',
            dietynameinhindi: '',
            aliasnameinhindi: '',
            image: null,
            validated: false,
            validatedTooltip: false,
            supportedCheckbox: false,
            supportedRadio: false,
            supportedSelect: 0,
            supportedFile: 0,
            file: null
        
        }
    }

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

    // onChangeDietyIcon = (e) => {
	// 	this.setState({
	// 		image: e.target.value
	// 	});

	// }



    // On file select (from the pop up)
    onChangeDietyIcon = (e) => {

        // Update the state
        this.setState({ 
        image: e.target.files[0] });
      
      };

    onSubmit = (event) => {
        
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({ validated: true });

		const newUser = {
			dietynameinenglish: this.state.dietynameinenglish,
			aliasnameinenglish: this.state.aliasnameinenglish,
            dietynameinhindi: this.state.dietynameinhindi,
            aliasnameinhindi: this.state.aliasnameinhindi,
            image: this.state.image,
		}

		axios.post('http://localhost:5000/api/adddieties', newUser)
			.then(res => console.log(res.data));

		this.setState({
			dietynameinengliah: '',
			aliasnameinenglish: '',
            dietynameinhindi: '',
            aliasnameinhindi: '',
            image: ''
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

    uploadSingleFile(e) {
        this.setState({
            file: URL.createObjectURL(e.target.files[0])
        })
    }
    upload(e) {
        e.preventDefault()
        console.log(this.state.file)
    }

    render() {
        const { validated, validatedTooltip } = this.state;
        
        let imgPreview;
        if (this.state.file) {
            imgPreview = <img src={this.state.file} style={{width:'50%'}}alt='' />;
        }

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Add Dieties</Card.Title>
                            </Card.Header>
                            <Card.Body>  
                            <ValidationForm onSubmit={this.onSubmit} onErrorSubmit={this.handleErrorSubmit} encType="multipart/form-data">    
                                <Row>
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
                                                required
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
                                                required
                                                value={this.state.aliasnameinenglish}
                                                onChange={this.onChangeAliasNameEnglish}
                                                rows="3"
                                                autoComplete="off"
                                            />
                                        </Form.Group>

                                       


                                        <Form.Group as={Col} md="6">
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
                                                    value={this.state.selectedFile}
                                                  //  onChange={this.onChangeDietyIcon}
                                                  onChange={this.uploadSingleFile} 
                                                  
                                                    />
                                            </div>
                                        </Form.Group>
                                        <Form.Group as={Col} md="4">
                                        {imgPreview}
                                            </Form.Group>
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
                                                required 
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
                                                required
                                                value={this.state.aliasnameinhindi}
                                                onChange={this.onChangeAliasNameHindi}
                                                rows="3"
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                      
                                    </Form.Row>
                                    </Col>
                                    <Form.Group as={Col} sm={12} className="mt-3">
                                            <Button type="submit" >Submit</Button>
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

export default AddDieties;
