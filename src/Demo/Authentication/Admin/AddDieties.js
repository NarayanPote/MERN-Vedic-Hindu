import React from 'react';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import { ValidationForm, TextInput, BaseFormControl, SelectGroup, FileInput, Checkbox, Radio } from 'react-bootstrap4-form-validation';
import Aux from "../../../hoc/_Aux";
import axios from 'axios'
import MaskedInput from 'react-text-mask';
import validator from 'validator';
import { withTranslation } from "react-i18next";
import DEMO from "../../../store/constant";

class AddDieties extends React.Component {
 
    fileObj = [];
    fileArray = [];
    
    constructor(props) { 
        super(props);

        this.onChangeDietyNameEnglish = this.onChangeDietyNameEnglish.bind(this);
        this.onChangeAliasNameEnglish = this.onChangeAliasNameEnglish.bind(this);
        this.onChangeDietyNameHindi = this.onChangeDietyNameHindi.bind(this);
        this.onChangeAliasNameHindi = this.onChangeAliasNameHindi.bind(this);
        this.onChangePhoto = this.onChangePhoto.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    
        this.state = {
            dietynameinenglish: '',
            aliasnameinenglish: '',
            dietynameinhindi: '',
            aliasnameinhindi: '',
            photo: "",
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

    // On file select (from the pop up)
    onChangePhoto = (e) => {
        this.setState({
          photo: e.target.files[0],
        });
      };



      onSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { dietynameinenglish, aliasnameinenglish, dietynameinhindi, photo,aliasnameinhindi } = this.state;
          if (photo) {
            const formData = new FormData();
            formData.append("dietynameinenglish", dietynameinenglish);
            formData.append("aliasnameinenglish", aliasnameinenglish);
            formData.append("dietynameinhindi", dietynameinhindi);
            formData.append("photo", photo);
            formData.append("aliasnameinhindi", aliasnameinhindi);
            console.log(formData);
            await axios.post("http://localhost:5000/photos", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            //window.reload();
            window.location.href=DEMO.DIETIES_LIST;
          }
        } catch (error) {
          return error.response;
        }
      };




    // onSubmit = (event) => {
        
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }
    //     this.setState({ validated: true });

	// 	const newUser = {
	// 		dietynameinenglish: this.state.dietynameinenglish,
	// 		aliasnameinenglish: this.state.aliasnameinenglish,
    //         dietynameinhindi: this.state.dietynameinhindi,
    //         aliasnameinhindi: this.state.aliasnameinhindi,
    //         image: this.state.image,
	// 	}

	// 	axios.post('http://localhost:5000/api/adddieties', newUser)
	// 		.then(res => console.log(res.data));

	// 	this.setState({
	// 		dietynameinengliah: '',
	// 		aliasnameinenglish: '',
    //         dietynameinhindi: '',
    //         aliasnameinhindi: '',
    //         image: ''
	// 	})
    //     window.location.reload();

	// }

   

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

   

    render() {
        const { validated, validatedTooltip } = this.state;
        const { t } = this.props;

        

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">{t("welcome")}</Card.Title>
                            </Card.Header>
                            <Card.Body>  
                            <ValidationForm onSubmit={this.onSubmit} onErrorSubmit={this.handleErrorSubmit} encType="multipart/form-data">    
                                <Row>
                                    <Col md={6}>
                                        <h5 className="mt-5">{t("english")}</h5>
                                        <hr/>
                                  
                                    <Form.Row>
                                        <Form.Group as={Col} md="12">
                                            <Form.Label htmlFor="firstName">{t("dieties_name")}</Form.Label>
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
                                            <Form.Label htmlFor="description">{t("alias")}</Form.Label>
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
                          <Form.Label htmlFor="upload_avatar">{t("upload_avatar")}</Form.Label>
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
                      


                                    </Form.Row>
                              
                                    </Col>
                                    <Col md={6}>
                                        <h5 className="mt-5">{t("hindi")}</h5>
                                        <hr/>
                                    
                                    <Form.Row>
                                        <Form.Group as={Col} md="12">
                                            <Form.Label htmlFor="firstName">{t("dieties_name")}</Form.Label>
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
                                            <Form.Label htmlFor="description">{t("alias")}</Form.Label>
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
                                            <Button type="submit" >{t("submit")}</Button>
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

export default withTranslation()(AddDieties);
