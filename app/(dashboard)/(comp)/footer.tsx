"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-6">
      <div className="max-w-5xl p-5 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and copyright */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl bg-clip-text  text-blue-600">
              ABCDE
            </span>
            <span className="text-slate-500 text-sm">
              © {new Date().getFullYear()} All rights reserved
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-slate-600 hover:text-blue-600">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-slate-600 hover:text-blue-600">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-slate-600 hover:text-blue-600">
              Contact Us
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
