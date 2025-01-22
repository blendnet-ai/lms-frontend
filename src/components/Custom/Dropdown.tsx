import { useState, useEffect, useRef, ReactNode } from "react";

interface DropdownProps {
  button: ReactNode;
  children: ReactNode;
  className?: string;
  translateX?: number;
  translateY?: number;
  width?: number;
}

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const DropdownItem = ({
  children,
  onClick,
  className,
  disabled,
}: DropdownItemProps) => (
  <div className={`py-1 ${className}`}>
    <button
      onClick={onClick}
      className={`text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
      }`}
      role="menuitem"
      disabled={disabled}
    >
      {children}
    </button>
  </div>
);

const Dropdown = ({
  button,
  children,
  className,
  translateX,
  translateY,
  width,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getPositionStyle = () => {
    const styles: { [key: string]: string } = {};
    if (translateX !== undefined)
      styles.transform = `translateX(${translateX}px)`;
    if (translateY !== undefined)
      styles.transform = `translateY(${translateY}px)`;
    if (translateX !== undefined && translateY !== undefined)
      styles.transform = `translate(${translateX}px, ${translateY}px)`;
    return styles;
  };

  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      ref={dropdownRef}
    >
      <div>
        <span className="rounded-md" onClick={toggleDropdown}>
          {button}
        </span>
        <div
          className={`${
            isOpen
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible"
          } dropdown-menu transition-all duration-300 transform origin-top-right absolute w-${
            width ? width : "40"
          } mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-50 right-0`}
          style={getPositionStyle()}
          role="menu"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export { Dropdown, DropdownItem };
