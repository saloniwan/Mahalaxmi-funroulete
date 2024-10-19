import "./HighCard.css";

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
const socket = io("https://highcardsbackend-web.onrender.com/", {
  query: {
    userID: userId,
  },
  transports: ["websocket"],
});

export default function HighCard() {
  const [timer, setTimer] = useState("");
  const [availableCoins, setAvailableCoins] = useState("");
  const [userId, setUserId] = useState("");
  const [matchId, setMatchId] = useState("");
  const [cards, setCards] = useState([]);
  const [winStatus, setWinStatus] = useState("");
  const [gameHistory, setGameHistory] = useState([]);
  const [coins, setCoins] = useState("");
  const [selectedCoins, setSelectedCoins] = useState("");
  const [docID, setDocId] = useState("");
  // const [buttonClick, setButtonClick] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState();
  const [bettingAmount, setBettingAmount] = useState("");

  useEffect(() => {
    const userID = localStorage.getItem("userId");
    if (userID) {
      socket.io.opts.query.userID = userID;

      // socket.connect();
      // return () => {
      //   socket.disconnect();
      // };
      socket.io.on("reconnect_attempt", () => {
        socket.io.opts.query.userID;
      });
    }
  }, [localStorage.getItem("userId")]);

  useEffect(() => {
    const handelTimer = (data) => {
      // console.log("timer", data.timer);
      const isDisabled = data?.timer <= 25;
      setTimer(data.timer);
      data.timer >= 44 ? setBettingAmount(0) : "";
      setButtonDisabled(isDisabled);
    };

    const handelUserDetails = (data) => {
      console.log("userDetails", data);
      setAvailableCoins(data.userData.coins);
      setUserId(data.userData.mobileNumber);
    };

    const handelGameCreate = (data) => {
      console.log("gameCreate", data);
      setMatchId(data.gameCard.gameid);
      setCards(data.gameCard.Cards);
      setWinStatus(data.gameCard.winstatus);
      setDocId(data.gameCard._id);
      setGameHistory(data.gameHistory);
    };

    // const handelGameHistory = (data) => {
    //   console.log("gameHistory", data);
    //   setGameHistory(data);
    // };

    const handelGameResult = (data) => {
      console.log("gameResult", data);
      setCards(data.gameCard.Cards);
      setWinStatus(data.gameCard.winstatus);
    };

    const handelGameUserCoin = () => {
      // console.log("gameUserCoin", data);
    };

    const handelUserBalanceUpdate = (data) => {
      console.log("gameUserBalanceUpdate", data);
      setAvailableCoins(data.User.coins);
      setUserId(data.User.userId);
    };

    socket.on("timer", handelTimer);
    socket.on("userDetails", handelUserDetails);
    socket.on("game:create", handelGameCreate);
    // socket.on("game:history", handelGameHistory);
    socket.on("game:result", handelGameResult);
    socket.on("game:user-coin", handelGameUserCoin);
    socket.on("UserBalanceUpdate", handelUserBalanceUpdate);

    return () => {
      socket.off("timer", handelTimer);
      socket.off("userDetails", handelUserDetails);
      socket.off("game:create", handelGameCreate);
      // socket.off("game:history", handelGameHistory);
      socket.off("game:result", handelGameResult);
      socket.off("game:user-coin", handelGameUserCoin);
      socket.off("UserBalanceUpdate", handelUserBalanceUpdate);
    };
  }, []);

  if (timer === 10) {
    socket.emit("getUserBalanceUpdate", userId);
  }

  const handleBetting = (baitType) => {
    if (availableCoins === 0) {
      alert("Insufficient amount");
      return;
    }
    if (availableCoins > coins) {
      const data = {
        baitType,
        coins,
        gameId: docID,
      };
      socket.emit("bait", data, (err, res) => {
        if (err) {
          console.log("error", err);
        } else {
          console.log("response", res);
        }
      })
      console.log("bet", data);
      setBettingAmount((prev) => prev + Number(coins));
    } else alert("Betting Amount is greater than Balance.");
  };

  return (
    <>
      <ChakraProvider>
        <Box width={["100%", "100%"]}>
          <Box
            //  bg={"#1f2e2e"}
            // bgGradient="linear(to-t, #273737, #1f2e2e)"
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
                    High Cards
                  </Text>
                  <Button
                    variant="outline"
                    bg={"white"}
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
                    backgroundImage="url('/HighCard/HighCard.webp')"
                    backgroundSize="cover"
                    backgroundPosition={`center 100%`}
                    backgroundRepeat="no-repeat"
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="top"
                    color="white"
                    className="firstBox"
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
                      // background="linear-gradient(to bottom right, violet, blue)"
                      // background="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                      background="linear-gradient(to bottom right, #BDB76B, #FFFFFF)"
                    >
                      {/* {countdown <= 25 ? "Freeze" : "Place  Bet"}
                      {countdown <= 8 ? "Winner : " + winner : "Loading"} */}
                      {timer <= 8
                        ? "Winner: " + winStatus
                        : timer <= 25
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
                      color="black"
                      // background="linear-gradient(to bottom right, violet, blue)"
                      // background="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                      background="linear-gradient(to bottom right, #BDB76B, #FFFFFF)"
                      marginRight={"1rem"}
                    >
                      {timer - 25 <= 0 ? "0" : timer - 25}
                    </Box>
                    <Box
                      // border={"1px solid red"}
                      width={"21.5%"}
                      height={"31.5%"}
                      position={"absolute"}
                      top={"61%"}
                      right={"40%"}
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Box
                        // border={"1px solid yellow"}
                        width={"28%"}
                        height={"100%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        flexDirection={"column"}
                      >
                        <Box
                          // border={"1px solid blue"}
                          width={"100%"}
                          height={"30%"}
                        >
                          {timer <= 14 && (
                            <>
                              <Image
                                src={`/cards/${cards[0]}`}
                                width={"100%"}
                                height={"100%"}
                              />
                            </>
                          )}
                        </Box>
                        <Box
                          // border={"1px solid blue"}
                          width={"100%"}
                          height={"30%"}
                        >
                          {timer <= 13 && (
                            <>
                              <Image
                                src={`/cards/${cards[1]}`}
                                width={"100%"}
                                height={"100%"}
                              />
                            </>
                          )}
                        </Box>
                        <Box
                          // border={"1px solid blue"}
                          width={"100%"}
                          height={"30%"}
                        >
                          {timer <= 12 && (
                            <>
                              <Image
                                src={`/cards/${cards[2]}`}
                                width={"100%"}
                                height={"100%"}
                              />
                            </>
                          )}
                        </Box>
                      </Box>
                      <Box
                        // border={"1px solid yellow"}
                        width={"28%"}
                        height={"100%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        flexDirection={"column"}
                      >
                        <Box
                          // border={"1px solid blue"}
                          width={"100%"}
                          height={"30%"}
                        >
                          {timer <= 11 && (
                            <>
                              <Image
                                src={`/cards/${cards[3]}`}
                                width={"100%"}
                                height={"100%"}
                              />
                            </>
                          )}
                        </Box>
                        <Box
                          // border={"1px solid blue"}
                          width={"100%"}
                          height={"30%"}
                        >
                          {timer <= 10 && (
                            <>
                              <Image
                                src={`/cards/${cards[4]}`}
                                width={"100%"}
                                height={"100%"}
                              />
                            </>
                          )}
                        </Box>
                        <Box
                          // border={"1px solid blue"}
                          width={"100%"}
                          height={"30%"}
                        >
                          {timer <= 9 && (
                            <>
                              <Image
                                src={`/cards/${cards[5]}`}
                                width={"100%"}
                                height={"100%"}
                              />
                            </>
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
                        "linear-gradient(to right, #BDB76B, #FFFFFF)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    <>
                      Player Id :{" "}
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
                        "linear-gradient(to right, #BDB76B, #FFFFFF)",
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
                    justifyContent="center"
                    alignItems="center"
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
                        bg={"yellowgreen"}
                      >
                        <Text
                          fontSize="14px"
                          color={index % 2 === 0 ? "black" : "black"}
                          align={"center"}
                          justifyContent="center"
                          alignItems="center"
                          textAlign={"ceter"}
                        >
                          {`P${item}`}
                        </Text>
                      </Box>
                    ))}
                  </Flex>
                  <Box
                    //  bgGradient= "linear(to-r,#006400,)"
                    fontWeight={"700"}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #BDB76B, #FFFFFF)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
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
                  border="3px solid #333"
                  borderRadius="10px"
                >
                  <Box
                    flex="1"
                    width="48%"
                    backgroundColor="#739966"
                    border={"3px solid black"}
                    textAlign="center"
                    borderRadius="10px"
                  >
                    <Text fontSize={["18px", "18px"]} fontWeight="bold">
                      Available Credit
                    </Text>
                    <Text fontSize={["20px", "24px"]}>
                      {Math.round(availableCoins * 100) / 100
                        ? Math.round(availableCoins * 100) / 100
                        : "0"}
                    </Text>
                  </Box>

                  <Box
                    flex="1"
                    width="48%"
                    border={"3px solid black"}
                    backgroundColor="#739966"
                    textAlign="center"
                    borderRightRadius="10px"
                  >
                    <Text fontSize="18px" fontWeight="bold">
                      Match Id:
                    </Text>
                    <Text fontSize={["20px", "24px"]}>
                      {matchId ? matchId : "Loading..."}
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
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #BDB76B, #FFFFFF)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
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
                            //                   // console.log("coins", value)
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
                          // bgGradient="linear(to-r, #0000FF, #FFA500)"
                          bgGradient="linear(to-r,#006400, #FFFFFF)"
                          //  bgGradient: linear(to-r);

                          _hover={
                            !isButtonDisabled && {
                              bg: "#006400",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(0, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "black", marginRight: "0.5rem" }}
                            />
                          )}
                       <Text color="black">  P1 <span>5.88</span></Text>  */}
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
                            <Text color="black">
                              {" "}
                              P1 <span>5.88</span>
                            </Text>
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
                          bgGradient="linear(to-r,#006400, #FFFFFF)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#006400",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(1, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "black", marginRight: "0.5rem" }}
                            />
                          )}
                    <Text color="black">  P2 <span>5.88</span></Text>  */}
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
                            <Text color="black">
                              {" "}
                              P2 <span>5.88</span>
                            </Text>
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
                          bgGradient="linear(to-r,#006400, #FFFFFF)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#006400",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(2, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "black", marginRight: "0.5rem" }}
                            />
                          )}
                           <Text color="black">  P3 <span>5.88</span></Text>  */}
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
                            <Text color="black">
                              {" "}
                              P3 <span>5.88</span>
                            </Text>
                          </Text>
                        </Button>
                      </Box>
                    </Box>
                  </Flex>
                  <Flex
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    padding="0rem"
                    width="111%"
                  >
                    <Box
                      marginTop={{ base: "-3rem", md: "1em" }}
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
                          bgGradient="linear(to-r,#006400, #FFFFFF)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#006400",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(3, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "black", marginRight: "0.5rem" }}
                            />
                          )}
                         <Text color="black">  P4 <span>5.88</span></Text>  */}
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
                            <Text color="black">
                              {" "}
                              P4 <span>5.88</span>
                            </Text>
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
                          bgGradient="linear(to-r,#006400, #FFFFFF)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#006400",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(4, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "black", marginRight: "0.5rem" }}
                            />
                          )}
                         <Text color="black">  P5 <span>5.88</span></Text>  */}
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
                            <Text color="black">
                              {" "}
                              P5 <span>5.88</span>
                            </Text>
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
                          bgGradient="linear(to-r,#006400, #FFFFFF)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#006400",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(5, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "black", marginRight: "0.5rem" }}
                            />
                          )}
                        <Text color="black">  P6 <span>5.88</span></Text>  */}
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
                            <Text>
                              {" "}
                              P6 <span>5.88</span>
                            </Text>
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
