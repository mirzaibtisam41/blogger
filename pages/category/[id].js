import axios from 'axios';
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import Pagination from '../blog/pagination';
import { ClockLoader } from 'react-spinners';

const id = () => {
    const router = useRouter();
    const [data, setData] = useState([]);

    useEffect(() => {
        if (router.query.id) {
            fetchData();
        }
    }, [router.query.id]);

    const fetchData = async (page = 0) => {
        const { data } = await axios.post(`/api/blog/${router?.query?.id}`, { page });
        setData(data);
    }

    const changePage = async (page) => {
        const { data } = await axios.post(`/api/blog/${router.query.id}`, { page });
        setData(data);
    }

    return (
        <section className="text-gray-600 body-font h-full">
            {
                data.length === 0 ?
                    <div className="flex justify-center w-full"><ClockLoader /></div>
                    :
                    <div className="container px-5 py-10 mx-auto">
                        {
                            data?.count > 0 ?
                                <React.Fragment>
                                    <div className="flex flex-wrap -m-4">
                                        {
                                            data?.blogs?.map((item, index) => {
                                                return (
                                                    <div key={index} className="p-4 md:w-1/3 cursor-pointer">
                                                        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                                            <img className="lg:h-48 md:h-36 w-full object-center" src={item?.image} alt="blog" />
                                                            <div className="p-6">
                                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{item?.Category?.category}</h2>
                                                                <h1 onClick={() => router.push(`/blog/${item?._id}`)} className="title-font text-lg font-medium text-gray-900 mb-3 hover:text-green-500">{item?.heading}</h1>
                                                                <p className="leading-relaxed mb-3 text-justify text-sm">{item?.definition?.substring(0, 200)}...</p>
                                                                <div className="flex items-center flex-wrap ">
                                                                    <a onClick={() => router.push(`/blog/${item?._id}`)} className="text-green-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                                                                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                            <path d="M5 12h14" />
                                                                            <path d="M12 5l7 7-7 7" />
                                                                        </svg>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <Pagination changePage={changePage} count={data?.count} />
                                </React.Fragment>
                                : <p className="mx-auto text-center text-base text-red-600 font-bold">No Blogs Yet</p>
                        }
                    </div>
            }
        </section>

    )
}

export default id;