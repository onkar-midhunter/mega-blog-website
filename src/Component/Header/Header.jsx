import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const actualUserData = userData?.userData || userData;
  const userName = actualUserData?.name;

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-blue-100">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Left side: Logo + Username */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <Logo width="60px" />
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                MegaBlog
              </div>
            </Link>
            {userData && (
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200">
                <span className="text-2xl">👋</span>
                <span className="text-slate-700 font-medium">
                  Hi, <span className="text-blue-600 font-semibold">{userName}</span>
                </span>
              </div>
            )}
          </div>

          {/* Right side: Navigation */}
          <ul className="flex items-center gap-1">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="px-5 py-2.5 text-slate-700 font-medium rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;