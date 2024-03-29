import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import LinkWrapper from '../components/atoms/Link/Link';

class HomePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: ['very', 'second', 'another']
        }
    }

    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div style={{ textAlign: 'center' }}>
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React!!</p>
                <h3>Posts:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                <ul style={{ marginLeft: '25%', width: '50%', listStyleType: 'none' }}>
                    {this.state.data.map((something, index) =>
                      <li key={index} style={{ borderRadius: '15px', padding: '20px', boxShadow: '4px 4px 8px 0 #DB7093', background: 'white', margin: '10px' }}>
                        <LinkWrapper
                            to={'/post-detail/'+index}
                            isDecorated={true}
                            onHoverColor={'#99D8CD'}
                        >
                            {something}
                        </LinkWrapper>
                      </li>
                        // <Post key={index}>{something}</Post>
                    )}
                </ul>
                {/* <p> */}
                    {/* <Link to="/login">Logout</Link> */}
                {/* </p> */}
                {/* <Post /> */}
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
