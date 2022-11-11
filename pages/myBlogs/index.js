import React, { useState, useEffect } from 'react';
import CreateBlog from './createBlog';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Pagination from '../blog/pagination';
import HOC from '../../hoc/auth';
import Modal from './modal';
import { useRouter } from 'next/router';
import { ClockLoader } from 'react-spinners';

const index = () => {
    const [open, setOpen] = useState(false);
    const [del, setDel] = useState(false);
    const [data, setData] = useState([]);

    const router = useRouter();
    const User = useSelector(state => state.user);

    useEffect(() => {
        fetcher();
    }, []);

    const options = { headers: { Authorization: `Bearer ${User?.token}` } };

    const fetcher = async (page = 0) => {
        const { data } = await axios.post('/api/blog/userBlogs', { page }, options);
        if (data) {
            setData(data);
        }
    }

    const changePage = async (page) => {
        const { data } = await axios.post('/api/blog/userBlogs', { page }, options);
        setData(data);
    }

    return (
        <section className="text-gray-600 body-font">
            {open && <CreateBlog fetcher={fetcher} setOpen={setOpen} />}
            <div className="container px-5 py-10 mx-auto">
                <div className="flex flex-wrap w-full mb-20">
                    <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">My Blogs</h1>
                        <div className="h-1 w-20 bg-green-500 rounded" />
                    </div>
                    <p className="lg:w-1/2 w-full leading-relaxed text-gray-500 text-right">
                        <button onClick={() => setOpen(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            New Blog
                        </button>
                    </p>
                </div>
                {
                    data?.length === 0 ?
                        <div className="flex justify-center w-full"><ClockLoader /></div>
                        :
                        <div>
                            {
                                data?.count > 0 ?
                                    <div className="flex flex-wrap -m-4">
                                        {
                                            data?.blogs?.map((item, index) => {
                                                return (
                                                    <div key={index} className="xl:w-1/4 md:w-1/2 p-4 cursor-pointer">
                                                        <div className="bg-gray-100 p-6 rounded-lg">
                                                            <img className="h-40 rounded w-full object-center mb-6" src={item?.image} alt="content" />
                                                            <h3 className="tracking-widest text-green-500 text-xs font-medium title-font">{item?.Category?.category}</h3>
                                                            <section className='flex justify-between items-center'>
                                                                <h2 onClick={() => router.push(`/blog/${item?._id}`)} className="text-lg text-gray-900 font-medium title-font mb-4 hover:text-green-500">{item?.heading}</h2>
                                                                <svg onClick={() => setDel(item?._id)} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600 hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </section>
                                                            <p className="leading-relaxed text-sm text-justify">{item?.definition?.substring(0, 130)}...</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    : <p className="mx-auto text-center text-base text-red-600 font-bold">No Blogs Yet</p>
                            }
                        </div>
                }
            </div>
            {data?.count > 0 && <Pagination changePage={changePage} count={data?.count} ppp={8} />}
            {del && <Modal fetcher={fetcher} setDel={setDel} del={del} />}
        </section>
    )
}

export default HOC(index);