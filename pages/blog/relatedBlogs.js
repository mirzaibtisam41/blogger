import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from "next/router";
import Pagination from './pagination';

const relatedBlogs = ({ currentBlog }) => {
    const router = useRouter();
    const [data, setData] = useState([]);

    useEffect(() => {
        if (currentBlog) {
            fetchData();
        }
    }, [currentBlog]);

    const fetchData = async (page = 0) => {
        const { data } = await axios.post(`/api/blog/${currentBlog?.Category?._id}`, { page });
        setData(data);
    }

    const changePage = async (page) => {
        const { data } = await axios.post(`/api/blog/${currentBlog?.Category?._id}`, { page });
        setData(data);
    }

    return (
        <section className="text-gray-600 body-font w-full md:overflow-hidden pt-8 md:mx-24">
            {data?.count > 0 ?
                <React.Fragment>
                    <div className="flex flex-wrap w-full mb-3 text-center md:text-left md:mb-20">
                        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Related Blogs</h1>
                            <div className="h-1 w-20 mx-auto md:mx-0 text-center bg-green-500 rounded" />
                        </div>
                    </div>
                    <div className="container px-5 md:mx-auto">
                        <div className="-my-8 divide-y-2 divide-gray-100">
                            {
                                data?.blogs?.filter(item => item?._id !== currentBlog?._id).map((item, index) => {
                                    return (
                                        <div key={index} className="py-8 flex flex-wrap md:flex-nowrap cursor-pointer">
                                            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                                <span className="font-semibold title-font text-gray-700">{item?.Category?.category}</span>
                                                <span className="text-sm text-gray-500">Posted on: {moment(item?.createdAt).format("LL")}</span>
                                            </div>
                                            <div className="md:flex-grow">
                                                <h2 onClick={() => router.push(`/blog/${item?._id}`)} className="text-2xl font-medium text-gray-900 title-font mb-2 hover:text-green-500">{item?.heading}</h2>
                                                <p className="leading-relaxed text-justify">{item?.definition?.substring(0, 230)}...</p>
                                                <a onClick={() => router.push(`/blog/${item?._id}`)} className="text-green-500 inline-flex items-center mt-4">Learn More
                                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M5 12h14"></path>
                                                        <path d="M12 5l7 7-7 7"></path>
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Pagination changePage={changePage} count={data?.count} />
                </React.Fragment>
                : null
            }
        </section>
    )
}

export default relatedBlogs