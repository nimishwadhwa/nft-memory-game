import React from "react";
import Image from "next/image";

const NFTCard = ({ card, nftId, flipCard, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) flipCard(card);
  };
  return (
    <div className={`card flex flex-col  relative ${flipped ? `flipped` : ""}`}>
      <Image
        src={card.src}
        className="nftImg border border-white rounded-md absolute backface"
        alt="nftImage"
        width={200}
        height={200}
      />
      <Image
        src={`/static/${nftId}/back.jpg`}
        className="backImg border border-white rounded-md cursor-pointer"
        alt="backImage"
        onClick={handleClick}
        width={200}
        height={200}
      />
    </div>
  );
};

export default NFTCard;
