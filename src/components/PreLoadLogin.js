import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {preLoadLogin} from '../actions/preLoadLoginAction'


class PreLoadLogin extends Component {

    componentWillMount() {
        this.props.preLoadLogin();
    }
  render() {
    return (
      <div >
      </div>
    )
  }
}

PreLoadLogin.propTypes = {
    preLoadLogin: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    ownerId: state.posts.ownerId,
    mode: state.posts.mode,
    environment: state.posts.environment
});

export default connect(mapStateToProps, {preLoadLogin})(PreLoadLogin);