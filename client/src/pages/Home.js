import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="d-flex justify-content-center flex-column">
    <h1>Buffering VS Streaming</h1>
    <div className="d-flex flex-column">
      <h3 className="p-1">
        <Link to="/example2">
          {" "}
          Basic Buffering:
          <br />
          <span className="small">Simple audio element with scrubbing</span>
        </Link>
      </h3>
      <h3 className="p-1">
        <Link to="/example4">
          {" "}
          Advanced Buffering:
          <br />
          <span className="small"> Scrubbing with audio visualization </span>
        </Link>
      </h3>
      <h3 className="p-1">
        <Link to="/example5">
          {" "}
          Streamed:
          <br />
          <span className="small">
            Streaming playback with audio visualization
          </span>
        </Link>
      </h3>
    </div>
  </div>
);

export { Home };
