import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { TextInput } from "../components/TextInput";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  selectLoading,
  selectErrorMessage,
  selectUser,
} from "../slices/userSlice";
import swal from "sweetalert";
export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectLoading);
  const errorMessage = useSelector(selectErrorMessage);
  const user = useSelector(selectUser);
  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      dispatch(login(values));
    },
  });
  if (user) {
    swal("Success!", "Login successful", "success");
    navigate("/dashboard/student/list");
  }
  let error_content;
  if (isLoading) {
    return <h4>Loading...</h4>;
  }
  if (errorMessage) {
    error_content = (
      <div className='bg-danger text-white mb-2 p-1'>
        {errorMessage.message}
      </div>
    );
  } else {
    error_content = "";
  }
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header'>
              <h4>
                Login
                <Link to='/' className='btn btn-danger btn-sm float-end'>
                  Home
                </Link>
              </h4>
            </div>
            {error_content}
            <div className='card-body'>
              <form onSubmit={formik.handleSubmit}>
                <TextInput
                  required={true}
                  title='Name'
                  name='name'
                  type='text'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder='Name'
                />
                <TextInput
                  required={true}
                  title='Password'
                  name='password'
                  type='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder='Password'
                />
                <button type='submit' className='btn btn-primary me-1'>
                  Login
                </button>
                <button
                  type='reset'
                  className='btn btn-dark'
                  onClick={(e) => formik.resetForm()}
                >
                  {" "}
                  Reset
                </button>
              </form>
              <p>name: admin</p>
              <p>password: admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
