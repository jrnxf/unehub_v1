import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { setAlert } from '../actions/alert'
import { loginUser } from '../actions/auth'
import Button from './Button'

class LoginForm extends Component {
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  logState = () => {
    console.log(this.state)
  }

  login = () => {
    console.log('login')
    this.props.loginUser({
      email: this.state.email,
      password: this.state.password,
    })
  }

  render() {
    return (
      <div className='fixed inset-0 z-50 overflow-auto bg-smoke_light flex items-center justify-center'>
        <div className='max-w-sm'>
          <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='flex justify-end items-center'>
              <i
                className='fas fa-times text-red-600 cursor-pointer '
                onClick={this.props.handleClick}
              ></i>
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                for='email'
              >
                email
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='email'
                type='text'
                placeholder='danheaton@gmail.com'
                onChange={this.handleChange}
              />
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                for='password'
              >
                password
              </label>
              <input
                className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline'
                id='password'
                type='password'
                placeholder='******'
                onChange={this.handleChange}
              />
              <p className='text-red-500 text-xs italic'>
                please choose a password
              </p>
            </div>
            <Button handleClick={this.login}>log in</Button>
          </form>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = state => ({
//   isAuthenticated: this.state.isAuthenticated,
// })

export default connect(
  null,
  { alert, loginUser }
)(LoginForm)
