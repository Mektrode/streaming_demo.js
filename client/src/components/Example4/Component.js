import React from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import "./styles.css";

export const Example4Container = ({
  playState,
  progress,
  volumeLevel,
  loading,
  onPlayBtnClick,
  onVolumeChange,
  onStopBtnClick,
  onProgressClick
}) => (
  <div>
    <h4>
      Advanced Buffering:{" "}
      <small className="text-muted">With sound visualization</small>
    </h4>

    <div className="bars-wrapper">
      <canvas className="frequency-bars" width="1024" height="100" />
      <canvas className="sinewave" width="1024" height="100" />
    </div>

    <div className="player mt-4">
      <div className="progress player-progress mb-2" onClick={onProgressClick}>
        <div
          className="progress-bar bg-warning"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuemax="100"
          onClick={e => console.log(e)}
        />
      </div>
      <div className="player-controls mt-2">
        <div>{loading && <i className="fas fa-spinner fa-spin" />}</div>

        <button
          type="button"
          className="btn btn-warning"
          onClick={playState === "play" ? onPlayBtnClick : onStopBtnClick}
          disabled={loading}
        >
          <i className={`fas fa-${playState}`} />
        </button>

        <div className="player-volume-control">
          <i
            onClick={() => onVolumeChange({ max: 0 })}
            className="fas fa-volume-down"
          />
          <div className="range-select">
            <InputRange
              maxValue={100}
              minValue={0}
              value={{ min: 0, max: volumeLevel }}
              onChange={onVolumeChange}
            />
          </div>
          <i
            onClick={() => onVolumeChange({ max: 100 })}
            className="fas fa-volume-up"
          />
        </div>
      </div>
    </div>
  </div>
);
