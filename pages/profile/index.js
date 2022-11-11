import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FadeLoader } from 'react-spinners';
import HOC from '../../hoc/auth';
import { addUserData, removeUserData, waitingUserData } from '../../redux/reducers/userSlice';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const index = () => {
    const dispatch = useDispatch();
    const User = useSelector(state => state.user);
    const [match, setMatch] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const options = { headers: { Authorization: `Bearer ${User?.token}` } };

    const submitData = async (_data) => {
        if (_data.password.length > 0) {
            if (_data.password !== _data.confirmpassword) return setMatch(false);
        }
        else setMatch(true);
        try {
            dispatch(waitingUserData());
            const { data } = await axios.post(`/api/user/update`, _data, options);
            if (data) {
                toast.success('Profile updated successfully');
                dispatch(addUserData(data));
            }
        } catch (error) {
            dispatch(removeUserData(error?.response?.data?.error));
        }
    }

    return (
        <section className="text-gray-600 body-font">
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <div className="container px-5 py-5 md:py-10 mx-auto flex flex-wrap items-center">
                <form onSubmit={handleSubmit(submitData)} className="lg:w-3/6 mx-auto md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-0 md:mt-0">
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                        Update Profile
                    </h2>
                    <div className="relative mb-4">
                        <label
                            htmlFor="full-name"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Full Name
                        </label>
                        <input
                            ref={register}
                            defaultValue={User?.user?.fullname}
                            {...register('fullname')}
                            type="text"
                            className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        <label className='text-red-600 text-xs'>{errors.fullname && 'Full Name is Required'}</label>
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                            Email
                        </label>
                        <input
                            defaultValue={User?.user?.email}
                            readOnly
                            className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        <label className='text-red-600 text-xs'>{errors.email && 'Email is Required'}</label>
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                            Password
                        </label>
                        <input
                            ref={register}
                            {...register('password')}
                            type="password"
                            className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                            Confirm  Password
                        </label>
                        <input
                            ref={register}
                            {...register('confirmpassword')}
                            type="password"
                            className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        <label className='text-red-600 text-xs'>{(match === false && 'Password not match')}</label>
                    </div>
                    {
                        User?.loading ? <FadeLoader className='mx-auto' color="#36d7b7" /> :
                            <input
                                type='submit'
                                className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                            />
                    }
                </form>
            </div>
        </section>
    );
}

export default HOC(index);