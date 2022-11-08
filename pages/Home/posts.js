import useSWR from "swr";
import moment from "moment";
import { useRouter } from "next/router";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

export async function getServerSideProps(context) {
  const res = await fetch('/api/blog');
  const data = res.json();
  return {
    props: { data },
  }
}

const posts = (props) => {
  console.log(props.data);
  // const { data, error } = useSWR("/api/blog", fetcher);
  const router = useRouter();
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 mx-auto">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="text-3xl font-medium title-font mb-4 text-green-500 tracking-widest">
            Latest Blogs
          </h1>
        </div>
        {/* <div className="flex flex-wrap -m-4">
          {data?.map((item, index) => {
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
                      onClick={() => router.replace(`/blog/${item?._id}`)}
                      className="title-font text-justify font-medium text-lg text-gray-900 hover:text-green-500"
                    >
                      {item?.heading}
                    </h2>
                    <h3 className="text-gray-500 mb-3">
                      {item?.Category?.category}
                    </h3>
                    <p className="mb-4 text-justify">
                      {item?.definition?.substring(0, 140)}...
                    </p>
                    <span className="inline-flex text-sm text-green-500 font-semibold">
                      Posted on: {moment(item?.createdAt).format("LL")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div> */}
      </div>
    </section>
  );
};

export default posts;
