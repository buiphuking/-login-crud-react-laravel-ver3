import React from "react";

export const CheckboxInput = (props) => {
  return (
    <div class='form-check'>
      <input
        class='form-check-input'
        type='checkbox'
        value={props.value}
        id='flexCheckDefault'
        name={props.name}
      />
      <label class='form-check-label' for='flexCheckDefault'>
        Default checkbox
      </label>
    </div>
  );
};
