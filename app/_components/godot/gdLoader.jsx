import { useEffect, useRef, useState } from "react";
import "../Css/godot.css";

export default function GdLoader(props) {
  const canvasRef = useRef(null);
  const statusProgressRef = useRef(null);
  const statusProgressInnerRef = useRef(null);
  const statusIndeterminateRef = useRef(null);
  const statusNoticeRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const GODOT_CONFIG = props.gdConfig;

    const loadPck = async () => {
      return true;
    };

    const initGame = async (retryCount = 3) => {
      if (typeof window.Engine === "undefined") {
        console.error("Godot Engine is not loaded");
        return;
      }

      const engine = new window.Engine(GODOT_CONFIG);

      const INDETERMINATE_STATUS_STEP_MS = 100;
      const statusProgress = statusProgressRef.current;
      const statusIndeterminate = statusIndeterminateRef.current;
      const statusNotice = statusNoticeRef.current;

      let initializing = true;
      let statusMode = "hidden";

      let animationCallbacks = [];
      function animate(time) {
        animationCallbacks.forEach((callback) => callback(time));
        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);

      function animateStatusIndeterminate(ms) {
        const i = Math.floor((ms / INDETERMINATE_STATUS_STEP_MS) % 8);
        if (statusIndeterminate.children[i].style.borderTopColor === "") {
          Array.prototype.slice
            .call(statusIndeterminate.children)
            .forEach((child) => {
              child.style.borderTopColor = "";
            });
          statusIndeterminate.children[i].style.borderTopColor = "#dfdfdf";
        }
      }

      function setStatusMode(mode) {
        if (statusMode === mode || !initializing) {
          return;
        }
        [statusProgress, statusIndeterminate, statusNotice].forEach((elem) => {
          elem.style.display = "none";
        });
        animationCallbacks = animationCallbacks.filter(function (value) {
          return value !== animateStatusIndeterminate;
        });
        switch (mode) {
          case "progress":
            statusProgress.style.display = "block";
            break;
          case "indeterminate":
            statusIndeterminate.style.display = "block";
            animationCallbacks.push(animateStatusIndeterminate);
            break;
          case "notice":
            statusNotice.style.display = "block";
            break;
          case "hidden":
            break;
          default:
            throw new Error("Invalid status mode");
        }
        statusMode = mode;
      }

      function setStatusNotice(text) {
        while (statusNotice.lastChild) {
          statusNotice.removeChild(statusNotice.lastChild);
        }
        const lines = text.split("\n");
        lines.forEach((line) => {
          statusNotice.appendChild(document.createTextNode(line));
          statusNotice.appendChild(document.createElement("br"));
        });
      }

      function displayFailureNotice(err) {
        const msg = err.message || err;
        console.error(msg);
        setStatusNotice(msg);
        setStatusMode("notice");
        initializing = false;
        setError(msg); // Show error overlay
      }

      setStatusMode("indeterminate");
      engine
        .startGame({
          onProgress: function (current, total) {
            if (total > 0) {
              setProgress((current / total) * 100);
              setStatusMode("progress");
              if (current === total) {
                setTimeout(() => {
                  setStatusMode("indeterminate");
                }, 500);
              }
            } else {
              setStatusMode("indeterminate");
            }
          },
          onPrintError: function (err) {
            console.error(err);
          },
        })
        .then(
          () => {
            setTimeout(() => {
              setProgress(75);
              setTimeout(() => {
                setProgress(100);
                setTimeout(() => {
                  setStatusMode("hidden");
                  initializing = false;
                  setLoading(false); // hide loading overlay when complete
                }, 1000); // 1 second delay for final animation
              }, 3000); // 3 second delay to persist loading
            }, 1000); // 1 second delay before starting the 25% animation
          },
          (err) => {
            console.error("Game start failed:", err);
            if (retryCount > 0) {
              console.log(
                `Retrying to start game... (${3 - retryCount + 1}/3)`
              );
              setTimeout(() => initGame(retryCount - 1), 1000);
            } else {
              displayFailureNotice(err);
            }
          }
        );
    };

    if (document.readyState === "complete") {
      loadPck().then((success) => {
        if (success) {
          initGame();
        } else {
          console.error("Failed to load .pck file after multiple attempts.");
        }
      });
    } else {
      window.addEventListener("load", () => {
        loadPck().then((success) => {
          if (success) {
            initGame();
          } else {
            console.error("Failed to load .pck file after multiple attempts.");
          }
        });
      });
    }
  }, []);

  return (
    <div
      className="godot-container"
      style={{ width: "100vw", height: "100vh", position: "relative" }}
    >
      <canvas ref={canvasRef} id="canvas" style={{ display: "block" }}>
        HTML5 canvas appears to be unsupported in the current browser.
        <br />
        Please try updating or use a different browser.
      </canvas>
      <div id="status-container">
        <div
          ref={statusProgressRef}
          id="status-progress"
          style={{ display: "none" }}
        >
          <div
            ref={statusProgressInnerRef}
            id="status-progress-inner"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div
          ref={statusIndeterminateRef}
          id="status-indeterminate"
          style={{ display: "none" }}
        >
          <div className="indeterminate-progress-box">
            <div className="indeterminate-progress-div"></div>
          </div>
        </div>
        <div
          ref={statusNoticeRef}
          id="status-notice"
          className="godot"
          style={{ display: "none" }}
        ></div>
      </div>
      {loading && !error && (
        <div className="loading-overlay flex items-center justify-center flex-col text-left">
          <div className="loading-message">
            <div className="progress-bar-container ml-5">
              <div
                className="progress-bar "
                style={{ width: `${progress}%`}}
              ></div>
            </div>
            <div className="loading-text">Loading...</div>
            Usually takes 2 mins, depends on internet speed
          </div>
        </div>
      )}
      {error && (
        <div className="error-overlay">
          <div className="error-title">ERROR</div>
          <div className="error-message">{error}</div>
          <div className="error-message">
            Please Send A Screenshot to one of moderators 😔
          </div>
        </div>
      )}
    </div>
  );
}
