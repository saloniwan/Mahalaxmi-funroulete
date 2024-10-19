import "./TwoCardspatti.css";

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
import TwoCard from "../../Games/Images/2 card 3 patti new.svg";
import TwoCardPattiBG from "../../../images/2cardpattibg.svg";
import { io } from "socket.io-client";

const userId = localStorage.getItem("userId");
const socket = io("https://twocardtp-web.onrender.com/", {
  query: {
    userId: userId,
  },
  transports: ["websocket"],
});

export default function TwoCardsTeenPatti() {
  const [countdown, setCountdown] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState("10");
  const [playerHands, setPlayerHands] = useState([]);
  const [winner, setWinner] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [playerId, setPlayerId] = useState("");
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [isButtonDisabled, setButtonDisabled] = useState();

  const [currentBet, setCurrentBet] = useState(0);
  useEffect(() => {
    const userID = localStorage.getItem("userId");
    if (userID) {
      socket.io.opts.query.userId = userID;
      socket.disconnect();
      socket.connect();
    }
  }, [localStorage.getItem("userId")]);
  //
  useEffect(() => {
    const handleDealCards = (data) => {
      // console.log(data, "playerHands123");
      // handleGetBalance();
      console.log(data, "cardss");
      // setTimeout(() => {
      //   handleGetBalance();
      // }, 10000);
      handleGetBalance();
      // setgameHistory(data.winHistory);
      const winner = data.winner;

      // console.log("Received dealt cards:", data);
      // console.log(data , "data")
      if (data.playerHands) {
        setPlayerHands(data.playerHands);
        setWinner(winner);

        // Extracting Player A and Player B cards separately
        const { PlayerA, PlayerB } = data.playerHands;
        setPlayer1Cards(PlayerA || []);
        setPlayer2Cards(PlayerB || []);
      } else {
        console.log("Player hands not found in data:", data);
      }
    };

    const handleNewBet = (bet) => {
      console.log("Received new bet:", bet);
      setSelectedChoice(bet.choice);
      // setPlayerid(bet._id);
      console.log(bet._id, "bet._id");

      console.log(bet?.Total);
    };

    const handleNewRound = () => {
      //   console.log("Starting a new round");
      setSelectedChoice(null);
      setPlayerHands([]);
    };

    const handleWinHistory = (data) => {
      // console.log("Received win history:", data);
      if (data && data.winStatuses) {
        setGameHistory(data.winStatuses);
      } else {
        console.error("Invalid or missing win history data.");
      }
    };

    const handleCountdown = (data) => {
      const isDisabled = data?.countdown <= 25;
      data.countdown >= 44 ? setCurrentBet(0) : "";
      setButtonDisabled(isDisabled);
      // console.log("data:", data.countdown);
      setCountdown(data.countdown);
    };
    const handleBalanceUpdate = (data) => {
      console.log("Received balance update:", data);
      setUserBalance(data.balance);
    };

    const handleGetBalance = () => {
      socket.emit("getBalance");
      console.log();
    };
    const handleuser = (data) => {
      setPlayerId(data.user.mobileNumber);
      setUserBalance(data.user.coins);
      // console.log("data123", data);
    };
    const handleGameId = (data) => {
      // console.log("Received GameId:", data.gameId);
      setGameId(data.gameId);
    };
    handleGetBalance();
    socket.on("countdown", handleCountdown);
    socket.on("dealCards", handleDealCards);
    socket.on("getuser", handleuser);
    socket.on("newBet", handleNewBet);
    socket.on("newRound", handleNewRound);
    socket.on("balanceUpdate", handleBalanceUpdate);
    socket.on("WinHistory", handleWinHistory);
    socket.on("gameId", handleGameId);
    // socket.on("dealCards", handleDealCards);

    return () => {
      socket.off("dealCards", handleDealCards);
      socket.off("countdown", handleCountdown);
      socket.off("newBet", handleNewBet);
      socket.off("newRound", handleNewRound);
      socket.off("balanceUpdate", handleBalanceUpdate);

      socket.off("getuser", handleuser);
      socket.off("WinHistory", handleWinHistory);
      socket.off("gameId", handleGameId);
    };
  }, []);
  const handlePlaceBet = (selectedChoice) => {
    if (userBalance === 0) {
      alert("Insufficient Fund");
      return;
    }
    const coins = parseInt(selectedCoin);
    if (userBalance > coins) {
      socket.emit("placeBet", { selectedChoice, coins });
      console.log("placeBet", { selectedChoice, coins });
      setCurrentBet((prev) => prev + coins);
    } else {
      alert("Betting Amount is greater than Balances.");
    }
  };

  // if (userBalance < coins) {
  //   const isDisabled = userBalance < coins;
  //   setButtonDisabled(isDisabled);
  //   alert("Betting Amount is less than Balances.");
  // }
  return (
    <>
      <ChakraProvider>
        <Box
        //  className="mainbox2cardspatti"
        // width={["108%", "100%"]}
        // overflow={'hidden'}
        // border={"2px solid green"}
        >
          <Box
            backgroundImage={TwoCardPattiBG}
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
                    2 Cards Teen Patti
                  </Text>
                  <Button
                    variant="outline"
                    colorScheme="blue"
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
                    backgroundImage={TwoCard}
                    backgroundSize="cover"
                    backgroundPosition={`center 100%`}
                    backgroundRepeat="no-repeat"
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="top"
                    color="white"
                    className="firstBox"
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
                      // background="linear-gradient(to bottom right, violet, blue)"
                      background="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                    >
                      {/* {countdown <= 25 ? "Freeze" : "Place  Bet"}
                      {countdown <= 8 ? "Winner : " + winner : "Loading"} */}
                      {countdown <= 8
                        ? "Winner: " + winner
                        : countdown <= 25
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
                      background=" linear-gradient(to bottom right, #640E18, #CC1D31,#DAA520)"
                      marginRight={"1rem"}
                      color="white"
                    >
                      {/* {Math.max(0, countdown) !== null && (
                        <p>{Math.max(0, countdown - 25)}</p>
                      )} */}
                      {countdown - 25 <= 0 ? "0" : countdown - 25}
                    </Box>

                    <Box
                      // border={"1px solid red"}
                      width={"40%"}
                      height={"10%"}
                      position={"absolute"}
                      top={"68%"}
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Box
                        // border={"1px solid black"}
                        width={"34%"}
                        height={"97%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        flexDirection={"row"}
                      >
                        <Box
                          // border={"1px solid yellow"}
                          width={"39%"}
                          height={"100%"}
                          overflow={"hidden"}
                        >
                          {countdown <= 19 && (
                            <Box>
                              {player1Cards[0] ? (
                                <Image
                                  src={`/cards/${player1Cards[0]}`}
                                  width={"100%"}
                                  height={"100%"}
                                />
                              ) : (
                                ""
                              )}
                            </Box>
                          )}
                        </Box>
                        <Box
                          // border={"1px solid yellow"}
                          width={"40%"}
                          height={"100%"}
                          overflow={"hidden"}
                        >
                          {countdown <= 17 && (
                            <Box>
                              {player1Cards[1] ? (
                                <Image
                                  src={`/cards/${player1Cards[1]}`}
                                  width={"100%"}
                                  height={"100%"}
                                />
                              ) : (
                                ""
                              )}
                            </Box>
                          )}
                        </Box>
                      </Box>
                      <Box
                        // border={"1px solid yellow"}
                        width={"34%"}
                        height={"100%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        flexDirection={"row"}
                      >
                        <Box
                          // border={"1px solid blue"}
                          width={"41%"}
                          height={"100%"}
                          overflow={"hidden"}
                        >
                          {countdown <= 18 && (
                            <Box>
                              {player2Cards[0] ? (
                                <Image
                                  src={`/cards/${player2Cards[0]}`}
                                  width={"100%"}
                                  height={"100%"}
                                />
                              ) : (
                                ""
                              )}
                            </Box>
                          )}
                        </Box>
                        <Box
                          // border={"1px solid blue"}
                          width={"41%"}
                          height={"100%"}
                          overflow={"hidden"}
                        >
                          {countdown <= 16 && (
                            <Box>
                              {player2Cards[1] ? (
                                <Image
                                  src={`/cards/${player2Cards[1]}`}
                                  width={"100%"}
                                  height={"100%"}
                                />
                              ) : (
                                ""
                              )}
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
                      color: "transparent",
                    }}
                  >
                    <>
                      Player Id :{" "}
                      <Text color={"white"} align={"center"}>
                        {playerId ? playerId : "Loading..."}
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
                      color: "transparent",
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
                        bg={"white"}
                      >
                        <Text
                          fontSize="18px"
                          color={index % 2 === 0 ? "red" : "red"}
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
                      color: "transparent",
                    }}
                  >
                    <>
                      Last Bet Amount :
                      <Text color={"white"} align={"center"}>
                        {currentBet}
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
                  border="3px solid #333"
                  borderRadius="10px"
                  justifyContent={"center"}
                  alignItems={"center"}
                  textAlign={"center"}
                  ml={{ base: "0.6rem" }}
                >
                  <Box
                    flex="1"
                    width="48%"
                    backgroundColor="white"
                    textAlign="center"
                    borderRadius="10px"
                  >
                    <Text fontSize={["18px", "18px"]} fontWeight="bold">
                      Available Credit
                    </Text>
                    <Text fontSize={["20px", "24px"]}>
                      {Math.round(userBalance * 100) / 100
                        ? Math.round(userBalance * 100) / 100
                        : "0"}
                    </Text>
                  </Box>

                  <Box
                    flex="1"
                    width="48%"
                    backgroundColor="orange"
                    textAlign="center"
                    borderRightRadius="10px"
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
                          bgGradient="linear(to-r, #0000FF, #FFA500)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#FAEBD7",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handlePlaceBet("PlayerA")}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          Player A */}
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
                            {" "}
                            <span>player A-</span>
                            <span>1.98</span>
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
                          bgGradient="linear(to-r, #0000FF, #FFA500)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#FAEBD7",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handlePlaceBet("PlayerB")}
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
                            {" "}
                            <span>player B-</span>
                            <span>1.98</span>
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
