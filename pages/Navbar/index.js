import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const index = () => {
  const { data, error } = useSWR("/api/category", fetcher);
  const User = useSelector(state => state.user);
  const router = useRouter();

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img onClick={() => router.push("/")} src='/logo.png' style={{ width: '150px', height: '50px' }} />
        </a>
        <nav className="md:ml-auto nvs hover:cursor-pointer flex flex-wrap items-center text-base justify-center">
          <a
            className="mr-5 hover:text-green-500"
            onClick={() => router.push("/")}
          >
            Home
          </a>
          <a className="mr-5 blogs">
            Categories
            <ul className="blog-category">
              {data?.map((item, index) => {
                return (
                  <li
                    onClick={() => router.push(`/category/${item?._id}`)}
                    className="text-sm hover:bg-green-500 hover:text-white" key={index}>
                    {item?.category}
                  </li>
                );
              })}
            </ul>
          </a>
          {
            User?.token &&
            <>
              <a
                className="mr-5 hover:text-green-500"
                onClick={() => router.push("/profile")}
              >
                Profile
              </a>
              <a
                className="mr-5 hover:text-green-500"
                onClick={() => router.push("/myBlogs")}
              >
                My Blogs
              </a>
            </>
          }
          {
            !User?.token &&
            <>
              <a
                className="mr-5 hover:text-green-500"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </a>
              <a
                className="mr-5 hover:text-green-500"
                onClick={() => router.push("/login")}
              >
                Sign In
              </a>
            </>
          }
        </nav>
      </div>
    </header >
  );
};

export default index;