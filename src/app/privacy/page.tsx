import React from 'react'

export default function PrivacyPolicy() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Privacy Policy - ShopMart</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: "\n    body {\n      font-family: 'Inter', sans-serif;\n    }\n  " }} />

      <section className="py-10 px-4 md:px-8 lg:px-12 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-10 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">Privacy Policy</h2>
            <p className="text-sm font-medium text-gray-500">Last updated: 9/20/2025</p>
          </div>

          <div className="bg-white p-6 md:p-10 border border-gray-100 shadow-sm rounded-none">
            <div className="space-y-8">
              
              <div>
                <h3 className="text-base font-bold text-black mb-2">1. Information We Collect</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-black mb-2">2. How We Use Your Information</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-black mb-2">3. Information Sharing</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-black mb-2">4. Data Security</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-base font-bold text-black mb-2">5. Contact Us</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at{' '}
                  <a 
                    href="mailto:privacy@shopmart.com?subject=Privacy%20Policy%20Inquiry" 
                    className="text-black font-semibold hover:underline"
                  >
                    privacy@shopmart.com
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