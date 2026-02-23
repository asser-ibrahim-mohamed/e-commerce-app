import React from 'react'

export default function TermsOfService() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Terms of Service - ShopMart</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: "\n    body {\n      font-family: 'Inter', sans-serif;\n    }\n  " }} />

      <section className="py-10 px-4 md:px-8 lg:px-12 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-10 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">Terms of Service</h2>
            <p className="text-sm font-medium text-gray-500">Last updated: 9/20/2025</p>
          </div>

          <div className="bg-white p-6 md:p-10 border border-gray-100 shadow-sm rounded-none">
            <div className="space-y-8">
              
              <div>
                <h3 className="text-base font-bold text-black mb-2">1. Acceptance of Terms</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  By accessing and using ShopMart, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-black mb-2">2. Use License</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Permission is granted to temporarily download one copy of the materials on ShopMart for personal, non-commercial transitory viewing only.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-black mb-2">3. Product Information</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We strive to provide accurate product information, but we do not warrant that product descriptions or other content is accurate, complete, reliable, or error-free.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-black mb-2">4. Pricing and Payment</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All prices are subject to change without notice. Payment is due at the time of purchase.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-black mb-2">5. Returns and Refunds</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Returns are accepted within 30 days of purchase. Items must be in original condition with all tags attached.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-base font-bold text-black mb-2">6. Contact Information</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at{' '}
                  <a 
                    href="mailto:legal@shopmart.com?subject=Inquiry%20Regarding%20Terms%20of%20Service" 
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    legal@shopmart.com
                  </a>.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  )
}