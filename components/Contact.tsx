import React from 'react';

const Contact: React.FC = () => {
    return (
        <section className="relative py-12 overflow-hidden bg-black sm:py-16 lg:py-20 xl:py-24" id='contact'>
            <div className="absolute top-0 left-0 -translate-x-48 -translate-y-36">

            </div>

            <div className="absolute inset-0">
                <img className="object-cover w-full h-full opacity-50" src="https://landingfoliocom.imgix.net/store/collection/dusk/images/noise.png" alt="" />
            </div>

            <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="">
                    <h2 className="text-3xl font-normal text-white sm:text-4xl lg:text-5xl xl:text-6xl">Need help? Get in touch</h2>
                    <p className="mt-4 text-base font-normal text-gray-400 sm:text-lg">Pioneering the next generation of digital solutions with cutting-edge innovation and transformative technology.</p>
                </div>
                <div className="grid grid-cols-1 mt-12 sm:mt-16 lg:mt-20 lg:grid-cols-6 lg:gap-x-24 gap-y-12">
                    <div className="space-y-8 lg:space-y-12 lg:col-span-2 lg:order-last">
                        <div>
                            <h3 className="text-xl font-normal text-white sm:text-2xl">
                                <a href="tel:+919894639463" title="Call us" className="">📞 +91 989463 9463</a>
                            </h3>
                            <p className="mt-4 text-base font-normal text-gray-400">Call us directly if you need any urgent help.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-normal text-white sm:text-2xl">
                                <a href="mailto:contact@InnoSphereLabs.com" title="Email us" className="">✉ contact@InnoSphereLabs.com</a>
                            </h3>
                            <p className="mt-4 text-base font-normal text-gray-400">Email us directly if you need any help.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-normal text-white sm:text-2xl">
                                <a href="https://www.innospherelabs.com" target="_blank" rel="noopener noreferrer" className="">🌐 www.innospherelabs.com</a>
                            </h3>
                            <p className="mt-4 text-base font-normal text-gray-400">Visit our website for more information.</p>
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <form action="#" method="POST" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="text-base font-normal text-white"> Your name </label>
                                <div className="mt-2">
                                    <input type="text" name="name" id="name" placeholder="Enter your full name" className="block w-full px-5 py-4 text-base font-normal text-white placeholder-gray-500 bg-black border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="text-base font-normal text-white"> Your email </label>
                                <div className="mt-2">
                                    <input type="email" name="email" id="email" placeholder="Enter your email address" className="block w-full px-5 py-4 text-base font-normal text-white placeholder-gray-500 bg-black border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1" />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="service" className="text-base font-normal text-white"> What kind of service are you looking for? </label>
                                <div className="mt-2">
                                    <select name="service" id="service" className="block w-full py-4 pl-5 pr-10 text-base font-normal text-white placeholder-gray-500 bg-black border border-gray-800 rounded-md focus:border-white focus:ring-white focus:ring-1">
                                        <option value="">Select a subject</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="text-base font-normal text-white"> Message </label>
                                <div className="mt-2">
                                    <textarea name="message" id="message" placeholder="Write your message" rows={4} className="block w-full px-5 py-4 text-base font-normal text-white placeholder-gray-500 bg-black border border-gray-800 rounded-md resize-y focus:border-white focus:ring-white focus:ring-1"></textarea>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <button type="submit" className="inline-flex items-center justify-center px-10 py-4 text-base font-normal text-white transition-all duration-200 rounded-md bg-gradient-to-r from-cyan-500 to-purple-500 hover:contrast-150 filter">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
