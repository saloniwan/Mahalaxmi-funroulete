import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { LockIcon } from "@chakra-ui/icons";
import funTarget from "../Home/img2/FunTarget.jpg";
import funRoulette from "../Home/img2/FunRoulette.jpg";

const Home = () => {
  //  const [ userId, setUserId] = useState()
  const location = useLocation();

  // const userDetails = location?.state?.userId;
  // console.log(userDetails, "userDetails");
  const selectedData = {
    userId: location?.state?.userId,
  };
  console.log("selectedData", selectedData);
  return (
    <>
      <Flex>
        <Wrap
          spacing=""
          align="center"
          maxW={"100%"}
          direction={{ base: "row", md: "row" }}
          bg="#CCCCCC"
          color="black"
          mt={2}
          ml={0}
          css={{
            "@media screen and (max-width: 766px)": {
              display: "none",
            },
          }}
        >
          <NavLink>
            <WrapItem
              paddingRight={2}
              borderRight="1px"
              borderColor="black"
              h="100%"
              _hover={{ textColor: "#CCCCCC", bg: "#092844" }}
            >
              <Center w="80px" h="40px">
                Inpaly
              </Center>
            </WrapItem>
          </NavLink>

          <NavLink to="/home">
            <WrapItem
              paddingRight={2}
              borderRight="1px"
              borderColor="black"
              h="100%"
              _hover={{ textColor: "#CCCCCC", bg: "#092844" }}
            >
              <Center w="80px" h="40px">
                Cricket
              </Center>
            </WrapItem>
          </NavLink>

          <NavLink>
            <WrapItem
              paddingRight={2}
              borderRight="1px"
              borderColor="black"
              h="100%"
              _hover={{ textColor: "#CCCCCC", bg: "#092844" }}
            >
              <Center w="80px" h="40px">
                Football
              </Center>
            </WrapItem>
          </NavLink>

          <NavLink>
            <WrapItem
              paddingRight={2}
              borderRight="1px"
              borderColor="black"
              h="100%"
              _hover={{ textColor: "#CCCCCC", bg: "#092844" }}
            >
              <Center w="107px" h="40px">
                Tennis
              </Center>
            </WrapItem>
          </NavLink>

          <NavLink>
            <WrapItem
              paddingRight={2}
              borderRight="1px"
              borderColor="black"
              h="100%"
              _hover={{ textColor: "#CCCCCC", bg: "#092844" }}
            >
              <Center w="100px" h="40px">
                Horse Racing
              </Center>
            </WrapItem>
          </NavLink>

          <NavLink>
            <WrapItem
              paddingRight={2}
              borderRight="1px"
              borderColor="black"
              h="100%"
              _hover={{ textColor: "#CCCCCC", bg: "#092844" }}
            >
              <Center w="80px" h="40px">
                Greyhound Racing
              </Center>
            </WrapItem>
          </NavLink>

          <NavLink>
            <WrapItem
              paddingRight={2}
              borderRight="1px"
              borderColor="black"
              h="100%"
              _hover={{ textColor: "#CCCCCC", bg: "#092844" }}
            >
              <Center w="87px" h="40px">
                Binary
              </Center>
            </WrapItem>
          </NavLink>

          <NavLink>
            <WrapItem
              paddingRight={2}
              borderRight="1px"
              borderColor="black"
              h="100%"
              _hover={{ textColor: "#CCCCCC", bg: "#092844" }}
            >
              <Center w="100px" h="40px">
                Kabaddi
              </Center>
            </WrapItem>
          </NavLink>

          <NavLink>
            <WrapItem
              paddingRight={2}
              borderRight="1px"
              borderColor="black"
              h="100%"
              _hover={{ textColor: "#CCCCCC", bg: "#092844" }}
            >
              <Center w="80px" h="40px">
                Politics
              </Center>
            </WrapItem>
          </NavLink>

          <NavLink>
            <WrapItem
              paddingRight={2}
              borderRight="1px"
              borderColor="black"
              h="100%"
              _hover={{ textColor: "#CCCCCC", bg: "#092844" }}
            >
              <Center w="60px" h="40px">
                Casino
              </Center>
            </WrapItem>
          </NavLink>

          <NavLink>
            <WrapItem
              paddingRight={2}
              borderRight="1px"
              borderColor="black"
              h="100%"
              _hover={{ textColor: "#CCCCCC", bg: "#092844" }}
            >
              <Center w="80px" h="40px">
                Int Casino
              </Center>
            </WrapItem>
          </NavLink>
        </Wrap>
      </Flex>

      <Flex
        align="center"
        direction="row"
        justify="space-between"
        flexWrap={{ base: "wrap", md: "nowrap" }}
        display={{ base: "none", md: "flex", lg: "flex" }}
      >
        <Text
          fontSize="m"
          fontWeight="700"
          p={2}
          width={{ base: "100%", md: "auto" }}
          display={{ base: "none", md: "block" }}
        >
          Game
        </Text>
        <Flex
          direction="row"
          align="center"
          flexWrap="wrap"
          display={{ base: "none", md: "flex", lg: "flex" }}
        >
          <WrapItem paddingRight={{ base: 34, md: 2 }}>
            <Center w={{ base: "130px", md: "135px" }} h="40px">
              1
            </Center>
          </WrapItem>
          <WrapItem paddingRight={{ base: 34, md: 2 }}>
            <Center w={{ base: "100px", md: "135px" }} h="40px">
              x
            </Center>
          </WrapItem>
          <WrapItem paddingRight={{ base: 34, md: 2 }}>
            <Center w={{ base: "100px", md: "135px" }} h="40px">
              2
            </Center>
          </WrapItem>
        </Flex>
      </Flex>

      <Flex
        align="center"
        direction="row"
        justify="space-between"
        borderTop="1px"
        borderBottom="1px"
        borderColor="#ccc"
        flexWrap="wrap"
        display={{ base: "none", md: "flex", lg: "flex" }}
      >
        <Text
          fontSize="m"
          p={2}
          fontWeight="600"
          width={{ base: "90%", md: "auto" }}
        >
          Bangladesh v New Zealand/Nov 29 2023 09:00 AM (IST)
        </Text>

        <Flex p={4} direction="row" align="center" flexWrap="wrap">
          <WrapItem>
            <Center w={{ base: "70px", md: "70px" }} h="30px" bg="blue.200">
              Box 1
            </Center>
          </WrapItem>
          <WrapItem>
            <Center w={{ base: "70px", md: "70px" }} h="30px" bg="pink.200">
              Box 2
            </Center>
          </WrapItem>
          <WrapItem>
            <Center w={{ base: "70px", md: "70px" }} h="30px" bg="blue.200">
              Box 3
            </Center>
          </WrapItem>
          <WrapItem>
            <Center w={{ base: "70px", md: "70px" }} h="30px" bg="pink.200">
              Box 4
            </Center>
          </WrapItem>
          <WrapItem>
            <Center w={{ base: "70px", md: "70px" }} h="30px" bg="blue.200">
              Box 5
            </Center>
          </WrapItem>
          <WrapItem marginRight={{ base: "0", md: "2" }}>
            <Center w={{ base: "60px", md: "70px" }} h="30px" bg="pink.200">
              Box 6
            </Center>
          </WrapItem>
        </Flex>
      </Flex>

      <Box width={["100%", "100%"]} className="Home" paddingLeft="2">
        {/* <Heading as="h1" textAlign={{base: "start", md: "center",lg: "center"}} marginBottom="4">
          Our Casino
        </Heading> */}

        <Grid
          templateColumns={{
            base: "repeat(12, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(6, 1fr)",
            xl: "repeat(6, 1fr)",
          }}
          gap={3}
          sx={{
            "@media screen and (max-width: 756px)": {
              templateColumns: "repeat(2, 1fr)",
            },
            "@media screen and (max-width: 500px)": {
              templateColumns: "repeat(1, 1fr)",
            },
          }}
        >
          <GridItem colSpan={{ base: 4, md: 1 }}>
            <NavLink
              to={{
                pathname: "/FunTarget",
              }}
              data={location?.state}
            >
              <Box className="custom-box">
                <Image src={funTarget} alt="Fun Target" />
                <span style={{ color: "gold" }}>Fun Target</span>
              </Box>
            </NavLink>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <NavLink
              to={{
                pathname: "/FunRoulette",
              }}
              data={location?.state}
            >
              <Box className="custom-box">
                <Image src={funRoulette} alt="Fun Roulette" />
                <span style={{ color: "gold" }}>Fun Roulette</span>
              </Box>
            </NavLink>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <NavLink
              to={{
                pathname: "/dragontigerlion",
              }}
              data={location?.state}
            >
              <Box className="custom-box">
                <Image
                  src="/game card/Dragon Tiger Lion.png"
                  alt="DRAGON TIGER LION"
                />
                <span style={{ color: "gold" }}> DRAGON TIGER LION</span>
              </Box>
            </NavLink>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <NavLink
              to={{
                pathname: "/2cardsteenpatti",
              }}
              data={location?.state}
            >
              <Box className="custom-box">
                <Image
                  src="/game card/2 CARD TEEN PATTI.png"
                  alt="2 CARDS TEEN PATTI"
                />
                <span style={{ color: "gold" }}>2 CARDS TEEN PATTI</span>
              </Box>
            </NavLink>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <NavLink
              to={{
                pathname: "/teenpattimuflis",
              }}
              data={location?.state}
              // data={userDetails}
            >
              <Box className="custom-box">
                <Image
                  src="/game card/Teen Patti  Muflis.png"
                  alt="3 PATTI MUFLIS"
                />
                <span style={{ color: "gold" }}>MUFLIS TEEN PATTI</span>
              </Box>
            </NavLink>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <NavLink
              to={{
                pathname: "/highcards",
              }}
              data={location?.state}
            >
              <Box className="custom-box">
                <Image src="/game card/HighCard.jpg" alt="TEENPATTI T20" />
                <span style={{ color: "gold" }}>HIGH CARD</span>
              </Box>
            </NavLink>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <NavLink
              to={{
                pathname: "/andarbahar",
              }}
              data={location?.state}
            >
              <Box className="custom-box">
                <Image src="/game card/Andar Bahar.png" alt="ANDAR BAHAR" />
                <span style={{ color: "gold" }}>ANDAR BAHAR (Virtual)</span>
              </Box>
            </NavLink>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <NavLink
              to={{
                pathname: "/dragontiger",
              }}
              data={location?.state}
            >
              <Box className="custom-box">
                <Image src="/game card/Dragon  Tiger.png" alt="DRAGON TIGER" />
                <span style={{ color: "gold" }}> DRAGON TIGER</span>
              </Box>
            </NavLink>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <NavLink
              to={{
                pathname: "/thirtytwocards",
              }}
              data={location?.state}
            >
              <Box className="custom-box">
                <Image src="/game card/32 CARD VR.png" alt="32 Cards" />
                <span style={{ color: "gold" }}>32 Cards</span>
              </Box>
            </NavLink>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <NavLink
              to={{
                pathname: "/3cardsteenpatti",
              }}
              data={location?.state}
            >
              <Box className="custom-box">
                <Image
                  src="/game card/Teen Patti T20.png"
                  alt="MULFIS TEENPATTI"
                />
                <span style={{ color: "gold" }}>3 CARDS TEEN PATTI</span>
              </Box>
            </NavLink>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <NavLink
              to={{
                pathname: "/muflisoneday",
              }}
              data={location?.state}
            >
              <Box className="custom-box">
                <Image
                  src="/game card/MUFLIS ONE DAY.webp"
                  alt="TEENPATTI T20"
                />
                <span style={{ color: "gold" }}>Muflis One Day</span>
              </Box>
            </NavLink>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <NavLink to="/DragonTiger">
              <Box className="custom-box">
                <Image
                  src="/game card/1DdragonTiger.png"
                  alt="1 DAY DRAGON TIGER"
                />
                <span style={{ color: "gold" }}> 1 DAY DRAGON TIGER </span>
              </Box>
            </NavLink>
          </GridItem>

          {/* <GridItem colSpan={{ base: 4, md: 1 }}>
            <NavLink to="/andarbahar">
              <Box className="custom-box">
                <Image src={sec} alt="teenpatti" />
                <span> ANDAR BAHAR</span>
              </Box>
            </NavLink>
          </GridItem> */}

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <NavLink to="/andarbahar">
              <Box className="custom-box">
                <Image src="/game card/Casino war.png" alt="Casino-war" />
                <Text style={{ color: "gold" }}>CASINO WAR</Text>
              </Box>
            </NavLink>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <NavLink to="/andarbahar">
              <Box className="custom-box">
                <Image src="/game card/1 Day Poker.png" alt="1-DAY POKER" />
                <span style={{ color: "gold" }}> 1-DAY POKER</span>
              </Box>
            </NavLink>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <NavLink to="/andarbahar">
              <Box className="custom-box">
                <Image src="/game card/Worli Matka.png" alt="WORLI MATKA" />
                <span style={{ color: "gold" }}> WORLI MATKA</span>
              </Box>
            </NavLink>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box className="custom-box" position="relative">
              <Image src="/game card/World  Matka VR.png" alt="WORLD MATKA" />

              {/* Lock icon positioned over the image */}
              <Icon
                as={LockIcon}
                boxSize={12} // Adjust size as needed
                color="gold" // Adjust color as needed
                position="absolute"
                top={16}
                right={20}
                cursor="pointer"
              />

              <span style={{ color: "gold" }}> WORLD MATKA </span>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            {/* <NavLink to="/RaceGame"> */}
            <Box className="custom-box" position="relative">
              <Image src="/game card/Race 20-20.png" alt=" RACE 20-20" />
              <Icon
                as={LockIcon}
                boxSize={12} // Adjust size as needed
                color="gold" // Adjust color as needed
                position="absolute"
                top={16}
                right={20}
                cursor="pointer"
              />
              <span style={{ color: "gold" }}> RACE 20-20</span>
            </Box>
            {/* </NavLink> */}
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            {/* <NavLink to="/RaceGame"> */}
            <Box className="custom-box" position="relative">
              <Image src="/game card/Race 20-20.png" alt="RACE 20-20" />
              <Icon
                as={LockIcon}
                boxSize={12} // Adjust size as needed
                color="gold" // Adjust color as needed
                position="absolute"
                top={16}
                right={20}
                cursor="pointer"
              />
              <span style={{ color: "gold" }}> RACE 20-20</span>
            </Box>
            {/* </NavLink> */}
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box className="custom-box" position="relative">
              <Image src="/game card/Casino war.png" alt="CASINO METER" />
              <Icon
                as={LockIcon}
                boxSize={12} // Adjust size as needed
                color="gold" // Adjust color as needed
                position="absolute"
                top={16}
                right={20}
                cursor="pointer"
              />
              <span style={{ color: "gold" }}>CASINO METER</span>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box className="custom-box" position="relative">
              <Image src="/game card/20-20  Poker.png" alt="20-20 POKER" />
              <Icon
                as={LockIcon}
                boxSize={12} // Adjust size as needed
                color="gold" // Adjust color as needed
                position="absolute"
                top={16}
                right={20}
                cursor="pointer"
              />
              <span style={{ color: "gold" }}> 20-20 POKER</span>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box className="custom-box" position="relative">
              <Image src="/game card/Trio.png" alt="TRIO" />
              <Icon
                as={LockIcon}
                boxSize={12} // Adjust size as needed
                color="gold" // Adjust color as needed
                position="absolute"
                top={16}
                right={20}
                cursor="pointer"
              />

              <span style={{ color: "gold" }}> TRIO</span>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box className="custom-box" position="relative">
              <Image src="/game card/Card  Casino.png" alt="CARD CASINO" />
              <Icon
                as={LockIcon}
                boxSize={12} // Adjust size as needed
                color="gold" // Adjust color as needed
                position="absolute"
                top={16}
                right={20}
                cursor="pointer"
              />
              <span style={{ color: "gold" }}> CARD CASINO</span>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box className="custom-box" position="relative">
              <Image src="/game card/Trap.png" alt="Trap" />
              <Icon
                as={LockIcon}
                boxSize={12} // Adjust size as needed
                color="gold" // Adjust color as needed
                position="absolute"
                top={16}
                right={20}
                cursor="pointer"
              />
              <span style={{ color: "gold" }}> Trap</span>
            </Box>
          </GridItem>

          {/* <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box className="custom-box">
              <Image src={third} alt="teenpatti" />
              <span> 1 DAY TEENPATTI</span>
            </Box>
          </GridItem> */}

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box className="custom-box" position="relative">
              <Image
                src="/game card/Bollywood Casino.png"
                alt="BOLLYWOOD CASINO"
              />
              <Icon
                as={LockIcon}
                boxSize={12} // Adjust size as needed
                color="gold" // Adjust color as needed
                position="absolute"
                top={16}
                right={20}
                cursor="pointer"
              />
              <span style={{ color: "gold" }}> BOLLYWOOD CASINO</span>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box className="custom-box" position="relative">
              <Image
                src="/game card/Teenpatti  1 day  virtual.png"
                alt="TEENPATTI ONE-DAY"
              />

              <Icon
                as={LockIcon}
                boxSize={12} // Adjust size as needed
                color="gold" // Adjust color as needed
                position="absolute"
                top={16}
                right={20}
                cursor="pointer"
              />
              <span style={{ color: "gold" }}>
                {" "}
                TEENPATTI ONE-DAY (VIRTUAL)
              </span>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box className="custom-box" position="relative">
              <Image src="/game card/Poker Virtual.png" alt=" POKER VIRTUAL" />
              <Icon
                as={LockIcon}
                boxSize={12} // Adjust size as needed
                color="gold" // Adjust color as needed
                position="absolute"
                top={16}
                right={20}
                cursor="pointer"
              />
              <span style={{ color: "gold" }}> POKER VIRTUAL</span>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box className="custom-box" position="relative">
              <Image src="/game card/Hii Low.png" alt=" HII-LOW" />
              <Icon
                as={LockIcon}
                boxSize={12} // Adjust size as needed
                color="gold" // Adjust color as needed
                position="absolute"
                top={16}
                right={20}
                cursor="pointer"
              />
              <span style={{ color: "gold" }}> HII-LOW</span>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box className="custom-box" position="relative">
              <Image src="/game card/BACCARAT.png" alt=" BACCARAT" />
              <Icon
                as={LockIcon}
                boxSize={12} // Adjust size as needed
                color="gold" // Adjust color as needed
                position="absolute"
                top={16}
                right={20}
                cursor="pointer"
              />

              <span style={{ color: "gold" }}> BACCARAT</span>
            </Box>
          </GridItem>

          {/* <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box className="custom-box">
              <Image src={sec} alt="teenpatti" />
              <span> TEENPATTI T20 VIRTUAL</span>
            </Box>
          </GridItem> */}

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box className="custom-box" position="relative">
              <Image src="/game card/7 Up & Down.png" alt="7 UP AND DOWN" />
              <Icon
                as={LockIcon}
                boxSize={12} // Adjust size as needed
                color="gold" // Adjust color as needed
                position="absolute"
                top={16}
                right={20}
                cursor="pointer"
              />
              <span style={{ color: "gold" }}> 7 UP AND DOWN</span>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box className="custom-box" position="relative">
              <Image src="/game card/SCIBO.png" alt="SCIBO" />
              <Icon
                as={LockIcon}
                boxSize={12} // Adjust size as needed
                color="gold" // Adjust color as needed
                position="absolute"
                top={16}
                right={20}
                cursor="pointer"
              />
              <span style={{ color: "gold" }}> SCIBO</span>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box className="custom-box" position="relative">
              <Image
                src="/game card/6 Player poker VR.png"
                alt="SIX PLAYER POKER"
              />
              <Icon
                as={LockIcon}
                boxSize={12} // Adjust size as needed
                color="gold" // Adjust color as needed
                position="absolute"
                top={16}
                right={20}
                cursor="pointer"
              />
              <span style={{ color: "gold" }}> SIX PLAYER POKER (VIRTUAL)</span>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box className="custom-box" position="relative">
              <Image src="/game card/Test Teenpatti.png" alt="TEST TEENPATTI" />
              <Icon
                as={LockIcon}
                boxSize={12} // Adjust size as needed
                color="gold" // Adjust color as needed
                position="absolute"
                top={16}
                right={20}
                cursor="pointer"
              />
              <span style={{ color: "gold" }}> TEST TEENPATTI</span>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box className="custom-box" position="relative">
              <Image src="/game card/Hii Low.png" alt=" HII-LOW " />
              <Icon
                as={LockIcon}
                boxSize={12} // Adjust size as needed
                color="gold" // Adjust color as needed
                position="absolute"
                top={16}
                right={20}
                cursor="pointer"
              />
              <span style={{ color: "gold" }}> HII-LOW (VIRTUAL)</span>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
