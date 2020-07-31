import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class AddVoiceAssessment extends Component{
    constructor(props){
        super(props);
        this.state={
            count:''
        }
    }

    getCount(){
       
    }
    componentWillMount(){
        this.getCount();
    }

  
    onSubmit(e){
        const newMeetup={
            id: this.state.count,
            name:this.refs.name.value,
            city: this.refs.city.value,
            address: this.refs.address.value
        }
        this.addMeetup(newMeetup);
        e.preventDefault();
    }

    render(){
        return(
            <div>
                 <br></br>
                <Link className="btn grey" to="/teacher">Back</Link>
               
                <h1>Add Voice Assessment</h1> 
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="input-field">
                        <input type="text" name="name" ref="name"/>
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="name" ref="name"/>
                        <label htmlFor="name">Name</label>
                    </div>
                    
                    <input type="submit" value="Save" className="btn"/>

                </form>
                </div>
        );
    }

}

 export default AddVoiceAssessment;