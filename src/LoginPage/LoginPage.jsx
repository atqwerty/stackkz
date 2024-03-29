import React from 'react';
import { connect } from 'react-redux';
import Input from '../components/atoms/Input/Input'
import './styles.css'

import { userActions } from '../_actions';
import LinkWrapper from '../components/atoms/Link/Link';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        console.log(this.state, 'hello');
        return (
            <div className='form-wrapper'>
                <h2>Login</h2>
                <form name="form" className='form' onSubmit={this.handleSubmit}>
                   <div className={'form-group' + (submitted && !username ? ' has-error' : '')}> 
                     <Input
                       style={{ marginTop: '10px' }}
                       onChange={this.handleChange}
                       value={username}
                       name='username'
                       type='text'
                       placeHolder='username'
                       bgColor='white'
                       componentWidth='100%'
                       componentHeight='100%'
                     />
                     {submitted && !username &&
                         <div className="help-block">Username is required</div>
                     }
                   </div>

                   <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                     <Input
                       style={{ marginTop: '10px' }}
                       onChange={this.handleChange}
                       value={password}
                       name='password'
                       placeHolder='password'
                       type='password'
                       bgColor='white'
                       componentWidth='100%'
                       componentHeight='100%'
                     />
                     {submitted && !password &&
                         <div className="help-block">Password is required</div>
                     }
                   </div>

                    <div className='container flex align-center justify-content'>
                        <Input
                          style={{ marginTop: '10px' }}
                          type='submit'
                          bgColor='#B7DDC8'
                          containedValue='login'
                          componentWidth='50%'
                          componentHeight='100%'
                        />
                      <LinkWrapper to="/register" className="btn btn-link" width='50%'>Register</LinkWrapper>
                          {loggingIn &&
                              <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                          }
                    </div>

                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };
