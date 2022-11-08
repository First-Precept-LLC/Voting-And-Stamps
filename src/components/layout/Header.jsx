import Link from 'next/link';
import { useState, useRef, useEffect } from "react";

function Header() {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const userProfile = typeof window !== "undefined" && localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  useEffect(() => {
    document.addEventListener("mousedown", handleProfileClickOutside);
    return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleProfileClickOutside);
    };
}, []);

const handleProfileClickOutside = (event) => {
    if (profileRef && !profileRef.current?.contains(event.target)) {
      setShowProfile(false);
    }
}

  return (
    <>
    
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded shadow shadow-md sticky top-0">
        <div className=" flex flex-wrap justify-between items-center mx-auto">
          <Link href="/organizations" className="flex items-center">
            <button>  
              <img
                src="/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Project Kelvin Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"></span>
            </button>
            
          </Link>
          <div className='flex'>
          
          {userProfile && <div className="flex items-center md:order-2 relative" ref={profileRef}>
          <button onClick={() => setShowProfile(true)} type="button" className="flex mr-3 text-sm bg-gray-300 p-2 hover:bg-gray-500 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false">
            <span className="sr-only">Open user menu</span>
            
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.0001 0.328979C7.32586 0.328979 6.66677 0.528914 6.10616 0.9035C5.54556 1.27809 5.10862 1.8105 4.8506 2.43341C4.59258 3.05632 4.52507 3.74176 4.6566 4.40304C4.78814 5.06432 5.11282 5.67175 5.58957 6.14851C6.06633 6.62526 6.67376 6.94994 7.33504 7.08148C7.99632 7.21301 8.68176 7.1455 9.30467 6.88748C9.92758 6.62947 10.46 6.19252 10.8346 5.63192C11.2092 5.07131 11.4091 4.41222 11.4091 3.73798C11.4091 3.2903 11.3209 2.84701 11.1496 2.43341C10.9783 2.01981 10.7272 1.64401 10.4106 1.32745C10.0941 1.0109 9.71827 0.759793 9.30467 0.588474C8.89107 0.417156 8.44778 0.328979 8.0001 0.328979ZM8.0001 9.70398C5.4391 9.70398 0.329102 10.99 0.329102 13.54V15.671H15.6711V13.54C15.6711 10.99 10.5601 9.70398 8.0001 9.70398Z" fill="white"/>
            </svg>

          </button>
         {showProfile && <div style={{top: '32px', right: 0}} className="z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute" id="user-dropdown">
            <div className="py-3 px-4">
              <span className="block text-sm text-gray-900 dark:text-white">username</span>
              <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{userProfile?.email}</span>
            </div>
            <ul className="py-1" aria-labelledby="user-menu-button">
              {/* <li>
                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
              </li> */}
              {/* <li>
                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
              </li> */}
              {/* <li>
                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">20 Near</a>
              </li> */}
              <li>
                <a href="/account/login" onClick={() => typeof window !== "undefined" && localStorage.clear()} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
              </li>
            </ul>
          </div>}
          {/* <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button> */}
        </div> }
          <div
            className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-3"
          >
            <div className="relative mt-3 md:hidden">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            <ul className="flex flex-col mt-4 mr-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              {/* <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li> */}
              <li>
                <a
                  href="/create-process-template"
                  className="block rounded hover:bg-kelvinBold hover:text-white py-2 pr-4 pl-3  border border-kelvinBold bg-kelvinLight text-kelvinBold"
                >
                  Create Process Template
                </a>
              </li>
            </ul>
          </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
