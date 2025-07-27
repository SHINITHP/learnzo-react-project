import React, { useState, useEffect } from "react";
import { Star, Users, TrendingUp, Clock, Globe, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CourseHeroProps {
  courseData: {
    title: string;
    subtitle?: string;
    rating: number;
    totalRatings: number;
    students: number;
    lastUpdated: string;
    instructor: {
      name: string;
      title: string;
      image: string;
    };
  };
}

const CourseHero: React.FC<CourseHeroProps> = ({ courseData }) => {
  const [liveViewers, setLiveViewers] = useState(247);
  const [recentPurchases, setRecentPurchases] = useState(0);

  // Simulate live stats
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers(prev => prev + Math.floor(Math.random() * 3) - 1);
      if (Math.random() > 0.7) {
        setRecentPurchases(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-hero relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-20 h-20 border border-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 border border-white/5 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative pt-32 pb-20 px-4 md:px-8 xl:px-16">
        <div className="container mx-auto">
          <div className="space-y-8 animate-slide-up">
            {/* Live Stats Banner */}
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 flex items-center gap-2 animate-pulse-glow">
                <div className="w-2 h-2 bg-course-accent rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">{liveViewers} students viewing now</span>
              </div>
              {recentPurchases > 0 && (
                <div className="bg-course-success/20 backdrop-blur-sm border border-course-success/30 rounded-full px-4 py-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-course-success" />
                  <span className="text-white text-sm font-medium">{recentPurchases} recent enrollments</span>
                </div>
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
              <Badge className="bg-course-accent text-course-hero font-semibold px-4 py-2 animate-scale-in">
                🏆 Bestseller
              </Badge>
              <Badge className="bg-course-premium text-white font-semibold px-4 py-2 animate-scale-in" style={{ animationDelay: '0.1s' }}>
                🔥 Hot & New
              </Badge>
              <Badge className="bg-course-success text-white font-semibold px-4 py-2 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                ⭐ Top Rated
              </Badge>
              <Badge className="bg-white/10 backdrop-blur-sm text-white font-semibold px-4 py-2 animate-scale-in" style={{ animationDelay: '0.3s' }}>
                📱 Mobile Friendly
              </Badge>
            </div>

            {/* Title & Description */}
            <div className="space-y-6 text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight animate-slide-in-left">
                {courseData.title}
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                {courseData.subtitle}
              </p>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto lg:mx-0">
              <div className="text-center lg:text-left space-y-2 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(courseData.rating)
                          ? "fill-course-accent text-course-accent"
                          : "text-white/40"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-2xl font-bold text-course-accent">{courseData.rating}</div>
                <div className="text-white/80 text-sm">
                  {courseData.totalRatings.toLocaleString()} reviews
                </div>
              </div>

              <div className="text-center lg:text-left space-y-2 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <Users className="w-6 h-6 text-white/80 mx-auto lg:mx-0" />
                <div className="text-2xl font-bold text-white">
                  {(courseData.students / 1000).toFixed(0)}K+
                </div>
                <div className="text-white/80 text-sm">Students enrolled</div>
              </div>

              <div className="text-center lg:text-left space-y-2 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <Clock className="w-6 h-6 text-white/80 mx-auto lg:mx-0" />
                <div className="text-2xl font-bold text-white">32.5h</div>
                <div className="text-white/80 text-sm">Total content</div>
              </div>

              <div className="text-center lg:text-left space-y-2 animate-slide-up" style={{ animationDelay: '0.7s' }}>
                <Globe className="w-6 h-6 text-white/80 mx-auto lg:mx-0" />
                <div className="text-2xl font-bold text-white">Lifetime</div>
                <div className="text-white/80 text-sm">Access</div>
              </div>
            </div>

            {/* Instructor Card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-md mx-auto lg:mx-0 animate-scale-in" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center gap-4">
                <img
                  src={courseData.instructor.image}
                  alt="Instructor"
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                />
                <div>
                  <p className="text-white/80 text-sm">Created by</p>
                  <h3 className="text-white font-bold text-lg">
                    {courseData.instructor.name}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {courseData.instructor.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons - Mobile Only */}
            <div className="flex gap-4 justify-center lg:hidden">
              <Button variant="outline" size="lg" className="px-8">
                Enroll Now
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Preview
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHero;