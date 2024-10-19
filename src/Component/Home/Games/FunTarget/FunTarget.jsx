import "./FunTarget.css";
import { useState, useEffect } from "react";
import { Box, Text, Button, Input } from "@chakra-ui/react"; // Ensure Input is imported
import Wheel from "./Wheel";
import { io } from "socket.io-client";

const userId = localStorage.getItem("userId");
const socket = io("https://maha-lakshmi-node-js.onrender.com", {
  query: {
    userID: userId,
  },
  transports: ["websocket"],
});

const SpinnerWheel = () => {
  const [isSpin, setIsSpin] = useState(false);
  const [winningNumber, setWinningNumber] = useState(null);
  const [highlightedNumber, setHighlightedNumber] = useState(null);
  const [countdown, setCountdown] = useState(null); // Use null as initial state
  const [winnerHistory, setWinnerHistory] = useState([]);
  const [triggerSpin, setTriggerSpin] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [gameMatchId, setGameMatchId] = useState(null);

  // State to store the selected bet amount and the number
  const [selectedBet, setSelectedBet] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [inputValue, setInputValue] = useState(""); // For showing bet in input box

  useEffect(() => {
    const userID = localStorage.getItem("userId");
    if (userID) {
      socket.io.opts.query.userID = userID;
      socket.disconnect();
      socket.connect();
    }

    // Handle socket connection status
    socket.on("connect", () => {
      setIsSocketConnected(true);
    });

    socket.on("disconnect", () => {
      setIsSocketConnected(false);
      setCountdown(null); // Reset countdown when disconnected
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  // Function to handle spin
  const startSpin = () => {
    if (isSpin) return; // Prevent multiple spins
    setTriggerSpin(true); // Trigger the wheel spin
    setIsSpin(true);
  };

  // Handle spin completion to resume the timer
  const handleSpinComplete = ({
    stopIndex,
    winnerNumber,
    highlightedNumber,
  }) => {
    setWinningNumber({ number: winnerNumber });
    setWinnerHistory((prev) =>
      [{ number: winnerNumber }, ...prev].slice(0, 10)
    );

    setHighlightedNumber(highlightedNumber); // Store highlighted number if needed
    setIsSpin(false); // Wheel has stopped spinning
    setTriggerSpin(false);

    // Resume the countdown updates from the backend after spin completion
    setCountdown(null); // Reset or wait for backend to provide new countdown value
    if (selectedNumber === winnerNumber) {
      alert("congratulations You Win!");
    } else {
      alert("You Loose, Try again!!");
      setSelectedNumber(null);
      setSelectedBet(null);
    }
  };

  // useEffect to handle game updates from backend (including countdown)
  useEffect(() => {
    const handleGameUpdate = (updatedGameState) => {
      const backendCountdown = updatedGameState.gamestate.value; // Get countdown from backend
      const matchId = updatedGameState.gamestate.matchId; // Get match ID from backend
      const spinState = updatedGameState.ispinstate.value; // Get spin state from backend

      if (matchId !== null) {
        setGameMatchId(matchId);
      }
      // updatedGameState.gamestate.value - 6 === 20 ?

      console.log(matchId);
      console.log("updated Game State: ", updatedGameState);

      // If the wheel is not spinning, update the countdown from backend
      if (!isSpin) {
        setCountdown(backendCountdown);
      }

      // If countdown reaches 0 and it's not already spinning, start the spin
      if (backendCountdown === 0 && !spinState) {
        startSpin();
      }
    };

    const handleUserDetails = (data) => {
      console.log("handleUserDetails", data);
      const userData = data?.user || {}; // Use an empty object as fallback
      setUser(userData);

      if (userData.coins !== undefined) {
        setCoins(userData.coins);
        console.log("Coins:", userData.coins);
      } else {
        console.warn("Coins property is not available");
      }
    };

    const handlebet = (data) => {
      console.log("newbet", data);
      setUser(data);
    };

    


    // Handle the 'game_result' event and update the state
    const handleWinner = (data) => {
      console.log("Game Result:", data);
      console.log("winnerNumber", data.number);
      // setLowestBet(data.amount); // Assuming setLowestBet updates the lowest bet state
    };

    handleUserDetails();

    socket.on("gameUpdate", handleGameUpdate);
    socket.on("userDetails", handleUserDetails);
    socket.on("game_result", handleWinner);
    socket.on("bet", handlebet);

    return () => {
      socket.off("gameUpdate", handleGameUpdate); // Clean up listener
      socket.off("userDetails", handleUserDetails);
      socket.on("game_result", handleWinner);

      socket.off("bet", handlebet);
    };
  }, [isSpin]);

  // Timer countdown logic from backend (pause during spin)
  useEffect(() => {
    let timer;

    // Only decrement countdown if it's not spinning
    if (countdown !== null && countdown > 0 && isSocketConnected && !isSpin) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    }

    // Start the spin when countdown hits 0 and it's not spinning
    if (countdown === 0 && !isSpin) {
      startSpin();
    }

    return () => clearTimeout(timer); // Clear timer on component unmount
  }, [countdown, isSpin, isSocketConnected]);

  // Handle selecting the bet amount
  const handleBetSelection = (amount) => {
    setSelectedBet(amount);
    alert("You have selected a bet amount of " + amount);
  };

  // Handle placing the bet on a number
  const handlePlaceBet = (num) => {
    if (selectedBet === 0) {
      alert("Please select a bet amount before placing a bet.");
      return;
    }
    setSelectedNumber(num);
    setInputValue(`Bet Amount: ${selectedBet} on Number: ${num}`);
    console.log("Bet placed on number:", num, "with amount:", selectedBet);

    // const matchId = countdown !== null ? {gameMatchId} : null; // Replace with actual matchId logic
    console.log("gameMatchId line 180: ", gameMatchId);
    const betData = {
      userId, // Current user's ID
      matchId: gameMatchId, // Match ID from backend state
      betType: num, // The number selected for betting
      betAmount: selectedBet, // Selected bet amount
    };

    // Emit the bet data to the backend using socket
    socket.emit("bet", betData);

    console.log("Bet placed:", betData);

    // Update UI with bet details
    setSelectedNumber(num);
    setInputValue(`Bet Amount: ${selectedBet} on Number: ${num}`);
  };

  return (
    <Box
      className="relative flex flex-col mt-11 items-center h-[450px] w-3/5 justify-center min-h-screen text-white"
      position="relative"
    >
      {/* Game Title - "Fun Target" */}
      <Box
        position="absolute"
        top="-2.7rem"
        left="1rem"
        width="100%"
        textAlign="start"
        fontSize="3xl"
        fontWeight="bold"
        color="white"
        zIndex={2} // Make sure it's above the background
      >
        Fun Target
      </Box>

      {/* Background Image with Reduced Opacity */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundImage="url('/game card/bg.jpg')"
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        opacity={0.4} // Adjust opacity here
        zIndex={0} // Keep the background behind the other content
      />

      {/* Content (Spinner, Countdown, etc.) */}
      <Box position="relative" zIndex={1} className="mt-[-150px]">
        <Box
          display="flex"
          justifyContent="space-between" // Space between left and right columns
          position="relative"
          width="100%"
          padding="0px"
          gap="40px" // Horizontal gap between left and right columns
        >
          {/* Left Column: Score and Time */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width="50%" // Ensure left and right columns have equal width
            marginLeft="-4rem"
            marginTop={20}
          >
            {/* Score Heading */}
            <Text
              fontWeight="bold"
              fontSize="24px"
              color="white"
              marginBottom="5px"
              textAlign="center"
              textShadow="1px 1px 2px black"
            >
              Score
            </Text>

            {/* Score Box */}
            <Box
              fontWeight="bold"
              border="3px solid gold"
              borderRadius="5px"
              padding="10px"
              width="100%"
              height="5%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="20px"
              background="#e1c16e"
              color="black"
              boxShadow="0px 0px 15px 5px gold"
            >
              {coins}
            </Box>

            {/* Time Heading */}
            <Text
              fontWeight="bold"
              fontSize="24px"
              color="white"
              marginTop="15px"
              marginBottom="5px"
              textAlign="center"
              textShadow="1px 1px 2px black"
            >
              Time
            </Text>

            {/* Time Box */}
            <Box
              fontWeight="bold"
              border="3px solid gold"
              borderRadius="5px"
              padding="10px"
              width="100%"
              height="5%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="20px"
              background="#e1c16e"
              color="black"
              boxShadow="0px 0px 15px 5px gold"
            >
              {countdown}
            </Box>
          </Box>

          {/* Right Column: Last 10 Results and Winner */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width="50%"
            marginLeft="4rem"
            marginRight="-4rem"
            marginTop={20}
          >
            {/* Last 10 Results Heading */}
            <Text
              fontWeight="bold"
              fontSize="24px"
              color="white"
              marginBottom="5px"
              textAlign="center"
              textShadow="1px 1px 2px black"
            >
              Last 10 Results
            </Text>

            {/* Last 10 Results Box */}
            <Box
              fontWeight="bold"
              border="3px solid gold"
              borderRadius="5px"
              padding="10px"
              width="100%"
              height="5%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="20px"
              background="#e1c16e"
              color="black"
              boxShadow="0px 0px 15px 5px gold"
            >
              {winnerHistory.map((winner, index) => (
                <span key={index}>{winner.number} </span>
              ))}
            </Box>

            {/* Winner Heading */}
            <Text
              fontWeight="bold"
              fontSize="24px"
              color="white"
              marginTop="15px"
              marginBottom="5px"
              textAlign="center"
              textShadow="1px 1px 2px black"
            >
              Winner
            </Text>

            {/* Winner Box */}
            <Box
              fontWeight="bold"
              border="3px solid gold"
              borderRadius="5px"
              padding="10px"
              width="100%"
              height="5%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="20px"
              background="#e1c16e"
              color="black"
              boxShadow="0px 0px 15px 5px gold"
            >
              {winningNumber ? `${winningNumber.number}` : "Waiting..."}
            </Box>
          </Box>
        </Box>

        {/* Arrow Image */}
        <Box
          position="absolute"
          top="250px"
          left="50%"
          transform="translateX(-50%)"
          zIndex={3}
        >
          <img
            src="/game card/arrow.png"
            alt="Arrow"
            width="70px"
            height="70px"
          />
        </Box>

        {/* Spinner Container */}
        <Wheel triggerSpin={triggerSpin} onSpinComplete={handleSpinComplete} />
      </Box>

      {/* display buttons from 1-10      */}

      <Box>
        {/* Left Rectangle with 4 buttons */}
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          width="200px"
          height="50px"
          position="absolute"
          left="1px"
          top="220px"
          borderRadius="0 30px 30px 0"
          background="#FA972A"
          border="5px solid #D3BD4D"
        >
          {[1, 5, 10, 50].map((amount) => (
            <Button
              key={amount}
              width="72px"
              height="19px"
              border="2px solid #FFEB88"
              background={selectedBet === amount ? "#FFD700" : "#08A105"}
              color="white"
              fontWeight="bold"
              cursor="pointer"
              borderRadius="50%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={() => handleBetSelection(amount)}
            >
              {amount}
            </Button>
          ))}
        </Box>

        {/* Right Rectangle with 4 buttons */}
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          width="200px"
          height="50px"
          position="absolute"
          right="0px"
          top="220px"
          borderRadius="30px 0 0 30px"
          background="#FA972A"
          border="5px solid #D3BD4D"
        >
          {[100, 800, 1000, 2000].map((amount) => (
            <Button
              key={amount}
              width="72px"
              height="19px"
              border="2px solid #FFEB88"
              background={selectedBet === amount ? "#FFD700" : "#08A105"}
              color="white"
              fontWeight="bold"
              cursor="pointer"
              borderRadius="50%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={() => handleBetSelection(amount)}
            >
              {amount}
            </Button>
          ))}
        </Box>

        {/* Input Box showing the selected bet and number */}
        <Box>
          <Input
            placeholder="Your Bet"
            value={inputValue}
            isReadOnly
            width="500px"
            marginBottom="20px"
            textAlign="center"
            fontSize="18px"
            fontWeight="bold"
            marginLeft="45px"
            marginTop="20px"
          />
        </Box>

        {/* Number Selection (1-10) with value boxes above */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          marginTop="20px"
          flexWrap="wrap"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <Box key={num} textAlign="center" margin="2px">
              {/* Number Button itself */}
              <Button
                key={num}
                width="45px"
                height="45px"
                margin="5px"
                border="2px solid #FFEB88"
                background={selectedNumber === num ? "#FFD700" : "#C51814"}
                color="white"
                fontWeight="bold"
                borderRadius="50%"
                onClick={() => handlePlaceBet(num)}
              >
                {num}
              </Button>
            </Box>
          ))}
        </Box>
      </Box>

      {/* User Name Display */}
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="left"
        width="25%"
        height="30px"
        color="black"
        position="absolute"
        paddingBottom={7}
        left="10px"
        top="300px"
        borderRadius="30px"
        background="linear-gradient(90deg, #F98C04 0%, #FFC781 100%)"
        border="5px solid #D3BD4D"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        mahendra1996
      </Box>
    </Box>
  );
};

export default SpinnerWheel;
