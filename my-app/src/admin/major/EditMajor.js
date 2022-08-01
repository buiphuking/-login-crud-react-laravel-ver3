import React, { useState } from "react";
import { TextInput } from "../../components/TextInput";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetMajorIdQuery,
  useUpdateMajorMutation,
} from "../../api/apiMajorSlice";
import swal from "sweetalert";
import { useFormik } from "formik";
import { NotFound } from "../../pages/NotFound";
export const EditMajor = () => {
  const SubPage = "Major";
  const navigate = useNavigate();
  let { id } = useParams();
  const [message, setMessage] = useState("");
  const { data: data, error } = useGetMajorIdQuery(id);
  const [updateData] = useUpdateMajorMutation();

  const formik = useFormik({
    initialValues: {
      title: data?.data?.title,
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
              <div className='card-body'>
              {error_content}
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
