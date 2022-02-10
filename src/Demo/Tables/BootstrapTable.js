import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {Row, Col, Card, Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { listNotes } from './../actions/clubActions';


import Aux from "../../hoc/_Aux";

    
const BootstrapTable = () => {
     

    //const clubList = useSelector((state) => state.clubList);
	//const { notes } = clubList;
	//const result = Object.values(clubList);
    
    // const clubCreate = useSelector((state) => state.clubCreate);
  	// const { success: successCreate } = clubCreate;

    // const history = useHistory();
	// useEffect(() => {
	// 	dispatch(listNotes());
	// 	if (!userInfo) {
	// 		history.push('/admin-sidebar');
	// 	}
	// }, [
	// 	dispatch,
	// 	history,
	// 	userInfo,
	// 	successCreate
	// ]);

	// const ToggleClass = () => {
	// 	setActive(!isActive); 
	// 	dispatch(createStatusAction(isActive));
	//    };

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Club List</Card.Title>
                                <span className="d-block m-t-5">use club <code>Table</code> component</span>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                        <th>Username</th>
                                    </tr>
                                    </thead>




                                 		{/*   <tbody>


                                    {result.map((item, index) => (
                                        <tr className="alert" key={index}>
																			<td className="product-item-name">{item.name}</td>
																			<td className="product-item-email">{item.email}</td>
																			<td className="product-item-phone">{item.personcontactname}</td>
                                                                            <td className="product-item-phone">{item.personcontactnumber}</td>
																			<td className="product-item-code">{item.clubregistrationnumber}</td>
																		
																		
																			
																		</tr>
                                        ))}



													 {result.map((repos, index) => {
																const itemsResult = Object.values(repos);

																//console.log(itemsResult)
																	return itemsResult.map((item, index) =>
																	
																	
																		<tr className="alert" key={index}>
																			<td className="product-item-name">{item.name}</td>
																			<td className="product-item-email">{item.email}</td>
																			<td className="product-item-phone">{item.personcontactnumber}</td>
                                                                            <td className="product-item-phone">{item.personcontactnumber}</td>
																			<td className="product-item-code">{item.clubregistrationnumber}</td>
																			{/* <td className={isActive ? "active" : "null"} ><button onClick={ToggleClass}  class="btn btn-sm btn1 btnhover"><i class="fa fa-check"></i>Approve</button></td> 
																		
																			
																		</tr>
																
																
																)
															})} 


														</tbody>*/}










                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                        
                        
                    </Col>
                </Row>
            </Aux>
        );
    }


export default BootstrapTable;