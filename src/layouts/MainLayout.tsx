import { Outlet, NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { type RootState, type AppDispatch } from "@/store";
import {
  LayoutDashboard,
  Home,
  Users,
  UserCog,
  LogOut,
  Building2,
} from "lucide-react";

export default function MainLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Houses", path: "/houses", icon: Building2 },
    { name: "Residents", path: "/residents", icon: Home },
    { name: "Visitors", path: "/visitors", icon: Users },
    { name: "Users", path: "/users", icon: UserCog },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col h-screen overflow-hidden">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-100 border-b border-base-200 px-4">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-bold text-xl">DC2 Gatepass</div>
          <div className="flex-none hidden lg:block">
            <span className="text-sm mr-4">Welcome, {user?.name || "Admin"}</span>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-ghost text-error"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </nav>
        
        {/* Page content here */}
        <div className="p-6 overflow-y-auto flex-1 bg-base-200">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-80 min-h-full bg-base-100 text-base-content border-r border-base-200">
            <div className="mb-6 px-4">
                 <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
            </div>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "active font-semibold" : ""
                  }
                  end={item.path === "/"}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              </li>
            ))}
             <li className="mt-auto lg:hidden">
                <button onClick={handleLogout} className="text-error">
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
