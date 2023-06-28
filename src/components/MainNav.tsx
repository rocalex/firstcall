import Link from "next/link";
import { useState } from "react";

export default function MainNav() {
  const [isActive, setActive] = useState(false);

  const handleClick = () => {
    setActive(!isActive);
  };

  return (
    <nav className="navbar is-primary">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" href="/">
            <strong>FirstCall</strong>
          </Link>
          <a
            role="button"
            className={`navbar-burger ${isActive ? "is-active" : ""}`}
            onClick={handleClick}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-start">
            <Link className="navbar-item" href={"/users"}>
              Users
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
