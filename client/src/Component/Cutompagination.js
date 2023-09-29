import React from "react";
import Pagination from "react-js-pagination";
const Cutompagination = ({itemperpage,totalitem,page,handlePage}) => {
  return (
    <React.Fragment>
        <div className="pagination_data">
          <Pagination
            activePage={page}
            itemsCountPerPage={itemperpage}
            totalItemsCount={totalitem}
            onChange={(e) => handlePage(e)}
            innerClass="d-flex justify-content-center"
            activeClass="bg-primary text-light"
            itemClass="px-2 py-1 border"
            firstPageText={"First"}
            lastPageText={"Last"}
            nextPageText={"Next"}
            prevPageText={"Prev"}
          />
        </div>
    </React.Fragment>
  );
};

export default Cutompagination;
