import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  useGetMajorQuery,
  useAddMajorMutation,
  useUpdateMajorMutation,
  useDeleteMajorMutation,
} from "../../api/apiMajorSlice";
import { Link } from "react-router-dom";
import swal from "sweetalert";
export const ListMajor = () => {
  const SubPage = "Major";
  const { data: d, isLoading, isSuccess, isError, error } = useGetMajorQuery();
  const [data, setData] = useState(d?.data);
  const [deleteData] = useDeleteMajorMutation();

  const handleDelete = (id) => {
    swal({
      title: "Are you sure you want to delete this item?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteData({ id: id });
        // swal("Poof! Your imaginary file has been deleted!", {
        //   icon: "success",
        // });
      }
      // else {
      //   swal("Your imaginary file is safe!");
      // }
    });
  };
  const [columnData] = useState([
    {
      field: "title",
      flex: 1,
      cellClass: "grid-cell-centered",
      cellStyle: { border: "1px solid black" },
    },
    {
      headerName: "Actions",
      field: "id",
      flex: 1,
      cellRendererFramework: (params) => (
        // console.log(params.data.id),
        <div>
          <Link
            replace
            className='btn btn-info me-1'
            to={`../edit/${params.data.id}`}

            //  onClick={() => handleUpdate(params.data)}
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
