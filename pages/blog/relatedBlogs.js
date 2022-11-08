import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment/moment';
import { useRouter } from "next/router";

const relatedBlogs = ({ currentBlog }) => {
    const router = useRouter();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (currentBlog) {
            fetchData();
        }
    }, [currentBlog]);

    const fetchData = async () => {
        const { data } = await axios.post(`/api/blog/${currentBlog?.Category?._id}`);
        setData(data);
    }

    return (
        <section className="text-gray-600 body-font overflow-hidden border-t-2 pt-8 mx-24" style={{ borderTopWidth: '1px' }}>
            <div className="flex flex-col text-center w-full mb-10">
                <h1 className="text-3xl font-medium title-font mb-4 text-green-500 tracking-widest">
                    Related Blogs
                </h1>
            </div>
            <div className="container px-5 mx-auto">
                <div className="-my-8 divide-y-2 divide-gray-100">
                    {
                        data?.filter(item => item?._id !== currentBlog?._id).map((item, index) => {
                            return (
                                <div key={index} className="py-8 flex flex-wrap md:flex-nowrap cursor-pointer">
                                    <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                        <span className="font-semibold title-font text-gray-700">{item?.Category?.category}</span>
                                        <span className="text-sm text-gray-500">Posted on: {moment(item?.createdAt).format("LL")}</span>
                                    </div>
                                    <div className="md:flex-grow">
                                        <h2 onClick={() => router.replace(`/blog/${item?._id}`)} className="text-2xl font-medium text-gray-900 title-font mb-2 hover:text-green-500">{item?.heading}</h2>
                                        <p className="leading-relaxed">{item?.definition?.substring(0, 230)}...</p>
                                        <a onClick={() => router.replace(`/blog/${item?._id}`)} className="text-green-500 inline-flex items-center mt-4">Learn More
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
        </section>
    )
}

export default relatedBlogs