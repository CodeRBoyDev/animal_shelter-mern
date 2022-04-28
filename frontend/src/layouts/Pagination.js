import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
    var last = pageNumbers.length;
    
  return (
    <nav>
      <ul className='pagination'>
          <a onClick={() => paginate(1)} className='page-link' href="#!">First</a>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href="#!" className='page-link'>
              {number}
            </a>
          </li>
        ))}
        <a onClick={() => paginate(last)} className='page-link' href="#!">Last</a>
      </ul>
    </nav>
  );
};

export default Pagination;