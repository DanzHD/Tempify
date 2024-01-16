import {Fragment, useState} from "react";
import './pagination.css'

function Pagination({
    items,
    itemsPerPage,
    currentPage,
    setCurrentPage
}) {

    let totalPages = Math.ceil(items.length/itemsPerPage);
    totalPages = [...Array(totalPages).keys()];
    console.log(items);
    return (
        <div className='pagination'>
            <div className='pagination_control_container'>
                {
                    totalPages.map(page => <div key={page} className='pagination_control_button' onClick={() => setCurrentPage(page)}> {page + 1}</div> )
                }
            </div>

            {
                items.slice(currentPage * itemsPerPage, Math.min((currentPage + 1) * itemsPerPage, items.length)).map((item, i) => {
                    return (
                        <div key={item.id} className='pagination_item'>
                            {item.name}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Pagination;