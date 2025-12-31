interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const HamburgerButton = ({ isOpen, onClick }: HamburgerButtonProps) => {
  return (
    <button
      className={`lg:hidden flex flex-col justify-center items-center w-10 h-10 transition-all duration-300 z-50 relative ${isOpen ? 'rotate-90' : 'rotate-0 hover:opacity-70'
        }`}
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <div className="flex flex-col items-center space-y-2">
        <span
          className={`h-px bg-white transition-all duration-500 ease-in-out ${isOpen ? 'w-5 rotate-45 translate-y-2.25' : 'w-4 rotate-0 translate-y-0'
            }`}
        ></span>
        <span
          className={`h-px bg-white transition-all duration-300 ${isOpen ? 'w-7 opacity-0 scale-0' : 'w-7 opacity-100 scale-100'
            }`}
        ></span>
        <span
          className={`h-px bg-white transition-all duration-500 ease-in-out ${isOpen ? 'w-5 -rotate-45 -translate-y-2.25' : 'w-4 rotate-0 translate-y-0'
            }`}
        ></span>
      </div>
    </button>
  );
};
