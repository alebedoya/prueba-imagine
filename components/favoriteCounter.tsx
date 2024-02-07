import React from 'react';
import { FaHeart } from 'react-icons/fa';
import "@styles/favoriteCounter.css";

interface FavoriteCountProps {
  count: number;
}

const FavoriteCounter: React.FC<FavoriteCountProps> = ({ count }) => {
  return (
    <div className="favorite-counter">
      <FaHeart size={25}/>
      <span className="badge">{count}</span>
    </div>
  );
};

export default FavoriteCounter;
