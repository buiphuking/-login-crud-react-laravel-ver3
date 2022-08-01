import React from "react";
import { Link } from "react-router-dom";
export const ItemMenu = (props) => {
  return (
    <li className='list-group-item d-flex justify-content-between align-items-start'>
      <div className='ms-2 me-auto'>
        <div className='fw-bold'>
          <Link className='' to={props.url}>
            {props.title} List
          </Link>
        </div>
      </div>
      <span className='badge bg-primary rounded-pill'>{props.total}</span>
    </li>
  );
};
