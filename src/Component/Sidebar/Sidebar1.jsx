//New Sidebar

import "./Sidebar.css";

import {
  Box,
  FormControl,
  Grid,
  GridItem,
  Input,
  VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

import React from "react";
import first from "../images/Group 1000004907.png"
import four from "../images/Group 1000004910.png"
import second from "../images/Group 1000004908.png"
import third from "../images/Group 1000004909.png"

// import first from "./images/Group 1000004907.png";
// import four from "./images/Group 1000004910.png";
// import second from "./images/Group 1000004908.png";
// import third from "./images/Group 1000004909.png";

// import React, { useState } from "react";

// import { Link } from "react-router-dom";
// import { Search } from "@mui/icons-material";






class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showSidebar: true };
  }

  toggleSidebar = () => {
    this.setState({ showSidebar: !this.state.showSidebar });
  };

  toggleSports = () => {
    this.setState((prevState) => ({ showSports: !prevState.showSports }));
  };

  toggleElections = () => {
    this.setState((prevState) => ({ showElections: !prevState.showElections }));
  };

  render() {
    return (
      <div className="sideBar_btn_NavLind" style={{ background: "#e4d323" }}>
        <button
          onClick={this.toggleSidebar}
          style={{
            backgroundColor: "#e4d323",

            padding: "1em 1em",
            // width: "10%",
            position: "relative",
            color: "white",
          }}
        >
          <h1
            style={{
              position: "relative",
              display: "flex",
              marginLeft: "2rem",
              justifyContent: "Space-between",
              fontfamily: "Roboto Condensed, sans-serif",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            MAHALAXMI GAME
            <Box>
              {this.state.showSidebar ? (
                <ChevronUpIcon color="white" />
              ) : (
                <ChevronDownIcon color="white" />
              )}
            </Box>
          </h1>
        </button>
        {this.state.showSidebar && (
          <div className="sidebar">
            <VStack
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
              backgroundColor="white"
            >
              <Box
                backgroundColor="grey"
                h={9}
                w={130}
                borderRadius={120}
                color="white"
                alignItems="center"
                textAlign="center"
                m={2}
                pt={1}
              >
                
                Popular Game
              </Box>
              <Box
                backgroundColor="#998d01"
                h={9}
                w={130}
                borderRadius={120}
                color="white"
                textAlign="center"
                m={2}
                pt={1}
              >
                Dealer Game
              </Box>
              <Box
                backgroundColor="grey"
                h={9}
                w={130}
                borderRadius={120}
                color="white"
                textAlign="center"
                m={2}
                pt={1}
              >
                
                Virtual Game
              </Box>
            </VStack>

            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={3}
              p={2}
              backgroundColor="white"
            >
              <GridItem colSpan={2}>
                {/* <Input type='Search' placeholder="search . . ."></Input> */}
                <FormControl mt={1} p={2}>
                  <Input placeholder="Search . . ." />
                  {/* <IconButton aria-label='Search database' icon={<SearchIcon />} /> */}
                </FormControl>
              </GridItem>

              <div>
                <GridItem
                  w="100%"
                  h="200"
                  bg="blue.500"
                  borderRadius="40px"
                  backgroundImage={first}
                >
                  {/* <Img src={first}  ></Img> */}
                </GridItem>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  fontSize={13}
                >
                  <Box pl={2}>TeenPatti</Box>
                  <Box display="flex" gap={1} pr={2}>
                    <h1>Icon</h1>
                    <h1>147</h1>
                  </Box>
                </Box>
              </div>

              <div>
                <GridItem
                  w="100%"
                  h="200"
                  bg="blue.500"
                  borderRadius="40px"
                  backgroundImage={second}
                ></GridItem>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  fontSize={13}
                >
                  <h1>2 card TeenPatti</h1>
                  <Box display="flex" gap={1}>
                    <h1>Icon</h1>
                    <h1>147</h1>
                  </Box>
                </Box>
              </div>

              <div>
                <GridItem
                  w="100%"
                  h="200"
                  bg="blue.500"
                  borderRadius="40px"
                  backgroundImage={third}
                ></GridItem>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  fontSize={13}
                >
                  <h1>2 card TeenPatti</h1>
                  <Box display="flex" gap={1}>
                    <h1>Icon</h1>
                    <h1>147</h1>
                  </Box>
                </Box>
              </div>

              <div>
                <GridItem
                  w="100%"
                  h="200"
                  bg="blue.500"
                  borderRadius="40px"
                  backgroundImage={first}
                ></GridItem>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  fontSize={13}
                >
                  <h1>muflis TeenPatti</h1>
                  <Box display="flex" gap={1}>
                    <h1>Icon</h1>
                    <h1>147</h1>
                  </Box>
                </Box>
              </div>

              <div>
                <GridItem
                  w="100%"
                  h="200"
                  bg="blue.500"
                  borderRadius="40px"
                  backgroundImage={first}
                ></GridItem>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  fontSize={13}
                >
                  <h1>7 Up and Down</h1>
                  <Box display="flex" gap={1}>
                    <h1>Icon</h1>
                    <h1>147</h1>
                  </Box>
                </Box>
              </div>

              <div>
                <GridItem
                  w="100%"
                  h="200"
                  bg="blue.500"
                  borderRadius="40px"
                  backgroundImage={first}
                ></GridItem>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  fontSize={13}
                >
                  <h1>Lucky7</h1>
                  <Box display="flex" gap={1}>
                    <h1>Icon</h1>
                    <h1>147</h1>
                  </Box>
                </Box>
              </div>

              <div>
                <GridItem
                  w="100%"
                  h="200"
                  bg="blue.500"
                  borderRadius="40px"
                  backgroundImage={third}
                ></GridItem>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  fontSize={13}
                >
                  <h1>TeenPatti</h1>
                  <Box display="flex" gap={1}>
                    <h1>Icon</h1>
                    <h1>147</h1>
                  </Box>
                </Box>
              </div>

              <div>
                <GridItem
                  w="100%"
                  h="200"
                  bg="blue.500"
                  borderRadius="40px"
                  backgroundImage={first}
                ></GridItem>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  fontSize={13}
                >
                  <h1>TeenPatti</h1>
                  <Box display="flex" gap={1}>
                    <h1>Icon</h1>
                    <h1>147</h1>
                  </Box>
                </Box>
              </div>

              <div>
                <GridItem
                  w="100%"
                  h="200"
                  bg="blue.500"
                  borderRadius="40px"
                  backgroundImage={second}
                ></GridItem>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  fontSize={13}
                >
                  <h1>TeenPatti</h1>
                  <Box display="flex" gap={1}>
                    <h1>Icon</h1>
                    <h1>147</h1>
                  </Box>
                </Box>
              </div>

              <div>
                <GridItem
                  w="100%"
                  h="200"
                  bg="blue.500"
                  borderRadius="40px"
                  backgroundImage={second}
                ></GridItem>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  fontSize={13}
                >
                  <h1>TeenPatti</h1>
                  <Box display="flex" gap={1}>
                    <h1>Icon</h1>
                    <h1>147</h1>
                  </Box>
                </Box>
              </div>

              <div>
                <GridItem
                  w="100%"
                  h="200"
                  bg="blue.500"
                  borderRadius="40px"
                  backgroundImage={four}
                ></GridItem>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  fontSize={13}
                >
                  <h1>TeenPatti</h1>
                  <Box display="flex" gap={1}>
                    <h1>Icon</h1>
                    <h1>147</h1>
                  </Box>
                </Box>
              </div>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default Sidebar;
