import Link from "next/link";

export default function MainNav() {
  return (
    <nav className="navbar is-primary">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" href="/">
            <strong>FirstCall</strong>
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" href={"/users"}>Users</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
