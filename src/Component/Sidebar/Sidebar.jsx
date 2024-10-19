// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { ChevronDownIcon, ChevronUpIcon,} from "@chakra-ui/icons";

// import "./Sidebar.css";
// import { Box } from "@chakra-ui/react";

// class Sidebar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { showSidebar: true};
//   }

//   toggleSidebar = () => {
//     this.setState({ showSidebar: !this.state.showSidebar });
//   };

//   toggleSports = () => {
//     this.setState((prevState) => ({ showSports: !prevState.showSports }));
//   };

//   toggleElections = () => {
//     this.setState((prevState) => ({ showElections: !prevState.showElections }));
//   };

//   render() {
//     return (
//       <div className="sideBar_btn_NavLind" style={{background:"#2b329b"}}>
//         <button
//           onClick={this.toggleSidebar}
//           style={{
//             backgroundColor: "#2B329B",
//             padding: "1em 1em",
//             // width: "10%",
//             position: "relative",
//             color: "white",
//           }}
//         >
//           <h1
//             style={{
//               position: "relative",
//               display: "flex",
//               marginLeft:"2rem",
//               justifyContent: "Space-between",
//               fontfamily: "Roboto Condensed, sans-serif",
//               fontWeight: "bold",
//               fontSize: "2rem",

//             }}
//           >
//             Casino
//             <Box>
//             {this.state.showSidebar ? (
//               <ChevronUpIcon

//               color="white" />
//             ) : (
//               <ChevronDownIcon color="white" />
//             )}
//             </Box>
//           </h1>
//         </button>
//         {this.state.showSidebar && (
//           <div className="sidebar">
//             <ul
//             style={{width:"100%"}}
//             >
//               <li className="blinking">
//                 <Link to="/live-casino">Live Casino</Link>
//               </li>
//               <li className="blinking">
//                 <Link to="/slot-game">Slot Game</Link>
//               </li>

//               <li>
//                 <Link to="/casino-war">Casino War</Link>
//               </li>
//               <li>
//                 <Link to="/race 20-20">Race 20-20</Link>
//               </li>
//               <li>
//                 <Link to="/trio">Trio</Link>
//               </li>

//               <li>
//                 <Link to="/the-trap">The Trap</Link>
//               </li>
//               <li>
//                 <Link to="/bollywood-casino">Bollywood Casino</Link>
//               </li>
//               <li>
//                 <Link to="/queen">Queen</Link>
//               </li>

//               <li>
//                 <Link to="/teenpatti-test">Teenpatti Test</Link>
//               </li>
//               <li>
//                 <Link to="/baccarat">Baccarat</Link>
//               </li>

//               <li>
//                 <Link to="/poker-2020">Poker 2020</Link>
//               </li>
//               <li>
//                 <Link to="/mulfisteenpatti">Mulfis Teenpatti</Link>
//               </li>
//               <li>
//                 <Link to="/2-cards-teenpatti">2 Cards Teenpatti</Link>
//               </li>
//               <li>
//                 <Link to="/casino-meter">Casino Meter</Link>
//               </li>
//               <li>
//                 <Link to="/sibo">Sibo</Link>
//               </li>
//               <li>
//                 <Link to="/1-day-teenpatti">1 Day Teenpatti</Link>
//               </li>
//               <li>
//                 <Link to="/1-day-poker">1 Day Poker</Link>
//               </li>
//               <li>
//                 <Link to="/roulette">Roulette</Link>
//               </li>
//               <li>
//                 <Link to="/1-day-dragon-tiger">1 Day Dragon Tiger</Link>
//               </li>
//               <li>
//                 <Link to="/amar-akbar-anthony">Amar Akbar Anthony</Link>
//               </li>
//               <li>
//                 <Link to="/andar-bahar">Andar Bahar</Link>
//               </li>
//               <li>
//                 <Link to="/7-up-down">7 Up & Down</Link>
//               </li>
//               <li>
//                 <Link to="/worli-matka">Worli Matka</Link>
//               </li>
//               <li>
//                 <Link to="/teenpattiT20">Teenpatti T20</Link>
//               </li>
//               <li>
//                 <Link to="/32cardcasino">32 Card Casino</Link>
//               </li>
//               <li>
//                 <Link to="/hi-low">Hi-Low</Link>
//               </li>
//               <li>
//                 <Link to="/teenpatti-one-day-virtual">
//                   Teenpatti One-Day (Virtual)
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/teenpatti-t20-virtual">Teenpatti T20 (Virtual)</Link>
//               </li>
//               <li>
//                 <Link to="/7-up-down-virtual">7 Up & Down (Virtual)</Link>
//               </li>
//               <li>
//                 <Link to="/32-cards-virtual">32 Cards (Virtual)</Link>
//               </li>
//               <li>
//                 <Link to="/poker-virtual">Poker (Virtual)</Link>
//               </li>
//               <li>
//                 <Link to="/six-player-poker-virtual">
//                   Six Player Poker (Virtual)
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/andar-bahar-virtual">Andar Bahar (Virtual)</Link>
//               </li>
//               <li>
//                 <Link to="/matka-virtual">Matka (Virtual)</Link>
//               </li>
//               <li>
//                 <Link to="/roulette-virtual">Roulette (Virtual)</Link>
//               </li>
//               <li>
//                 <Link to="/dragon-tiger-virtual">Dragon Tiger (Virtual)</Link>
//               </li>
//               <li>
//                 <Link to="/amar-akbar-anthony-virtual">
//                   Amar Akbar Anthony (Virtual)
//                 </Link>
//               </li>
//             </ul>
//             <div className="Button">
//               <button
//                 onClick={this.toggleSports}
//                 style={{
//                   backgroundColor: "#2B329B",
//                   padding: "1em 1em",
//                   width: "100%",
//                   position: "relative",
//                   color: "white",
//                 }}
//               >
//                 <h1
//                   style={{
//                     position: "relative",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     fontFamily: "Roboto Condensed, sans-serif",
//                     fontWeight: "bold",
//                     fontSize: "large",
//                   }}
//                 >
//                   Sports{" "}
//                   {this.state.showSports ? (
//                     <ChevronUpIcon color="white" />
//                   ) : (
//                     <ChevronDownIcon color="white" />
//                   )}
//                 </h1>
//               </button>
//               {this.state.showSports && (
//                 <ul id="Bottom">
//                   <li>
//                     <Link to="/politics" onClick={this.toggleElections}>
//                       Politics{" "}
//                       {this.state.showElections ? (
//                         <ChevronUpIcon color="Black" />
//                       ) : (
//                         <ChevronDownIcon color="Black" />
//                       )}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/cricket">Cricket</Link>
//                   </li>
//                   <li>
//                     <Link to="/football">Football</Link>
//                   </li>
//                   <li>
//                     <Link to="/tennis">Tennis</Link>
//                   </li>
//                   <li>
//                     <Link to="/exchange-game">Exchange Game</Link>
//                   </li>
//                 </ul>
//               )}
//               {this.state.showElections && (
//                 <div id="Politics">
//                   <h2>Election</h2>
//                   <p>Cong V BRS</p>
//                   <p>Rajasthan Assembly Election 2023</p>
//                   <p>Chhattisgarh Assembly Election 2023</p>
//                   <p>Madhya Pradesh Assembly Election 2023</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default Sidebar;

import "./Sidebar.css";

import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

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
      <div className="sideBar_btn_NavLind" style={{ background: "#2b329b" }}>
        <button
          onClick={this.toggleSidebar}
          style={{
            backgroundColor: "#2B329B",
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
              fontSize: "2rem",
            }}
          >
            Others
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
            <ul style={{ width: "95%", float: "right", gap: "10px" }}>
              <li className="blinking">
                <Link to="/live-casino">TP T20</Link>
              </li>
              <li className="blinking">
                <Link to="/slot-game">TP 1 DAY</Link>
              </li>

              <li>
                <Link to="/casino-war">TP TEST</Link>
              </li>
              <li>
                <Link to="/race 20-20">DT 1 DAY</Link>
              </li>
              <li>
                <Link to="/trio">32 CARDS</Link>
              </li>

              <li>
                <Link to="/the-trap">HI LOW</Link>
              </li>
              <li>
                <Link to="/bollywood-casino">POKER</Link>
              </li>
              <li>
                <Link to="/queen">QUEEN</Link>
              </li>

              <li>
                <Link to="/teenpatti-test">BACCARAT</Link>
              </li>
              <li>
                <Link to="/baccarat">AMAR AKBAR ANTHONY</Link>
              </li>

              <li>
                <Link to="/poker-2020">BOLLYWOOD</Link>
              </li>
              <li>
                <Link to="/mulfisteenpatti">TRIO</Link>
              </li>
              <li>
                <Link to="/2-cards-teenpatti">ANDAR BHAR</Link>
              </li>
              <li>
                <Link to="/casino-meter">MUFLIS TP</Link>
              </li>
              <li>
                <Link to="/sibo">ROULETTE</Link>
              </li>
              <li>
                <Link to="/1-day-teenpatti">WORLI MATKA</Link>
              </li>
              <li>
                <Link to="/1-day-poker">DREAM CATCHER</Link>
              </li>
              {/* <li>
                <Link to="/roulette">Roulette</Link>
              </li>
              <li>
                <Link to="/1-day-dragon-tiger">1 Day Dragon Tiger</Link>
              </li>
              <li>
                <Link to="/amar-akbar-anthony">Amar Akbar Anthony</Link>
              </li>
              <li>
                <Link to="/andar-bahar">Andar Bahar</Link>
              </li>
              <li>
                <Link to="/7-up-down">7 Up & Down</Link>
              </li>
              <li>
                <Link to="/worli-matka">Worli Matka</Link>
              </li>
              <li>
                <Link to="/teenpattiT20">Teenpatti T20</Link>
              </li>
              <li>
                <Link to="/32cardcasino">32 Card Casino</Link>
              </li>
              <li>
                <Link to="/hi-low">Hi-Low</Link>
              </li>
              <li>
                <Link to="/teenpatti-one-day-virtual">
                  Teenpatti One-Day (Virtual)
                </Link>
              </li>
              <li>
                <Link to="/teenpatti-t20-virtual">Teenpatti T20 (Virtual)</Link>
              </li>
              <li>
                <Link to="/7-up-down-virtual">7 Up & Down (Virtual)</Link>
              </li>
              <li>
                <Link to="/32-cards-virtual">32 Cards (Virtual)</Link>
              </li>
              <li>
                <Link to="/poker-virtual">Poker (Virtual)</Link>
              </li>
              <li>
                <Link to="/six-player-poker-virtual">
                  Six Player Poker (Virtual)
                </Link>
              </li>
              <li>
                <Link to="/andar-bahar-virtual">Andar Bahar (Virtual)</Link>
              </li>
              <li>
                <Link to="/matka-virtual">Matka (Virtual)</Link>
              </li>
              <li>
                <Link to="/roulette-virtual">Roulette (Virtual)</Link>
              </li>
              <li>
                <Link to="/dragon-tiger-virtual">Dragon Tiger (Virtual)</Link>
              </li>
              <li>
                <Link to="/amar-akbar-anthony-virtual">
                  Amar Akbar Anthony (Virtual)
                </Link>
              </li> */}
            </ul>
            <div className="Button">
              <button
                onClick={this.toggleSports}
                style={{
                  backgroundColor: "#2B329B",
                  padding: "1em 1em",
                  width: "100%",
                  position: "relative",
                  color: "white",
                }}
              >
                <h1
                  style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "Roboto Condensed, sans-serif",
                    fontWeight: "bold",
                    fontSize: "large",
                  }}
                >
                  All Sports{" "}
                  {this.state.showSports ? (
                    <ChevronUpIcon color="white" />
                  ) : (
                    <ChevronDownIcon color="white" />
                  )}
                </h1>
              </button>
              {this.state.showSports && (
                <ul id="Bottom">
                  <li>
                    <Link to="/politics" onClick={this.toggleElections}>
                      Politics{" "}
                      {this.state.showElections ? (
                        <ChevronUpIcon color="Black" />
                      ) : (
                        <ChevronDownIcon color="Black" />
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link to="/cricket">Cricket</Link>
                  </li>
                  <li>
                    <Link to="/football">Football</Link>
                  </li>
                  <li>
                    <Link to="/tennis">Tennis</Link>
                  </li>
                  <li>
                    <Link to="/exchange-game">Horse Racing</Link>
                  </li>
                  <li>
                    <Link to="/cricket">Greyhound Racing</Link>
                  </li>
                  <li>
                    <Link to="/football">Binary</Link>
                  </li>
                  <li>
                    <Link to="/tennis">Kabaddi</Link>
                  </li>
                  <li>
                    <Link to="/exchange-game">Politics</Link>
                  </li>
                  <li>
                    <Link to="/football">Casino</Link>
                  </li>
                  <li>
                    <Link to="/tennis">Int Casino</Link>
                  </li>
                  <li>
                    <Link to="/exchange-game">Sports book</Link>
                  </li>
                </ul>
              )}
              {this.state.showElections && (
                <div id="Politics">
                  <h2>Election</h2>
                  <p>Cong V BRS</p>
                  <p>Rajasthan Assembly Election 2023</p>
                  <p>Chhattisgarh Assembly Election 2023</p>
                  <p>Madhya Pradesh Assembly Election 2023</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Sidebar;
