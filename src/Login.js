import React,{Component} from 'react';
import {Input, Button,Label, Col, FormGroup} from 'reactstrap';
import {Provider} from 'react-redux';
import PreLoadLogin from './components/PreLoadLogin';
import store from './store'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {login} from './actions/preLoadLoginAction'
class Login extends Component {

    state = {
        userName: "",
        password: "",
        ownerId: "",
        errors: [
            {
                id: "userName",
                message: "Username is empty",
                visited: false
            },
            {
                id: "password",
                message: "Password is empty",
                visited: false
            }
        ]
    }

    onLogin = ()=>  {
        this.props.login(this.state);
    };

    onChange = (e)=> {
        this.setState({
            [e.target.id]: e.target.value
        });

        let errorObj = this.state.errors.filter(obj=>{
            if(obj.id === e.target.id) {
                return true;
            }
        })[0];
        let index = this.state.errors.indexOf(errorObj)
        var errors = this.state.errors;
        
        errorObj.visited = true;
        errors[index]=errorObj

        this.setState({
            errors
        });        
    };

    getErrorMessage = (id)=> {
        let result = "";
        let element = this.state[id];
        if(element === "") {
            let errorObj = this.state.errors.filter(obj=>{
                if(obj.id === id) {
                    return true;
                }
            });
            if(errorObj[0].visited) {
                result = errorObj[0].message;
            }
        }
        return result;
    };

    render() {
        return(
        <Provider store={store}>
            <PreLoadLogin></PreLoadLogin>
            <form>
                <div className="parent">
                    <div className="child1">
                        <h1>Configuration Portal in ReactJS</h1>
                        <h2>Used by Business Analyst and Actuaries</h2>
                    </div>
                    <div className="child2">
                        <div>
                            <h4 style={{fontSize: "20px",fontWeight:"light"}}>Login</h4>
                            <hr></hr>
                        </div>
                        <div>
                            <FormGroup row>
                                <Label for="userName" style={!this.getErrorMessage("userName")?null:{color:"red"}}>Username</Label>
                                <Col sm={8}>
                                    <Input name="userName" id="userName" type="text" onChange={this.onChange}></Input>
                                   {
                                       !this.getErrorMessage("userName")?null:
                                        <span style={{color:"red",fontSize: "12px"}}>{this.getErrorMessage("userName")}</span>
                                   }
                                </Col>
                            </FormGroup>
                        </div>
                        <div>

                            <FormGroup row>
                                <Label for="password"  style={!this.getErrorMessage("password")?null:{color:"red"}}>Password&nbsp;</Label>
                                <Col sm={8}>
                                    <Input name="password" id="password" type="password" onChange={this.onChange}></Input>
                                    <span style={{color:"red",fontSize: "12px"}}>{this.getErrorMessage("password")}</span>
                                </Col>
                            </FormGroup>
                        </div>
                        <div>
                            <FormGroup row>
                                <Button id="login" onClick={this.onLogin}>Login</Button>
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </form>
        </Provider>
        );
    }

}

Login.propTypes = {
    login: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    ownerId: state.posts.ownerId,
    token: state.posts.token
});

export default connect(mapStateToProps, {login})(Login);