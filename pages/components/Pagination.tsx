import React from "react";
import ReactPaginate from "react-paginate";

interface CustomPaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selected: { selected: number }) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
    return (
        <div className="flex items-center justify-center">
          {/* Left arrow */}
          <button
            onClick={() => onPageChange({ selected: currentPage - 1 })}
            disabled={currentPage === 1}
            className="mr-2"
          >
            {"<"}
          </button>
          {/* Total pages */}
          <p className="mx-2">{`Page ${currentPage} of ${pageCount}`}</p>
          {/* Right arrow */}
          <button
            onClick={() => onPageChange({ selected: currentPage + 1 })}
            disabled={currentPage === pageCount}
            className="ml-2"
          >
            {">"}
          </button>
        </div>
      );
    };
    
    export default CustomPagination;