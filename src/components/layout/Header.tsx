import { Button } from "@/components/ui/button";
import { Bell, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="w-full flex items-center border-b border-slate-200 px-6 h-16 bg-white shrink-0">
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative hover:bg-blue-50 text-slate-500 hover:text-blue-600">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-blue-600 rounded-full" />
        </Button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-medium shadow-md">
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-slate-700">{user?.email?.split('@')[0] || 'User'}</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="hover:bg-red-50 text-slate-500 hover:text-red-600"
          title="Log out"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
