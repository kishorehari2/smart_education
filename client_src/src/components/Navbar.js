import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="blue darken-2">
                    <div className="nav-wrapper">
                    <a href="#" color="white hide-on-med-and-down" className="brand-logo">
                       
                       </a>
                       <a href="/home" color="white">Online Assessment</a>
                        
                        <a href="#" data-target="main-menu" className="sidenav-trigger">
                            <i className="fa fa-bars"></i></a>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to='/'><i className="fa fa-hourglass"> Logout</i></Link> </li>
                             </ul>
                    </div>

                </nav>


                <ul className="sidenav" id="main-menu">
                    <li><Link to='/quiz/addAssessmentTemplate'> Add Quiz using Template</Link> </li>
                    <li><Link to='/quiz/takeAssessment'> Take Quiz</Link> </li>
                     <li><Link to='/quiz/addAssessment'> Add Quiz</Link> </li>
                            
                </ul>
                

                
            </div >
        )
    }
}

export default Navbar;
