import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import 'smartmenus';
import { withTranslate } from 'react-redux-multilingual'

class NavBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            navClose:{right:'0px'}
        }
    }

    componentWillMount (){
        $(function() {
            $('#main-menu').smartmenus({
                subMenusSubOffsetX: 1,
                subMenusSubOffsetY: -8
            });
        });
        if (window.innerWidth < 750) {
            this.setState({navClose: {right:'-410px'}})
        }
        if (window.innerWidth < 1199)
        {
            this.setState({navClose: {right:'-300px'}})
        }
    }

    openNav() {
        this.setState({navClose: {right:'0px'}})
    }
    closeNav() {
        this.setState({navClose: {right:'-410px'}})
    }
    render() {
        const {translate} = this.props;
        return (
            <div>
                <nav id="main-nav">
                    <div className="toggle-nav" onClick={this.openNav.bind(this)}>
                        <i className="fa fa-bars sidebar-bar" ></i>
                    </div>
                    {/*Horizontal menu*/}
                    <ul id="main-menu" className="sm pixelstrap sm-horizontal" style={this.state.navClose}>
                        <li >
                            <div className="mobile-back text-right" onClick={this.closeNav.bind(this)}>
                                Back<i className="fa fa-angle-right pl-2" aria-hidden="true"></i>
                            </div>
                        </li>
                        <li className="mega"><Link to={`${process.env.PUBLIC_URL}/`}>{translate('home')}</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}


export default withTranslate(NavBar);