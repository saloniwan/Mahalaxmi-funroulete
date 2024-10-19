// import "./CardDeck.css";

// import { useEffect, useState } from "react";

// import clubs10 from "./Image/clubs_10.png";
// import clubs2 from "./Image/clubs_2.png";
// import clubs3 from "./Image/clubs_3.png";
// import clubs4 from "./Image/clubs_4.png";
// import clubs5 from "./Image/clubs_5.png";
// import clubs6 from "./Image/clubs_6.png";
// import clubs7 from "./Image/clubs_7.png";
// import clubs8 from "./Image/clubs_8.png";
// import clubs9 from "./Image/clubs_9.png";
// import clubsAce from "./Image/clubs_ace.png";
// import clubsJack from "./Image/clubs_jack.png";
// import clubsKing from "./Image/clubs_king.png";
// import clubsQueen from "./Image/clubs_queen.png";
// import diamonds2 from "./Image/diamonds_2.png";
// import diamonds3 from "./Image/diamonds_3.png";
// import diamonds4 from "./Image/diamonds_4.png";
// import diamonds5 from "./Image/diamonds_5.png";
// import diamonds6 from "./Image/diamonds_6.png";
// import diamondsAce from "./Image/diamonds_ace.png";
// import diamondsJack from "./Image/diamonds_jack.png";
// import diamondsKing from "./Image/diamonds_king.png";
// import diamondsQueen from "./Image/diamonds_queen.png";
// import hearts10 from "./Image/hearts_10.png";
// import hearts2 from "./Image/hearts_2.png";
// import hearts3 from "./Image/hearts_3.png";
// import hearts4 from "./Image/hearts_4.png";
// import hearts5 from "./Image/hearts_5.png";
// import hearts6 from "./Image/hearts_6.png";
// import hearts7 from "./Image/hearts_7.png";
// import hearts8 from "./Image/hearts_8.png";
// import hearts9 from "./Image/hearts_9.png";
// import heartsAce from "./Image/hearts_ace.png";
// import heartsJack from "./Image/hearts_jack.png";
// import heartsKing from "./Image/hearts_king.png";
// import heartsQueen from "./Image/hearts_queen.png";
// import spades10 from "./Image/spades_10.png";
// import spades2 from "./Image/spades_2.png";
// import spades3 from "./Image/spades_3.png";
// import spades4 from "./Image/spades_4.png";
// import spades5 from "./Image/spades_5.png";
// import spades6 from "./Image/spades_6.png";
// import spades7 from "./Image/spades_7.png";
// import spades8 from "./Image/spades_8.png";
// import spades9 from "./Image/spades_9.png";
// import spadesAce from "./Image/spades_ace.png";
// import spadesAceSimple from "./Image/spades_ace_simple.png";
// import spadesJack from "./Image/spades_jack.png";
// import spadesKing from "./Image/spades_king.png";
// import spadesQueen from "./Image/spades_queen.png";

// // import DemoImage1 from "./Image/DemoImage1.svg";
// // import DemoImage2 from "./Image/DemoImage2.svg";
// // import DemoImage3 from "./Image/DemoImage3.svg";


















































// // Importing all the images

// const CardDeck = () => {
//   const initialDeck = [
//     diamonds2,
//     diamonds3,
//     diamonds4,
//     diamonds5,
//     diamonds6,
//     clubs2,
//     clubs3,
//     clubs4,
//     clubs5,
//     clubs6,
//     clubs7,
//     clubs8,
//     clubs9,
//     clubs10,
//     clubsAce,
//     clubsJack,
//     clubsKing,
//     clubsQueen,
//     diamondsAce,
//     diamondsJack,
//     diamondsKing,
//     diamondsQueen,
//     hearts2,
//     hearts3,
//     hearts4,
//     hearts5,
//     hearts6,
//     hearts7,
//     hearts8,
//     hearts9,
//     hearts10,
//     heartsAce,
//     heartsJack,
//     heartsKing,
//     heartsQueen,
//     spades2,
//     spades3,
//     spades4,
//     spades5,
//     spades6,
//     spades7,
//     spades8,
//     spades9,
//     spades10,
//     spadesAceSimple,
//     spadesJack,
//     spadesAce,
//     spadesKing,
//     spadesQueen,
//   ];

//   const [deck, setDeck] = useState(initialDeck); // for all card
//   const [showFirstImage, setShowFirstImage] = useState(true); // for the Image
//   const [winningCard, setWinningCard] = useState(null);

//   const shuffleArray = (array) => {
//     let newArray = array.slice();
//     for (let i = newArray.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
//     }
//     return newArray;
//   };

//   const shuffleDeck = () => {
//     const shuffledDeck = shuffleArray(deck);
//     setDeck(shuffledDeck);
//     setShowFirstImage(true);
//     setWinningCard(shuffledDeck[1]);
//   };

//   const getRandomCards = (count) => {
//     const randomSubset = deck.slice(0, count);
//     return randomSubset;
//   };

//   useEffect(() => {
//     const firstImageTimeout = setTimeout(() => {
//       shuffleDeck(); // Shuffle the deck after 5 seconds
//     }, 5000);

//     return () => clearTimeout(firstImageTimeout); // Cleanup timeout on component unmount
//   }, []);
//   const cardsForSectionA = getRandomCards(7);
//   const cardsForSectionB = getRandomCards(6);

//   const isWinningCardInSections =
//     cardsForSectionA.includes(winningCard) ||
//     cardsForSectionB.includes(winningCard);

//   useEffect(() => {
//     if (isWinningCardInSections) {
//       //  Display an alert indicating a win
//       //  alert('Congratulations! You won!');
//     }
//   }, [isWinningCardInSections]);

//   return (
//     <div className="card-container">
//       {showFirstImage && (
//         <img
//           className="firstImage"
//           src={winningCard} // Display the winning card
//           style={{ width: "70px", height: "75px" }}
//           alt="First Image"
//         />
//       )}
//       <div className="section">
//         <h2> A </h2>
//         {cardsForSectionA.map((imagePath, index) => (
//           <div key={index} className="card">
//             <img
//               src={imagePath}
//               alt={`Card ${index + 1}`}
//               style={{ width: "70px", height: "75px" }}
//             />
//           </div>
//         ))}
//       </div>
//       <div className="section">
//         <h2> B </h2>
//         {cardsForSectionB.map((imagePath, index) => (
//           <div key={index} className="card1">
//             <img
//               src={imagePath}
//               alt={`Card ${index + 1}`}
//               style={{ width: "60px", height: "75px" }}
//             />

//             {/* <div
//             style={{
//               marginTop:'70px'

//             }} 
//             >
//               <img src={DemoImage1} 
//               alt="DemoImage" 
//               style={{  width: '70px', height: '75px' }}
//               />

// <           img src={DemoImage2} 
//               alt="DemoImage" 
//               style={{  width: '70px', height: '75px' }}
              
//               />

//               <img src={DemoImage3} 
//               alt="DemoImage"
//               style={{  width: '70px', height: '75px' }} 
//               />
//             </div> */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CardDeck;
