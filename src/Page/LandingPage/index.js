import React from "react";
import { Link } from "react-router-dom";
import Particles from "react-particles-js";

export default class LandingPage extends React.Component {
  render() {
    return (
      <section>
        <div className="splash">
          <Particles
            width="100%"
            height="100%"
            style={{ width: "100%", height: "100%", position: "fixed" }}
            params={{
              particles: {
                number: {
                  value: 80
                },
                color: { value: "#3CA9D1" },
                size: {
                  value: 3
                }
              }
            }}
          />
          <h1
            style={{
              textAlign: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate( -50%, -50% )"
            }}
          >
            Super Simple code snippet library
          </h1>
          <p
            style={{
              textAlign: "center",
              position: "absolute",
              top: "57%",
              left: "50%",
              zIndex: 99999,
              transform: "translate( -50%, -50% )"
            }}
          >
            <Link to="/signin">Login</Link> to manage your snippets, or <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </section>
    );
  }
}
