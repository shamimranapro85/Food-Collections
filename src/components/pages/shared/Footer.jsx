import React from "react";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <h1>You can Contact with ower with Below social links</h1>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://x.com/ShamimRana39877"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-2xl hover:text-blue-500" />
          </a>
          <a
            href="https://www.youtube.com/@shamimrana2006/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="text-2xl hover:text-red-600" />
          </a>
          <a
            href="https://www.linkedin.com/in/shamimrana2006/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-2xl hover:text-blue-700" />
          </a>
          <a
            href="https://www.facebook.com/shamimrana2006"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-2xl hover:text-blue-600" />
          </a>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
}
