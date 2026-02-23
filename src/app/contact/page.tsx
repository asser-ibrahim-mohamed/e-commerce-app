import React from 'react'

export default function Contact() {
  return (
    <>
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contact Us</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: "\n    body {\n      font-family: 'Inter', sans-serif;\n    }\n  " }} />
        
        <section className="py-10 px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto">
            
            <div className="text-center mb-10 px-4">
              <p className="text-sm font-medium text-gray-500 mb-2">Get In Touch</p>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Contact Us</h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Have questions or ready to start your project? We'd love to hear from you. Reach out and let's create something amazing together.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-none shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                
                <div>
                  <h3 className="text-xl font-semibold text-black mb-6">Get in touch</h3>
                  
                  <div className="space-y-5">
                    
                    <div className="flex items-start">
                      <div className="bg-black p-2.5 rounded-none mr-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-black mb-0.5">Phone</h4>
                        <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-black p-2.5 rounded-none mr-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-black mb-0.5">Email</h4>
                        <p className="text-sm text-gray-600">hello@company.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-black p-2.5 rounded-none mr-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-black mb-0.5">Office</h4>
                        <p className="text-sm text-gray-600">123 Business Ave, Suite 100<br />New York, NY 10001</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-black p-2.5 rounded-none mr-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-black mb-0.5">Business Hours</h4>
                        <p className="text-sm text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: 10:00 AM - 4:00 PM</p>
                      </div>
                    </div>

                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-black mb-6">Send us a message</h3>
                  <form className="space-y-4">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-black mb-1.5">Full Name</label>
                        <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:border-black text-sm" placeholder="Your name" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black mb-1.5">Email Address</label>
                        <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:border-black text-sm" placeholder="your@email.com" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-black mb-1.5">Subject</label>
                      <input type="text" id="subject" className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:border-black text-sm" placeholder="What is this regarding?" />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-black mb-1.5">Message</label>
                      <textarea id="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:border-black text-sm" placeholder="Tell us about your project..." defaultValue={""} />
                    </div>

                    <button type="submit" className="w-full px-6 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                      Send Message
                    </button>

                  </form>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}