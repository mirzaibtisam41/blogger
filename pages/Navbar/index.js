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
          <img src='/logo.png' style={{ width: '150px', height: '50px' }} />
        </a>
        <nav className="md:ml-auto nvs hover:cursor-pointer flex flex-wrap items-center text-base justify-center">
          <a
            className="mr-5 hover:text-gray-900"
            onClick={() => router.replace("/")}
          >
            Home
          </a>
          <a className="mr-5 blogs">
            Categories
            <ul className="blog-category">
              {data?.map((item, index) => {
                return (
                  <li className="text-sm" key={index}>
                    {item?.category}
                  </li>
                );
              })}
            </ul>
          </a>
          <a
            className="mr-5 hover:text-gray-900"
            onClick={() => router.replace("/contact")}
          >
            Contact Us
          </a>
        </nav>
        {
          !User?.token
            ?
            <React.Fragment>
              <button
                onClick={() => router.replace("/signup")}
                className="inline-flex mr-2 items-center bg-green-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-green-400 rounded text-base mt-4 md:mt-0"
              >
                SignUp
              </button>

              <button
                onClick={() => router.replace("/login")}
                className="inline-flex items-center bg-green-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-green-400 rounded text-base mt-4 md:mt-0"
              >
                Login
              </button>

            </React.Fragment>
            :
            <button
              onClick={() => {
                localStorage.clear();
                router.reload();
              }}
              className="inline-flex items-center bg-green-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-green-400 rounded text-base mt-4 md:mt-0"
            >
              Sign Out
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
        }
      </div>
    </header>
  );
};

export default index;
