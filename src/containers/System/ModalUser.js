import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'; 
class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
       let copyState = { ...this.state };
       copyState[id] = event.target.value;
       this.setState({
        ...copyState
       })
       
    }

    checkValueInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for(let i = 0; i < arrInput.length; i++)
        {
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing paramenter: ' + arrInput[i]);
                break;
            }
        }
        return true;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValueInput();
        if(isValid == true)
        {   
            this.props.createNewUser(this.state)
        }
    }



    render() {
        return (
            <Modal 
            isOpen={this.props.isOpen}
            toggle={()=>{this.toggle()}}
            className={'modal-user-container'}
            size="lg"
            centered
           >
            <ModalHeader toggle={()=>{this.toggle()}}>
              Create a new user
            </ModalHeader>
            <ModalBody>
            <div className='modal-user-body'>
                <div className='input-container'>
                        <label>Email</label>
                        <input 
                        type='text' 
                        onChange={(event) =>{this.handleOnChangeInput(event, 'email')}}
                        value={this.email}
                        />
                </div>
                <div className='input-container'>
                        <label>Password</label>
                        <input 
                        type='password' 
                        onChange={(event) =>{this.handleOnChangeInput(event, 'password')}}
                        value={this.password}
                        />
                </div>
                <div className='input-container'>
                        <label>First Name</label>
                        <input 
                        type='text' 
                        onChange={(event) =>{this.handleOnChangeInput(event, 'firstName')}}
                        value={this.firstName}
                        />
                </div>
                <div className='input-container'>
                        <label>Last Name</label>
                        <input 
                        type='text' 
                        onChange={(event) =>{this.handleOnChangeInput(event, 'lastName')}}
                        value={this.lastName}
                        />
                </div>
                <div className='input-container max-width-input'>
                        <label>Address</label>
                        <input 
                        type='text' 
                        onChange={(event) =>{this.handleOnChangeInput(event, 'address')}}
                        value={this.address}
                        />
                </div>
            </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={()=>{this.handleAddNewUser()}}
                className='px-3'
              >
                Add New
              </Button>
              {' '}
              <Button 
                onClick={()=>{this.toggle()}}
                className='px-3'
                >
                Close
              </Button>
            </ModalFooter>
           </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


