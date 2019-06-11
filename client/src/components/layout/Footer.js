import React, { Component } from "react";
import { Link } from "react-router-dom";
class Footer extends Component {
  render() {
    return (
      <div className="footer-fixed">
        <footer className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="#"
              style={{
                fontFamily: "monsterrat"
              }}
              className="col s5 brand-logo center black-text"
            >
              INDIAN INSTITUTE OF INFORMATION TECHNOLOGY KOTA
            </Link>
          </div>
        </footer>
      </div>
    );
  }
}
export default Footer;