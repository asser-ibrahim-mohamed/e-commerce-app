import Link from "next/link";
import Image from 'next/image';
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="  border-t-2  text-gray-600">
      <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

       
        <div className="space-y-4">
         <h1>
            <Image
              src="/shop-mart-logo.png"
              alt="ShopMart_Logo"
              width={150}
              height={40}
              priority

              className="h-32 -my-12 w-auto object-contain"
            />
          
        </h1>

          <p className="text-sm leading-relaxed">
            Your one-stop destination for the latest fashion, tech,
            and lifestyle trends. Quality guaranteed with fast delivery.
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-black" />
              <span>123 Trend Street, Cairo</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} className="text-black" />
              <span>+20 100 123 4567</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} className="text-black" />
              <span>support@trendstore.com</span>
            </div>
          </div>
        </div>

       
        <div>
          <h3 className="text-black font-semibold mb-4">SHOP</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/categories" className="hover:text-black transition">Electronics</Link></li>
            <li><Link href="/categories" className="hover:text-black transition">Fashion</Link></li>
            <li><Link href="/categories" className="hover:text-black transition">Home & Garden</Link></li>
            <li><Link href="/categories" className="hover:text-black transition">Sports</Link></li>
            <li><Link href="/categories" className="hover:text-black transition">Deals</Link></li>
          </ul>
        </div>

     
        <div>
          <h3 className="text-black font-semibold mb-4">CUSTOMER SERVICE</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contact" className="hover:text-black transition">Contact Us</Link></li>
            <li><Link href="/help" className="hover:text-black transition">Help Center</Link></li>
            <li><Link href="#" className="hover:text-black transition">Track Your Order</Link></li>
            <li><Link href="/returns-and-exchange" className="hover:text-black transition">Returns & Exchanges</Link></li>
            <li><Link href="#" className="hover:text-black transition">Size Guide</Link></li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-black font-semibold mb-4">ABOUT</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-black transition">About shopmart</Link></li>
            <li><Link href="#" className="hover:text-black transition">Careers</Link></li>
            <li><Link href="#" className="hover:text-black transition">Press</Link></li>
            <li><Link href="#" className="hover:text-black transition">Investor Relations</Link></li>
            <li><Link href="#" className="hover:text-black transition">Sustainability</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-black font-semibold mb-4">POLICIES</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-black transition">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="hover:text-black transition">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-black transition">Cookie Policy</Link></li>
            <li><Link href="#" className="hover:text-black transition">Shipping Policy</Link></li>
            <li><Link href="/returns-and-exchange" className="hover:text-black transition">Refund Policy</Link></li>
          </ul>
        </div>

      </div>

      <div className="border-t border-black/10 py-6 text-center text-sm">
        © {new Date().getFullYear()} Trend Store. All rights reserved.
      </div>
    </footer>
  );
}