import React from "react";

import { StarHalf, Star } from "lucide-react";

const StarRates = () => {
  return (
    <div className="flex items-center text-small-medium">
      <div className="relative">
        <div className="flex gap-[1px]">
          {Array.from({ length: 5 }, () => (
            <Star fill="#111" strokeWidth={0} size={"14px"} />
          ))}
        </div>
        <div className="flex gap-[1px] absolute top-0">
          <Star fill="yellow" strokeWidth={0} size={"14px"} />
          <Star fill="yellow" strokeWidth={0} size={"14px"} />
          <Star fill="yellow" strokeWidth={0} size={"14px"} />
          <Star fill="yellow" strokeWidth={0} size={"14px"} />
          <StarHalf fill="yellow" strokeWidth={0} size={"14px"} />
        </div>
      </div>
      (4.7)
    </div>
  );
};

export default StarRates;
