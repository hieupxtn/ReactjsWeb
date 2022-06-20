import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService'
import { userLoginSuccess } from '../../store/actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    handleOnChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })   
    }
    handleOnChangePassword= (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleLogin = async () =>{
        this.setState({
            errMessage: ''
        })

        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if(data && data.errCode !== 0){
                this.setState({
                    errMessage: data.message
                })
            }
            if(data && data.errCode === 0){
                this.props.userLoginSuccess(data.user)
                console.log('login succeess')   
            }
            
        } catch (error) { 
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }  
            
        }
    }
    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username: </label>
                            <input type='text' 
                            className='form-control' 
                            placeholder='Enter your username'
                            value={this.state.username}
                            onChange={(e) => this.handleOnChangeUsername(e)}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password: </label>
                            <div className='custom-input-password'>
                                <input type='password' 
                                className='form-control' 
                                placeholder='Enter your password'
                                value={this.state.password}
                                onChange={(e) => this.handleOnChangePassword(e)}
                                />
                            </div>
                            
                        </div>
                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={()=>{this.handleLogin()}}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className='text-other-login'>Or Login with: </span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
