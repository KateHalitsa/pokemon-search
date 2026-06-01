import { usePagination }
from '../../context/PaginationContext';

function Pagination() {
  const {
    page,
    totalPages,
    setPage,
  } = usePagination();

  return (
    <div>
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className='pad-btn'
      >
        Prev
      </button>

      <span>
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className='pad-btn'
      >
        Next
      </button>
    </div>
  );
}
export default  Pagination;