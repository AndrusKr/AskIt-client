import React, {useReducer} from "react"
import axios from "axios"
import {Redirect} from "react-router-dom";
import AuthContext from "./authContext"
import authReducer from "./authReducer"

const AuthState = (props) => {
  axios.defaults.headers.common["Content-Type"] = "application/json"

  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    currentUser: null,
    error: null,
  }
  const [state, dispatch] = useReducer(authReducer, initialState)

  const signIn = async (nickname) => {
    localStorage.setItem('token', 'qweqweqwe')
    // while backend doesn't work we use localStorage
    console.log('HERE!~~~~~~~~~~~~~~~~')
    return <Redirect to="/"/>
    // try {
    //   const response = await axios.post("/api/auth/signin", { nickname })
    //   dispatch({
    //     type: AUTH_SUCCESS,
    //     payload: response.data,
    //   })
    //   if (localStorage.jwt) {
    //     setJwtToAxios(localStorage.jwt) // add jwt to axios after signin
    //   }
    //   console.log(response.data)
    // } catch (err) {
    //   dispatch({
    //     type: AUTH_ERROR,
    //     payload: err.response.data.msg,
    //   })
    // }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        signIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
