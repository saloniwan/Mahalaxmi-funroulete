import "./Teenpatti.css";

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
import Teenpatti from "../../../images/muflisonedaybg.svg";
import { io } from "socket.io-client";

const userId = localStorage.getItem("userId");
const socket = io("https://teenpattiwebbackend.onrender.com", {
  query: {
    userID: userId,
  },
  transports: ["websocket"],
});

export default function TeenPatti() {
  const [gameState, setGameState] = useState({ value: "waiting" });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(50);
  const [mainCard, setMainCard] = useState([]);
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
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
    // Listen for game state updates from the server
    socket.on(
      "gameUpdate",
      (updatedGameState) => {
        setGameState(updatedGameState?.gamestate);
        updatedGameState.gamestate.value - 25 === 20 ? setBettingAmount(0) : "";
        const isDisabled = updatedGameState.gamestate.value - 25 <= 0;
        setButtonDisabled(isDisabled);

        // console.log(updatedGameState, "updatedGameState");
        // setMainCard(updatedGameState.gameCard);
        //  console.log(updatedGameState.gameCard, "updatedGameState");
      },
      [gameState?.value]
    );

    socket.on("userDetails", (data) => {
      console.log("UserDetails", data);
      setUser(data.user);
      // setCurrentPlayer((prevPlayer) => (prevPlayer === "A" ? "B" : "A"));
      // console.log(data, "data?.user");
    });
    socket.on("bet", (data) => {
      setUser(data);
      // console.log(data);
      // setUser(data.user);
    });

    socket.on("Main_Card", (data) => {
      console.log("Main_Card Data:", data);
      setMainCard(data.gameCard);
      displayPlayerCards(data.gameCard.player1Cards, setPlayer1Cards);
      displayPlayerCards(data.gameCard.player2Cards, setPlayer2Cards);
      setGameHistory(data.gameHistory);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  if (gameState?.value === 3) {
    socket.emit("getUpdatedUserDetails");
  }
  // const displayPlayerCards = (cards, setPlayerCards) => {
  //   const displayedCards = cards.slice(0, 3); // Take only the first 3 cards

  const displayPlayerCards = (cards, setPlayerCards) => {
    const displayedCards = [];

    for (let i = 0; i < 3; i++) {
      // Display one card for each player in each iteration
      displayedCards.push(cards[i % 2]);
    }

    setPlayerCards(displayedCards);
  };

  const handelBet = (betType) => {
    if (user?.coins === 0) {
      alert("Insufficient Coins");
      return;
    }
    if (user?.coins > coins) {
      const bet = {
        betType,
        coins,
        cardId: mainCard._id,
      };
      console.log(bet, "bet");
      socket.emit("bet", bet);
      setBettingAmount((prev) => prev + Number(coins));
    } else alert("Betting Amount is greater than Balances.");
  };
  return (
    <>
      <ChakraProvider>
        <Box width={["100%", "100%"]}>
          <Box
            // backgroundImage={Teenpatti}

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
                    Teen Patti
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
                    backgroundImage="url('/TeenPatti/TeenPatti.webp')"
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
                      background="linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898"
                    >
                      {/* {countdown <= 25 ? "Freeze" : "Place  Bet"}
                      {countdown <= 8 ? "Winner : " + winner : "Loading"} */}
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
                      background="linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898"
                      marginRight={"1rem"}
                      color="white"
                    >
                      {gameState?.value - 25 <= 0 ? "0" : gameState?.value - 25}
                    </Box>
                    <Box
                      // border={"1px solid red"}
                      width={"52%"}
                      height={"10%"}
                      position={"absolute"}
                      top={"68%"}
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Box
                        // border={"1px solid black"}
                        width={"41%"}
                        height={"96%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        flexDirection={"row"}
                      >
                        <Box
                          // border={"1px solid yellow"}
                          width={"24%"}
                          height={"100%"}
                          overflow={"hidden"}
                        >
                          {gameState?.value <= 19 && (
                            <Box>
                              <Image
                                src={`/cards/${player1Cards[0]}`}
                                width={"100%"}
                                height={"100%"}
                              />
                            </Box>
                          )}
                        </Box>
                        <Box
                          // border={"1px solid yellow"}
                          width={"26.5%"}
                          height={"100%"}
                          overflow={"hidden"}
                        >
                          {gameState?.value <= 17 && (
                            <Box>
                              <Image
                                src={`/cards/${player1Cards[1]}`}
                                width={"100%"}
                                height={"100%"}
                              />
                            </Box>
                          )}
                        </Box>
                        <Box
                          // border={"1px solid yellow"}
                          width={"25%"}
                          height={"100%"}
                          overflow={"hidden"}
                        >
                          {gameState?.value <= 15 && (
                            <Box>
                              <Image
                                src={`/cards/${player1Cards[2]}`}
                                width={"100%"}
                                height={"100%"}
                              />
                            </Box>
                          )}
                        </Box>
                      </Box>
                      <Box
                        // border={"1px solid black"}
                        width={"42%"}
                        height={"100%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        flexDirection={"row"}
                      >
                        <Box
                          // border={"1px solid yellow"}
                          width={"26%"}
                          height={"100%"}
                          overflow={"hidden"}
                        >
                          {gameState?.value <= 18 && (
                            <Box>
                              <Image
                                src={`/cards/${player2Cards[0]}`}
                                width={"100%"}
                                height={"100%"}
                              />
                            </Box>
                          )}
                        </Box>
                        <Box
                          // border={"1px solid yellow"}
                          width={"26%"}
                          height={"100%"}
                          overflow={"hidden"}
                        >
                          {gameState?.value <= 16 && (
                            <Box>
                              <Image
                                src={`/cards/${player2Cards[1]}`}
                                width={"100%"}
                                height={"100%"}
                              />
                            </Box>
                          )}
                        </Box>
                        <Box
                          // border={"1px solid yellow"}
                          width={"25%"}
                          height={"100%"}
                          overflow={"hidden"}
                        >
                          {gameState?.value <= 14 && (
                            <Box>
                              <Image
                                src={`/cards/${player2Cards[2]}`}
                                width={"100%"}
                                height={"100%"}
                              />
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
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
                      color: "#263849",
                    }}
                  >
                    <>
                      <span>Player Id : </span>
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
                      color: "#263849",
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
                      >
                        <Text
                          fontSize="14px"
                          color={index % 2 === 0 ? "white" : "grey"}
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
                      color: "#263849",
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
                    border="3px solid #333"
                    flex="1"
                    width="48%"
                    textAlign="center"
                    borderRadius="10px"
                    background="radial-gradient(circle at -8.9% 51.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(255, 163, 77) 24.4%, rgb(19, 30, 37) 24.5%, rgb(19, 30, 37) 66%)"
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
                    border="3px solid #333"
                    flex="1"
                    width="48%"
                    background="radial-gradient(circle at -8.9% 51.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(255, 163, 77) 24.4%, rgb(19, 30, 37) 24.5%, rgb(19, 30, 37) 66%)"
                    textAlign="center"
                    borderRadius="10px"
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
                            // console.log(item.value);
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
                          background="linear-gradient(to right, #868f96 0%, #596164 100%)"
                          display={"flex"}
                          justifyContent={"space-around"}
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(-180deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handelBet("Player1")}
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
                          background="linear-gradient(to right, #868f96 0%, #596164 100%)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(-180deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          display={"flex"}
                          justifyContent={"space-around"}
                          onClick={() => handelBet("Player2")}
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
                  <Text align={"center"} color={"black"}>
                    Pair Plus
                  </Text>
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
                          background="linear-gradient(to right, #868f96 0%, #596164 100%)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(-180deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handelBet("PairPlus1")}
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
                            <span>playerA</span> <span>3</span>
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
                          background="linear-gradient(to right, #868f96 0%, #596164 100%)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(-180deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handelBet("PairPlus2")}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          Player B */}
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
                            <span>playerB</span> <span>3</span>
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
