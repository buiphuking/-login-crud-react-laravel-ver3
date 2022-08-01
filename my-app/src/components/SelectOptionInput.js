import React from "react";

export const SelectOptionInput = (props) => {
  return (
    <div className='form-group mb-3'>
      <label>{props.title}</label>
      <select
        required={props.required}
        name={props.name}
        className='form-select'
        aria-label='Default select example'
        {...props}
      >
        <option defaultValue value=''>
          Open this select menu
        </option>
        {props.children}
      </select>
    </div>
  );
};
