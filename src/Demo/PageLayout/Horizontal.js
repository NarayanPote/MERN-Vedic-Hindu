import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, Tabs, Tab, Dropdown, Carousel} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import topbanners_06 from '../../assets/images/topbanners_06.jpg';


import * as actionTypes from "../../store/actions";
import DEMO from "../../store/constant";

class Horizontal extends Component {

    UNSAFE_componentWillMount() {
        const contentWidth = document.getElementById('root').clientWidth;
        if (this.props.layout !== 'vertical' && contentWidth < 992) {
            this.props.onChangeLayout('vertical');
        } else {
            this.props.onChangeLayout('horizontal');
            if (this.props.collapseMenu) {
                this.props.onToggleNavigation();
            }
            if (this.props.navFixedLayout) {
                this.props.onChangeNavFixedLayout();
            }
            if (this.props.headerFixedLayout) {
                this.props.onChangeHeaderFixedLayout();
            }
        }


    }

    render() {
        return (
            <Aux>
                <Row>
                <Col sm={12}>
                                        {/* <h6 className="text-center mb-3">Social profile</h6> */}
                                        <Card className='user-card user-card-2 shape-right'>
                                            <Card.Header className='border-0 p-2 pb-0'>
                                                <div className="cover-img-block">
                                                    <img src={topbanners_06} alt="" className="img-fluid"/>
                                                    <div className="overlay"/>
                                                </div>
                                            </Card.Header>
                                            <Card.Body className='pt-0'>
                                                <div className="user-about-block">
                                                    <Row className='align-items-center'>
                                                        <Col sm='auto' className='pr-0'>
                                                           
                                                        </Col>
                                                        <Col>
                                                            <h6 className="mb-1">Lary Doe</h6>
                                                            <p className="mb-0">UI/UX Designer</p>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                </Row>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        layout: state.layout,
        collapseMenu: state.collapseMenu,
        navFixedLayout: state.navFixedLayout,
        headerFixedLayout: state.headerFixedLayout
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleNavigation: () => dispatch({type: actionTypes.COLLAPSE_MENU}),
        onChangeLayout: (layout) => dispatch({type: actionTypes.CHANGE_LAYOUT, layout: layout}),
        onChangeNavFixedLayout: () => dispatch({type: actionTypes.NAV_FIXED_LAYOUT}),
        onChangeHeaderFixedLayout: () => dispatch({type: actionTypes.HEADER_FIXED_LAYOUT})
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Horizontal);