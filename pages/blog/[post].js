import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import moment from "moment";
import RelatedBlogs from "./relatedBlogs";
import { ClockLoader } from 'react-spinners';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const post = () => {
  const router = useRouter();
  const { data, error } = useSWR(`/api/blog/${router.query.post}`, fetcher);

  return (
    <section className="text-gray-600 body-font">
      {!data ? (
        <div className="flex justify-center w-full"><ClockLoader /></div>
      ) : (
        <div className="container px-5 py-10 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                className="object-fill object-center h-full w-full"
                src={data[0]?.image}
              />
            </div>
            <div className="flex flex-col sm:flex-row mt-10">
              <div className=" sm:border-t-0 sm:mt-0 text-center sm:text-left">
                <a className="text-green-500 text-justify inline-flex items-center text-2xl mb-4 font-semibold">
                  Overview
                </a>
                <p className="leading-relaxed mb-4 text-justify text-base">
                  {data[0]?.definition}
                </p>
                <a className="text-green-500 text-justify inline-flex items-center mb-4 text-2xl font-semibold">
                  Explanation
                </a>
                <p className="leading-relaxed text-justify mb-4 text-base">
                  {data[0]?.description}
                </p>
                <span className="inline-flex text-sm text-green-500 font-semibold">
                  Posted on: {moment(data[0]?.createdAt).format("LL")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <RelatedBlogs currentBlog={data && data[0]} />
    </section>
  );
};

export default post;
