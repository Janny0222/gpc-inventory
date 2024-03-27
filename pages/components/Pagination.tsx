import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import React from "react";


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
  const handlePreviousClick = () => {
    if(currentPage >= 1) {
      const newPage = currentPage - 1
      onPageChange({selected: newPage - 1})
      console.log("result for currentPage: ", currentPage);
      console.log("result for newpage: ", newPage);
    }
    
  };
  console.log("this is the current page", currentPage);
  const handleNextClick = () => {
    if(currentPage < pageCount){
      onPageChange({selected: currentPage})
    }
  }
    return (
        <div className="flex items-center justify-center ">
          {/* Left arrow */}
          <button
            onClick={handlePreviousClick}
            disabled={currentPage === 1}
            className="mr-2"
          >
           <ArrowLongLeftIcon className="w-5 dashbord-summary"/>
          </button>
          {/* Total pages */}
          <p className="mx-2">{`Page ${currentPage} of ${pageCount}`}</p>
          {/* Right arrow */}
          <button
            onClick={handleNextClick}
            disabled={currentPage === pageCount}
            className="ml-2"
          >
            <ArrowLongRightIcon className="w-5 dashbord-summary"/>
          </button>
        </div>
      );
    };
    
    export default CustomPagination;