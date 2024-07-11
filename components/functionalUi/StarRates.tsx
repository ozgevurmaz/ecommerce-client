import { StarHalf, Star } from "lucide-react";

const Rating = () => {
  const rating = 3.5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="relative flex items-center">
      <div className="flex gap-[1px]">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} fill="#111" strokeWidth={0} />
        ))}
      </div>
      <div className="flex gap-[1px] absolute top-0">
        {Array.from({ length: fullStars }, (_, index) => (
          <Star key={index} fill="yellow" strokeWidth={0} />
        ))}
        {hasHalfStar && <StarHalf fill="yellow" strokeWidth={0} />}
      </div>
    </div>
  );
};

export default Rating;
