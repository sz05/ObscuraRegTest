import React from 'react';

export default function Pagination({ numberOfPages, currentPage, onPageChange }) {
  const pageNumbers = [];
  const maxPagesToShow = 5;

  const createPageNumbers = () => {
    if (numberOfPages <= maxPagesToShow) {
      for (let i = 1; i <= numberOfPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftBound = Math.max(1, currentPage - 2);
      const rightBound = Math.min(numberOfPages, currentPage + 2);

      if (leftBound > 1) {
        pageNumbers.push(1);
        if (leftBound > 2) {
          pageNumbers.push('...');
        }
      }

      for (let i = leftBound; i <= rightBound; i++) {
        pageNumbers.push(i);
      }

      if (rightBound < numberOfPages) {
        if (rightBound < numberOfPages - 1) {
          pageNumbers.push('...');
        }
        pageNumbers.push(numberOfPages);
      }
    }
  };

  createPageNumbers();

  return (
    <div className="flex flex-row gap-2 mt-8 mb-4 h-full">
      {pageNumbers.map((number, index) => (
        <button
          key={index}
          onClick={() => number !== '...' && onPageChange(number)}
          className={`pixelated-btn px-4 py-1 text-lg rounded-md ${
            number === currentPage ? 'bg-green-700 text-white' : 'bg-green-500 text-black hover:bg-green-600 hover:text-white'
          }`}
          disabled={number === '...'}
        >
          {number}
        </button>
      ))}
    </div>
  );
}
