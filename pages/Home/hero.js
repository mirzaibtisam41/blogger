import React from 'react'
import Image from 'next/image';
import CodeImage from '../../public/code.jpg';

const hero = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 capitalize">Find the best technology
                        <br className="hidden lg:inline-block" />blogs here
                    </h1>
                    <p className="mb-8 leading-relaxed text-justify">
                        Looking for tech blogs to keep up with the latest technology trends? No worries! Your search ends here! Read on…
                        <br />
                        With new tech trends being introduced every quarter and information becoming obsolete as technology evolves, it’s now an obligation to stay relevant and learn about the newest technologies, digital industry, social media, and the web in general!
                    </p>
                    <div className="flex justify-center">
                        <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Read More</button>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <Image className="object-cover object-center rounded" alt="hero" src={CodeImage} />
                </div>
            </div>
        </section>
    )
}

export default hero