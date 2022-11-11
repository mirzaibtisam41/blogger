import React, { useState, memo } from 'react';

const pagination = ({ changePage, count, ppp }) => {
    let postPerPage = ppp ? 8 : 5;
    const [page, setPage] = useState(0);
    return (
        <div className="flex flex-col items-center mt-14">
            <div className="inline-flex mt-2 xs:mt-0">
                <button disabled={page === 0 ? true : false} onClick={() => {
                    changePage(page - 1);
                    setPage(prev => prev - 1);
                }}
                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-green-500 rounded-l hover:bg-green-600 dark:hover:text-white">
                    <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                    Prev
                </button>
                <button disabled={page === Math.floor(count / postPerPage) ? true : false} onClick={() => {
                    changePage(page + 1);
                    setPage(prev => prev + 1);
                }} className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-green-500 rounded-r border-0 border-l border-green-500 hover:bg-green-600 dark:hover:text-white">
                    Next
                    <svg aria-hidden="true" className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
        </div >
    )
}

export default memo(pagination);