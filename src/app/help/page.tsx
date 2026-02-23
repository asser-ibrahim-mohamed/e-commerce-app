import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HelpCenter() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Help Center</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: "\n    body {\n      font-family: 'Inter', sans-serif;\n    }\n  " }} />

      <section className="py-10 px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12 px-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Help Center</p>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Frequently Asked Questions</h2>
          </div>

          {/* FAQs List */}
          <div className="bg-white p-6 md:p-8 border border-gray-100 shadow-sm rounded-none mb-10">
            <div className="space-y-8">
              
              {/* Question 1 */}
              <div>
                <h3 className="text-base font-semibold text-black mb-2">How do I place an order?</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase.
                </p>
              </div>

              {/* Question 2 */}
              <div>
                <h3 className="text-base font-semibold text-black mb-2">What payment methods do you accept?</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We accept all major credit cards, PayPal, and other secure payment methods.
                </p>
              </div>

              {/* Question 3 */}
              <div>
                <h3 className="text-base font-semibold text-black mb-2">How long does shipping take?</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Standard shipping takes 3-5 business days. Express shipping options are available for faster delivery.
                </p>
              </div>

              {/* Question 4 */}
              <div>
                <h3 className="text-base font-semibold text-black mb-2">Can I return or exchange items?</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Yes, we offer a 30-day return policy for most items. Items must be in original condition with tags attached.
                </p>
              </div>

              {/* Question 5 */}
              <div>
                <h3 className="text-base font-semibold text-black mb-2">How do I track my order?</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Once your order ships, you'll receive a tracking number via email. You can also track your order in your account.
                </p>
              </div>

            </div>
          </div>

          {/* Still Need Help Section */}
          <div className="bg-gray-50 p-8 md:p-10 border border-gray-200 rounded-none text-center">
            <h3 className="text-xl font-bold text-black mb-3">Still Need Help?</h3>
            <p className="text-sm text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
              If you can't find the answer you're looking for, our customer service team is here to help.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              
              {/* Button 1: Goes to /contact page */}
              <Link 
                href="/contact"   >
                  <Button  className="w-full sm:w-auto px-8 py-2.5 bg-black text-white font-medium hover:bg-gray-800 transition-colors rounded-2xl text-center"> Contact Us</Button>
               
              </Link >
              
              {/* Button 2: Opens Email Client directly */}
              <Link   href="mailto:support@shopmart.com?subject=Need%20Help%20from%20Support" > <Button
              
                className="w-full sm:w-auto px-8 py-4 bg-white text-black font-medium border border-gray-300 hover:bg-gray-50 transition-colors rounded-2xl text-center"
              >
                Email Support
              </Button>
              </Link>
             
            </div>
          </div>

        </div>
      </section>
    </>
  )
}