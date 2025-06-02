import Image from "next/image";
import { BookOpen, Users, X, Trophy, Star, ChevronRight, Briefcase } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

interface SidebarProps {
  setActiveButton: (name: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ setActiveButton, isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay with blur effect */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed top-0 left-0 h-screen bg-gradient-to-br from-white via-gray-50/90 to-slate-50/80 
        backdrop-blur-xl border-r-2 border-gray-200/50 p-6
        flex flex-col z-50 w-72 transition-all duration-300 ease-in-out shadow-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-500/5 before:to-purple-500/5 before:rounded-r-3xl before:pointer-events-none
      `}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <Image 
                src="/logo.jpg" 
                alt="Logo" 
                width={120} 
                height={60}
                className="relative z-10  group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-gray-100/80 rounded-xl transition-colors duration-200 group"
            aria-label="Close sidebar"
          >
            <X size={20} className="text-gray-500 group-hover:text-gray-700 transition-colors" />
          </button>
        </div>

        {/* User Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl p-4 mb-6 border border-indigo-200/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Welcome back!</p>
              <p className="text-xs text-gray-600">Ready to learn today?</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-3 overflow-y-auto">
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
              Learning Hub
            </p>
          </div>
          
          <NavItem
            icon={<BookOpen size={20} />}
            label="Courses"
            description="Browse all courses"
            gradient="from-blue-500 to-indigo-500"
            setActiveButton={setActiveButton}
            onClose={onClose}
          />
          <NavItem
            icon={<Trophy size={20} />}
            label="Competitive Exam"
            description="GATE, CAT & more"
            gradient="from-emerald-500 to-teal-500"
            setActiveButton={setActiveButton}
            onClose={onClose}
          />
          <NavItem
            icon={<Users size={20} />}
            label="My Activity"
            description="Track your progress"
            gradient="from-purple-500 to-pink-500"
            setActiveButton={setActiveButton}
            onClose={onClose}
          />
          <NavItem
            icon={<Briefcase size={20} />}
            label="Career Corner"
            description="Personal Meeting"
            gradient="from-blue-500 to-indigo-500"
            setActiveButton={setActiveButton}
            onClose={onClose}
          />

        </nav>

        {/* User Profile Section - Left Aligned */}
        <div className="mt-6 pt-4 border-t border-gray-200/50">
          <button className="group flex items-center space-x-3 p-3 w-full text-left rounded-2xl hover:bg-white/60 transition-all duration-200 hover:shadow-md">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 rounded-full shadow-md border-2 border-white/50 group-hover:scale-105 transition-transform duration-200"
                }
              }}
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">Your Profile</p>
              <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">Account settings</p>
            </div>
            <ChevronRight 
              size={14} 
              className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300 opacity-0 group-hover:opacity-100" 
            />
          </button>
        </div>
      </aside>
    </>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  gradient: string;
  setActiveButton: (name: string) => void;
  onClose: () => void;
}

const NavItem = ({ icon, label, description, gradient, setActiveButton, onClose }: NavItemProps) => (
  <button
    className="group flex items-center justify-between w-full p-4 text-left rounded-2xl transition-all duration-300 hover:bg-white/60 hover:shadow-lg hover:border-gray-200/50 border border-transparent backdrop-blur-sm hover:-translate-y-0.5"
    onClick={() => {
      setActiveButton(label);
      onClose();
    }}
  >
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg group-hover:shadow-xl transition-shadow duration-300 group-hover:scale-110 transform`}>
        <div className="text-white">
          {icon}
        </div>
      </div>
      <div>
        <span className="font-semibold text-gray-800 text-sm group-hover:text-gray-900 transition-colors">
          {label}
        </span>
        <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
          {description}
        </p>
      </div>
    </div>
    <ChevronRight 
      size={16} 
      className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" 
    />
  </button>
);

export default Sidebar;