import { Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-288px)] h-16 flex items-center z-30 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-4 md:px-6 justify-between shadow-sm">
      
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 hover:bg-gray-100/80 rounded-xl transition-colors duration-200"
        aria-label="Open menu"
      >
        <Menu size={20} className="text-gray-600" />
      </button>

      {/* Search Section */}
      <div className="hidden md:flex relative flex-1 max-w-xl">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search courses, notes & quizzes..."
            className="w-full bg-white/60 backdrop-blur-sm border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all duration-200"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {/* Mobile Search Button */}
      <button className="md:hidden p-2 hover:bg-gray-100/80 rounded-xl transition-colors duration-200">
        <Search size={18} className="text-gray-600" />
      </button>

      {/* User Section */}
      <div className="flex items-center">
        <div className="p-1 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
          <div className="bg-white rounded-lg p-0.5">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;