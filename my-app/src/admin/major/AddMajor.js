import React, { useState } from "react";
import { TextInput } from "../../components/TextInput";
import { useAddMajorMutation } from "../../api/apiMajorSlice";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useFormik } from "formik";
export const AddMajor = () => {
  const SubPage = "Major";
  const navigate = useNavigate();
  const [addData] = useAddMajorMutation();
  const [message, setMessage] = useState("");
  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      const api = await addData(values).unwrap();
      if (api?.error) {
        setMessage(api.error.data.validate_err);
      } else {
        swal("Success!", "Data Added Successfully", "success");
        navigate("../list");
      }
    },
  });
  if (Object.keys(message).length > 0) {
    var error_content = Object.values(message).map((err, index) => {
      return (
        <div key={index} className='bg-danger text-white mb-2 p-1'>
          {++index}. {err}
        </div>
      );
    });
  }
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-12'>
          <div className='card'>
            <div className='card-header'>
              <h4>Add {SubPage}</h4>
            </div>
            {error_content}
            <div className='card-body'>
              <form onSubmit={formik.handleSubmit}>
                <TextInput
                  required={true}
                  title='Title'
                  name='title'
                  type='text'
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  placeholder='Title'
                />
                <button type='submit' className='btn btn-primary me-2'>
                  Add {SubPage}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
