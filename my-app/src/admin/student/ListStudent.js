import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetStudentsQuery, useDeleteStudentMutation } from "../../api/apiMajorSlice";
import { AgGridReact } from "ag-grid-react";
import swal from "sweetalert";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export const ListStudent = () => {
  const SubPage = "Student";
  const {
    data: d,
  } = useGetStudentsQuery();
  const [deleteData] = useDeleteStudentMutation();
  const handleDelete = (id) => {
    swal({
      title: "Are you sure you want to delete this item?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteData({ id: id });
      }
    });
  };

  const [columnData] = useState([
    {
      field: "name",
      flex: 1,
      cellClass: "grid-cell-centered",
      cellStyle: { border: "1px solid black" },
    },
    { field: "email", flex: 1, cellStyle: { border: "1px solid black" } },
    {
      headerName: "Sex",
      field: "gender",
      flex: 1,
      cellRendererFramework: (params) => {
        return params.data.gender === 1 ? "Male" : "Female";
      },
      cellStyle: { border: "1px solid black" },
    },
    {
      headerName: "Major",
      field: "major_title",
      flex: 1,
      cellStyle: { border: "1px solid black" },
    },
    // {
    //   headerName: "Club",
    //   field: "club",
    //   cellRendererFramework: (params) => {
    //     return params.data.club === null ? "Không" : params.data.club;
    //   },
    // },
    {
      headerName: "Actions",
      field: "id",
      flex: 1,
      cellRendererFramework: (params) => (
        <div>
          <Link
            replace
            className='btn btn-info me-1'
            to={`../edit/${params.data.id}`}
          >
            Update
          </Link>
          <button
            className='btn btn-danger'
            onClick={() => handleDelete(params.data.id)}
          >
            Delete
          </button>
        </div>
      ),
      cellStyle: { border: "1px solid black" },
    },
  ]);
  return (
    <div
      className='ag-theme-alpine'
      style={{ height: "100%", width: "100%", flex: 1 }}
    >
      <Link to={"../add"} className='btn btn-primary btn-sm me-1'>
        Add {SubPage}
      </Link>
      <Link to='' className='btn btn-warning btn-sm'>
        Export PDF
      </Link>
      <AgGridReact
        rowData={d?.data}
        columnDefs={columnData}
        defaultColDef={{ filter: true, floatingFilter: true, sortable: true }}
        pagination={true}
        paginationPageSize={10}
        domLayout='autoHeight'
        cellClass='ag-center-cell'
      ></AgGridReact>
    </div>
  );
};
