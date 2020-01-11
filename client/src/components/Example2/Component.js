import React from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import "./styles.css";

export const Example2Container = ({
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
      Simple Buffering:{" "}
      <small className="text-muted">Audio with scrubbing</small>
    </h4>
    <div className="player mt-4">
      <div className="progress player-progress mb-2" onClick={onProgressClick}>
        <div
          className="progress-bar"
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

        <div className="player-volume-control ">
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
