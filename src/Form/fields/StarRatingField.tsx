import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Star } from "lucide-react";
import { useState } from "react";
import { FieldProps } from "../types";

interface StarRatingFieldProps extends FieldProps {
  options: string[];
}

export const StarRatingField = ({
  field,
  fieldState,
  label,
  required,
  options,
}: StarRatingFieldProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleMouseEnter = (rating: number) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = (rating: string) => {
    field.onChange(rating);
  };

  return (
    <FormItem className="flex items-start gap-8 w-full">
      {/* Question on the left */}
      <div className="flex-1">
        <FormLabel className="text-base font-medium text-gray-800">
          {label}
          {required && "*"}
        </FormLabel>
      </div>

      {/* Star rating on the right */}
      <div className="flex-1">
        <FormControl>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {options.map((rating) => {
                const ratingNum = parseInt(rating);
                const isHovered =
                  hoverRating !== null && ratingNum <= hoverRating;
                const isSelected =
                  field.value && parseInt(field.value) >= ratingNum;

                return (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleClick(rating)}
                    onMouseEnter={() => handleMouseEnter(ratingNum)}
                    onMouseLeave={handleMouseLeave}
                    className="group relative p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 rounded-lg transition-transform hover:scale-110"
                  >
                    <Star
                      size={28}
                      className={`
                        transition-colors duration-200
                        ${
                          isHovered || isSelected
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }
                        hover:fill-yellow-400 hover:text-yellow-400
                      `}
                    />
                    <span className="sr-only">Rate {rating} stars</span>

                    {/* Tooltip */}
                    <div
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                                  opacity-0 group-hover:opacity-100 transition-opacity
                                  bg-gray-800 text-white text-xs px-2 py-1 rounded
                                  whitespace-nowrap pointer-events-none"
                    >
                      {rating} {parseInt(rating) === 1 ? "Star" : "Stars"}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Current rating display */}
            {field.value && (
              <span className="ml-2 text-sm font-medium text-gray-600">
                {field.value} {parseInt(field.value) === 1 ? "Star" : "Stars"}
              </span>
            )}
          </div>
        </FormControl>
        {fieldState.error && (
          <FormMessage className="mt-1">{fieldState.error.message}</FormMessage>
        )}
      </div>
    </FormItem>
  );
};
