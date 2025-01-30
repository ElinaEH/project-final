import React from 'react';
import { ArrowDown } from 'lucide-react';
import "./ArrowIcon.css";

const ArrowIcon = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <div className="arrowContainer">
          <ArrowDown size={48} color="#FFD700" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};

export default ArrowIcon;
