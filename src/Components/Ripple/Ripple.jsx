import React from "react";
import './Ripple.css'
const MAIN_CIRCLE_SIZE = 210;
const MAIN_CIRCLE_OPACITY = 0.24;
const NUM_CIRCLES = 8;

const Ripple = () => {
  return (
    <div style={{ position: "absolute", left: "50%", top: "50%", height: "100%", width: "100%", overflow: "visible" }}>
      {Array.from({ length: NUM_CIRCLES }, (_, i) => (
        <div
          key={i}
          className="ripple-circle"
          style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            width: MAIN_CIRCLE_SIZE + i * 70,
            height: MAIN_CIRCLE_SIZE + i * 70,
            borderRadius: "50%",
            background: `linear-gradient(120deg, #6FB3B8, #09238d, #6FB3B8)`,
            opacity: MAIN_CIRCLE_OPACITY - i * 0.03,
            animation: `ripple 3400ms ease infinite`,
            animationDelay: `${i * 0.06}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Ripple;
