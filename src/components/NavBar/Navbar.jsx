import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <div className="logo-icon"></div>
        <div className="logo-text">
          <h3>CampusCare</h3>
          <p>NU Dasmariñas</p>
        </div>
      </div>

      <div className="nav-links">
        <button className="sign-in-btn">Sign In</button>
        <button className="get-started-btn">Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;