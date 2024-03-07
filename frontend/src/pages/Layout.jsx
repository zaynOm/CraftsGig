import { Link, NavLink, Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

function Layout() {
  const { authenticated } = useAuth();
  return (
    <main>
      <header>
        <nav className="flex items-center p-4">
          <Link to="/" className="text-2xl font-extrabold">
            CraftsMan
          </Link>
          {authenticated ? (
            "logedin"
          ) : (
            <div className="ml-auto flex gap-3">
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
    </main>
  );
}

export default Layout;
