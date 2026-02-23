import React from 'react';
import Link from 'next/link';

export default function ReturnsAndExchanges() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Returns & Exchanges</h1>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Return Policy</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We want you to be completely satisfied with your purchase. If you're not happy with your order, we'll make it right.
          </p>

          <div className="bg-[#f0f7ff] border border-blue-200 rounded-xl p-5">
            <h3 className="font-semibold text-[#1e3a8a] mb-1">30-Day Return Window</h3>
            <p className="text-[#1e40af] text-sm">
              You have 30 days from the delivery date to return or exchange your items.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Return Conditions</h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-600">
            <li>Items must be in original condition with all tags attached</li>
            <li>Items must be unworn, unwashed, and unused</li>
            <li>Original packaging should be included when possible</li>
            <li>Some items may be excluded from returns (see product page for details)</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">How to Return</h2>
          <div className="space-y-6">
            
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Contact Us</h3>
                <p className="text-gray-600 text-sm mt-1">Email us at returns@shopmart.com with your order number</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Get Return Label</h3>
                <p className="text-gray-600 text-sm mt-1">We'll send you a prepaid return shipping label</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ship Your Return</h3>
                <p className="text-gray-600 text-sm mt-1">Package your items and drop off at any authorized location</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Receive Refund</h3>
                <p className="text-gray-600 text-sm mt-1">We'll process your refund within 5-7 business days</p>
              </div>
            </div>

          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Questions?</h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about returns or exchanges, please don't hesitate to contact us.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors"
          >
            Contact Support
          </Link>
        </section>

      </div>
    </div>
  );
}