import React from "react";
import { ItemMenu } from "./ItemMenu";
import { useGetCountQuery } from "../api/apiMajorSlice";
export const MenuDashboard = () => {
  const { data: d } = useGetCountQuery();
  return (
    <ol className='list-group list-group-numbered'>
      <ItemMenu title='Student' url='student/list' total={d?.student || 'error'} />
      <ItemMenu title='Major' url='major/list' total={d?.major  || 'error'} />
      <ItemMenu title='Club' url='club/list' total={d?.club  || 'error'} />
    </ol>
  );
};
