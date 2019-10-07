import axios from 'axios'
import {
  createNotification,
  NOTIFICATION_TYPE_SUCCESS,
  NOTIFICATION_TYPE_ERROR,
} from 'react-redux-notify'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types'
import setAuthToken from '../utils/set-auth-token'

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get('http://localhost/api/auth')

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    })

    dispatch(
      createNotification({
        message: `Signed in as ${res.data.name}`,
        type: NOTIFICATION_TYPE_SUCCESS,
        duration: 2000,
        canDismiss: true,
      })
    )
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

// Register User
export const registerUser = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ name, email, password })

  try {
    const res = await axios.post(
      'http://localhost/api/auth/register',
      body,
      config
    )

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error =>
        dispatch(
          createNotification({
            message: error.msg,
            type: NOTIFICATION_TYPE_ERROR,
            duration: 2000,
            canDismiss: true,
          })
        )
      )
    }

    dispatch({
      type: REGISTER_FAIL,
    })
  }
}

// Login User
export const loginUser = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('http://localhost/api/auth', body, config)

    console.log(res.data)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error =>
        dispatch(
          createNotification({
            message: error.msg,
            type: NOTIFICATION_TYPE_ERROR,
            duration: 2000,
            canDismiss: true,
          })
        )
      )
    }

    dispatch({
      type: LOGIN_FAIL,
    })
  }
}

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT })
}
