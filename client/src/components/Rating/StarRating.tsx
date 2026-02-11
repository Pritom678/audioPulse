"use client";

import { useState } from "react";
import { Star, StarHalf } from "lucide-react";

type StarRatingProps = {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showCount?: boolean;
  className?: string;
};

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviewCount = 0,
  size = "md",
  interactive = false,
  onRatingChange,
  showCount = true,
  className = "",
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        // Full star
        stars.push(
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              interactive
                ? "cursor-pointer text-yellow-400 hover:text-yellow-500 transition-colors"
                : "text-yellow-400"
            }`}
            fill="currentColor"
            onClick={() => interactive && onRatingChange?.(i)}
            onMouseEnter={() => interactive && setHoverRating(i)}
            onMouseLeave={() => interactive && setHoverRating(0)}
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        // Half star
        stars.push(
          <StarHalf
            key={i}
            className={`${sizeClasses[size]} ${
              interactive
                ? "cursor-pointer text-yellow-400 hover:text-yellow-500 transition-colors"
                : "text-yellow-400"
            }`}
            fill="currentColor"
            onClick={() => interactive && onRatingChange?.(i)}
            onMouseEnter={() => interactive && setHoverRating(i)}
            onMouseLeave={() => interactive && setHoverRating(0)}
          />
        );
      } else {
        // Empty star
        stars.push(
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              interactive
                ? "cursor-pointer text-gray-300 hover:text-yellow-400 transition-colors"
                : "text-gray-300"
            } ${
              hoverRating >= i && interactive ? "text-yellow-400" : ""
            }`}
            fill="currentColor"
            onClick={() => interactive && onRatingChange?.(i)}
            onMouseEnter={() => interactive && setHoverRating(i)}
            onMouseLeave={() => interactive && setHoverRating(0)}
          />
        );
      }
    }

    return stars;
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">{renderStars()}</div>
      {showCount && reviewCount > 0 && (
        <span className="text-sm text-gray-500 ml-2">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

export default StarRating;
