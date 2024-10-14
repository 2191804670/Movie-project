import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux/Store/Stroe";
import { getpage } from "../Redux/Action/ActionReduce";
export const PaginationComponent = () => {
  const Page = useSelector((state: RootState) => state.page);
  const [pageCount, setpageCount] = useState(0);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setpageCount(Page);
  }, [Page]); // Add Page as a dependency

  const handlePageClick = (data: any) => {
    dispatch(getpage(data.selected + 1));
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next"
      onPageChange={handlePageClick}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      pageCount={pageCount} // Pass the dynamic pageCount
      previousLabel="Previous"
      containerClassName={"pagination justify-content-center p-3"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      nextClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  );
};
