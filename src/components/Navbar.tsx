import { Menu, Bell, User, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ user, onLogout }: { user: { name: string } | null, onLogout: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold">TaskMaster</span>
          </div>
          
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              <Bell className="h-5 w-5 cursor-pointer hover:text-indigo-200" />
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-1 hover:text-indigo-200"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          )}

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && user && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-3">
            <button className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </button>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{user.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}