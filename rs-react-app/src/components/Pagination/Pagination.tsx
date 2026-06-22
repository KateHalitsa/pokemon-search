import { useTranslations } from 'next-intl';
import { usePagination }
from '../../context/PaginationContext';

function Pagination() {
  const {
    page,
    totalPages,
    setPage,
  } = usePagination();
    const t = useTranslations("Pagination");
  
  return (
    <div>
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className='pad-btn'
      >
        {t("prev")}
      </button>

      <span>
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className='pad-btn'
      >
        {t("next")}
      </button>
    </div>
  );
}
export default  Pagination;