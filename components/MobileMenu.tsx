import Link from "next/link";
import { navLinks } from "@/utils/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <div
      className={`lg:hidden fixed inset-0 z-40 bg-linear-to-b-gradient-to-b from-black/75 via-black/50 to-black/25 backdrop-blur-md transition-all duration-500 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
        {navLinks.map((link, index) => (
          <Link
            href={link.link}
            key={index}
            className='text-white font-clash text-2xl hover:opacity-70 transition-all drop-shadow-lg'
            onClick={onClose}
          >
            {link.title}
          </Link>
        ))}
        <div className="pt-8">
          <button
            className="font-clash text-black text-lg px-8 py-3 rounded-lg bg-white hover:bg-white/90 transition-all shadow-lg"
            onClick={onClose}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};
