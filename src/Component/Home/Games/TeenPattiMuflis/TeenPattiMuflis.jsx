import "./TeenPattiMuflis.css";

import {
  AspectRatio,
  Box,
  Button,
  ChakraProvider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { FaLock } from "react-icons/fa";
import TeenPattiMuflisBg from "../../../images/3pattimuflisbg.svg";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

//import PopUp from "./PopUp";
// import Logo from "../../../images/32cardsA_v.jpeg";
//  import backGroundImage from "./images/background_plus_cards.jpeg"
const userId = localStorage.getItem("userId");
const socket = io("https://muflisteenpattibackend-web.onrender.com/", {
  query: {
    userID: userId,
  },
  transports: ["websocket"],
});

export default function TeenPattiMuflis() {
  //  const location =  useLocation ()
  // console.log("data",location?.data?.userDetails)
  const [timer, setTimer] = useState("");
  const [coins, setCoins] = useState("");
  const [user, setUser] = useState("");
  const [mainCard, setMainCard] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState(null);
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [isButtonDisabled, setButtonDisabled] = useState();
  const [bettingAmount, setBettingAmount] = useState("");

  // const userIDRef = useRef(localStorage.getItem("userId"));

  // useEffect(() => {
  //   const userID = localStorage.getItem("userId");
  //   userIDRef.current = userID;
  //   if (userID) {
  //     connectSocket(userID);
  //   }
  // }, []);

  // const connectSocket = (userID) => {
  //   socket.io.opts.query.userID = userID;

  //   socket.io.on("reconnect_attempt", () => {
  //     socket.io.opts.query.userID = userID;
  //   });
  // };

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
    const handelTimer = (data) => {
      setTimer(data.gamestate);
      // console.log("Timer", data.gamestate);
      data.gamestate.value - 25 === 20 ? setBettingAmount(0) : "";
      const isDisabled = data.gamestate.value - 25 <= 0;
      setButtonDisabled(isDisabled);
    };
    const handelUserDetails = (data) => {
      console.log("UserDetails", data);
      setUser(data.user);
    };

    const handelCards = (data) => {
      setMainCard(data.gameCard);
      setPlayer1Cards(data.gameCard.player1Cards);
      setPlayer2Cards(data.gameCard.player2Cards);
      setGameHistory(data.gameHistory);
      // setUser(data.gameCard)
      console.log("Cards", data);
    };

    socket.on("gameUpdate", handelTimer);
    socket.on("userDetails", handelUserDetails);
    socket.on("Main_Card", handelCards);
    return () => {
      socket.off("gameState", handelTimer);
      socket.off("userDetails", handelUserDetails);
      socket.off("Main_Card", handelCards);
    };
  }, []);

  if (timer?.value === 3) {
    socket.emit("getUpdatedUserDetails");
  }

  const handelBet = (betType) => {
    if (user?.coins === 0) {
      alert("Insufficient Fund");
      return;
    }
    if (user?.coins > coins) {
      const bet = {
        betType,
        coins,
        cardId: mainCard._id,
      };
      socket.emit("bet", bet);
      console.log("bet", bet);
      setBettingAmount((prev) => prev + Number(coins));
    } else alert("Betting Amount is greater than Balance.");

    // console.log("betType", bet.betType);
    // console.log("coins", bet.coins);
  };

  return (
    <>
      <ChakraProvider>
        <Box
        // className="teenpattimuflismainbox"
        // width={["100%", "100%"]}
        >
          <Box
            // backgroundImage={TeenPattiMuflisBg}
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
                    Muflis Teen Patti
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
                    backgroundImage="url('/MuflisTeenPatti/MuflisTeenPatti.webp')"
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
                      color="black"
                      background="linear-gradient(108.1deg, rgb(167, 220, 225) 11.2%, rgb(217, 239, 242) 88.9%)"
                    >
                      {timer?.value <= 8
                        ? "Winner: " + mainCard?.winstatus
                        : timer?.value <= 25
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
                      background="linear-gradient(108.1deg, rgb(167, 220, 225) 11.2%, rgb(217, 239, 242) 88.9%)"
                      marginRight={"1rem"}
                      color="black"
                    >
                      {timer?.value - 25 <= 0 ? "0" : timer?.value - 25}
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
                        // border={"1px solid orange"}
                        width={"41%"}
                        height={"97%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        flexDirection={"row"}
                      >
                        <Box
                          // border={"1px solid yellow"}
                          width={"25%"}
                          height={"100%"}
                        >
                          {timer?.value <= 19 && (
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
                          width={"25%"}
                          height={"100%"}
                        >
                          {timer?.value <= 17 && (
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
                        >
                          {timer?.value <= 15 && (
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
                        // border={"1px solid yellow"}
                        width={"41.8%"}
                        height={"100%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        flexDirection={"row"}
                      >
                        <Box
                          // border={"1px solid blue"}
                          width={"25%"}
                          height={"100%"}
                        >
                          {timer?.value <= 18 && (
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
                          // border={"1px solid blue"}
                          width={"25%"}
                          height={"100%"}
                        >
                          {timer?.value <= 16 && (
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
                          // border={"1px solid blue"}
                          width={"25%"}
                          height={"100%"}
                        >
                          {timer?.value <= 14 && (
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
                    fontWeight={"700"}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #A52A2A, #FF8C00)",
                      WebkitBackgroundClip: "text",
                      color: "white",
                    }}
                  >
                    <>
                      Player Id :
                      <Text color={"yellow"} align={"center"}>
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
                      color: "white",
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
                          fontSize="14px"
                          color={index % 2 === 0 ? "black" : "black"}
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
                      color: "white",
                    }}
                  >
                    <>
                      Last Bet Amount :
                      <Text color={"yellow"} align={"center"}>
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
                    background="linear-gradient(99.6deg, rgb(112, 128, 152) 10.6%, rgb(242, 227, 234) 32.9%, rgb(234, 202, 213) 52.7%, rgb(220, 227, 239) 72.8%, rgb(185, 205, 227) 81.1%, rgb(154, 180, 212) 102.4%)"
                    textAlign="center"
                    borderRadius="10px"
                    border="3px solid #333"
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
                    background="linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)"
                    textAlign="center"
                    borderRadius="10px"
                    border="3px solid #333"
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
                          color="black"
                          fontWeight="800"
                          borderRadius="20%"
                          background="linear-gradient(109.6deg, rgb(156, 252, 248) 11.2%, rgb(110, 123, 251) 91.1%)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(110.2deg, rgb(99, 192, 227) 5.3%, rgb(98, 72, 194) 100.2%)",

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
                            <span>player A</span> <span>1.98</span>
                          </Text>
                        </Button>

                        <Button
                          isDisabled={isButtonDisabled}
                          // {<FaLock isDisabled={isButtonDisabled} />}
                          width="90%"
                          height={["50%", "80%"]}
                          marginLeft="1rem"
                          color="black"
                          fontWeight="800"
                          borderRadius="20%"
                          background="linear-gradient(109.6deg, rgb(156, 252, 248) 11.2%, rgb(110, 123, 251) 91.1%)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(110.2deg, rgb(99, 192, 227) 5.3%, rgb(98, 72, 194) 100.2%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
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
                            <span>player B</span>
                            <span>1.98</span>
                          </Text>
                        </Button>
                      </Box>
                    </Box>
                  </Flex>
                  <Text
                    fontSize={"1.2rem"}
                    fontWeight={"700"}
                    align={"center"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    color={"white"}
                    ml={{ base: "3rem", md: "0rem" }}
                  >
                    Pair Plus Bet
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
                          color="black"
                          fontWeight="800"
                          borderRadius="20%"
                          bgGradient="linear(to-tr, #FFFFFF, #9A6525)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(110.2deg, rgb(99, 192, 227) 5.3%, rgb(98, 72, 194) 100.2%)",
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
                            <span>player A-</span> <span>3</span>
                          </Text>
                        </Button>

                        <Button
                          isDisabled={isButtonDisabled}
                          // {<FaLock isDisabled={isButtonDisabled} />}
                          width="90%"
                          height={["50%", "80%"]}
                          marginLeft="1rem"
                          color="black"
                          fontWeight="800"
                          borderRadius="20%"
                          bgGradient="linear(to-tr, #FFFFFF, #9A6525)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(110.2deg, rgb(99, 192, 227) 5.3%, rgb(98, 72, 194) 100.2%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handelBet("PairPlus2")}
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
                            <span>player B-</span>
                            <span>3</span>
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
