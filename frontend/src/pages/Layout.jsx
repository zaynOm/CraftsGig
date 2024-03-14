import { Link, NavLink, Outlet } from "react-router-dom";
import { CircleUserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

function Layout() {
  const { authenticated } = useAuth();
  return (
    <>
      <header>
        <nav className="flex items-center justify-between p-4">
          <Link to="/" className="text-2xl font-extrabold">
            CraftsMan
          </Link>
          {authenticated ? (
            <NavLink to="/profile" className="flex">
              <CircleUserRound size={40} strokeWidth={1.5} />
            </NavLink>
          ) : (
            <div className="flex gap-3">
              <NavLink to="/login">
                <Button>Login</Button>
              </NavLink>
              <NavLink to="/register">
                <Button variant="outline">Sign up</Button>
              </NavLink>
            </div>
          )}
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Layout;
