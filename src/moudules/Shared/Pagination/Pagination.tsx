interface props {
  pageNumber: number;
  totalNumOfPages: number;
  setpageNumber: (page: number) => void;
}

export default function Pagination({ pageNumber, totalNumOfPages, setpageNumber }: props) {
  if (totalNumOfPages <= 1) return null;

  const pagesArr = Array.from({ length: totalNumOfPages }, (_, i) => i + 1);

  const visiblePages = pagesArr.filter(page => {
    if (page === 1 || page === totalNumOfPages) return false; 
    return page >= pageNumber - 1 && page <= pageNumber + 1;
  });

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${pageNumber === 1 ? "disabled" : ""}`} 
            onClick={() => pageNumber > 1 && setpageNumber(pageNumber - 1)}
            style={{ cursor: "pointer" }}>
          <span className="page-link">&laquo;</span>
        </li>

        <li className={`page-item ${pageNumber === 1 ? "active" : ""}`} 
            onClick={() => setpageNumber(1)} 
            style={{ cursor: "pointer" }}>
          <span className="page-link">1</span>
        </li>

        {pageNumber > 3 && (
          <li className="page-item disabled"><span className="page-link">...</span></li>
        )}

        {visiblePages.map((page) => (
          <li key={page} 
              className={`page-item ${pageNumber === page ? "active" : ""}`}
              onClick={() => setpageNumber(page)} 
              style={{ cursor: "pointer" }}>
            <span className="page-link">{page}</span>
          </li>
        ))}

        {pageNumber < totalNumOfPages - 2 && (
          <li className="page-item disabled"><span className="page-link">...</span></li>
        )}

        <li className={`page-item ${pageNumber === totalNumOfPages ? "active" : ""}`} 
            onClick={() => setpageNumber(totalNumOfPages)} 
            style={{ cursor: "pointer" }}>
          <span className="page-link">{totalNumOfPages}</span>
        </li>

        <li className={`page-item ${pageNumber === totalNumOfPages ? "disabled" : ""}`} 
            onClick={() => pageNumber < totalNumOfPages && setpageNumber(pageNumber + 1)}
            style={{ cursor: "pointer" }}>
          <span className="page-link">&raquo;</span>
        </li>
      </ul>
    </nav>
  );
}