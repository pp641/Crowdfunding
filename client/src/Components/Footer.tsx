import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Company Info */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h3 className="text-lg font-bold text-white mb-3">Company</h3>
            <p className="text-sm">
              We are a tech company focused on innovation and excellent customer service.
            </p>
          </div>

          {/* Links */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h3 className="text-lg font-bold text-white mb-3">Quick Links</h3>
            <ul>
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/projects" className="hover:text-white">Projects</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
              <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="w-full sm:w-1/3">
            <h3 className="text-lg font-bold text-white mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M22.675 0H1.325C.592 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.409c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.462.099 2.794.143v3.24l-1.916.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.588l-.467 3.622h-3.121V24h6.116c.73 0 1.325-.593 1.325-1.326V1.326C24 .593 23.407 0 22.675 0z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M24 4.557a9.933 9.933 0 01-2.828.775 4.937 4.937 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0016.616 3c-2.717 0-4.917 2.2-4.917 4.917 0 .386.043.763.128 1.125C7.728 8.84 4.1 6.791 1.671 3.787a4.902 4.902 0 00-.666 2.473c0 1.706.869 3.213 2.19 4.099a4.902 4.902 0 01-2.228-.616v.062c0 2.385 1.696 4.375 3.946 4.827a4.935 4.935 0 01-2.223.084c.624 1.951 2.439 3.375 4.587 3.412A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.209c9.054 0 14-7.504 14-14 0-.213-.005-.425-.014-.636A9.993 9.993 0 0024 4.557z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.313 3.608 1.287.975.975 1.226 2.242 1.287 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.313 2.633-1.287 3.608-.975.975-2.242 1.226-3.608 1.287-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.313-3.608-1.287-.975-.975-1.226-2.242-1.287-3.608C2.175 15.754 2.163 15.374 2.163 12s.012-3.584.07-4.85C2.295 5.784 2.546 4.517 3.521 3.542c.975-.975 2.242-1.226 3.608-1.287C8.416 2.175 8.796 2.163 12 2.163M12 0C8.741 0 8.332.012 7.052.07 5.773.129 4.616.355 3.665 1.306c-.951.951-1.177 2.108-1.236 3.387C2.012 8.332 2 8.741 2 12s.012 3.668.07 4.948c.059 1.279.285 2.436 1.236 3.387.951.951 2.108 1.177 3.387 1.236C8.332 21.988 8.741 22 12 22s3.668-.012 4.948-.07c1.279-.059 2.436-.285 3.387-1.236.951-.951 1.177-2.108 1.236-3.387C21.988 15.668 22 15.259 22 12s-.012-3.668-.07-4.948c-.059-1.279-.285-2.436-1.236-3.387-.951-.951-2.108-1.177-3.387-1.236C15.668 2.012 15.259 2 12 2s-3.668.012-4.948.07C5.773.129 4.616.355 3.665 1.306c-.951.951-1.177 2.108-1.236 3.387C2.012 8.332 2 8.741 2 12s.012 3.668.07 4.948c.059 1.279.285 2.436 1.236 3.387.951.951 2.108 1.177 3.387 1.236C8.332 21.988 8.741 22 12 22s3.668-.012 4.948-.07c1.279-.059 2.436-.285 3.387-1.236.951-.951 1.177-2.108 1.236-3.387C21.988 15.668 22 15.259 22 12s-.012-3.668-.07-4.948c-.059-1.279-.285-2.436-1.236-3.387-.951-.951-2.108-1.177-3.387-1.236C15.668 2.012 15.259 2 12 2z"/>
                  <circle cx="12" cy="12" r="3.5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm mt-8">
          &copy; 2024 YourCompany. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
