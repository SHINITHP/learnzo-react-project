import {
  Star,
  Clock,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  Play,
  Download,
  Calendar,
  Heart,
  Lock,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "@/services/courseApi";
import { sanitizeHTML } from "@/utils/sanitize";
import CourseStats from "@/components/CourseStats";
import { RelatedCourses } from "@/components/related-course";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  if (!id) navigate("/courses");

  const { data, error, isLoading } = useGetCourseByIdQuery(id!);
  const course = data?.data;

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-slate-500.20 top-0 right-0 rounded-m flex items-center justify-center">
        <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
      </div>
    );
  }

  if (error || !course) {
    console.error("Error fetching course data:", error);
    return (
      <div className="h-screen w-full mx-auto px-4 py-12 flex justify-center items-center">
        <h2 className="text-2xl font-bold text-red-600">
          Error loading course details.
        </h2>
      </div>
    );
  }

  const courseFeatures = [
    { icon: Clock, label: "8 hours of content", value: "8h" },
    {
      icon: BookOpen,
      label: `${course.chapters?.length} Chapters`,
      value: "41",
    },
    { icon: Users, label: "12,847 students", value: "12.8K" },
    { icon: Award, label: "Certificate included", value: "Certificate" },
    { icon: Download, label: "Downloadable resources", value: "Resources" },
    { icon: Calendar, label: "Lifetime access", value: "Lifetime" },
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "SJ",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Excellent course! John's teaching style is clear and engaging. The projects really helped me understand the concepts better.",
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "MC",
      rating: 5,
      date: "1 month ago",
      comment:
        "Best web development course I've taken. Great balance of theory and practical application. Highly recommended!",
    },
    {
      id: 3,
      name: "Emily Davis",
      avatar: "ED",
      rating: 4,
      date: "3 weeks ago",
      comment:
        "Very comprehensive course. The instructor explains everything step by step. Could use more advanced topics.",
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      avatar: "AR",
      rating: 5,
      date: "1 week ago",
      comment:
        "Amazing content! I went from knowing nothing about web development to building my own projects. Worth every penny.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9fcf2] py-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-primary overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container flex mx-auto px-4 h-80 justify-center items-center">
          <div className="text-white space-y-4 lg:w-[60%]">
            <div className="space-y-2">
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30"
              >
                Bestseller
              </Badge>
              <h1 className="text-2xl lg:text-4xl font-bold leading-tight">
                {course.title}
              </h1>
              <p
                className="text-base lg:text-lg text-white/90"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(course.description),
                }}
              ></p>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-2 font-semibold">4.8</span>
              </div>
              <span className="text-white/80">(2,847 reviews)</span>
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={"instructorAvatar"} />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <span className="text-sm">John Smith</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex justify-center items-center w-[40%]">
            <div className="relative bg-[#1b1b1b] w-[80%] h-48 lg:h-64 rounded-md border-[8px] border-gray-800 shadow-inner overflow-hidden">
              <img
                src={course.imageUrl}
                alt="Course preview"
                className="w-full h-full object-cover"
              />
              {/* TV Stand */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-700 rounded"></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-[#f9fcf2] border border-gray-300">
            <TabsTrigger
              className="data-[state=active]:bg-[#4F6B31] data-[state=active]:text-white data-[state=active]:hover:bg-[#617C45]"
              value="overview"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-[#4F6B31] data-[state=active]:text-white data-[state=active]:hover:bg-[#617C45]"
              value="curriculum"
            >
              Curriculum
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-[#4F6B31] data-[state=active]:text-white data-[state=active]:hover:bg-[#617C45]"
              value="statistics"
            >
              Statistics
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-[#4F6B31] data-[state=active]:text-white data-[state=active]:hover:bg-[#617C45]"
              value="reviews"
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8 bg-[#f9fcf2]">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Course Image and Price Section */}
                <Card className="bg-[#f9fcf2] border border-gray-300 shadow-lg">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative">
                        <img
                          src={course.imageUrl}
                          alt="Course preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          size="lg"
                          className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/50"
                        >
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-3xl font-bold text-primary">
                              {course.price === 0 ? "Free" : `$${course.price}`}
                            </span>
                            <span className="text-lg text-muted-foreground line-through ml-2">
                              $199
                            </span>
                          </div>
                          <Badge variant="destructive">55% OFF</Badge>
                        </div>
                        <div className="space-y-2">
                          <Button className="w-full" size="lg">
                            Enroll Now
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Heart className="w-4 h-4 mr-2" />
                            Add to Wishlist
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          30-day money-back guarantee
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Course Description */}
                {/* <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">
                      Course Description
                    </h2>
                    <div className="prose prose-gray max-w-none space-y-4">
                      <p>
                        Welcome to the Complete Web Development Bootcamp! This
                        comprehensive course is designed to take you from a
                        complete beginner to a confident web developer capable
                        of building modern, responsive websites and
                        applications.
                      </p>
                      <p>
                        Throughout this course, you'll master the essential
                        technologies that power the modern web: HTML5, CSS3,
                        JavaScript ES6+, and React. We'll start with the
                        fundamentals and progressively build your skills through
                        hands-on projects and real-world examples.
                      </p>
                      <p>
                        What sets this course apart is our project-based
                        approach. You won't just learn theory – you'll build
                        actual websites and applications that you can add to
                        your portfolio.
                      </p>
                    </div>
                  </CardContent>
                </Card> */}

                {/* What You'll Learn */}
                <Card className="bg-[#f9fcf2] border border-gray-300 shadow-lg">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">
                      What you'll learn
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {course.outcomes?.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Course Features Sidebar */}
              <div className="space-y-6">
                <Card className="bg-[#f9fcf2] border border-gray-300 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">
                      This course includes:
                    </h3>
                    <div className="space-y-3">
                      {courseFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <feature.icon className="w-5 h-5 text-muted-foreground" />
                          <span className="text-sm">{feature.label}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#f9fcf2] border border-gray-300 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Prerequisites</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                        <span>Basic computer skills</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                        <span>No prior programming experience required</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                        <span>Enthusiasm to learn web development</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-6">
            <Card className="bg-[#f9fcf2] border border-gray-300 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Course Curriculum</h2>
                  <div className="text-sm text-muted-foreground">
                    {course.chapters?.length} sections • 41 lectures • 8h total
                    length
                  </div>
                </div>
                <div className="space-y-4">
                  {course.chapters?.map((chapter, index) => (
                    <Card
                      key={index}
                      className="bg-[#f9fcf2] border border-gray-300"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">
                              {chapter.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: sanitizeHTML(chapter.description),
                                }}
                              ></span>
                              {/* <span>18-hours</span> */}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            {chapter.isFree ? (
                              <Play className="w-4 h-4" />
                            ) : (
                              <Lock className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {/* {chapter.topics.map((topic, topicIndex) => (
                            <Badge
                              key={topicIndex}
                              variant="secondary"
                              className="text-xs"
                            >
                              {topic}
                            </Badge>
                          ))} */}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <CourseStats />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card className="bg-[#f9fcf2] border border-gray-300 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Student Reviews</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="font-semibold">4.8 out of 5</span>
                    <span className="text-muted-foreground">
                      (2,847 reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-b-gray-300 pb-6 last:border-b-0"
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>{review.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{review.name}</h4>
                            <div className="flex items-center gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-3 h-3 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <RelatedCourses />
    </div>
  );
};

export default CourseDetails;
