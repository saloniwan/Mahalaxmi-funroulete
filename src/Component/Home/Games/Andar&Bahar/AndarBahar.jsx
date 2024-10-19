import "./AndarBahar.css";

import {
  AspectRatio,
  Box,
  Button,
  ChakraProvider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { io } from "socket.io-client";

const userId = localStorage.getItem("userId");
const socket = io("http://localhost:8000/", {
  query: {
    userID: userId,
  },
  transports: ["websocket"],
});

export default function AndarBahar() {
  const [gameState, setGameState] = useState({ value: "waiting" });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [mainCard, setMainCard] = useState({});
  const [andarCards, setAndarCards] = useState([]);
  const [baharCards, setBaharCards] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [bettingAmount, setBettingAmount] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState();

  useEffect(() => {
    const userID = localStorage.getItem("userId");
    if (userID) {
      socket.io.opts.query.userID = userID;
      socket.disconnect();
      socket.connect();
      socket.io.on("reconnect_attempt", () => {
        socket.io.opts.query.userID;
      });
    }
  }, [localStorage.getItem("userId")]);

  useEffect(() => {
    const handleGameUpdate = (updatedGameState) => {
      console.log("gamestate", updatedGameState);
      setGameState(updatedGameState.gamestate);
      updatedGameState.gamestate.value - 25 === 20 ? setBettingAmount(0) : "";
      const isDisabled = updatedGameState.gamestate.value - 25 <= 0;
      setButtonDisabled(isDisabled);
      updatedGameState.gamestate.value - 25 === 20 && setAndarCards([]);
    };

    const handleUserDetails = (data) => {
      console.log("handleUserDetails", data);
      setUser(data?.user);
      console.log("data", data);
    };

    const handlebet = (data) => {
      console.log("newbet", data);
      setUser(data);
    };

    const handleMainCard = (data) => {
      console.log("mainCard123", data.mainCard);
      setMainCard(data.mainCard);
      setGameHistory(data.gameHistory);
    };

    handleUserDetails();
    socket.on("gameUpdate", handleGameUpdate);
    socket.on("userDetails", handleUserDetails);
    socket.on("Main_Card", handleMainCard);
    socket.on("bet", handlebet);

    return () => {
      socket.off("gameUpdate", handleGameUpdate);
      socket.off("userDetails", handleUserDetails);
      socket.off("Main_Card", handleMainCard);
      socket.off("bet", handlebet);
    };
  }, []);

  if (gameState?.value === 3) {
    socket.emit("getUpdatedUserDetails");
  }

  useEffect(() => {
    if (gameState?.value === 19) {
      animateCards();
    } else if (gameState?.value === 45) {
      setAndarCards([]);
      setBaharCards([]);
    }
  }, [gameState?.value]);

  function animateCards() {
    const baharCardsArr = mainCard?.baharcards || [];
    const andarCardsArr = mainCard?.andarcards || [];

    let combinedCardsArr = [];

    for (
      let i = 0;
      i < Math.max(baharCardsArr.length, andarCardsArr.length);
      i++
    ) {
      if (i < baharCardsArr.length) {
        combinedCardsArr.push({ type: "bahar", card: baharCardsArr[i] });
      }
      if (i < andarCardsArr.length) {
        combinedCardsArr.push({ type: "andar", card: andarCardsArr[i] });
      }
    }

    combinedCardsArr.forEach((card, index) => {
      setTimeout(() => {
        if (card.type === "bahar") {
          setBaharCards((prev) => [...prev, card.card]);
        } else {
          setAndarCards((prev) => [...prev, card.card]);
        }
      }, 1000 * (index + 1));
    });
  }

  const handleBetting = (betType) => {
    if (user?.coins === 0) {
      alert("Insufficient Funds");
      return;
    }
    if (user?.coins > coins) {
      const bet = {
        betType,
        coins,
        cardId: mainCard._id,
      };

      socket.emit("bet", bet);
      console.log("betting", bet);
      if (user?.coins && user?.coins) {
        setBettingAmount((prev) => prev + Number(coins));
      }
    } else alert("Betting Amount is greater than Balance.");
  };

  return (
    <>
      <ChakraProvider>
        <Box className="AndarBaharmaindiv" minH={"100vh"} minW={"48vh"}>
          <Box maxW={["100vw", "100vw"]} id="main-div">
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
                    Andar Bahar
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
                    backgroundImage="url('/Andar&BaharImage/andarbahartables.webp')"
                    backgroundSize="cover"
                    backgroundPosition={`center 100%`}
                    backgroundRepeat="no-repeat"
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="top"
                    color="white"
                    className="AndarfirstBox"
                    position={"absolute"}
                  >
                    <Box
                      fontWeight={"900"}
                      border={"1px solid white"}
                      borderRadius={"50%"}
                      padding={"2px"}
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
                      background="radial-gradient(919px at 1.7% 6.1%, rgb(41, 58, 76) 0%, rgb(40, 171, 226) 100.2%)"
                    >
                      {gameState?.value <= 8
                        ? "Winner: " + mainCard?.winstatus
                        : gameState?.value <= 25
                        ? "Freeze"
                        : "Place Bet"}
                    </Box>

                    <Box
                      fontWeight={"900"}
                      border={"1px solid white"}
                      borderRadius={"50%"}
                      padding={"2px"}
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
                      background="radial-gradient(919px at 1.7% 6.1%, rgb(41, 58, 76) 0%, rgb(40, 171, 226) 100.2%)"
                      marginRight={"1rem"}
                      color="white"
                    >
                      {gameState?.value - 25 <= 0 ? "0" : gameState?.value - 25}
                    </Box>

                    <Box
                      position={"absolute"}
                      width={"6%"}
                      height={"10%"}
                      top={"69%"}
                      right={"19%"}
                    >
                      {mainCard?.main_card ? (
                        <Image
                          src={`./cards/${mainCard?.main_card}`}
                          // src={"/cards/clubs_10.png"}
                          alt={`Card main`}
                          width={"100%"}
                          height={"100%"}
                        />
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box
                      // border={"2px solid red"}
                      position={"absolute"}
                      width={"60%"}
                      height={"25%"}
                      top={"60.5%"}
                      right={"29%"}
                      display={"flex"}
                      justifyContent={"space-between"}
                      flexDirection={"column"}
                    >
                      <Box
                        position={"absolute"}
                        // border={"2px solid yellow"}
                        width={"100%"}
                        height={"45%"}
                        top={"0"}
                        display={"flex"}
                        flexDirection="row-reverse"
                        overflow={"hidden"}
                      >
                        {gameState?.value <= 20 && (
                          <>
                            {andarCards
                              .slice()
                              .reverse()
                              .map((card, index) => (
                                <Image
                                  key={index}
                                  src={`./cards/${card}`}
                                  alt={`Andar Card ${index}`}
                                />
                              ))}
                          </>
                        )}
                      </Box>
                      <Box
                        position={"absolute"}
                        // border={"2px solid orange"}
                        width={"100%"}
                        height={"45%"}
                        bottom={"0"}
                        display={"flex"}
                        flexDirection="row-reverse"
                        overflow={"hidden"}
                      >
                        {gameState?.value <= 20 && (
                          <>
                            {baharCards
                              .slice()
                              .reverse()
                              .map((card, index) => (
                                <Image
                                  key={index}
                                  src={`./cards/${card}`}
                                  alt={`Bahar Card ${index}`}
                                />
                              ))}
                          </>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </AspectRatio>

                <Flex flexDirection={["column", "column"]} alignItems="center">
                  {/* Box Items */}

                  <Button
                    fontWeight={"700"}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #A52A2A, #FF8C00)",
                      WebkitBackgroundClip: "text",
                      color: "#8A2BE2",
                    }}
                  >
                    <>
                      Player Id :
                      <Text color={"white"} align={"center"}>
                        {user?.mobileNumber ? user?.mobileNumber : "Loading..."}
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
                      color: "#8A2BE2",
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
                    {gameHistory?.map((item, index) => (
                      <Box
                        key={index}
                        width={["35px", "35px"]}
                        height={["45px", "35px"]}
                        marginRight="5px"
                        marginBottom="5px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        textAlign={"center"}
                        fontWeight="bold"
                        border="2px solid white"
                        align={"center"}
                        borderRadius={"50%"}
                        bg={"white"}
                      >
                        <Text
                          fontSize="18px"
                          color={index % 2 === 0 ? "black" : "black"}
                          fontWeight={"800"}
                          align={"center"}
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
                      color: "#8A2BE2",
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
                >
                  <Box
                    flex="1"
                    width="48%"
                    bgGradient="linear(to-tr, #000000, #8A2BE2)"
                    textAlign="center"
                    borderRadius="10px"
                    border="3px solid #333"
                    color={"white"}
                  >
                    <Text fontSize={["18px", "18px"]} fontWeight="bold">
                      Available Credit
                    </Text>
                    <Text fontSize={["20px", "24px"]}>
                      {Math.round(user?.coins * 100) / 100
                        ? Math.round(user?.coins * 100) / 100
                        : "0"}
                    </Text>
                  </Box>

                  <Box
                    flex="1"
                    width="48%"
                    bgGradient="linear(to-tr, #000000, #8A2BE2)"
                    textAlign="center"
                    borderRadius="10px"
                    border="3px solid #333"
                    color={"white"}
                  >
                    <Text fontSize="18px" fontWeight="bold">
                      Match Id:
                    </Text>
                    <Text fontSize={["20px", "24px"]}>
                      {/* {user?.gameid ? user?.gameid  : "Loading..."} */}
                      {mainCard?._id ? mainCard?._id : "Loading..."}
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
                            setCoins(item.value);
                            console.log("coins", item.value);
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
                        // marginTop="1rem"
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
                          // background="linear-gradient(114.9deg, rgb(34, 34, 34) 8.3%, rgb(0, 40, 60) 41.6%, rgb(0, 143, 213) 93.4%)"
                          bgGradient="linear(to-tr, #FFFFFF, #8A2BE2)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",

                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(0)}
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
                            <span>Andar</span> <span>1.98</span>
                          </Text>
                        </Button>

                        <Button
                          isDisabled={isButtonDisabled}
                          // {<FaLock isDisabled={isButtonDisabled} />}
                          width="90%"
                          height={["50%", "80%"]}
                          marginLeft="1rem"
                          color="white"
                          fontWeight="800"
                          borderRadius="20%"
                          bgGradient="linear(to-tr, #FFFFFF, #8A2BE2)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",

                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(1)}
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
                            <span>Bahar</span> <span>1.98</span>
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
      {/* window.location.reload(); */}
    </>
  );
}
