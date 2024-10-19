import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import "./FunTarget.css"; // Assuming you have a separate CSS file for styles
import icon10 from "./icons/icon10.png";
import icon20 from "./icons/icon20.png";
import icon30 from "./icons/icon30.png";
import icon40 from "./icons/icon40.png";
import icon50 from "./icons/icon50.png";
import icon60 from "./icons/icon60.png";
import icon70 from "./icons/icon70.png";
import icon80 from "./icons/icon80.png";
import icon90 from "./icons/icon90.png";
import icon100 from "./icons/icon100.png";

const Wheel = ({ triggerSpin, onSpinComplete }) => {
  const wheelRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [highlightedNumber, setHighlightedNumber] = useState(null);

  // Numbers on the wheel
  const numbers = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  const spinWheel = () => {
    if (spinning) return; // Prevent multiple spins at once

    setSpinning(true);

    // Always stop at index of number 9 (which is index 8)
    const randomIndex = Math.floor(Math.random() * numbers.length);
    console.log("RandomIndex=" + randomIndex);

    const degreesPerSegment = 360 / numbers.length; // Degrees per segment
    const totalRotation = 3600 + randomIndex * degreesPerSegment; // Total rotation for 10 spins plus the stopIndex
    // const highlightDegrees = randomIndex * degreesPerSegment; // Degrees to stop at

    // Rotate the wheel
    wheelRef.current.style.transition = "transform 5s ease-in-out";
    wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;
    const highlightDegrees = randomIndex * degreesPerSegment;

    let winnerNumber = numbers[randomIndex];
    if (winnerNumber === 1) {
      winnerNumber = 9;
    } else if (winnerNumber === 2) {
      winnerNumber = 8;
    } else if (winnerNumber === 3) {
      winnerNumber = 7;
    } else if (winnerNumber === 4) {
      winnerNumber = 6;
    } else if (winnerNumber === 5) {
      winnerNumber = 5; // This case is redundant since winnerNumber is already 5
    } else if (winnerNumber === 6) {
      winnerNumber = 4;
    } else if (winnerNumber === 7) {
      winnerNumber = 3;
    } else if (winnerNumber === 8) {
      winnerNumber = 2;
    } else if (winnerNumber === 9) {
      winnerNumber = 1;
    } else if (winnerNumber === 10) {
      return; // This handles the case when winnerNumber is 10
    }

    // Stop the wheel after 5 seconds
    setTimeout(() => {
      setSpinning(false);
      setHighlightedNumber(winnerNumber);

      onSpinComplete({
        stopIndex: randomIndex,
        winnerNumber: winnerNumber,
        highlightedNumber: winnerNumber,
      });

      // console.log("stopIndex =", winnerNumber);
      // console.log("winnerNumber =", winnerNumber);
      // console.log("highlightedNumber =", winnerNumber);

      wheelRef.current.style.transition = "none"; // Remove transition for the next spin
      wheelRef.current.style.transform = `rotate(${highlightDegrees}deg)`; // Stop at highlighted number (90 degrees)
    }, 5000); // Duration of spin
  };

  // Use the triggerSpin prop to spin the wheel externally
  useEffect(() => {
    if (triggerSpin) {
      spinWheel(); // Call spinWheel when triggerSpin is true
    }
  }, [triggerSpin]);

  const iconImages = [
    icon10,
    icon20,
    icon30,
    icon40,
    icon50,
    icon60,
    icon70,
    icon80,
    icon90,
    icon100,
  ];

  return (
    <div className="container">
      {/* Add the image above the wheel */}
      <div className="wheel-image-container">
        <img
          src="game card/Group05.png"
          alt="Wheel Image"
          className="wheel-image"
        />
      </div>
      <div className="wheel" ref={wheelRef}>
        {numbers.map((number, index) => (
          <div
            key={index}
            className={`number ${
              highlightedNumber === number ? "highlight" : ""
            }`}
            style={{
              "--i": index + 1,
              "--clr": `hsl(${(index / numbers.length) * 360}, 70%, 50%)`,
            }}
          >
            <img src={iconImages[index]} alt={`Icon for ${number}`} />
            <span>{number}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// PropTypes validation for the props
Wheel.propTypes = {
  triggerSpin: PropTypes.bool.isRequired,
  onSpinComplete: PropTypes.func.isRequired,
};

export default Wheel;
