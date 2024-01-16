import {Fragment, useState} from "react";
import './pagination.css'

function Pagination({
    items,
    itemsPerPage,
    currentPage,
    setCurrentPage
}) {

    let pages = [...Array(Math.ceil(items.length/itemsPerPage)).keys()];
    console.log(items)


    return (
        <div className='pagination'>
            {
                pages.map(page => {
                    return (
                        <div className='pagination_item'>
                            {page + 1}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Pagination;