import useSWR from "swr";
import moment from "moment";
import { useRouter } from "next/router";
import { ClockLoader } from 'react-spinners';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const posts = () => {
  const { data, error } = useSWR("/api/blog", fetcher);
  const router = useRouter();
  return (
    <section className="text-gray-600 body-font" id='posts'>
      <div className="container px-5 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Latest Blogs</h1>
            <div className="h-1 w-20 bg-green-500 rounded" />
          </div>
        </div>
        {
          !data ?
            <div className="flex justify-center w-full"><ClockLoader /></div>
            :
            <div className="flex flex-wrap -m-4">
              {
                data?.length > 0 ? data?.map((item, index) => {
                  return (
                    <div key={index} className="p-4 lg:w-1/2">
                      <div className="h-full cursor-pointer flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                        <img
                          alt="team"
                          className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                          src={item?.image}
                        />
                        <div className="flex-grow sm:pl-8">
                          <h2
                            onClick={() => router.push(`/blog/${item?._id}`)}
                            className="title-font text-justify font-medium text-lg text-gray-900 hover:text-green-500"
                          >
                            {item?.heading}
                          </h2>
                          <h3 className="text-gray-500 mb-3">
                            {item?.Category?.category}
                          </h3>
                          <p className="mb-4 text-justify text-sm">
                            {item?.definition?.substring(0, 140)}...
                          </p>
                          <span className="inline-flex text-sm text-green-500 font-semibold">
                            Posted on: {moment(item?.createdAt).format("LL")}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }) : <p className="mx-auto text-base text-red-600 font-bold">No Blogs Yet</p>
              }
            </div>
        }
      </div>
    </section>
  );
};

export default posts;