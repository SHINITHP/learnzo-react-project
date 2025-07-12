import React from "react";
import { Star, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RelatedCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Advanced React Patterns & Performance",
      instructor: "John Martinez",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=180&fit=crop",
      rating: 4.7,
      reviews: 3420,
      price: 79.99,
      originalPrice: 159.99,
      duration: "18.5 hours",
      students: 12400,
      bestseller: true,
    },
    {
      id: 2,
      title: "Next.js 14 Complete Developer Guide",
      instructor: "Anna Williams",
      image:
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=180&fit=crop",
      rating: 4.6,
      reviews: 5200,
      price: 69.99,
      originalPrice: 129.99,
      duration: "22 hours",
      students: 18900,
      bestseller: false,
    },
    {
      id: 3,
      title: "TypeScript Mastery for React Developers",
      instructor: "Robert Chen",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=180&fit=crop",
      rating: 4.8,
      reviews: 2150,
      price: 59.99,
      originalPrice: 119.99,
      duration: "15 hours",
      students: 8300,
      bestseller: false,
    },
    {
      id: 4,
      title: "Full Stack React & Node.js Bootcamp",
      instructor: "Maria Garcia",
      image:
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=300&h=180&fit=crop",
      rating: 4.5,
      reviews: 7800,
      price: 99.99,
      originalPrice: 199.99,
      duration: "45 hours",
      students: 25600,
      bestseller: true,
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center">Related Courses</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="py-0 group hover:scale-[1.03] hover:shadow-xl transition-transform duration-300 cursor-pointer rounded-lg"
          >
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {course.bestseller && (
                  <Badge className="absolute top-3 left-3 bg-yellow-500 text-black font-semibold">
                    Bestseller
                  </Badge>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>

                <p className="text-slate-600 text-sm mb-3">
                  {course.instructor}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold ml-1">
                      {course.rating}
                    </span>
                  </div>
                  <span className="text-sm text-slate-500">
                    ({course.reviews.toLocaleString()})
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">${course.price}</span>
                  <span className="text-sm line-through text-slate-500">
                    ${course.originalPrice}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
          View All Related Courses →
        </button>
      </div>
    </div>
  );
};

export default RelatedCourses;
