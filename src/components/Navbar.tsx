import { motion } from "framer-motion";
import { Dropdown, DropdownItem } from "./Custom/Dropdown";
import { FiChevronDown } from "react-icons/fi";
import { images } from "../assets";

interface NavbarProps {
  data: {
    photoURL?: string;
    email: string;
  };
  handleLogout: () => void;
  handleSidebarToggle: () => void;
  disabled?: boolean;
}

export function Navbar({
  data,
  handleLogout,
  handleSidebarToggle,
  disabled,
}: NavbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white border-b w-full shadow-sm sticky top-0 ${
        data !== null ? "block" : "hidden"
      }`}
      style={{ zIndex: 1000 }}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* sidebar open icon  */}
          <div className="flex items-center">
            <button
              onClick={() => handleSidebarToggle()}
              disabled={disabled}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>

            <img
              className="h-6 w-auto ml-2"
              src={images.sakshmLogo}
              alt="Logo"
            />
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="ml-3 relative">
                <div className="flex ml-auto gap-2">
                  {/* avatar  */}
                  <div className="flex items-center gap-2">
                    {data.photoURL ? (
                      <img
                        src={data.photoURL}
                        alt="avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-700 font-semibold">
                        {data?.email?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* dropdown */}
                  <Dropdown
                    button={
                      <button className="inline-flex justify-center gap-2 w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                        <span>Settings</span>
                        <FiChevronDown className="w-5 h-5" />
                      </button>
                    }
                  >
                    <DropdownItem onClick={() => {}}>
                      <div>
                        <p className="text-sm leading-5">Signed in as</p>
                        <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                          {data.email}
                        </p>
                      </div>
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      Sign out
                    </DropdownItem>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
