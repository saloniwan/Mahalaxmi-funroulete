import { AccountBalance, ZoomIn } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
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
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import LOGO from "./Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [playerBalance, setPlayerBalance] = useState(0);
  const finalRef = useRef(null);
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Container p="0" bg="#2b329b" textColor="white" maxW="100vw">
      <HStack
        spacing={4}
        justify="space-between"
        height={{ base: "20", lg: "20" }}
      >
        <Box display="flex">
          <Image
            width={{ base: "9rem", md: "12 rem", lg: "15rem" }}
            height={{ base: "9rem", md: "6rem", lg: "9rem" }}
            m={-3}
            src={LOGO}
          />

          <Box marginTop={{ base: "2rem", lg: "3.5rem" }}></Box>
        </Box>

        <Flex
          width={{ base: "70%", md: "30%" }}
          height={{ base: "100%" }}
          justify="center"
          alignItems="center"
          justifyContent={"space-evenly"}
        >
          <Box
            paddingRight={{ lg: "30" }}
            display={{ base: "grid", md: "flex", lg: "flex" }}
            // justifyContent={{ lg: "space-between" }}
            gap={{ lg: "4" }}
          >
            <Box
              display={{ base: "flex", md: "flex", lg: "flex" }}
              direction={{ base: "row" }}
              gap={{ lg: "4" }}
              marginTop={{ lg: "2" }}
              justifyContent="end"
            >
              <Button
                display={{ base: "block", mg: "flex", lg: "fl" }}
                marginRight={{ lg: "1.5rem" }}
                fontSize={{ lg: "20" }}
                onClick={onOpen}
                style={{ boxShadow: "0 40px 40px rgba(10, 10, 10, 0.1)" }}
                bg={"#d6d6f5"}
              >
                Rules
              </Button>

              <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent
                  // width="86rem"
                  maxW={["90vw", "40vw"]}
                  maxH="60vh" // Set the maximum height to 80% of the viewport height
                  overflowY="auto" // Enable vertical scrollbar when content overflows
                  background="white"
                >
                  <ModalHeader>Rules and Regulations</ModalHeader>
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
                    <br /> <br /> Number Ranking: Lowest to highest: Ace, 2, 3,
                    4, 5, 6, 7,8, 9, 10, Jack, Queen and King (Ace is "1" and
                    King is "13").
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
                          <Tr></Tr>
                          <Tr></Tr>
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
          </Box>
          <Box>
            <Text
              marginTop={{ lg: "2" }}
              marginRight={{ lg: "1.5rem" }}
              fontSize={{ lg: "20" }}
              justifyContent={{ base: "end" }}
              display={{ base: "block", md: "flex", lg: "flex" }}
            >
              Balance: {playerBalance}
            </Text>
          </Box>
          <Box>
            <Text
              textDecor={{ lg: "underline" }}
              marginTop={{ lg: "2" }}
              fontSize={{ lg: "20" }}
              marginRight={{ lg: "1.5rem" }}
            >
              <Button onClick={handleLogOut}>LogOut</Button>
            </Text>
          </Box>
        </Flex>
      </HStack>

      <HStack>
        <Flex padding="0">
          <Box
            display={{ base: "flex", md: "flex", lg: "flex" }}
            alignItems="flex-start"
          >
            <Box width={{ base: "7", lg: "50%" }} padding={{ base: "1" }}></Box>

            <Box width={{ base: "70%" }} alignItems={{ lg: "flex-end" }}>
              {/* <marquee behavior="scroll" direction="left" scrolldelay="150"> */}
              <marquee direction="left">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Corporis quae nam dignissimos vel, aliquam ipsum veniam
                reiciendis ex, commodi consectetur similique, aliquid incidunt!
                Repellendus laudantium non voluptas facilis, facere voluptatem.
              </marquee>
            </Box>
          </Box>
        </Flex>
      </HStack>

      <Stack
        alignContent={"center"}
        alignItems={"center"}
        // justifyContent={"center"}
        fontWeight={650}
        maxW={"100%"}
        direction={{ base: "row", md: "row" }}
        bg="#092844"
        color="white"
        p={2}
        spacing={6}
        overflowX={{ base: "scroll", md: "visible" }}
      >
        <NavLink to="/home">
          <Box>HOME</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>CRICKET</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>FOOTBALL</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>TENNIS</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>HORSE RACING</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>GREYHOUND RACING</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>BINARY</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>KABADDI</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>POLITICS</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>CASINO</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>INT CASINO</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>SPORT BOOK</Box>
        </NavLink>
      </Stack>
    </Container>
  );
};

export default Navbar;
