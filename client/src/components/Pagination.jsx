import React from 'react'
import ReactPaginate from 'react-paginate'

const Pagination = () => {
    return (
        <div className='w-full flex flex-col gap-y-3 md:flex-row items-center justify-between py-5 '>
            <span className="text-md font-semibold">Showing {1 + " - " + 10} of {50}</span>
            <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'center' }}>
                <ReactPaginate className='pagination gap-2'
                    previousLabel="<"
                    nextLabel=">"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    pageCount={5}/*{Math.ceil(TotalCompanys / 5)}*/
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    // onPageChange={handlePageClick}
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </nav>
        </div>
    )
}

export default Pagination
