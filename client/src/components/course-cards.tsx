import {
  Clock,
  Users,
  Star,
  BookOpen,
  Edit,
  BookOpenIcon,
  HeartIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { ICourse } from "@/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CourseCard = ({
  _id,
  title,
  imageUrl,
  chapters,
  categoryId,
  price,
  hours,
}: ICourse) => {
  const navigate = useNavigate();
  const formatPrice = (price: number) => {
    return price === 0 ? "Free" : `$${price}`;
  };
  const [isWishlisted, setWishlist] = useState(false);

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg border border-gray-400 shadow-xl bg-[#f9fcf2] dark:bg-white/[0.03] overflow-hidden w-full">
      {/* Mobile-first vertical layout */}
      <div className="relative">
        {/* Thumbnail */}
        <div className="relative aspect-video w-full h-52 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <Badge
              className={`border-0 bg-slate-900 text-white font-medium text-xs shadow-sm`}
            >
              {categoryId?.name}
            </Badge>
          </div>

          {/* Price badge */}
          <div className="absolute top-3 right-3">
            <Badge
              className={`${
                price === 0
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-slate-900 hover:bg-primary/90"
              } text-white border-0 font-bold text-sm shadow-sm`}
            >
              {formatPrice(price || 0)}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardHeader className="pb-3 px-4 pt-4">
          <h3 className="font-semibold text-base leading-tight text-gray-900 dark:text-white group-hover:text-primary transition-colors min-h-[2.5rem] overflow-hidden text-ellipsis truncate">
            {title}
          </h3>
        </CardHeader>

        <CardContent className="px-4 pb-4 space-y-3">
          {/* Stats row */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1 overflow-hidden">
              <BookOpen className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium truncate">
                {chapters?.length} chapters
              </span>
            </div>
            <div className="flex items-center gap-1 overflow-hidden">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{hours}</span>
            </div>
          </div>

          {/* Rating and students */}
          <div className="flex items-center justify-between">
            {/* {rating && (
              <div className="flex items-center gap-1 overflow-hidden">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                <span className="font-semibold text-sm text-gray-500">{rating}</span>
                <span className="text-xs text-muted-foreground truncate">
                  ({Math.floor(Math.random() * 500) + 100})
                </span>
              </div>
            )} */}

            {/* {studentsCount > 0 && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground overflow-hidden">
                <Users className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{studentsCount > 1000 ? `${(studentsCount/1000).toFixed(1)}k` : studentsCount} students</span>
              </div>
            )} */}
          </div>
        </CardContent>

        <CardFooter className="px-4 pb-4 pt-0 flex flex-col gap-2">
          <Button
            className="w-full transition-all bg-[#2F4021] border border-[#2F4021] hover:border-[#AFD275] hover:bg-[#AFD275] hover:text-[#2F4021] text-[#AFD275] duration-200 hover:shadow-md font-medium"
            variant="outline"
            size="sm"
            onClick={() => {
              navigate(`/courses/${_id}`);
            }}
          >
            <BookOpenIcon className="w-4 h-4 mr-2" />
            Start Learning
          </Button>

          <Button
            className="w-full transition-all bg-transparent border border-[#2F4021] hover:bg-transparent hover:border-[#AFD275] text-[#2F4021] duration-200 hover:shadow-md font-medium"
            variant="outline"
            size="sm"
            onClick={() => {
              setWishlist(!isWishlisted);
            }}
          >
            {isWishlisted ? (
              <HeartIcon className="w-5 h-5 text-red-500 fill-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5" />
            )}
            Add to Wishlist
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default CourseCard;
