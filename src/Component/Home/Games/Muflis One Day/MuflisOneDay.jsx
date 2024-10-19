import "./MuflisOneDay.css";

import {
  AspectRatio,
  Box,
  Button,
  ChakraProvider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";

import { FaLock } from "react-icons/fa";
import MuflisOneDayBG from "../../../images/muflisonedaybg.svg";
import { io } from "socket.io-client";

const userId = localStorage.getItem("userId");
const socket = io("https://muflish-one-days-web.onrender.com/", {
  query: {
    userId: userId,
  },
  transports: ["websocket"],
});

export default function MuflisOneDay() {
  const [timer, setTimer] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [userId, setUserId] = useState("");
  const [playerACards, setPlayerACards] = useState([]);
  const [playerBCards, setPlayerBCards] = useState([]);
  const [winnerStatus, setWinnerStatus] = useState("");
  const [winHistory, setWinHistory] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [gameId, setGameId] = useState("");
  const [bettingAmount, setBettingAmount] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState();
  useEffect(() => {
    const userID = localStorage.getItem("userId");
    if (userID) {
      socket.io.opts.query.userID = userID;
      // socket.disconnect();
      // socket.connect();
      socket.io.on("reconnect_attempt", () => {
        socket.io.opts.query.userID;
      });
    }
  }, [localStorage.getItem("userId")]);

  useEffect(() => {
    const handleDealCards = (data) => {
      console.log("Deal Cards", data);
      setPlayerACards(data.singlecard.playerA);
      setPlayerBCards(data.singlecard.playerB);
      setWinnerStatus(data.winner);

      // setWinHistory(data.winHistory);
    };

    const handleCountdown = (data) => {
      console.log("timer", data);
      setTimer(data.countdown);
      data.countdown >= 120 ? setBettingAmount(0) : "";
      const isDisabled = data?.countdown <= 25;
      setButtonDisabled(isDisabled);
    };

    const handleNewBet = (data) => {
      console.log("Betting", data);
      //   setSelectedChoice(data.choice);
    };

    const handleNewRound = () => {
      //   console.log("New Round", data);
      setPlayerACards([]);
      setPlayerBCards([]);
      setWinnerStatus("");
    };

    const handleBalanceUpdate = (data) => {
      //   console.log("New Balance", data);
      setAvailableBalance(data.balance);
    };

    const handleUser = (data) => {
      //   console.log("User Details", data);
      setAvailableBalance(data.user.coins);
      setUserId(data.user.mobileNumber);
    };

    const handleWinHistory = (data) => {
      console.log("Game History", data);
      setWinHistory(data.winStatuses);
    };

    const handleMatchId = (data) => {
      //   console.log("Match Id", data);
      setGameId(data.gameId);
    };

    socket.on("dealSingleCard", handleDealCards);
    socket.on("countdown", handleCountdown);
    socket.on("newBet", handleNewBet);
    socket.on("newRound", handleNewRound);
    socket.on("balanceUpdate", handleBalanceUpdate);
    socket.on("getuser", handleUser);
    socket.on("WinHistory", handleWinHistory);
    socket.on("gameId", handleMatchId);

    return () => {
      socket.off("dealSingleCard", handleDealCards);
      socket.off("countdown", handleCountdown);
      socket.off("newBet", handleNewBet);
      socket.off("newRound", handleNewRound);
      socket.off("balanceUpdate", handleBalanceUpdate);
      socket.off("getuser", handleUser);
      socket.off("WinHistory", handleWinHistory);
      socket.off("gameId", handleMatchId);
    };
  }, []);

  const handelPlaceBet = (baitType) => {
    if (availableBalance === 0) {
      alert("Insufficient fund.");
      return;
    }
    // console.log("selectedCoins", coins);

    if (availableBalance > selectedCoin) {
      const coins = parseInt(selectedCoin);

      const betData = {
        selectedChoice: baitType,
        coins,
      };

      socket.emit("placeBet", betData);
      console.log("selectedChoice", betData);
      setBettingAmount((prev) => prev + Number(coins));
    }
    alert("Betting Amount is greater than Balance.");
  };

  return (
    <>
      <ChakraProvider>
        <Box width={["100%", "100%"]}>
          <Box
            backgroundImage={MuflisOneDayBG}
            maxW={["100vw", "100vw"]}
            id="main-div"
          >
            <Flex
              align="left-top"
              justify="left-top"
              minH="50%"
              overflow="hidden"
              flexDirection={["column", "row"]}
            >
              <Box
                width={["100%", "80%"]}
                marginTop="0px"
                marginRight="-4rem"
                marginBottom="1rem"
              >
                <Flex justify="space-between" align="center" mb="2">
                  <Text
                    fontSize={["20px", "24px"]}
                    fontWeight="bold"
                    borderRadius="10px"
                    position="relative"
                    marginLeft={["5px", "0px"]}
                    color={"white"}
                  >
                    Muflis One Day
                  </Text>
                  <Button
                    variant="outline"
                    colorScheme="white"
                    mr="2"
                    paddingX={"3rem"}
                    mt="2"
                  >
                    Rules
                  </Button>
                </Flex>
                <AspectRatio borderRadius="10px" controls>
                  <Box
                    border="4px solid #333"
                    height="50%"
                    backgroundImage="url('/MuflisOneDay/MuflisOneDay.webp')"
                    backgroundSize="cover"
                    backgroundPosition={`center 100%`}
                    backgroundRepeat="no-repeat"
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="top"
                    color="white"
                    className="muflisfirstBox"
                    position={"absolute"}
                  >
                    <Box
                      fontWeight={"900"}
                      border={"1px solid white"}
                      borderRadius={"50%"}
                      // padding={"2px"}
                      mt={"2rem"}
                      ml={"1rem"}
                      position={"absolute"}
                      top="0"
                      left="0"
                      width="25%"
                      height="22%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      fontSize={["10px", "sm"]}
                      color="white"
                      // background="linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898"
                      // background= "linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), radial-gradient(at top center, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0.4) 120%), #99ddff, #1ab2ff"
                      background="linear-gradient(to bottom right,#9494b8,  #52527a)"
                    >
                      {timer <= 8
                        ? "Winner: " + winnerStatus
                        : timer <= 25
                        ? "Freeze"
                        : "Place Bet"}
                    </Box>

                    <Box
                      fontWeight={"900"}
                      border={"1px solid white"}
                      borderRadius={"50%"}
                      // padding={"2px"}
                      mt={"2rem"}
                      ml={"1rem"}
                      position={"absolute"}
                      top="0"
                      right="0"
                      width="15%"
                      height="17%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      fontSize="lg"
                      //background="linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898"
                      background="linear-gradient(to bottom right,#9494b8,  #52527a)"
                      marginRight={"1rem"}
                      color="white"
                    >
                      {/* {timer - 25 <= 0 ? "0" : timer - 25} */}
                      {timer}
                    </Box>
                    <Box
                      // border={"2px solid red"}
                      width={"52%"}
                      height={"10%"}
                      position={"absolute"}
                      top={"68%"}
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Box
                        // border={"2px solid yellow"}
                        width={"41%"}
                        height={"100%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        flexDirection={"row"}
                      >
                        <Box
                          // border={"2px solid yellow"}
                          width={"25%"}
                          height={"100%"}
                        >
                          <Image
                            width={"100%"}
                            height={"100%"}
                            src={"/cards/clubs_2.png"}
                          />
                        </Box>
                        <Box
                          // border={"2px solid yellow"}
                          width={"25%"}
                          height={"100%"}
                        >
                          <Image
                            width={"100%"}
                            height={"100%"}
                            src={"/cards/clubs_2.png"}
                          />
                        </Box>
                        <Box
                          // border={"2px solid yellow"}
                          width={"25%"}
                          height={"100%"}
                        >
                          <Image
                            width={"100%"}
                            height={"100%"}
                            src={"/cards/clubs_2.png"}
                          />
                        </Box>
                      </Box>
                      <Box
                        // border={"2px solid yellow"}
                        width={"41%"}
                        height={"100%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        flexDirection={"row"}
                      >
                        <Box
                          // border={"2px solid yellow"}
                          width={"25%"}
                          height={"100%"}
                        >
                          <Image
                            width={"100%"}
                            height={"100%"}
                            src={"/cards/clubs_2.png"}
                          />
                        </Box>
                        <Box
                          // border={"2px solid yellow"}
                          width={"25%"}
                          height={"100%"}
                        >
                          <Image
                            width={"100%"}
                            height={"100%"}
                            src={"/cards/clubs_2.png"}
                          />
                        </Box>
                        <Box
                          // border={"2px solid yellow"}
                          width={"25%"}
                          height={"100%"}
                        >
                          <Image
                            width={"100%"}
                            height={"100%"}
                            src={"/cards/clubs_2.png"}
                          />
                        </Box>
                      </Box>
                    </Box>
                    {/* <Flex
                      gap="0.5rem"
                      direction="row"
                      position={"relative"}
                      top={{ base: "5.3rem", lg: "5.8rem", xl: "9rem" }}
                      left={{ base: "-3.5rem", lg: "-3.6rem", xl: "-5.8rem" }}
                    >
                      <Box className="muflisplayercardbox1">
                        {timer <= 100 && (
                          <Box key={1}>
                            <Image
                              className="muflisplayercard1"
                              src={`/cards/${playerACards[0]}`}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box className="muflisplayercardbox2">
                        {timer <= 60 && (
                          <Box key={1}>
                            <Image
                              className="muflisplayercard2"
                              src={`/cards/${playerACards[1]}`}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box className="muflisplayercardbox3">
                        {timer <= 20 && (
                          <Box
                            key={1}
                            // height={["2.5 rem", "0.5rem"]
                          >
                            <Image
                              className="muflisplayercard3"
                              src={`/cards/${playerACards[2]}`}
                            />
                          </Box>
                        )}
                      </Box>
                    </Flex> */}
                    {/* <Flex
                      gap="0.5rem"
                      direction="row"
                      position={"relative"}
                      top={{ base: "2.9rem", lg: "3.3rem", xl: "5.4rem" }}
                      // left={"3.4rem"
                      left={{ base: "3.4rem", lg: "3.6rem", xl: "5.4rem" }}
                    >
                      <Box className="muflisplayercardbox4">
                        {timer <= 80 && (
                          <Box key={0}>
                            <Image
                              className="muflisplayercard4"
                              src={`/cards/${playerBCards[0]}`}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box className="muflisplayercardbox5">
                        {timer <= 40 && (
                          <Box key={1}>
                            <Image
                              className="muflisplayercard5"
                              src={`/cards/${playerBCards[1]}`}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box className="muflisplayercardbox6">
                        {timer <= 20 && (
                          <Box key={1}>
                            <Image
                              className="muflisplayercard6"
                              src={`/cards/${playerBCards[2]}`}
                            />
                          </Box>
                        )}
                      </Box>
                    </Flex> */}
                  </Box>
                </AspectRatio>

                <Flex flexDirection={["column", "column"]} alignItems="center">
                  {/* Box Items */}

                  <Button
                    bg={"black"}
                    fontWeight={"700"}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #A52A2A, #FF8C00)",
                      WebkitBackgroundClip: "text",
                      color: "#99ddff",
                    }}
                  >
                    <>
                      <span>Player Id : </span>
                      <Text color={"white"} align={"center"}>
                        {userId ? userId : "Loading..."}
                      </Text>
                    </>
                  </Button>
                  <Button
                    bg={"black"}
                    fontWeight={"700"}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #A52A2A, #FF8C00)",
                      WebkitBackgroundClip: "text",
                      color: "#99ddff",
                    }}
                  >
                    Last Wins:
                  </Button>

                  <Flex
                    width={["100%", "67%"]}
                    p={1}
                    flexWrap="wrap"
                    align={"center"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    textAlign={"center"}
                  >
                    {winHistory?.map((item, index) => (
                      <Box
                        key={index}
                        width={["35px", "35px"]} // Adjusted width for responsiveness
                        height={["45px", "35px"]} // Adjusted height for responsiveness
                        marginRight="5px" // Added right margin to each item
                        marginBottom="5px" // Added bottom margin for spacing
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        textAlign={"center"}
                        fontWeight="bold"
                        border="2px solid white"
                        align={"center"}
                        borderRadius={"50%"}
                        bg={"black"}
                      >
                        <Text
                          fontSize="14px"
                          color={index % 2 === 0 ? "white" : "white"}
                          align={"center"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          textAlign={"center"}
                        >
                          {item}
                        </Text>
                      </Box>
                    ))}
                  </Flex>
                  <Box
                    fontWeight={"700"}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #A52A2A, #FF8C00)",
                      WebkitBackgroundClip: "text",
                      color: "#99ddff",
                    }}
                  >
                    <>
                      Last Bet Amount :
                      <Text color={"white"} align={"center"}>
                        {bettingAmount}
                      </Text>
                    </>
                  </Box>
                </Flex>
              </Box>

              <Box
                marginX={["0rem", "-30rem", "5rem"]}
                marginTop={["0rem", "38rem", "5rem"]}
                width={["100%", "50%"]}
                id="playeryourbetdiv"
              >
                <Flex
                  width={["95%", "110%"]}
                  flexDirection="row"
                  // border="3px solid #333"
                  borderRadius="10px"
                  textAlign="center"
                  justifyContent={"center"}
                  alignItems={"center"}
                  ml={{ base: "0.6rem" }}
                >
                  <Box
                    border="3px solid #333"
                    flex="1"
                    width="48%"
                    textAlign="center"
                    borderRadius="10px"
                    // background="radial-gradient(circle at -8.9% 51.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(255, 163, 77) 24.4%, rgb(19, 30, 37) 24.5%, rgb(19, 30, 37) 66%)"
                    background="linear-gradient(to bottom right,#9494b8,  #52527a)"
                    color={"white"}
                  >
                    <Text fontSize={["18px", "18px"]} fontWeight="bold">
                      Available Credit
                    </Text>
                    <Text fontSize={["20px", "24px"]}>
                      {Math.round(availableBalance * 100) / 100
                        ? Math.round(availableBalance * 100) / 100
                        : "0"}
                    </Text>
                  </Box>

                  <Box
                    border="3px solid #333"
                    flex="1"
                    width="48%"
                    //   background="radial-gradient(circle at -8.9% 51.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(255, 163, 77) 24.4%, rgb(19, 30, 37) 24.5%, rgb(19, 30, 37) 66%)"
                    background="linear-gradient(to bottom right,#9494b8,  #52527a)"
                    textAlign="center"
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderRadius="10px"
                    color={"white"}
                  >
                    <Text fontSize="18px" fontWeight="bold">
                      Match Id:
                    </Text>
                    <Text fontSize={["20px", "24px"]}>
                      {gameId ? gameId : "Loading..."}
                    </Text>
                  </Box>
                </Flex>
                {/* New Box  */}
                <Box width="90%" id="placeyourbet">
                  <Flex flexDirection="column" alignItems="center">
                    <Text
                      fontSize="20px"
                      fontWeight="bold"
                      marginLeft={["0.5rem"]}
                      mt={"1rem"}
                      color={"white"}
                      ml={{ base: "3rem", md: "0rem" }}
                    >
                      Place Your Bet
                    </Text>

                    <Flex
                      width={["100%", "60%"]}
                      flexWrap={["nowrap", "nowrap"]}
                      justifyContent={["center", "flex-start"]}
                      marginTop={["2rem", "0"]}
                      marginLeft={["1rem", "-9rem"]}
                    >
                      {[
                        { value: 10, imageSrc: "/Coins/10's coin.webp" },
                        { value: 50, imageSrc: "/Coins/50's coin.webp" },
                        { value: 100, imageSrc: "/Coins/100's coin.webp" },
                        { value: 500, imageSrc: "/Coins/500's coin.webp" },
                        { value: 1000, imageSrc: "/Coins/1000's coin.webp" },
                        { value: 5000, imageSrc: "/Coins/5000's coin.webp" },
                      ].map((item, index) => (
                        <Button
                          ml={["0.8rem", "0rem"]}
                          key={index}
                          // height="45px"
                          margin={["rem", "0.9rem"]}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontWeight="bold"
                          borderRadius={"50%"}
                          // borderColor={'red'}
                          variant="unstyled"
                          _hover={{
                            // boxShadow: "0 8px 12px rgba(0, 0, 255, 0.8)",
                            boxShadow: "0 8px 12px rgba(255, 255, 255, 0.8)",

                            p: "px",
                            rounded: "full",
                            cursor: "pointer",
                          }}
                          // onInput={(e) => setSelectedCoin(e.target.value)}
                          // value={selectedCoin}
                          onClick={() => {
                            setSelectedCoin(item.value);
                            // console.log("coins", value);
                            setSelectedCoins(index);
                          }}
                        >
                          {/* {console.log(selectedCoin, "selectedCoin")} */}
                          <img
                            src={item.imageSrc}
                            alt={`${item.value}'s coin`}
                            style={{ maxHeight: "100px" }}
                          />
                        </Button>
                      ))}
                    </Flex>
                  </Flex>
                  <Flex
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    padding="0rem"
                    width="111%"
                  >
                    <Box
                      width="100%"
                      position="relative"
                      // border="2px solid #333"
                      height="8rem"
                      // bgColor={'red'}

                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box
                        width="90%"
                        height="100%"
                        position="relative"
                        // border="2px solid #333"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Button
                          isDisabled={isButtonDisabled}
                          width="90%"
                          height={["50%", "80%"]}
                          marginLeft="1rem"
                          color="white"
                          fontWeight="800"
                          borderRadius="20%"
                          // background="linear-gradient(to right, #868f96 0%, #596164 100%)"
                          background="linear-gradient(to bottom right,#9494b8,  #52527a)"
                          display={"flex"}
                          justifyContent={"space-around"}
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(-180deg, white 0%, purple 100%)",

                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handelPlaceBet("0")}
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{
                                color: "white",
                                marginRight: "0.5rem",
                                position: "relative",
                                zIndex: "2",
                              }}
                            />
                          )}
                          <Text style={{ position: "absolute", zIndex: "1" }}>
                            <span>playerA</span> <span>1.98</span>
                          </Text>
                        </Button>

                        <Button
                          isDisabled={isButtonDisabled}
                          width="90%"
                          height={["50%", "80%"]}
                          marginLeft="1rem"
                          color="white"
                          fontWeight="800"
                          borderRadius="20%"
                          background="linear-gradient(to bottom right,#9494b8,  #52527a)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(-180deg, white 0%, purple 100%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          display={"flex"}
                          justifyContent={"space-around"}
                          onClick={() => handelPlaceBet("1")}
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{
                                color: "white",
                                marginRight: "0.5rem",
                                position: "relative",
                                zIndex: "2",
                              }}
                            />
                          )}
                          <Text style={{ position: "absolute", zIndex: "1" }}>
                            <span>playerB</span> <span>1.98</span>
                          </Text>
                        </Button>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </ChakraProvider>
    </>
  );
}
