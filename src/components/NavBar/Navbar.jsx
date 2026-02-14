import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">👥</span>
        <div>
          <h3>CampusCare</h3>
          <p>NU Dasmariñas</p>
        </div>
      </div>

      <div className="nav-links">
        <a href="#">Sign In</a>
        <button className="primary-btn">Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;
