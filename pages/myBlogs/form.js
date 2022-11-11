import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { FadeLoader } from 'react-spinners';
import useSWR from "swr";
import toast, { Toaster } from 'react-hot-toast';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const form = ({ fetcher, setOpen }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const User = useSelector(state => state.user);
    const { data, error } = useSWR("/api/category", fetcher);

    const [category, setCategory] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitData = async (data) => {
        if (data?.category === '0') return setCategory(true);
        else setCategory(false);

        const formData = new FormData();
        formData.append('file', data.file[0]);
        formData.append('upload_preset', 'blogger');
        setLoading(true);

        fetch('https://api.cloudinary.com/v1_1/doiugxccx/image/upload', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(async _data => {
                delete data.file;
                data.image = _data.secure_url;
                try {
                    const res = await axios.post('/api/blog/create', data, {
                        headers: {
                            Authorization: `Bearer ${User?.token}`
                        }
                    });
                    if (res.data) {
                        setLoading(false);
                        toast.success('Blog Created Successfully');
                        fetcher();
                    }
                } catch (error) {
                    setLoading(false);
                    console.log(error);
                }
            });
    }

    return (
        <form onSubmit={handleSubmit(submitData)} className="w-full max-w-lg">
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <div className="flex flex-wrap w-full mb-5">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                    <h1 className="sm:text-xl text-xl font-medium title-font mb-2 text-gray-900">
                        Create Blog
                    </h1>
                    <div className="h-1 w-20 bg-green-500 rounded" />
                </div>
                <p className="lg:w-1/2 w-full leading-relaxed text-gray-500 text-right">
                    <button
                        onClick={() => setOpen(false)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        X
                    </button>
                </p>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                        Title
                    </label>
                    <input
                        ref={register}
                        {...register('heading', { required: true })}
                        className="appearance-none rounded-lg block w-full bg-gray-200 text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text"
                        placeholder="Title"
                    />
                    {errors.heading && <p className="text-red-500 text-xs italic mb-3">Title is required.</p>}
                </div>

                <div className="w-full px-3">
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                        Select a category
                    </label>
                    <select
                        defaultValue="0"
                        ref={register}
                        {...register('category', { required: true })}
                        id="countries"
                        className="textArea bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option disabled value="0">Choose an option</option>
                        {
                            data?.map((item, index) => {
                                return <option key={index} value={item?._id}>{item?.category}</option>
                            })
                        }
                    </select>
                    {category && <p className="text-red-500 text-xs italic mb-3">Category is required.</p>}
                </div>

                <div className="w-full px-3 mt-3">
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                        Definition
                    </label>
                    <textarea
                        ref={register}
                        {...register('definition', { required: true, minLength: 50 })}
                        id="message"
                        rows="4"
                        className="textArea block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Define your Blog..."
                    ></textarea>
                    {errors.definition && <p className="text-red-500 text-xs italic mb-3">Definition is required (Min 50 characters).</p>}
                </div>

                <div className="w-full px-3 mt-3">
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                        Description
                    </label>
                    <textarea
                        ref={register}
                        {...register('description', { required: true, minLength: 50 })}
                        id="message"
                        rows="4"
                        className="textArea block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Explain your blog..."
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-xs italic mb-3">Description is required (Min 50 characters).</p>}
                </div>

                <div className="w-full px-3 mt-3">
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Upload file
                    </label>
                    <input
                        ref={register}
                        {...register('file', { required: true })}
                        className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                    />
                    {errors.file && <p className="text-red-500 text-xs italic mb-3">Image is required.</p>}
                </div>

                <div className="w-full px-3 mt-5">
                    {
                        loading ? <FadeLoader className='mx-auto' color="#36d7b7" /> :
                            <input
                                type='submit'
                                className="text-white w-full bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                            />
                    }
                </div>
            </div>
        </form>
    );
}

export default form