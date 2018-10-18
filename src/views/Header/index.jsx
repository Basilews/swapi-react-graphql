import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <div>
    <div>
      <Link to="/">Search</Link>
    </div>
    <div>
      <Link to="/history/">History</Link>
    </div>
  </div>
);

export default Header;
