import { NavLink, Link } from "react-router-dom";

export const Header = () => {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Todos List App Redux
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              {/* attributo activeClassName per poter gestire la classe e dire quale è active */}
              <NavLink activeClassName="active" className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/lists"
              >
                Lists
              </NavLink>
            </li>
            {/* commentato perchè i todo saranno elencati nelle liste apposite */}
            {/*  <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/todos"
              >
                Todos
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/register"
              >
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;
