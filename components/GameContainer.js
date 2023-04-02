import React, { useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import content from "../json/nftData.json";

const GameContainer = () => {
  const { nftCollection } = content;
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstSelection, setFirstSelection] = useState(null);
  const [secondSelection, setSecondSelection] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [selectedNft, setSelectedNft] = useState("0");

  const arrangeCards = () => {
    /* getting data of selected nft collection*/
    const selectedCollection = nftCollection.find(
      (collection) => collection.nftId === selectedNft
    );

    /* Creating Images Array for nft Images */
    const nftImages = selectedCollection.hashes.map((hash) => {
      return {
        src: `/static/${selectedCollection.nftId}/${hash}.${selectedCollection.extension}`,
        hash: hash,
        matched: false,
      };
    });

    /* Duplicating card Images and shuffling*/
    const cardImages = [...nftImages, ...nftImages]
      .map((card, index) => ({
        ...card,
        id: `${card.hash}_${index}`,
      }))
      .sort(() => 0.5 - Math.random());

    /* setting state of cards after a delay to wait for reverse flip animation */
    setTimeout(() => {
      setCards(cardImages);
    }, 300);
    setFirstSelection(null);
    setSecondSelection(null);
    setTurns(0);
  };

  /* Removal of cards on changing dropdown */
  const resetGameContainer = () => {
    setCards([]);
    setTurns(0);
  };

  const flipCard = (card) => {
    firstSelection ? setSecondSelection(card) : setFirstSelection(card);
  };

  useEffect(() => {
    if (firstSelection && secondSelection) {
      setDisabled(true);
      if (firstSelection.hash == secondSelection.hash) {
        setCards((cards) => {
          return cards.map((card) => {
            return card.hash === firstSelection.hash
              ? { ...card, matched: true }
              : card;
          });
        });
        updateSelectionTurn();
      } else {
        setTimeout(() => {
          updateSelectionTurn();
        }, 1000);
      }
    }
  }, [firstSelection, secondSelection]);

  const updateSelectionTurn = () => {
    setSecondSelection(null);
    setFirstSelection(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  return (
    <div className="gameContainer flex flex-col h-auto m-3 p-3 items-center">
      <section className="gameHeader text-gray-600 body-font flex flex-col my-5 pr-4 pl-4">
        <div className="text-center w-full mb-2">
          <h1 className="text-2xl font-medium title-font mb-4 text-gray-300">
            NFT Memory Game
          </h1>
        </div>
        <div className="flex justify-center">
          <label className="mb-3 w-56 cursor-pointer text-gray-200 text-center">
            Pick NFT Collection
            <select
              name="selectedNft"
              value={selectedNft}
              onChange={(e) => {
                setSelectedNft(e.target.value);
                resetGameContainer();
              }}
              className="w-full cursor-pointer border border-gray-200 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
            >
              <option value="0">Select NFT</option>
              {nftCollection.map((nft) => (
                <option key={nft.nftId} value={nft.nftId}>
                  {nft.nftName}
                </option>
              ))}
            </select>
          </label>
        </div>
        {selectedNft != "0" && turns == 0 && (
          <button
            onClick={arrangeCards}
            className="flex mx-14 justify-center bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-500 rounded"
          >
            Start Game
          </button>
        )}
        {turns != 0 && (
          <button
            onClick={arrangeCards}
            className="flex mx-14 justify-center bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Restart
          </button>
        )}
      </section>
      <div className="cardContainer  grid max-sm:grid-cols-2 sm:grid-cols-2 md:sm:grid-cols-3 lg:grid-cols-4 gap-2 justify-center items-center">
        {cards &&
          cards.map((card) => (
            <div key={card.id}>
              <NFTCard
                card={card}
                nftId={selectedNft}
                flipCard={flipCard}
                flipped={
                  card === firstSelection ||
                  card === secondSelection ||
                  card.matched === true
                }
                disabled={disabled}
              />
            </div>
          ))}
      </div>
      {cards.length > 0 && (
        <div className="turns flex justify-center text-lg mt-6 ">
          <div className="mr-1 text-3xl">Turns: </div>
          <h2 className="text-3xl">{turns}</h2>
        </div>
      )}
    </div>
  );
};

export default GameContainer;
