import { useMemo } from 'react';
import './style.css'

export type PaginationProps = {
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (perPage: number) => void;
    totalItems: number;
}

const noop = () => {}
const pagesOptions = [2, 5, 10, 20, 50]

const Pagination = ({ currentPage=1, itemsPerPage=5, onPageChange = noop, onItemsPerPageChange = noop, totalItems=10 } : PaginationProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pages = useMemo(() => [...Array(totalPages)].map((_, i) => i + 1), [totalPages]);

  return (
    <footer>
      <div className='items-per-page'>
        <label htmlFor="itemsPerPage">
          Elementi per pagina:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          {pagesOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='secondary'
        >
          Precedente
        </button>
          {pages
            .filter((page) => {
              // Show the first page, last page, and pages near the current page
              return (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              );
            })
            .map((page, index, visiblePages) => (
              <>
                <button
                  onClick={() => onPageChange(page)}
                  className={currentPage === page ? "" : "secondary"}
                >
                  {page}
                </button>

                {/* Add ellipses where needed */}
                {index < visiblePages.length - 1 && visiblePages[index + 1] > page + 1 && (
                  <span key={`ellipsis-${index}`}>...</span>
                )}
              </>
    ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Successivo
        </button>
      </div>
    </footer>
  )
}

export default Pagination