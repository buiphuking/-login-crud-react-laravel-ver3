import React from "react";

export const TextInput = (props) => {
  return (
    <div className='form-group mb-3'>
      <label>{props.title}</label>
      <input
        // autoFocus={props.autoFocus ? true : false}
        required={props.required}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        // onChange={handleInput}
        // value={itemInput.name}
        onChange={props.onChange}
        value={props.value}
        className='form-control'
      />
      {/* <span className='text-danger'>
        {studentInput.error_list.name}
      </span> */}
    </div>
  );
};
