import React, { useState } from "react";
import { TextInput } from "../../components/TextInput";
import { SelectOptionInput } from "../../components/SelectOptionInput";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetStudentIdQuery,
  useUpdateStudentMutation,
} from "../../api/apiMajorSlice";
import { useFormik } from "formik";
import swal from "sweetalert";
import { NotFound } from "../../pages/NotFound";
export const EditStudent = () => {
  const SubPage = "Student";
  const navigate = useNavigate();
  let { id } = useParams();
  const [message, setMessage] = useState("");
  const { data: data, error } = useGetStudentIdQuery(id);
  const [updateData] = useUpdateStudentMutation();
  const formik = useFormik({
    initialValues: {
      name: data?.data?.name,
      email: data?.data?.email,
      gender: data?.data?.gender,
      major_id: data?.data?.major_id,
    },
    onSubmit: async (values) => {
      console.log(values);
      const api = await updateData({ id: id, ...values });
      if (api?.error) {
        setMessage(api.error.data.validationErrors);
      } else {
        swal("Success!", "Data Edited Successfully", "success");
        navigate("../list");
      }
    },
    enableReinitialize: true,
  });
  if(error){
    return <NotFound />
  }
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
                <h4>Edit {SubPage}</h4>
              </div>
              {error_content}
              <div className='card-body'>
                <form onSubmit={formik.handleSubmit}>
                  <TextInput
                    autoFocus={true}
                    required={true}
                    title='Name'
                    name='name'
                    type='text'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder='Title'
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
                    <option
                      value='1'
                      selected={data?.data?.gender === 1 ? true : false}
                    >
                      1. Male
                    </option>
                    <option
                      value='0'
                      selected={data?.data?.gender === 0 ? true : false}
                    >
                      2. Female
                    </option>
                  </SelectOptionInput>
                  <div className='form-group mb-3'>
                    <label>Major</label>
                    <select
                      required
                      name='major_id'
                      className='form-select'
                      value={formik.values.major_id}
                      onChange={formik.handleChange}
                      aria-label='Default select example'
                    >
                      {data?.data2?.map((item, index) => {
                        return (
                          <option
                            key={index}
                            value={item.id}
                            selected={
                              data?.data?.major_id === item?.id ? true : false
                            }
                          >
                            {++index}. {item.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className='form-group mb-3'>
                    <button type='submit' className='btn btn-primary me-2'>
                      Edit {SubPage}
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
