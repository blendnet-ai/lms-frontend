import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { icons, images } from "../assets";
import { NavItem } from "@/types/app";
import { ChevronLeft } from "lucide-react";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  navItems: NavItem[];
}

export function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  navItems,
}: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabChange = (href: string, disabled?: boolean) => {
    if (!disabled) {
      setIsSidebarOpen(true);
      navigate(href);
    }
  };

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: isSidebarOpen ? -250 : 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`h-screen text-black fixed left-0 top-0 overflow-hidden bg-white w-[250px]`}
      style={{ zIndex: 1000 }}
    >
      <div className="flex flex-col h-full border-r bg-white z-50">
        {/* Header */}
        <div className="p-3.5 flex items-start justify-between border-b">
          <img className="h-9 w-full" src={images.sakshmLogo} alt="Logo" />
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={isSidebarOpen ? "Expand sidebar" : "Collapse sidebar"}
          >
            <motion.div
              animate={{ rotate: isSidebarOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.div>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <motion.ul
            className="space-y-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {navItems.map((item) => (
              <motion.li
                key={item.label}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <div
                  role="button"
                  className={`flex items-center gap-4 p-2 rounded-lg transition-colors ${
                    item.disabled
                      ? "bg-gray-50 cursor-not-allowed"
                      : location.pathname === item.href
                      ? "bg-gray-200"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleTabChange(item.href, item.disabled)}
                >
                  <item.icon
                    className={`h-5 w-5 min-w-[20px] ${
                      item.disabled ? "text-gray-500" : ""
                    }`}
                  />
                  <>
                    {!isSidebarOpen && (
                      <span
                        className={`whitespace-nowrap ${
                          item.disabled ? "text-gray-500" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    )}
                  </>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        <div className="absolute bottom-0 w-full flex justify-center p-2 border-t">
          <img
            src={
              window.env.VITE_PARTNER_LOGO == "afh"
                ? icons.parterLogoAFH
                : icons.parterLogoECF
            }
            alt="partner logo"
            className="w-full h-auto"
          />
        </div>
      </div>
    </motion.div>
  );
}
