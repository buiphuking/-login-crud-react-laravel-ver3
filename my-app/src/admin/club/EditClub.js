import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextInput } from "../../components/TextInput";
import {
  useGetClubIdQuery,
  useUpdateClubMutation,
} from "../../api/apiMajorSlice";
import { useFormik } from "formik";
import swal from "sweetalert";
import { NotFound } from "../../pages/NotFound";
export const EditClub = () => {
  const SubPage = "Club";
  const navigate = useNavigate();
  let { id } = useParams();
  const [message, setMessage] = useState("");
  const { data: data, error } = useGetClubIdQuery(id);
  const [updateData] = useUpdateClubMutation();
  const formik = useFormik({
    initialValues: {
      title: data?.data?.title,
    },
    onSubmit: async (values) => {
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
  );
};
