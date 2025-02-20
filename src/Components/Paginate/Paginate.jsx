import ReactPaginate from "react-paginate";
import "./Paginate.css"
const Pagination = ({ pageCount, getAllDetails }) => {
  const handlePageClick = (e) => {
    getAllDetails(e.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next"
      onPageChange={handlePageClick}
      marginPagesDisplayed={1}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="previous"
      containerClassName="pagination"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      nextClassName="page-item"
      previousLinkClassName="page-link"
      nextLinkClassName="page-link"
      breakAriaLabels="page-item"
      breakLinkClassName="page-link"
      activeClassName="isActive"
    />
  );
};

export default Pagination;
