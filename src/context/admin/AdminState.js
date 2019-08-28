import React, { useReducer } from "react";
import axios from "axios";
import { getCurrentLoggedInUser } from "../../utils";

import AdminContext from "./adminContext";
import adminReducer from "./adminReducer";

import {
  DELETE_USER,
  GET_ALL_USERS,
  GET_USER_ROLES,
  ARCHIVE_TICKET,
  ASSIGN_TICKET,
  RESOLVE_TICKET,
  REMOVE_ASSIGNED,
  FILTER_USERS,
  CLEAR_FILTER,
  ADD_USER,
  UPDATE_USER,
  CLEAR_USERS,
  SET_CURRENT,
  CLEAR_CURRENT,
  SET_LOADING,
  ERROR
} from "../types";

const AdminState = props => {
  const initialState = {
    users: null,
    loading: false,
    error: null,
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(adminReducer, initialState);

  // adminGetAllUsers
  const adminGetAllUsers = async () => {
    try {
      const res = await getCurrentLoggedInUser().get(
        "https://lambda-devdesk.herokuapp.com/users/allusers"
      );
      // console.log("AdminState", res);
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
    }
  };

  // adminDeleteUser  - which deletes user by id staff or student
  const adminDeleteUser = async id => {
    console.log("adminDeleteUser", id);
    try {
      await getCurrentLoggedInUser().delete(
        `https://lambda-devdesk.herokuapp.com/users/user/${id}`
      );
      // console.log("adminDeleteUser", id);
      dispatch({
        type: DELETE_USER,
        payload: id
      });
      adminGetAllUsers();
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
    }
  };

  // adminGetUserRoles
  const adminGetUserRoles = async () => {
    try {
      const res = await getCurrentLoggedInUser().get(
        "https://lambda-devdesk.herokuapp.com/users/roles"
      );
      console.log("AdminState", res);
      dispatch({
        type: GET_USER_ROLES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
    }
  };

  // adminAddUser
  const adminAddUser = async () => console.log("adminAddUser");

  // adminEditUser
  const adminUpdateUser = async () => console.log("adminEditUser");

  // clear users
  const adminClearUsers = () => {
    dispatch({
      type: CLEAR_USERS
    })
  }

  // set current user
  const adminSetCurrent = user => {
    dispatch({ 
      type: SET_CURRENT,
      payload: user
    })
  }

  // adminClearCurrent
  const adminClearCurrent = () => {
    dispatch({type: CLEAR_CURRENT})
  }}

  // adminUserFilter
  const adminUserFilter = () => {
    dispatch({type: FILTER_USERS})
  };

  // adminClearFilter

  const adminClearFilter = () => {
    dispatch({type: CLEAR_FILTER})
  };





  // adminArchiveTicket
  const adminArchiveTicket = () => console.log("adminArchiveTicket");

  // adminAssignTicket
  const adminAssignTicket = () => console.log("adminAssignTicket");

  // adminResolveTicket
  const adminResolveTicket = () => console.log("adminResolveTicket");

  // adminRemoveAssigned
  const adminRemoveAssigned = () => console.log("adminRemoveAssigned");

  // set loading to true
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <AdminContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        error: state.error,
        adminGetAllUsers,
        adminDeleteUser,
        adminGetUserRoles,
        adminArchiveTicket,
        adminAssignTicket,
        adminResolveTicket,
        adminRemoveAssigned,
        adminUserFilter,
        adminAddUser,
        adminUpdateUser,
        adminClearFilter,
        adminClearCurrent,
        setLoading
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
