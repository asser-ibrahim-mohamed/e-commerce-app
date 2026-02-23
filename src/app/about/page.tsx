import React from 'react'

export default function About() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>About ShopMart</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: "\n    body {\n      font-family: 'Inter', sans-serif;\n    }\n  " }} />

      <section className="py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          
          {/* 1. Header & Mission Section */}
          <div className="text-center mb-16 px-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Our Story</p>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">About ShopMart</h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              ShopMart is your one-stop destination for the latest technology, fashion, and lifestyle products. We are committed to providing quality products with fast shipping and excellent customer service.
            </p>
            
            <div className="bg-gray-50 p-8 border border-gray-100 max-w-3xl mx-auto">
              <h3 className="text-lg font-bold text-black mb-3">Our Mission</h3>
              <p className="text-sm text-gray-600 leading-relaxed italic">
                "To make shopping for quality products easy, convenient, and enjoyable for everyone. We believe that everyone deserves access to the latest and best products at competitive prices."
              </p>
            </div>
          </div>

          {/* 2. Our Values Section */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-black">Our Values</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Value 1 */}
              <div className="bg-white p-6 border border-gray-100 shadow-sm text-center">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                </div>
                <h3 className="text-base font-bold text-black mb-2">Quality</h3>
                <p className="text-sm text-gray-600">We only sell products that meet our high standards.</p>
              </div>

              {/* Value 2 */}
              <div className="bg-white p-6 border border-gray-100 shadow-sm text-center">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-base font-bold text-black mb-2">Customer Service</h3>
                <p className="text-sm text-gray-600">Your satisfaction is our absolute priority.</p>
              </div>

              {/* Value 3 */}
              <div className="bg-white p-6 border border-gray-100 shadow-sm text-center">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-base font-bold text-black mb-2">Innovation</h3>
                <p className="text-sm text-gray-600">We stay ahead of trends to bring you the latest products.</p>
              </div>

              {/* Value 4 */}
              <div className="bg-white p-6 border border-gray-100 shadow-sm text-center">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <h3 className="text-base font-bold text-black mb-2">Trust</h3>
                <p className="text-sm text-gray-600">We build lasting relationships with our customers.</p>
              </div>
            </div>
          </div>

          {/* 3. Why Choose Us Section */}
          <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-black">Why Choose ShopMart?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              
              {/* Feature 1 */}
              <div className="flex items-start">
                <div className="shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-bold text-black mb-1">Fast Shipping</h4>
                  <p className="text-sm text-gray-600">Quick and reliable delivery straight to your doorstep.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start">
                <div className="shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-bold text-black mb-1">Quality Guarantee</h4>
                  <p className="text-sm text-gray-600">All products are carefully selected and tested for quality.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start">
                <div className="shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-bold text-black mb-1">24/7 Support</h4>
                  <p className="text-sm text-gray-600">Our customer service team is always here to help you.</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start">
                <div className="shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-bold text-black mb-1">Easy Returns</h4>
                  <p className="text-sm text-gray-600">Hassle-free 30-day return policy for your peace of mind.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  )
}