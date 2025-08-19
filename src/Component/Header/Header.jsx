import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData?.userData);
  const navigate = useNavigate();
  console.log(userData);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Left side: Logo + Username if logged in */}
          <div className="flex items-center gap-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
            {userData && (
              <span className="text-white font-semibold">
                👋 Hi, {userData.name}
              </span>
            )}
          </div>

          {/* Right side: Navigation */}
          <ul className="flex items-center gap-2">
            {navItems.map((items) =>
              items.active ? (
                <li key={items.name}>
                  <button
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    onClick={() => navigate(items.slug)}
                  >
                    {items.name}
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
