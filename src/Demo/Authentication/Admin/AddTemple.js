import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Table, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import Select from 'react-select';
import { ValidationForm, TextInput, BaseFormControl, SelectGroup, FileInput, Checkbox, Radio } from 'react-bootstrap4-form-validation';
import Aux from "../../../hoc/_Aux";
import axios from 'axios'
import MaskedInput from 'react-text-mask';
import validator from 'validator';
import DEMO from "../../../store/constant";

class AddTemple extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeTempleCategory = this.onChangeTempleCategory.bind(this);
        this.onChangeTemplePilgrimage = this.onChangeTemplePilgrimage.bind(this);
        this.onChangeTempleMainDiety = this.onChangeTempleMainDiety.bind(this);
     //   this.onChangeTempleOtherDiety = this.onChangeTempleOtherDiety.bind(this);
        this.onChangeTempleNameEnglish = this.onChangeTempleNameEnglish.bind(this);
        this.onChangeTempleNameHindi = this.onChangeTempleNameHindi.bind(this);
       // this.onChangeCategoryNameEnglish = this.onChangeCategoryNameEnglish.bind(this);
       // this.onChangeCategoryNameHindi = this.onChangeCategoryNameHindi.bind(this);
        this.onChangePhoto = this.onChangePhoto.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            templecategory: "",
            templepilgrimage: "",
            templemaindiety: "",
            templeotherdiety: "",
            templenameinenglish: "",
            templenameinhindi: "",
            photo: "",


            pilgrimagenameinenglish: "",
            categorynameinenglish: "",
            dietynameinenglish: "",
            aliasnameinenglish: "",
             _id: "",
            dropDownOpt : [],
            items: "",
            categories: "",
            pilgrimage: "",
            maindiety: ""
        };
    }

    onChangeTempleCategory = (e) => {
		this.setState({
			templecategory: e.target.value
		});

	}

    onChangeTemplePilgrimage = (e) => {
		this.setState({
			templepilgrimage: e.target.value
		});

	}

    onChangeTempleMainDiety = (e) => {
		this.setState({
			templemaindiety: e.target.value
		});

	}

    onChangeTempleOtherDiety = (e) => {
		this.setState({
			templeotherdiety: e.target.value
		});

	}

    onChangeTempleNameEnglish = (e) => {
		this.setState({
			templenameinenglish: e.target.value
		});

	}

    onChangeTempleNameHindi = (e) => {
		this.setState({
			templenameinhindi: e.target.value
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
          const { templecategory, templepilgrimage, templemaindiety, templeotherdiety, templenameinenglish, templenameinhindi, photo } = this.state;
          if (photo) {
            const formData = new FormData();
            formData.append("templecategory", templecategory);
            formData.append("templepilgrimage", templepilgrimage);
            formData.append("templemaindiety", templemaindiety);
           // formData.append("templeotherdiety", templeotherdiety);
            formData.append("templenameinenglish", templenameinenglish);
            formData.append("templenameinhindi", templenameinhindi);
            formData.append("photo", photo);;
            console.log(formData);
            await axios.post("http://localhost:5000/addtemple", formData, {
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








    // componentDidMount() {
    //     fetch("http://localhost:5000/api/addpilgrimage")
    //       .then((res) => res.json())
    //       .then((json) => {
    //         this.setState({
    //           items: json,
    //           DataisLoaded: true,
    //         });
    //       });
    //     //atable();
    //   }


    //   componentDidMount() {
    //     Promise.all([fetch('http://localhost:5000/api/addpilgrimage'), fetch('http://localhost:5000/categories')])
    
    //       .then(([res1, res2]) => { 
    //          return Promise.all([res1.json(), res2.json()]) 
    //       })
    //       .then(([json]) => {
    //         this.setState({
    //             items: json,
    //             categories: json,
    //             DataisLoaded: true,
    //         });
    //       });
    // }


    async getCategoriesData() {
        const res = await axios.get("http://localhost:5000/categories");
        console.log(res.data);
        this.setState({ loading: false, categories: res.data });
    }

    async getPilgrimageData() {
        const res = await axios.get("http://localhost:5000/api/addpilgrimage");
        console.log(res.data);
        this.setState({ loading: false, pilgrimage: res.data });
    }

    async getMainDietyData() {
        const res = await axios.get("http://localhost:5000/photos");
        console.log(res.data);
        this.setState({ loading: false, maindiety: res.data });
    }

    async renderData(){
        const API = await axios.get('http://localhost:5000/photos')
        const serverResponse = API.data
      //  console.log(API.data);
        const dropDownValue = serverResponse.map((response) => ({
          "value" : response._id,
          "label" : response.aliasnameinenglish
        }))
    
        this.setState(
          {
            dropDownOpt: dropDownValue
          }
        )
    //console.log(dropDownValue)
      }
    
    onChange(event){
       this.setState(
         {
           _id: event.value, 
           aliasnameinenglish: event.label
          }
        )
      }
         
    componentDidMount() {
        this.getCategoriesData();
        this.getPilgrimageData();
        this.getMainDietyData();
        this.renderData();
     }


    render() {

        const { items, categories, pilgrimage, maindiety, validated, validatedTooltip } = this.state;
        const result = Object.values(categories);
        const result1 = Object.values(pilgrimage);
        const result2 = Object.values(maindiety);

        // var d= this.state.dropDownOpt;
        // console.log(d);


        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Add Temple</Card.Title>
                            </Card.Header>
                            <Card.Body>  
                            <ValidationForm onSubmit={this.onSubmit} onErrorSubmit={this.handleErrorSubmit} encType="multipart/form-data">    
                                <Row>
                                    <Col md={12}>
                                        {/* <h5 className="mt-5">In English</h5>
                                        <hr/> */}
                                        <Form.Row>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="category">Category</Form.Label>
                                            <SelectGroup
                                                name="category"
                                                id="category"
                                                required
                                                errorMessage="Please select a category."
                                                value={this.state.templecategory} 
                                                onChange={this.onChangeTempleCategory}>
                                                <option value=""> select category</option>
                                                {result.map((repos, index) => (
                                                 <option value={repos._id}>{repos.categorynameinenglish} </option>
                                                 ))}
                                            </SelectGroup>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="pilgrimage">Pilgrimage</Form.Label>
                                            <SelectGroup
                                                name="pilgrimage"
                                                id="pilgrimage"
                                                required
                                                errorMessage="Please select a pilgrimage."
                                                value={this.state.templepilgrimage} 
                                                onChange={this.onChangeTemplePilgrimage}>
                                                <option value=""> select pilgrimage</option>
                                                {result1.map((repos, index) => (
                                                 <option value={repos._id}>{repos.pilgrimagenameinenglish} </option>
                                                 ))}
                                            </SelectGroup>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="maindiety">Main Diety</Form.Label>
                                            <SelectGroup
                                                name="maindiety"
                                                id="maindiety"
                                                required
                                                errorMessage="Please select a diety."
                                                value={this.state.templemaindiety} 
                                                onChange={this.onChangeTempleMainDiety}>
                                                <option value=""> select diety</option>
                                                {result2.map((repos, index) => (
                                                 <option value={repos._id}>{repos.dietynameinenglish} </option>
                                                 ))}
                                            </SelectGroup>
                                        </Form.Group>                                   
                                    <Form.Group as={Col} md="6">
                                    <Form.Label htmlFor="otherdiety">Other Diety</Form.Label>
                                            <Select
                                                isMulti
                                                name="otherdiety"
                                                id="otherdiety"
                                                required
                                                errorMessage="Please select a other diety."
                                                options={this.state.dropDownOpt} 
                                                onChange={this.onChange.bind(this)}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                isSearchable
                                                //value={this.state.templeotherdiety} 
                                               // onChange={this.onChangeTempleOtherDiety}                                                   
                                                />
                                        </Form.Group>
                                        {/* <h5 className="mt-5">Basic Information</h5> */}
                                        <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="templenameinenglish">Name of the Temple</Form.Label>
                                            <TextInput
                                                name="templenameinenglish"
                                                id="templenameinenglish"
                                                placeholder="In English"
                                                required
                                                autoComplete="off"                                       
                                                value={this.state.templenameinenglish} 
                                                onChange={this.onChangeTempleNameEnglish}/>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="templenameinhindi">Name of the Temple</Form.Label>
                                            <TextInput
                                                name="templenameinhindi"
                                                id="templenameinhindi"
                                                placeholder="हिंदी में"
                                                required
                                                autoComplete="off"                                       
                                                value={this.state.templenameinhindi} 
                                                onChange={this.onChangeTempleNameHindi}/>
                                        </Form.Group>
                                        {/* <Form.Group as={Col} md="6">
                                    <Form.Label htmlFor="upload_avatar">Temple Photo</Form.Label>
                                    <div className="custom-file">
                                    <FileInput
                                      name="photo"
                                      id="avatar"
                                      required
                                      fileType={["png", "jpg", "jpeg"]}
                                      maxFileSize="1000 kb"
                                      errorMessage={
                                      { required: "Please upload a file",
                                      fileType:"Only .png or .jpg file is allowed",
                                      maxFileSize: "Max file size is 100 kb"
                                      }
                                      }
                                      onChange={this.onChangePhoto}
                                    />
                                      </div>
                                  </Form.Group> */}
                                        {/* <Form.Group as={Col} md="12">
                                            <Form.Label htmlFor="templedescriptioninenglish">Description about the Temple</Form.Label>
                                            <TextInput
                                                name="templedescriptioninenglish"
                                                id="templedescriptioninenglish"
                                                placeholder="In English"
                                                multiline
                                                required
                                                value={this.state.aliasnameinenglish}
                                                onChange={this.onChangeAliasNameEnglish}
                                                rows="4"
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md="12">
                                            <Form.Label htmlFor="templedescriptioninhindi">&nbsp;</Form.Label>
                                            <TextInput
                                                name="templedescriptioninhindi"
                                                id="templedescriptioninhindi"
                                                placeholder="हिंदी में"
                                                multiline
                                                required
                                                value={this.state.aliasnameinenglish}
                                                onChange={this.onChangeAliasNameEnglish}
                                                rows="3"
                                                autoComplete="off"
                                            />
                                        </Form.Group> */}

                             
                                    </Form.Row>








                                    {/* <Form.Row>
                                        <Form.Group as={Col} md="4">
                                            <Form.Label htmlFor="firstName">Name of Pilgrimage</Form.Label>
                                            <TextInput
                                                name="categorynameinenglish"
                                                id="categorynameinenglish"
                                                placeholder="In English"
                                                required
                                                autoComplete="off"                                       
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md="4">
                                            <Form.Label htmlFor="firstName">Name of Pilgrimage</Form.Label>
                                            <TextInput
                                                name="categorynameinenglish"
                                                id="categorynameinenglish"
                                                placeholder="In English"
                                                required
                                                autoComplete="off"                                       
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md="4">
                                            <Form.Label htmlFor="firstName">Name of Pilgrimage</Form.Label>
                                            <TextInput
                                                name="categorynameinenglish"
                                                id="categorynameinenglish"
                                                placeholder="In English"
                                                required
                                                autoComplete="off"                                       
                                            />
                                        </Form.Group>
                                    </Form.Row> */}
                              
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

export default AddTemple;
