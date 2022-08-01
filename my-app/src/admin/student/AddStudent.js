import React, { useState } from "react";
import { TextInput } from "../../components/TextInput";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  useAddStudentMutation,
  useGetMajorQuery,
} from "../../api/apiMajorSlice";
import { SelectOptionInput } from "../../components/SelectOptionInput";
export const AddStudent = () => {
  const SubPage = "Student";
  const [addData] = useAddStudentMutation();
  const { data: data } = useGetMajorQuery();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      console.log(values);
      const api = await addData(values);
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
    <div>
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
                    title='Name'
                    name='name'
                    type='text'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder='Name'
                  />
                  <TextInput
                    required={true}
                    title='Email'
                    name='email'
                    type='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder='Email'
                  />
                  <SelectOptionInput
                    required={true}
                    title='Gender'
                    name='gender'
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                  >
                    <option value='1'>1. Male</option>
                    <option value='0'>2. Female</option>
                  </SelectOptionInput>
                  <SelectOptionInput
                    required={true}
                    title='Major'
                    name='major_id'
                    value={formik.values.major_id}
                    onChange={formik.handleChange}
                  >
                    {data?.data?.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {++index}. {item.title}
                        </option>
                      );
                    })}
                  </SelectOptionInput>
                  <div className='form-group mb-3'>
                    <button type='submit' className='btn btn-primary me-1'>
                      Save {SubPage}
                    </button>
                    <button
                      type='reset'
                      className='btn btn-dark'
                      onClick={(e) => formik.resetForm()}
                    >
                      {" "}
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
