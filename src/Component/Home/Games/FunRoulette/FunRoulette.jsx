import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  Text,
  Flex,
  Input,
  Grid,
} from "@chakra-ui/react";
import rouletteImage from "./Assest/roulette_2.png"; // Image for the spinner
import rouletteOuterImage from "./Assest/roulette_1.jpg"; // Image outside the spinner
import rouletteInnerImage from "./Assest/roulette_3.png"; // New image to add inside
import "./Funroutlet.css"; // Ensure your CSS is properly set up

import { io } from "socket.io-client";

const userId = localStorage.getItem("userId");
const socket = io("http://localhost:8000/", {
  query: {
    userID: userId,
  },
  transports: ["websocket"],
});

const coins = [
  { value: 1, color: "green.500", imageSrc: "/Coins/1's coin.webp" },
  { value: 5, color: "purple.500", imageSrc: "/Coins/5's coin.webp" },
  { value: 10, color: "red.500", imageSrc: "/Coins/10's coin.webp" },
  { value: 50, color: "yellow.500", imageSrc: "/Coins/50's coin.webp" },
  { value: 100, color: "aqua.500", imageSrc: "/Coins/100's coin.webp" },
  { value: 500, color: "pink.500", imageSrc: "/Coins/500's coin.webp" },
  { value: 1000, color: "orange.500", imageSrc: "/Coins/1000's coin.webp" },
  { value: 5000, color: "purple.500", imageSrc: "/Coins/5000's coin.webp" },
];

const numbers = [
  ["3", "6", "9", "12", "15", "18", "21", "24", "27", "30", "33", "36"],
  ["2", "5", "8", "11", "14", "17", "20", "23", "26", "29", "32", "35"],
  ["1", "4", "7", "10", "13", "16", "19", "22", "25", "28", "31", "34"],
];

const FunRoulette = () => {
  const [winningNumber, setWinningNumber] = useState(null);
  const [user, setUser] = useState(null);

  const [isSpinning, setIsSpinning] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const [betNumber, setBetNumber] = useState(null);
  const [balance, setBalance] = useState(1000); // Initial balance
  const [message, setMessage] = useState("");
  const [gameState, setGameState] = useState({ value: "waiting" });
  // const [timer, setTimer] = useState(10);

  // Placeholder functions
  // const handleScore = () => {
  //   alert(`Your current score (balance): $${balance}`);
  // };

  // const handleWinner = () => {
  //   alert(`Winning Number: ${winningNumber}`);
  // };

  // const handleCancelBet = () => {
  //   setBetNumber(null);
  //   setMessage("Your bet has been canceled.");
  // };

  // const handleTimer = () => {
  //   alert("Timer functionality to be implemented!");
  // };

  

  useEffect(() => {
    const userID = localStorage.getItem("userId");
    console.log("61", userID);
    if (userID) {
      socket.io.opts.query.userID = userID;
      socket.disconnect();
      socket.connect();
      socket.io.on("reconnect_attempt", () => {
        socket.io.opts.query.userID;
      });
    }
  }, [localStorage.getItem("userId")]);
  console.log("70", userId);

  useEffect(() => {
    const handleGameUpdate = (updatedGameState) => {
      console.log("gamestate", updatedGameState);
      setGameState(updatedGameState.gamestate);
      // updatedGameState.gamestate.value - 25 === 20 ? setBettingAmount(0) : "";
      // const isDisabled = updatedGameState.gamestate.value - 25 <= 0;
      // setButtonDisabled(isDisabled);
      // updatedGameState.gamestate.value - 25 === 20 && setAndarCards([]);
    };

    const handleUserDetails = (data) => {
      console.log("handleUserDetails", handleUserDetails);
      console.log("handleUserDetails.data", data);
      setUser(data?.user);
      console.log("data", data);
    };

    // const handlebet = (data) => {
    //   console.log("newbet", data);
    //   setUser(data);
    // };

    // const handleMainCard = (data) => {
    //   console.log("mainCard123", data.mainCard);
    //   setMainCard(data.mainCard);
    //   setGameHistory(data.gameHistory);
    // };

    handleUserDetails();
    socket.on("gameUpdate", handleGameUpdate);
    socket.on("userDetails", handleUserDetails);
    // socket.on("Main_Card", handleMainCard);
    // socket.on("bet", handlebet);

    return () => {
      socket.off("gameUpdate", handleGameUpdate);
      socket.off("userDetails", handleUserDetails);
      // socket.off("Main_Card", handleMainCard);
      // socket.off("bet", handlebet);
    };
  }, []);

  // my code
  // Effect to spin when gameState.value is 0
  useEffect(() => {
    if (gameState.value === 0) {
      spinRoulette();
    }
  }, [gameState.value]);
  
  const spinRoulette = () => {
    console.log('spinRoulette Called!!');
    // if (betNumber === null) {
    //   setMessage("Please place a bet first!");
    //   return;
    // }

    // if (betAmount > balance) {
    //   setMessage("You don't have enough balance!");
    //   return;
    // }

    setIsSpinning(true);
    setMessage("");

    const spinDuration = 3000; // Spin duration in milliseconds

    // Set random winning number after spinning
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 37); // Random number between 0-36
      setWinningNumber(randomNumber);
      checkWin(randomNumber);
      setIsSpinning(false);
    }, spinDuration);
  };

  const checkWin = (randomNumber) => {
    if (randomNumber === betNumber) {
      const payout = betAmount * 36;
      setBalance(balance + payout);
      setMessage(
        `Congratulations! You won $${payout}. Winning number is ${randomNumber}`
      );
    } else {
      setBalance(balance - betAmount);
      setMessage(`You lost! Winning number is ${randomNumber}`);
    }
  };
  // Check other types of bets
  if (betNumber === "even" && randomNumber % 2 === 0 && randomNumber !== 0) {
    payout = betAmount; // Simplified payout logic
    setMessage(
      `Congratulations! You won $${payout}. Winning number is ${randomNumber}`
    );
  } else if (betNumber === "odd" && randomNumber % 2 !== 0) {
    payout = betAmount;
    setMessage(
      `Congratulations! You won $${payout}. Winning number is ${randomNumber}`
    );
  }
  // Add checks for red/black and range bets

  const handleBetClick = (value) => {
    // Your logic for handling the bet click goes here
    console.log("Bet value selected:", value);
    setBetAmount(value); // Assuming you want to set the bet amount as well
  };

  const handleBetChange = (num) => {
    setBetNumber(num);
    setMessage(""); // Reset message when the bet is valid
  };

    // Function to calculate ball position based on winning number
  const calculateBallPosition = (winningNumber) => {
    return (winningNumber * 9.73) % 360; // 360 degrees / 37 numbers
  };

  return (
    <ChakraProvider>
      <Box textAlign="center" p={10}>
        <Text fontSize="3xl" color="black" fontWeight="bold" mb={5}>
          Fun Roulette Game 🎡
        </Text>
        {/* Score Text*/}
        <Flex mt={5} justifyContent="space-between" width="100%">
          <Box textAlign="left" width="100%">
            {/* Score Section */}
            <Box mb={5}>
              <Text fontSize="xl" mb={2}>
                Score
              </Text>
              <Button colorScheme="blue">
                {Math.round(user?.coins * 100) / 100
                  ? Math.round(user?.coins * 100) / 100
                  : "0"}{" "}
              </Button>
            </Box>

            {/* Timer Section */}
            <Box>
              <Text fontSize="xl" mb={2}>
                Timer
              </Text>
              <Button colorScheme="yellow">Timer {gameState.value}</Button>
            </Box>
          </Box>

          <Flex justifyContent="flex-end" width="100%">
            <Box textAlign="right" width="auto">
              {" "}
              {/* Adjust width to auto to fit the content */}
              {/* Winner Section */}
              <Box mb={5}>
                <Text fontSize="xl" mb={2}>
                  Winner
                </Text>
                <Button colorScheme="blue">Winner</Button>
              </Box>
              {/* Coins */}
              <Flex
                width="100%" // Ensure full width of the container is used
                justifyContent="space-between" // Maintain spacing between spinner and coins
                alignItems="left"
                marginTop="2rem"
              >
                {/* Coin Section */}
                <Grid
                  templateColumns="repeat(4, 1fr)" // Create 4 columns per row
                  gap={4} // Add some spacing between the grid items
                  width={["100%", "60%"]}
                  marginLeft={["1rem", "-9rem"]}
                >
                  {[
                    { value: 1, imageSrc: "/Coins/1's coin.webp" },
                    { value: 5, imageSrc: "/Coins/5's coin.webp" },
                    { value: 10, imageSrc: "/Coins/10's coin.webp" },
                    { value: 50, imageSrc: "/Coins/50's coin.webp" },
                    { value: 100, imageSrc: "/Coins/100's coin.webp" },
                    { value: 500, imageSrc: "/Coins/500's coin.webp" },
                    { value: 1000, imageSrc: "/Coins/1000's coin.webp" },
                    { value: 5000, imageSrc: "/Coins/5000's coin.webp" },
                  ].map((item, index) => (
                    <Button
                      key={index}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      fontWeight="bold"
                      borderRadius="50%"
                      variant="unstyled"
                      _hover={{
                        boxShadow: "0 8px 12px rgba(255, 255, 255, 0.8)",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        // setCoins(item.value);
                        // console.log("coins", item.value);
                        // setSelectedCoins(index);
                        handleBetClick(item.value)
                      }}
                    >
                      <img
                        src={item.imageSrc}
                        alt={`${item.value}'s coin`}
                        style={{ maxHeight: "100px" }}
                      />
                    </Button>
                  ))}
                </Grid>
              </Flex>
              {/* Balance Section */}
              <Box>
                <Text fontSize="xl" mb={2}>
                  Balance: ${betAmount}
                </Text>
                <Button colorScheme="yellow"></Button>
              </Box>
            </Box>
          </Flex>
        </Flex>

        <Text mb={2} color="black">
          Balance: ${balance}
        </Text>

        {/* Outer Image Container */}
        <Box position="relative" margin="0 auto" width="300px" height="300px">
          <Box
            position="absolute"
            width="100%"
            height="100%"
            borderRadius="50%"
            backgroundImage={`url(${rouletteOuterImage})`} // Image outside the spinner
            backgroundSize="cover"
            backgroundPosition="center"
            zIndex={1} // To make sure this image is below the spinner
          />

          {/* Spinner Component */}
          <Box
            position="absolute"
            width="100%"
            height="100%"
            borderRadius="50%"
            backgroundImage={`url(${rouletteImage})`} // Use the imported spinner image
            backgroundSize="cover"
            backgroundPosition="center"
            zIndex={2} // Ensure this is above the outer image
            style={{
              transform: isSpinning
                ? `rotate(${
                    360 * 3 + Math.floor(Math.random() * 37) * 9.73
                  }deg)`
                : "rotate(0deg)",
              transition: isSpinning
                ? "transform 3s cubic-bezier(0.33, 1, 0.68, 1)"
                : "none",
            }}
          />
          {isSpinning && (
            <Text
              fontSize="2xl"
              color="white"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              fontWeight="bold"
            >
              SPINNING...
            </Text>
          )}

          {/* Ball Component */}
          <Box
            position="absolute"
            width="15px"
            height="15px"
            borderRadius="50%"
            backgroundColor="white" // Color of the ball
            top="50%"
            left="50%"
            transform={`translate(-50%, -50%) rotate(${
              isSpinning
                ? 360 * 3 + Math.floor(Math.random() * 37) * 9.73
                : calculateBallPosition(winningNumber)
            }deg) translate(110px) rotate(-${
              isSpinning
                ? 360 * 3 + Math.floor(Math.random() * 37) * 9.73
                : calculateBallPosition(winningNumber)
            }deg)`} // Position the ball based on winning number
            zIndex={3} // Ensure the ball is above the spinner
          />

          {/* Inner Image */}
          <Box
            position="absolute"
            width="70%"
            height="70%"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            backgroundImage={`url(${rouletteInnerImage})`} // Inner image
            backgroundSize="cover"
            backgroundPosition="center"
            zIndex={4} // Ensure this image is above everything else
          />
        </Box>

        {/* Input for bet amount */}
        {/* <Flex justify="center" align="center" mb={5}>
          <Input
            placeholder="Enter bet amount"
            type="number"
            onChange={(e) => setBetAmount(parseInt(e.target.value))}
            maxW="150px"
            ml={3}
            disabled={isSpinning}
          />
        </Flex> */}z

        {/* <Button
          colorScheme="green"
          onClick={spinRoulette}
          disabled={isSpinning}
        >
          {isSpinning ? "Spinning..." : "Spin the Wheel!"}
        </Button>  */}
        

        {winningNumber !== null && (
          <Text fontSize="2xl" fontWeight="bold" mt={5}>
            Winning Number: {winningNumber}
          </Text>
        )}

        {message && (
          <Text fontSize="lg" color="red.500" mt={3}>
            {message}
          </Text>
        )}

        {/* Betting Board Component */}
        {/* <BettingBoard /> */}
        <Box
          bg="green.900"
          p={4}
          borderRadius="md"
          maxW="800px"
          mx="auto"
          border="4px solid green"
        >
          <Flex mb={4}>
            {/* Column for 00 and 0 */}
            <Box mr={2} mt={8}>
              <Box
                bg="green.500"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="50px"
                width="50px"
                mb={1}
                fontWeight="bold"
                borderRadius="full"
                border="2px solid white"
              >
                00
              </Box>
              <Box
                bg="green.500"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="50px"
                width="50px"
                fontWeight="bold"
                borderRadius="full"
                border="2px solid white"
              >
                0
              </Box>
            </Box>

            {/* Main Grid */}
            <Grid templateColumns="repeat(12, 1fr)" gap={0} width="90%">
              {numbers.map((row, rowIndex) =>
                row.map((number, colIndex) => (
                  <Box
                    key={`${rowIndex}-${colIndex}`}
                    bg="transparent"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="50px"
                    border="2px solid white"
                  >
                    <Box
                      bg={colIndex % 2 === 0 ? "red.600" : "black"}
                      color="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      height="40px"
                      width="40px"
                      fontWeight="bold"
                      borderRadius="full"
                      border="2px solid white"
                    >
                      {number}
                    </Box>
                  </Box>
                ))
              )}
            </Grid>

            {/* Column for 2 To 1 */}
            <Box ml={2}>
              <Box
                bg="gray.700"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="50px"
                width="80px"
                mb={1}
                fontWeight="bold"
                borderRadius="md"
                border="2px solid white"
              >
                2 To 1
              </Box>
              <Box
                bg="gray.700"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="50px"
                width="80px"
                mb={1}
                fontWeight="bold"
                borderRadius="md"
                border="2px solid white"
              >
                2 To 1
              </Box>
              <Box
                bg="gray.700"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="50px"
                width="80px"
                fontWeight="bold"
                borderRadius="md"
                border="2px solid white"
              >
                2 To 1
              </Box>
            </Box>
          </Flex>

          {/* Footer Rows */}
          <Grid
            templateColumns="repeat(12, 1fr)"
            gap={0}
            mb={2}
            ml={16}
            mr={24}
            border="2px solid white"
          >
            <Box
              gridColumn="span 4"
              bg="gray.700"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="40px"
              border="2px solid white"
            >
              1st 12
            </Box>
            <Box
              gridColumn="span 4"
              bg="gray.700"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="40px"
              border="2px solid white"
            >
              2nd 12
            </Box>
            <Box
              gridColumn="span 4"
              bg="gray.700"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="40px"
              border="2px solid white"
            >
              3rd 12
            </Box>
          </Grid>

          <Grid
            templateColumns="repeat(6, 1fr)"
            gap={0}
            mx={16}
            mr={24}
            border="2px solid white"
          >
            <Box
              bg="gray.700"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="40px"
              border="2px solid white"
            >
              1 To 18
            </Box>
            <Box
              bg="gray.700"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="40px"
              border="2px solid white"
            >
              Even
            </Box>
            <Button
              bg="red.600"
              color="white"
              height="40px"
              _hover={{ bg: "red.700" }}
              border="2px solid white"
            >
              Red
            </Button>
            <Button
              bg="black"
              color="white"
              height="40px"
              _hover={{ bg: "gray.800" }}
              border="2px solid white"
            >
              Black
            </Button>
            <Box
              bg="gray.700"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="40px"
              border="2px solid white"
            >
              Odd
            </Box>
            <Box
              bg="gray.700"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="40px"
              border="2px solid white"
            >
              19 To 36
            </Box>
          </Grid>
        </Box>

        {/* Timer Button (to be implemented later) */}
        {/* <Button colorScheme="blue" mt={5}>
          Timer Button
        </Button> */}
      </Box>
    </ChakraProvider>
  );
};

export default FunRoulette;
