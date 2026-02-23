import React from 'react';
function Footer() {
  return (
    // Added bg-gray-900 so white text is visible, and changed to semantic <footer> tag
    <footer className="bg-black w-full border-t border-gray-800">
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 mb-10">
          {/* Brand & Newsletter */}
          <div className="md:col-span-4">
            <h2 className="text-white text-xl font-semibold mb-2">BlogSpot</h2>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs mb-6">
              A space for essays, ideas, and the occasional tangent. Written with care.
            </p>

            <div className="flex border border-gray-700 rounded-md overflow-hidden max-w-xs">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-3 py-2 text-sm text-gray-200 bg-gray-800 outline-none placeholder-gray-500 focus:bg-gray-700 transition-colors"
              />
              <button
                type="button"
                className="px-4 py-2 text-sm bg-white text-gray-900 hover:bg-gray-200 transition-colors font-medium"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {/* Column 1 */}
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-4">
                Content
              </h3>
              <ul className="space-y-2">
                {['Essays', 'Notes', 'Journal', 'Archive'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-4">
                Connect
              </h3>
              <ul className="space-y-2">
                {['Twitter', 'GitHub', 'LinkedIn', 'RSS Feed'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-4">
                About
              </h3>
              <ul className="space-y-2">
                {['Colophon', 'Contact', 'Uses', 'Now'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider + bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} BlogSpot. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;