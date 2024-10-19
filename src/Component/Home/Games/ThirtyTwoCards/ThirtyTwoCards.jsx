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
const socket = io("https://three2cardsbackend-web.onrender.com/", {
  query: {
    userID: userId,
  },
  transports: ["websocket"],
});

export default function ThirtyTwoCards() {
  const [timer, setTimer] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [userId, setUserId] = useState("");
  const [matchId, setMatchId] = useState("");
  const [gameCard, setGameCard] = useState([]);
  const [gameCardValue, setGameCardValue] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [winStatus, setWinStatus] = useState("");
  const [coins, setCoins] = useState("");
  const [selectedCoins, setSelectedCoins] = useState("");
  const [docID, setDocId] = useState("");
  const [bettingAmount, setBettingAmount] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState();

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
  }, [ localStorage.getItem("userId")]);

  useEffect(() => {
    const handelTimer = (data) => {
      // console.log("timer", data);
      setTimer(data.timer);
      data.timer >= 44 ? setBettingAmount(0) : "";
      const isDisabled = data?.timer <= 25;
      setButtonDisabled(isDisabled);
    };

    const handelUserDetails = (data) => {
      console.log("userDetails", data);
      setAvailableBalance(data.userdata.coins);
      setUserId(data.userdata.mobileNumber);
    };

    const handelGameCreate = (data) => {
      console.log("gameCreate", data);
      setMatchId(data.gameCard.gameid);
      setGameCard(data.gameCard.Cards);
      setGameCardValue(data.gameCard.Cards);
      setGameHistory(data.gameHistory);
      setWinStatus(data.gameCard.winstatus);
      setDocId(data.gameCard._id);
    };

    const handelGameResult = (data) => {
      console.log("gameResult", data);
      setGameCard(data.gameCard.Cards);
      setWinStatus(data.gameCard.winstatus);
    };

    const handelGameUserCoin = (data) => {
      console.log("gameUserCoin", data);
    };

    const handelUserBalanceUpdate = (data) => {
      console.log("gameUserBalanceUpdate", data);
      setAvailableBalance(data.userData.coins);
      setUserId(data.userData.userId);
    };

    socket.on("timer", handelTimer);
    socket.on("userDetails", handelUserDetails);
    socket.on("game:create", handelGameCreate);
    socket.on("game:result", handelGameResult);
    socket.on("game:user-coin", handelGameUserCoin);
    socket.on("UserBalanceUpdate", handelUserBalanceUpdate);

    return () => {
      socket.off("timer", handelTimer);
      socket.off("userDetails", handelUserDetails);
      socket.off("game:create", handelGameCreate);
      socket.off("game:result", handelGameResult);
      socket.off("game:user-coin", handelGameUserCoin);
      socket.off("UserBalanceUpdate", handelUserBalanceUpdate);
    };
  }, []);
  if (timer === 10) {
    socket.emit("getUserBalanceUpdate", userId);
  }

  const handleBetting = (baitType) => {
    if (availableBalance < 0) {
      alert("Insufficient amount");
      return;
    }
    if (availableBalance > coins) {
      const data = {
        baitType,
        coins,
        gameId: docID,
      };

      console.log("betting", baitType, coins, docID);
      setBettingAmount((prev) => prev + Number(coins));

      socket.emit("bait", data);
      console.log("bet", data);
    } else alert("Selected Betting Amount is greater than Balance.")
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
                    32 Cards
                  </Text>
                  <Button
                    variant="outline"
                    bg={"lightblue"}
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
                    backgroundImage="url('/32Cards/32-Card.webp')"
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
                      background="linear-gradient(109.5deg, rgb(13, 11, 136) 9.4%, rgb(86, 255, 248) 78.4%)"
                    >
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
                      background="linear-gradient(109.5deg, rgb(13, 11, 136) 9.4%, rgb(86, 255, 248) 78.4%)"
                      marginRight={"1rem"}
                    >
                      {timer - 25 <= 0 ? "0" : timer - 25}
                    </Box>

                    <Box
                      position={"absolute"}
                      // border={"1px solid red"}
                      width={"44.2%"}
                      height={"23%"}
                      top={"67.2%"}
                      right={"28.7%"}
                    >
                      <Box
                        // border={"1px solid yellow"}
                        width={"100%"}
                        height={"40%"}
                        position={"absolute"}
                        top={"0%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Box
                          // border={"1px solid blue"}
                          width={"42%"}
                          height={"100%"}
                          display={"flex"}
                          justifyContent={"space-between"}
                        >
                          <Box
                            // border={"1px solid black"}
                            width={"30%"}
                          >
                            {timer <= 20
                              ? gameCard[0] && (
                                  <Image
                                    src={`/cards/${gameCard[0]?.cardName}`}
                                    alt="0"
                                    width={"100%"}
                                    height={"100%"}
                                  />
                                )
                              : ""}
                          </Box>
                          <Box
                            // border={"1px solid black"}
                            width={"30%"}
                          >
                            {timer <= 18
                              ? gameCard[1] && (
                                  <Image
                                    src={`/cards/${gameCard[1]?.cardName}`}
                                    alt="0"
                                    width={"100%"}
                                    height={"100%"}
                                  />
                                )
                              : ""}
                          </Box>
                        </Box>
                        <Box
                          // border={"1px solid blue"}
                          width={"42%"}
                          height={"100%"}
                          display={"flex"}
                          justifyContent={"space-between"}
                        >
                          <Box
                            // border={"1px solid black"}
                            width={"30%"}
                          >
                            {timer <= 16
                              ? gameCard[2] && (
                                  <Image
                                    src={`/cards/${gameCard[2]?.cardName}`}
                                    alt="0"
                                    width={"100%"}
                                    height={"100%"}
                                  />
                                )
                              : ""}
                          </Box>
                          <Box
                            // border={"1px solid black"}
                            width={"30%"}
                          >
                            {timer <= 14
                              ? gameCard[3] && (
                                  <Image
                                    src={`/cards/${gameCard[3]?.cardName}`}
                                    alt="0"
                                    width={"100%"}
                                    height={"100%"}
                                  />
                                )
                              : ""}
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        // border={"1px solid yellow"}
                        width={"100%"}
                        height={"32%"}
                        position={"absolute"}
                        bottom={"0%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Box
                          // border={"1px solid blue"}
                          width={"42%"}
                          height={"100%"}
                          display={"flex"}
                          justifyContent={"space-between"}
                        >
                          <Box
                            // border={"1px solid black"}
                            width={"30%"}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <Text>
                              {timer <= 20 && gameCardValue[0]?.value
                                ? gameCardValue[0]?.value
                                : "0"}
                            </Text>
                          </Box>
                          <Box
                            // border={"1px solid black"}
                            width={"30%"}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <Text>
                              {timer <= 18 && gameCardValue[1]?.value
                                ? gameCardValue[1]?.value
                                : "0"}
                            </Text>
                          </Box>
                        </Box>
                        <Box
                          // border={"1px solid blue"}
                          width={"42%"}
                          height={"100%"}
                          display={"flex"}
                          justifyContent={"space-between"}
                        >
                          <Box
                            // border={"1px solid black"}
                            width={"30%"}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <Text>
                              {timer <= 16 && gameCardValue[2]?.value
                                ? gameCardValue[2]?.value
                                : "0"}
                            </Text>
                          </Box>
                          <Box
                            // border={"1px solid black"}
                            width={"30%"}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <Text>
                              {timer <= 14 && gameCardValue[3]?.value
                                ? gameCardValue[3]?.value
                                : "0"}
                            </Text>
                          </Box>
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
                      color: "#8ef6e4",
                    }}
                  >
                    <>
                      Player Id :
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
                      color: "#8ef6e4",
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
                        bg={"#00bbf0"}
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
                      color: "#8ef6e4",
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
                    background="linear-gradient(109.5deg, rgb(13, 11, 136) 9.4%, rgb(86, 255, 248) 78.4%)"
                    // backgroundColor="#739966"
                    border={"3px solid black"}
                    textAlign="center"
                    borderRadius="10px"
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
                    flex="1"
                    width="48%"
                    border={"3px solid black"}
                    background="linear-gradient(109.5deg, rgb(13, 11, 136) 9.4%, rgb(86, 255, 248) 78.4%)"
                    // backgroundColor="#739966"
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
                        color: "#8ef6e4",
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
                          background="linear-gradient(181deg, rgb(2, 0, 97) 15%, rgb(97, 149, 219) 158.5%)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "radial-gradient(circle at -2.2% -3.8%, rgba(255, 227, 2, 0.41) 0%, rgb(59, 188, 241) 100.2%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(8, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
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
                            <Text color="black">
                              Player8 <span>1.98</span>
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
                          background="linear-gradient(181deg, rgb(2, 0, 97) 15%, rgb(97, 149, 219) 158.5%)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "radial-gradient(circle at -2.2% -3.8%, rgba(255, 227, 2, 0.41) 0%, rgb(59, 188, 241) 100.2%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(9, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
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
                            <Text color="black">
                              Player9 <span>1.98</span>
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
                          background="linear-gradient(181deg, rgb(2, 0, 97) 15%, rgb(97, 149, 219) 158.5%)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "radial-gradient(circle at -2.2% -3.8%, rgba(255, 227, 2, 0.41) 0%, rgb(59, 188, 241) 100.2%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(10, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
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
                            <Text color="black">
                              Player10 <span>1.98</span>
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
                          background="linear-gradient(181deg, rgb(2, 0, 97) 15%, rgb(97, 149, 219) 158.5%)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "radial-gradient(circle at -2.2% -3.8%, rgba(255, 227, 2, 0.41) 0%, rgb(59, 188, 241) 100.2%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(11, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
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
                            <Text color="black">
                              Player11 <span>1.98</span>
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
