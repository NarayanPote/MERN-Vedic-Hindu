import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import windowSize from 'react-window-size';
import { Card } from 'react-bootstrap';

import Aux from "../../../../../hoc/_Aux";
import NavGroup from './NavGroup';
import DEMO from "../../../../../store/constant";
import * as actionTypes from "../../../../../store/actions";

class NavContent extends Component {
    state = {
        scrollWidth: 0,
        prevDisable: true,
        nextDisable: false
    };

    scrollPrevHandler = () => {
        const wrapperWidth = document.getElementById('sidenav-wrapper').clientWidth;

        let scrollWidth = this.state.scrollWidth - wrapperWidth;
        if(scrollWidth < 0) {
            this.setState({scrollWidth: 0, prevDisable: true, nextDisable: false});
        } else {
            this.setState({scrollWidth: scrollWidth, prevDisable: false});
        }
    };

    scrollNextHandler = () => {
        const wrapperWidth = document.getElementById('sidenav-wrapper').clientWidth;
        const contentWidth = document.getElementById('sidenav-horizontal').clientWidth;

        let scrollWidth = this.state.scrollWidth + (wrapperWidth - 80);
        if (scrollWidth > (contentWidth - wrapperWidth)) {
            scrollWidth = contentWidth - wrapperWidth + 80;
            this.setState({scrollWidth: scrollWidth, prevDisable: false, nextDisable: true});
        } else {
            this.setState({scrollWidth: scrollWidth, prevDisable: false});
        }
    };

    render() {
        const navItems = this.props.navigation.map(item => {
                switch (item.type) {
                    case 'group':
                        return <NavGroup layout={this.props.layout} key={item.id} group={item}/>;
                    default:
                        return false;
                }
            }
        );

        let scrollStyle = {
            marginLeft: '-'+this.state.scrollWidth + 'px'
        };

        if (this.props.layout === 'horizontal' && this.props.rtlLayout) {
            scrollStyle = {
                marginRight: '-'+this.state.scrollWidth + 'px'
            };
        }

        let mainContent = '';
        if (this.props.layout === 'horizontal') {
            let prevClass = ['sidenav-horizontal-prev'];
            if (this.state.prevDisable) {
                prevClass = [...prevClass, 'disabled'];
            }
            let nextClass = ['sidenav-horizontal-next'];
            if (this.state.nextDisable) {
                nextClass = [...nextClass, 'disabled'];
            }

            mainContent = (
                <div className="navbar-content sidenav-horizontal" id="layout-sidenav">
                    <a href={DEMO.BLANK_LINK} className={prevClass.join(' ')} onClick={this.scrollPrevHandler}><span/></a>
                    <div id="sidenav-wrapper" className="sidenav-horizontal-wrapper">
                        <ul id="sidenav-horizontal" className="nav pcoded-inner-navbar sidenav-inner" onMouseLeave={this.props.onNavContentLeave} style={scrollStyle}>
                            {navItems}
                        </ul>
                    </div>
                    <a href={DEMO.BLANK_LINK} className={nextClass.join(' ')} onClick={this.scrollNextHandler}><span/></a>
                </div>
            );
        } else {
            mainContent = (
                <div className="navbar-content next-scroll">
                    <PerfectScrollbar>
                        <ul className="nav pcoded-inner-navbar" id='nav-ps-next'>
                            {navItems}
                            <li>
                                <Card className='text-center'>
                                    <Card.Body>
                                        <i className="feather icon-sunset f-40"/>
                                        <h6 className="mt-3">Help?</h6>
                                        <p>Please contact us on our email for need any support</p>
                                        <a href={DEMO.BLANK_LINK} rel="noopener noreferrer" className="btn btn-primary btn-sm text-white m-0">Support</a>
                                    </Card.Body>
                                </Card>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            );
        }

        return (
            <Aux>
                {mainContent}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        layout: state.layout,
        rtlLayout: state.rtlLayout,
        collapseMenu: state.collapseMenu,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onNavContentLeave: () => dispatch({type: actionTypes.NAV_CONTENT_LEAVE}),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (windowSize(NavContent)));
