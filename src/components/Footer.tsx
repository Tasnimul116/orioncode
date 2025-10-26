"use client";

import Link from "next/link";
import Image from "next/image";
import { MarqueeList } from "./Marquee";
import { MarqueeListFooter } from "./MarqueeFooter";

export default function Footer() {
  const column1Links = ["About Us", "Careers", "Blog", "Press"];

  const column2Links = ["Products", "Pricing", "Integrations", "API"];

  const column3Links = ["Help Center", "Contact", "Community", "Developers"];

  const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

  const FooterWords = [
    "Contact With Us",
    "Let's Build Together",
    "Start Your Project",
    "Join Our Community",
    "Stay Connected",
    "Innovate With Us",
    "Collaborate Today",
    "Grow With Orion Code",
  ];

  return (
    <footer className="bg-black text-white">
      {/* Top Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Newsletter */}
          <div className="mr-4">
            <h3 className="text-2xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-400 mb-6">
              Get the latest updates, news, and insights delivered straight to
              your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="px-4 py-3 w-full sm:flex-1 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-celonis-green focus:border-transparent transition"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Footer Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
            {/* Column 1 */}
            <div>
              <h4 className="text-lg font-semibold mb-4 tracking-wide">
                Company
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                {column1Links.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-lg font-semibold mb-4 tracking-wide">
                Products
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                {column2Links.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-lg font-semibold mb-4 tracking-wide">
                Support
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                {column3Links.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors flex items-center gap-2"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      {/* <div className="border-t border-gray-800 my-8" /> */}
      <div className=" py-16  border-y border-gray-600">
        <MarqueeListFooter
          items={FooterWords}
          speed={50}
          // gradientColor="#000000"
          className="py-2 text-white overflow-hidden"
        />
      </div>
      {/* Bottom Section */}
      <div className="container mx-auto ">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          <div>
            <Image src="/logo.png" alt="Orion Code" width={150} height={20} />
          </div>

          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Orion Code. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center md:justify-end gap-5 text-gray-400 text-xs">
            {legalLinks.map((item) => (
              <Link
                key={item}
                href="#"
                className="hover:text-white transition-colors whitespace-nowrap"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
