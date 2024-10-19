import "./DragonTiger.css";

import {
  AspectRatio,
  Box,
  Button,
  ChakraProvider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import { FaLock } from "react-icons/fa";
import NoteIcon from "@mui/icons-material/Note";
import blackcolor from "/DragonTiger/blackcolordt.svg";
import diamond from "../../Games/Images/Rectangle.svg";
import flower from "../../Games/Images/Flower.svg";
import heart1 from "../../Games/Images/Heart1.svg";
import { io } from "socket.io-client";
import pann from "../../Games/Images/Pann.svg";
import redcolor from "/DragonTiger/redcolordt.svg";

const userId = localStorage.getItem("userId");
const socket = io("https://dragontigerbackend-web.onrender.com/", {
  query: {
    userID: userId,
  },
  transports: ["websocket"],
});

export default function DragonTiger() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  // const [seconds, setSeconds] = useState(30);
  const [gameState, setGameState] = useState({ value: "waiting" });
  const [user, setUser] = useState(null);
  const [playerid, setPlayerid] = useState(null);
  const [matchid, setMatchid] = useState(null);
  const [coins, setCoins] = useState(50);
  const [bettingAmount, setBettingAmount] = useState("");
  const [mainCard, setMainCard] = useState([]);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [gamehistory, setGamehistory] = useState([]);

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
    // Listen for game state updates from the server
    socket.on(
      "gameUpdate",
      (updatedGameState) => {
        setGameState(updatedGameState?.gamestate);
        updatedGameState.gamestate.value - 25 === 20 ? setBettingAmount(0) : "";
        const isDisabled = updatedGameState?.gamestate?.value <= 20;

        setButtonDisabled(isDisabled);
        // console.log(updatedGameState , "updatedGameState")
      },
      [gameState?.value]
    );

    socket.on("Main_Card", (data) => {
      setMainCard(data.mainCard);

      // console.log(data, "data");
    });
    socket.on("Main_Card", (data) => {
      setGamehistory(data.gameHistory);

      // console.log(data?.gameHistory, "data");
    });

    socket.on("userDetails", (data) => {
      console.log(data, "userdata");
      setUser(data.user);
    });

    socket.on("userDetails", (data) => {
      // console.log(data , "data");
      setPlayerid(data?.user?.mobileNumber);
      // console.log(data?.user?.mobileNumber , "mobilleno")
      // console.log(data , "mobilleno")
    });

    socket.on("userDetails", (data) => {
      console.log(data, "data");
      setMatchid(data?.user?._id);
    });

    socket.on("bet", (data) => {
      setUser(data);
      // console.log(data);
      // setUser(data.user);
    });

    // console.log(mainCard , "maincard");

    return () => {
      socket.off("bet", handleBet);
      socket.disconnect();
    };
  }, []);
  if (gameState?.value === 3) {
    socket.emit("getUpdatedUserDetails");
  }

  const handleBet = ({ betType, betOn, suit, color }) => {
    if (user?.coins > coins) {
      const bet = {
        betType,
        betOn,
        coins,
        suit: suit || "",
        color: color || "",
        cardId: mainCard._id,
      };
      console.log(bet);
      socket.emit("bet", bet);
      console.log("betting1234", betType, coins, mainCard._id);
      setBettingAmount((prev) => prev + coins);
    } else alert("Betting Amount is greater than coins.");
  };

  return (
    <>
      <Box
        //  position={"relative"}
        w={["100%", "100%"]}
        h={"auto"}
        m="0"
        p="0"
        mt={{ base: "0", md: "0" }}
      >
        <Flex direction="column">
          <Flex
            w="100%"
            h={{ base: "840px", md: "500px" }}
            display="flex"
            justifyContent="flex-start"
            direction={{ base: "column", md: "row" }}
          >
            <Flex
              w={{ base: "100%", md: "50%" }}
              h={{ base: "25rem", md: "100%" }}
              display="flex"
              justifyContent="space-between"
              direction="column"
            >
              <Box
                w="100%"
                h="15%"
                display="flex"
                direction="row"
                justifyContent="space-between"
                px="2"
                alignItems="center"
                py="2"
              >
                <Text as="h1" fontSize="20" fontWeight="bold" color="white">
                  Dragon Tiger
                </Text>
                <Button onClick={onOpen}>Rules</Button>
                <Modal
                  finalFocusRef={finalRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent
                    // width="86rem"
                    maxW={["90vw", "40vw"]}
                    maxH="60vh" // Set the maximum height to 80% of the viewport height
                    overflowY="auto" // Enable vertical scrollbar when content overflows
                    background="white"
                  >
                    <ModalHeader>
                      Dragon Tiger: Rules and Regulations
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {/* <Lorem count={2} /> */}
                      <Button bg={"#CF8D2E"} width={"10rem"}>
                        GAME OBJECTIVES
                      </Button>
                      <br />
                      To guess whether Dragon or Tiger wins. Player can also bet
                      whether the Dragon and Tiger cards will be of same value,
                      therefore a Tie.
                      <br /> <br />
                      <Button bg={"#CF8D2E"} width={"7rem"}>
                        GAME RULES:
                      </Button>
                      <br />
                      Hands dealt: 2 (Dragon, Tiger)
                      <br /> <br />
                      Bets: Higher card between hands win.
                      <br /> <br /> Tie (Rank only): If the Numbers are same on
                      both Hands.
                      <br /> <br /> Number Ranking: Lowest to highest: Ace, 2,
                      3, 4, 5, 6, 7,8, 9, 10, Jack, Queen and King (Ace is "1"
                      and King is "13").
                      <br />
                      <br />
                      <Button bg={"#CF8D2E"} width={"5rem"}>
                        PAYOUT
                      </Button>
                      <br />
                      <TableContainer>
                        <Table size="sm">
                          <Thead></Thead>
                          <Tbody>
                            <Tr>
                              <Td>Dragon</Td>
                              <Td>1 to 0.98</Td>
                            </Tr>
                            <Tr>
                              <Td>Tiger</Td>
                              <Td>1 to 0.98</Td>
                            </Tr>
                            <Tr>
                              <Td>Tie (Rank Only) </Td>
                              <Td>1 to 10</Td>
                            </Tr>

                            <Tr>
                              <Td>Even </Td>
                              <Td>1 to 1.1</Td>
                            </Tr>
                            <Tr>
                              <Td>Odd </Td>
                              <Td>1 to 0.8</Td>
                            </Tr>
                            <Tr>
                              <Td>Red</Td>
                              <Td>1 to 0.98</Td>
                            </Tr>
                            <Tr>
                              <Td>Red</Td>
                              <Td>1 to 0.98</Td>
                            </Tr>
                            <Tr>
                              <Td>Black</Td>
                              <Td>1 to 0.98</Td>
                            </Tr>
                            <Tr>
                              <Td>Suit</Td>
                              <Td>1 to 2.75</Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </ModalBody>

                    <ModalFooter></ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
              <Box
                w="100%"
                h="100%"
                // background={Gamingimage}
                // backgroundSize=" 100%"
                // backgroundRepeat="no-repeat"
                mb=""
                // bg="red"
                position={"relative"}
              >
                <Image
                  src="/DragonTiger/Dragon-tiger.webp"
                  w="100%"
                  h={{ base: "90%", md: "86%" }}
                  mt={{ base: "0px", md: "0" }}
                  pb={{ base: "3", md: "-0" }}
                  style={{ borderRadius: "10px" }}
                />
                <Flex
                  justifyContent="flex-start"
                  alignItems="center"
                  px="4"
                  w="100%"
                  h="100px"
                  position={"relative"}
                  top={{ base: "-80%", md: "-350px" }}
                  left={{ base: "0", md: "0%" }}
                  // bg="blue"
                >
                  {/* bet and timer  */}
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    direction={"row"}
                    w="100%"
                    h="4rem"
                    // bg="red"
                  >
                    <Box
                      fontWeight={"900"}
                      border={"1px solid white"}
                      borderRadius={"50%"}
                      // padding={"2px"}
                      // mt={{ base: "2rem", md: "0" }}
                      // ml={"1rem"}
                      // position={"relative"}
                      // top={{ base: "-106%", md: "-370px" }}
                      // left={{ base: "0", md: "-10%" }}
                      width={["25%", "18%"]}
                      height={["100%", "100%"]}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      fontSize={["sm", "lg"]}
                      color="white"
                      // background="linear-gradient(to bottom right, violet, blue)"
                      background="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                    >
                      {gameState?.value <= 8
                        ? "Winner: " + mainCard?.winstatus
                        : gameState?.value <= 25
                        ? "Freeze"
                        : "Place Bet"}
                      {/* {mainCard?.winCardSuit} */}
                    </Box>
                    <Box
                      fontWeight={"900"}
                      border={"1px solid white"}
                      borderRadius={"50%"}
                      // padding={"2px"}
                      // mt={"2rem"}
                      // ml={"1rem"}
                      // position={"relative"}
                      // top={{ base: "-106%", md: "-370px" }}
                      // left={{ base: "0", md: "8%" }}
                      width={["25%", "18%"]}
                      height={["100%", "100%"]}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      fontSize={["sm", "lg"]}
                      color="white"
                      background="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                    >
                      {gameState?.value - 25 <= 0 ? "0" : gameState?.value - 25}
                    </Box>
                  </Flex>
                </Flex>

                {/* cards display  */}

                <Box
                  // border={"1px solid red"}
                  position={"absolute"}
                  width={["44%", "44%"]}
                  height={["9.5%", "10%"]}
                  top={["65%", "64%"]}
                  right={["28%", "28%"]}
                  display={"flex"}
                  justifyContent={"space-between"}
                  flexDirection={"row"}
                >
                  <Box
                    // border={"1px solid orange"}
                    position={"absolute"}
                    width={"16%"}
                    height={"100%"}
                    // overflow={"hidden"}
                  >
                    {mainCard?.dragoncard && gameState?.value <= 14 && (
                      <Box>
                        <Image
                          src={`/cards/${mainCard?.dragoncard}`}
                          width={"100%"}
                          height={"100%"}
                        />
                      </Box>
                    )}
                  </Box>
                  <Box
                    // border={"1px solid orange"}
                    position={"absolute"}
                    width={"16%"}
                    height={"100%"}
                    right={"0%"}
                    // overflow={"hidden"}
                  >
                    {gameState?.value <= 12 && (
                      <Box>
                        <Image
                          src={`/cards/${mainCard?.tigercard}`}
                          width={"100%"}
                          height={"100%"}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Flex>

            <Flex
              w={{ base: "100%", md: "50%" }}
              h={{ base: "100%", md: "100%" }}
              position="relative"
              direction="column"
            >
              {/* last win and player id */}
              <Flex flexDirection={["column", "column"]} alignItems="center">
                <Button
                  bg={"black"}
                  fontWeight={"700"}
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #A52A2A, #FF8C00)",
                    WebkitBackgroundClip: "text",
                    color: "yellow",
                  }}
                >
                  <>
                    Player Id :
                    <Text color={"#bae8e8"} align={"center"}>
                      {playerid ? playerid : "Loading..."}
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
                    color: "yellow  ",
                  }}
                >
                  Last Wins:
                </Button>

                <Flex
                  width={["100%", "67%"]}
                  p={1}
                  flexWrap="wrap"
                  align={"center"}
                  textAlign={"center"}
                  justifyContent={"center"}
                >
                  {/* {gameHistory?.map((item, index) => ( */}
                  {gamehistory.map((item, index) => (
                    <Box
                      // key={index}
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
                        fontSize="20px"
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
                    color: "yellow",
                  }}
                >
                  <>
                    Last Bet Amount :
                    <Text color={"#bae8e8"} align={"center"}>
                      {bettingAmount}
                    </Text>
                  </>
                </Box>
              </Flex>
              <Flex
                justify="space-around"
                alignContent="center"
                w="100%"
                direction="row"
                gap={"1%"}
              >
                <Box
                  border={"5px solid gray"}
                  background="linear-gradient(179.7deg, rgb(197, 214, 227) 2.9%, rgb(144, 175, 202) 97.1%)"
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  width={"50%"}
                  borderRadius={"12%"}
                  p={"0.5rem"}
                >
                  <Text fontWeight={"500"} fontSize={["20px", "24px"]}>
                    Available Credit :
                  </Text>
                  <Text fontWeight={"500"} fontSize={["20px", "24px"]}>
                    {user?.coins && Math.max(0, user?.coins)}
                  </Text>
                </Box>

                <Box
                  flex="1"
                  width="50%"
                  background="linear-gradient(179.7deg, rgb(197, 214, 227) 2.9%, rgb(144, 175, 202) 97.1%)"
                  textAlign="center"
                  border={"5px solid gray"}
                  borderRadius={"12%"}
                >
                  <Text fontSize="18px" fontWeight="bold" color={"black"}>
                    Match Id:
                  </Text>
                  <Text fontSize={["20px", "24px"]} color={"black"}>
                    {matchid}
                  </Text>
                </Box>
                {/* </Box> */}
              </Flex>

              <Flex
                justify="space-around"
                alignContent="center"
                w="100%"
                direction="row"
                p="1"
                gap="2"
              >
                <Box width="100%">
                  <Flex flexDirection="column" alignItems="center">
                    <Text
                      fontSize="20px"
                      fontWeight="bold"
                      // marginLeft={["0.5rem"]}
                      mt={"1rem"}
                      color={"white"}
                    >
                      Place Your Bet
                    </Text>

                    <Flex
                      width={["94%", "70%"]}
                      flexWrap={["nowrap", "nowrap"]}
                      justifyContent={["center", "center"]}
                      marginTop={["1rem", "0"]}
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
                          margin={["rem", "0.9rem"]}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontWeight="bold"
                          borderRadius={"50%"}
                          // borderColor={'red'}
                          variant="unstyled"
                          _hover={{
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
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    padding="0rem"
                    width="100%"
                  >
                    <Box
                      width={["100%", "100%"]}
                      position="relative"
                      height={["8rem"]}
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Flex
                        width="100%"
                        height="100%"
                        position="absolute"
                        display="flex"
                        justifyContent="space-around"
                        alignItems="center"
                        px="2"
                        gap="3"
                      >
                        <Button
                          isDisabled={isButtonDisabled}
                          width="45%"
                          height={["50%", "80%"]}
                          // marginLeft="1rem"
                          color="white"
                          fontWeight="800"
                          borderRadius="20%"
                          bg="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",

                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() =>
                            handleBet({ betType: "dragon", betOn: "normal" })
                          }
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{
                                color: "black",
                                marginRight: "0.5rem",
                                position: "relative",
                                zIndex: "2",
                              }}
                            />
                          )}
                          <Text style={{ position: "absolute", zIndex: "1" }}>
                            <span>Dragon</span>
                            <span> 1.98 </span>
                          </Text>
                        </Button>

                        <Button
                          isDisabled={isButtonDisabled}
                          width="45%"
                          height={["50%", "80%"]}
                          // marginLeft="1rem"
                          color="white"
                          fontWeight="800"
                          borderRadius="20%"
                          bg="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",

                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() =>
                            handleBet({ betType: "tie", betOn: "normal" })
                          }
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{
                                color: "black",
                                marginRight: "0.5rem",
                                position: "relative",
                                zIndex: "2",
                              }}
                            />
                          )}
                          <Text style={{ position: "absolute" }}>
                            <span>Tie</span> <span>1.98</span>
                          </Text>
                        </Button>
                        <Button
                          isDisabled={isButtonDisabled}
                          width="45%"
                          height={["50%", "80%"]}
                          // marginLeft="1rem"
                          color="white"
                          fontWeight="800"
                          borderRadius="20%"
                          bg="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",

                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() =>
                            handleBet({ betType: "tiger", betOn: "normal" })
                          }
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{
                                color: "black",
                                marginRight: "0.5rem",
                                position: "relative",
                                zIndex: "2",
                              }}
                            />
                          )}
                          <Text style={{ position: "absolute" }}>
                            <span>Tiger</span> <span>1.98</span>
                          </Text>
                        </Button>
                      </Flex>
                    </Box>
                    <Flex
                      isDisabled={isButtonDisabled}
                      direction="row"
                      w={["100%", "100%"]}
                      h={{ base: "140px", md: "170px" }}
                      gap="2"
                      justifyContent={"center"}
                    >
                      {isButtonDisabled && (
                        <FaLock
                          size={65}
                          style={{
                            color: "black",
                            marginRight: "0.5rem",
                            position: "absolute",
                            // top:"70%",
                            zIndex: "2",
                          }}
                        />
                      )}
                      {/* <Box> */}
                      <Flex
                        p={"1rem"}
                        direction="column"
                        // justifyContent="center"
                        alignItems="center"
                        w="45%"
                        h="120%"
                        borderRadius="15px"
                        bg="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                      >
                        <Text color="white" fontWeight="bold">
                          TIGER COLOUR
                        </Text>
                        <Text color="white" fontWeight="bold">
                          1.98
                        </Text>
                        <Flex>
                          <Flex
                            justifyContent="space-around"
                            w="100%"
                            // marginLeft={'1rem'}
                            height={"100%"}
                            gap={"5px"}
                          >
                            <Box
                              isDisabled={isButtonDisabled}
                              _hover={
                                !isButtonDisabled && {
                                  background:
                                    "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",

                                  boxShadow: "dark-lg",
                                  color: "black",
                                }
                              }
                              onClick={() =>
                                handleBet({
                                  betType: "tiger",
                                  betOn: "color",
                                  color: "red",
                                })
                              }
                              width={"150%"}
                              height={"160%"}
                            >
                              <Image
                                borderRadius={"15px"}
                                height={"150%"}
                                style={{ backgroundColor: "white" }}
                                src={redcolor}
                                alt=""
                              />

                              {/* <img src={redcolorcard} alt="" /> */}
                            </Box>
                            <Box
                              isDisabled={isButtonDisabled}
                              _hover={
                                !isButtonDisabled && {
                                  background:
                                    "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",

                                  boxShadow: "dark-lg",
                                  color: "black",
                                }
                              }
                              onClick={() =>
                                handleBet({
                                  betType: "tiger",
                                  betOn: "color",
                                  color: "black",
                                })
                              }
                              width={"150%"}
                              height={"160%"}
                            >
                              <Image
                                borderRadius={"15px"}
                                height={"150%"}
                                style={{ backgroundColor: "white" }}
                                src={blackcolor}
                                alt=""
                              />
                            </Box>
                          </Flex>
                        </Flex>
                      </Flex>

                      {/* </Box> */}

                      <Flex
                        isDisabled={isButtonDisabled}
                        p={"1rem"}
                        direction="column"
                        // justifyContent="center"
                        alignItems="center"
                        w="45%"
                        h="120%"
                        borderRadius="15px"
                        bg="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                      >
                        <Text color="white" fontWeight="bold">
                          DRAGON COLOUR
                        </Text>
                        <Text color="white" fontWeight="bold">
                          1.98
                        </Text>
                        <Flex>
                          <Flex
                            isDisabled={isButtonDisabled}
                            justifyContent="space-around"
                            w="100%"
                            // marginLeft={'1rem'}
                            height={"100%"}
                            gap={"5px"}
                          >
                            <Box
                              isDisabled={isButtonDisabled}
                              _hover={
                                !isButtonDisabled && {
                                  background:
                                    "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",

                                  boxShadow: "dark-lg",
                                  color: "black",
                                }
                              }
                              onClick={() =>
                                handleBet({
                                  betType: "dragon",
                                  betOn: "color",
                                  color: "red",
                                })
                              }
                              width={"150%"}
                              height={"160%"}
                            >
                              <Image
                                borderRadius={"15px"}
                                height={"150%"}
                                style={{ backgroundColor: "white" }}
                                src={redcolor}
                                alt=""
                              />
                              {/* <img src={redcolorcard} alt="" /> */}
                            </Box>

                            <Box
                              isDisabled={isButtonDisabled}
                              _hover={
                                !isButtonDisabled && {
                                  background:
                                    "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",

                                  boxShadow: "dark-lg",
                                  color: "black",
                                }
                              }
                              onClick={() =>
                                handleBet({
                                  betType: "dragon",
                                  betOn: "color",
                                  color: "black",
                                })
                              }
                              width={"150%"}
                              height={"160%"}
                            >
                              <Image
                                borderRadius={"15px"}
                                height={"150%"}
                                style={{ backgroundColor: "white" }}
                                src={blackcolor}
                                alt=""
                              />
                            </Box>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>

                    <Flex
                      mt={"3rem"}
                      w="100%"
                      justify="center"
                      direction="column"
                    >
                      <Flex
                        justifyContent="space-around"
                        w="100%"
                        py="1"
                        alignItems="center"
                        fontSize="20"
                      >
                        <h6 style={{ fontWeight: "bold", color: "white" }}>
                          DRAGON <br />
                          SUIT 3.75
                        </h6>
                        <Box
                          position={"relative"}
                          isDisabled={isButtonDisabled}
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",

                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() =>
                            handleBet({
                              betType: "dragon",
                              betOn: "suit",
                              suit: "spade",
                            })
                          }
                          p="10px"
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{
                                color: "black",

                                position: "absolute",
                                top: "30%",
                                left: "25%",

                                zIndex: "2",
                              }}
                            />
                          )}
                          <img
                            src={pann}
                            alt=""
                            style={{
                              borderRadius: "1px",
                              border: "14px solid #880000",
                            }}
                          />
                        </Box>
                        <Box
                          position={"relative"}
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",

                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() =>
                            handleBet({
                              betType: "dragon",
                              betOn: "suit",
                              suit: "club",
                            })
                          }
                          p="10px"
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{
                                color: "black",

                                position: "absolute",
                                top: "30%",
                                left: "25%",
                                zIndex: "2",
                              }}
                            />
                          )}
                          <img
                            isDisabled={isButtonDisabled}
                            src={flower}
                            alt=""
                            style={{
                              borderRadius: "1px",
                              border: "14px solid #880000",
                            }}
                          />
                        </Box>
                        <Box
                          position={"relative"}
                          isDisabled={isButtonDisabled}
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",

                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() =>
                            handleBet({
                              betType: "dragon",
                              betOn: "suit",
                              suit: "heart",
                            })
                          }
                          p="10px"
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{
                                color: "black",
                                marginRight: "0.5rem",
                                position: "absolute",
                                top: "30%",
                                left: "25%",
                                zIndex: "2",
                              }}
                            />
                          )}{" "}
                          <img
                            src={heart1}
                            alt=""
                            style={{
                              borderRadius: "1px",
                              border: "14px solid #880000",
                            }}
                          />
                        </Box>
                        <Box
                          position={"relative"}
                          isDisabled={isButtonDisabled}
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",

                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() =>
                            handleBet({
                              betType: "dragon",
                              betOn: "suit",
                              suit: "diamond",
                            })
                          }
                          p="10px"
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{
                                color: "black",
                                marginRight: "0.5rem",
                                position: "absolute",
                                top: "30%",
                                left: "25%",
                                zIndex: "2",
                              }}
                            />
                          )}
                          <img
                            src={diamond}
                            alt=""
                            style={{
                              borderRadius: "1px",
                              border: "14px solid #880000",
                            }}
                          />
                        </Box>
                      </Flex>
                      <Flex
                        justifyContent="space-around"
                        w="100%"
                        py="1"
                        alignItems="center"
                        fontSize="20"
                      >
                        <h6 style={{ fontWeight: "bold", color: "white" }}>
                          TIGER <br />
                          SUIT 3.75
                        </h6>
                        <Box
                          position={"relative"}
                          isDisabled={isButtonDisabled}
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",

                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() =>
                            handleBet({
                              betType: "tiger",
                              betOn: "suit",
                              suit: "spade",
                            })
                          }
                          p="10px"
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{
                                color: "black",
                                marginRight: "0.5rem",
                                position: "absolute",
                                top: "30%",
                                left: "25%",
                                zIndex: "2",
                              }}
                            />
                          )}
                          <img
                            src={pann}
                            alt=""
                            style={{
                              borderRadius: "1px",
                              border: "14px solid #880000",
                            }}
                          />
                        </Box>
                        <Box
                          position={"relative"}
                          isDisabled={isButtonDisabled}
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",

                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() =>
                            handleBet({
                              betType: "tiger",
                              betOn: "suit",
                              suit: "club",
                            })
                          }
                          p="10px"
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{
                                color: "black",
                                marginRight: "0.5rem",
                                position: "absolute",
                                top: "30%",
                                left: "25%",
                                zIndex: "2",
                              }}
                            />
                          )}
                          <img
                            src={flower}
                            alt=""
                            style={{
                              borderRadius: "1px",
                              border: "14px solid #880000",
                            }}
                          />
                        </Box>
                        <Box
                          position={"relative"}
                          isDisabled={isButtonDisabled}
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",

                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() =>
                            handleBet({
                              betType: "tiger",
                              betOn: "suit",
                              suit: "heart",
                            })
                          }
                          p="10px"
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{
                                color: "black",
                                marginRight: "0.5rem",
                                position: "absolute",
                                top: "30%",
                                left: "25%",
                                zIndex: "2",
                              }}
                            />
                          )}{" "}
                          <img
                            src={heart1}
                            alt=""
                            style={{
                              borderRadius: "1px",
                              border: "14px solid #880000",
                            }}
                          />
                        </Box>
                        <Box
                          position={"relative"}
                          isDisabled={isButtonDisabled}
                          onClick={() =>
                            handleBet({
                              betType: "tiger",
                              betOn: "suit",
                              suit: "diamond",
                            })
                          }
                          p="10px"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",

                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{
                                color: "black",
                                marginRight: "0.5rem",
                                position: "absolute",
                                top: "30%",
                                left: "25%",
                                zIndex: "2",
                              }}
                            />
                          )}
                          <img
                            src={diamond}
                            alt=""
                            style={{
                              borderRadius: "1px",
                              border: "14px solid #880000",
                            }}
                          />
                        </Box>
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </Flex>
          <Flex w="100%" h="500px" py="4">
            <Flex
              justifyContent="center"
              alignItems={{ base: "flex-end", md: "center" }}
              // direction={{base:"column", md:"row"}}
              mx="2"
            ></Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
