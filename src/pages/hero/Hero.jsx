import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero container">
      <div className="hero-text">
        <h1>Promoting Integrity and Transparency</h1>
        <button className="btn">
          <Link to="/register" className="nav__link-button">
            Go to E-SDARS <i className="bx bx-log-in"></i>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Hero;
