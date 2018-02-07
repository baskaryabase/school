"use strict";
import axios from "axios";

export function signUp(user) {
  return function(dispatch) {
    axios
      .post("http://192.168.15.37:5000/signup", user)
      .then(function(response) {
        dispatch({ type: "signUp", payload: response.data });
      })
      .catch(function(err) {
        dispatch({ type: "signUpRejected", payload: err });
      });
  };
}

export function signIn(user) {
  return function(dispatch) {
    axios
      .post("http://192.168.15.37:5000/signin", user)
      .then(function(response) {
        dispatch({ type: "signIn", payload: response.data });
      })
      .catch(function(err) {
        dispatch({ type: "signInRejected", payload: err });
      });
  };
}

export function logout(user) {
  return function(dispatch) {
    axios
      .get("http://192.168.15.37:5000/logout")
      .then(function(response) {
        dispatch({ type: "logout", payload: response.data });
      })
      .catch(function(err) {
        dispatch({ type: "logoutRejected", payload: err });
      });
  };
}

export function getAuth() {
  return function(dispatch) {
    axios
      .get("http://192.168.15.37:5000/auth", {
        headers: {
          authorization: localStorage.getItem("token")
        }
      })
      .then(function(response) {
        dispatch({ type: "getAuth", payload: response.data });
      })
      .catch(function(err) {
        dispatch({ type: "getAuthRejected", payload: err });
      });
  };
}

export function forgotPassword(email) {
  return function(dispatch) {
    axios
      .post("http://192.168.15.37:5000/create-forgot-password-link", email)
      .then(function(response) {
        dispatch({ type: "forgotPasswordlink", payload: response.data });
      })
      .catch(function(err) {
        dispatch({ type: "forgotPasswordlinkRejected", payload: err });
      });
  };
}
