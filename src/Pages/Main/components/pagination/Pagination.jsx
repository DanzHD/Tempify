import {Fragment, useState} from "react";
import './pagination.css'
import cx from 'classnames'

function Pagination({
    items,
    itemsPerPage,
    currentPage,
    setCurrentPage
}) {

    let totalPages = Math.ceil(items.length/itemsPerPage);
    totalPages = [...Array(totalPages).keys()];

    return (
        <div className='pagination'>
            <div className='pagination_control_container pagination_control_button'>
                {
                    currentPage !== 0 &&
                        <span className='material-symbols-outlined' onClick={() => setCurrentPage(currentPage - 1)}>
                            navigate_before
                        </span>
                }
                {
                    totalPages.map(page => {

                        let classes = 'pagination_control_button ';
                        if (currentPage === page) {
                            classes += 'active';
                        }

                        return (
                            <div key={page} className={classes} onClick={() => setCurrentPage(page)}> {page + 1}</div>
                        )

                    })
                }
                {
                    (currentPage !== (totalPages.length - 1)) ?
                        <span className='material-symbols-outlined pagination_control_button' onClick={() => setCurrentPage(currentPage + 1)}>
                            navigate_next
                        </span>
                        :
                        <span style={{opacity: 0}} className='material-symbols-outlined pagination_control_button'>
                            navigate_next
                        </span>
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