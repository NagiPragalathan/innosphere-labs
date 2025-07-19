import React from 'react';

const serviceOptions = [
    { value: "", label: "Select a subject" },
    { value: "service", label: "Service" },
    { value: "product", label: "Product" },
];

const Contact: React.FC = () => {
    return (
        <section className="relative py-12 overflow-hidden bg-black sm:py-16 lg:py-20 xl:py-24" id='contact'>
            <div className="absolute inset-0">
                <img className="object-cover w-full h-full opacity-50" src="https://landingfoliocom.imgix.net/store/collection/dusk/images/noise.png" alt="" />
            </div>

            <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-normal text-white sm:text-4xl lg:text-5xl xl:text-6xl">Need help? Get in touch</h2>
                    <p className="mt-4 text-base font-normal text-gray-400 sm:text-lg">Pioneering the next generation of digital solutions with cutting-edge innovation and transformative technology.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-6 lg:gap-x-24 gap-y-12">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-2 lg:order-last space-y-6">
                        {/* Phone Card */}
                        <div className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/50 transition-all">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-normal text-white ml-4">Phone</h3>
                            </div>
                            <a href="tel:+919894639463" className="text-gray-300 hover:text-white transition-colors">
                                +91 989463 9463
                            </a>
                            <p className="mt-2 text-sm text-gray-400">Call us directly if you need any urgent help.</p>
                        </div>

                        {/* Email Card */}
                        <div className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/50 transition-all">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 0l-8 6-8-6" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-normal text-white ml-4">Email</h3>
                            </div>
                            <a href="mailto:contact@InnoSphereLabs.com" className="text-gray-300 hover:text-white transition-colors">
                                contact@InnoSphereLabs.com
                            </a>
                            <p className="mt-2 text-sm text-gray-400">Email us directly if you need any help.</p>
                        </div>

                        {/* Website Card */}
                        <div className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/50 transition-all">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-normal text-white ml-4">Website</h3>
                            </div>
                            <a href="https://www.innospherelabs.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                                www.innospherelabs.com
                            </a>
                            <p className="mt-2 text-sm text-gray-400">Visit our website for more information.</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-4">
                        <form 
                            action="https://formsubmit.co/raj@docchain.cloud" 
                            method="POST" 
                            className="bg-gray-900/30 rounded-2xl p-8 backdrop-blur-sm border border-gray-800/50"
                        >
                            <input type="hidden" name="_subject" value="New Contact Form Submission" />
                            <input type="hidden" name="_template" value="table" />
                            <input type="hidden" name="_next" value="https://www.innospherelabs.com" />
                            <input type="hidden" name="_captcha" value="true" />

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        id="name" 
                                        placeholder="Enter your full name" 
                                        className="w-full px-4 py-3 text-white bg-gray-900/50 rounded-lg border border-gray-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors" 
                                        required 
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Your email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        placeholder="Enter your email address" 
                                        className="w-full px-4 py-3 text-white bg-gray-900/50 rounded-lg border border-gray-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors" 
                                        required 
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">What kind of service are you looking for?</label>
                                    <select  
                                        name="subject" 
                                        id="subject" 
                                        className="w-full px-4 py-3 text-white bg-gray-900/50 rounded-lg border border-gray-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                        required
                                    >
                                        {serviceOptions.map((option) => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                                    <textarea 
                                        name="message" 
                                        id="message" 
                                        placeholder="Write your message" 
                                        rows={4} 
                                        className="w-full px-4 py-3 text-white bg-gray-900/50 rounded-lg border border-gray-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-y"
                                        required
                                    ></textarea>
                                </div>

                                <div className="sm:col-span-2">
                                    <button 
                                        type="submit" 
                                        className="w-full px-8 py-4 text-white bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:contrast-150 transition-all duration-200 font-medium"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
