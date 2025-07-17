"use client";

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Star,
  Play,
  Clock,
  Users,
  Award,
  Globe,
  Download,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import CoursePreview from "@/components/CoursePreview";
import StudentReviews from "@/components/StudentsReview";
import RelatedCourses from "@/components/RelatedCourses";
import { useGetCourseByIdQuery } from "@/services/courseApi";
import { sanitizeHTML } from "@/utils/sanitize";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  if (!id) return navigate("/courses");

  const [activeTab, setActiveTab] = useState("overview");
  const { data, error } = useGetCourseByIdQuery(id!);

  if (error) {
    console.error("Error fetching course data:", error);
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-red-600">
          Error loading course details.
        </h2>
      </div>
    );
  }

  const course = data?.data;

  const courseData = {
    title: course?.title ?? "",
    subtitle: course?.description,
    price: course?.price ?? 89.99,
    originalPrice: 199.99,
    discount: 55,
    rating: 4.8,
    totalRatings: 12847,
    students: course?.purchases?.length ?? 45632,
    lastUpdated:
      new Date(course?.updatedAt ?? "").toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      }) ?? "November 2024",
    language: course?.languages?.[0],
    duration: course?.hours,
    chapters: course?.chapters ?? [],
    instructor: {
      name: "Sarah Johnson",
      title: "Senior Full Stack Developer",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 4.9,
      students: 125000,
    },

    preview: {
      image:
        course?.imageUrl ??
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop",
      video: "",
    },

    includes: [
      { icon: Clock, text: `${course?.hours ?? "32.5"} hours on-demand video` },
      { icon: Download, text: "15 downloadable resources" },
      { icon: Globe, text: "Full lifetime access" },
      { icon: Award, text: "Certificate of completion" },
      { icon: Users, text: "Direct access to instructor" },
    ],

    features: course?.outcomes ?? [],
  };

  const ratingBreakdown = [
    { stars: 5, percentage: 68, count: 8736 },
    { stars: 4, percentage: 22, count: 2826 },
    { stars: 3, percentage: 7, count: 899 },
    { stars: 2, percentage: 2, count: 257 },
    { stars: 1, percentage: 1, count: 129 },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9F5]">
      {/* Header */}
      <div className="bg-[#2F4021] pt-24 px-4 md:px-8 xl:px-16 text-white py-16">
        <div className="container mx-auto grid lg:grid-cols-3 gap-8 items-start">
          {/* Course Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-blue-600 text-white">
                Bestseller
              </Badge>
              <Badge
                variant="outline"
                className="border-yellow-400 text-yellow-400"
              >
                Hot & New
              </Badge>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              {courseData.title}
            </h1>
            <p
              className="text-lg text-slate-300 mb-6"
              dangerouslySetInnerHTML={{
                __html: sanitizeHTML(courseData.subtitle),
              }}
            ></p>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(courseData.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-400"
                    }`}
                  />
                ))}
                <span className="text-yellow-400 font-semibold">
                  {courseData.rating}
                </span>
                <span className="text-slate-300">
                  ({courseData.totalRatings.toLocaleString()} ratings)
                </span>
              </div>
              <div className="text-slate-300">
                {courseData.students.toLocaleString()} students
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4 text-sm text-slate-300">
              <span>Created by {courseData.instructor.name}</span>
              <span>Last updated {courseData.lastUpdated}</span>
              <span>{courseData.language}</span>
            </div>
          </div>

          {/* Preview for Mobile */}
          <div className="lg:hidden bg-transparent">
            <CoursePreview courseData={courseData} />
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="container mx-auto px-4 md:px-8 xl:px-16 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left (Tabs) */}
          <div className="lg:col-span-2 w-full">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-6 w-full bg-transparent border">
                <TabsTrigger
                  className="data-[state=active]:bg-[#2F4021] h-full data-[state=active]:text-white"
                  value="overview"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-[#2F4021] data-[state=active]:text-white"
                  value="curriculum"
                >
                  Curriculum
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-[#2F4021] data-[state=active]:text-white"
                  value="reviews"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="overview"
                className="space-y-8 bg-transparent"
              >
                {/* Features */}
                <Card className="bg-transparent border border-gray-300">
                  <CardContent className="p-6 ">
                    <h3 className="text-2xl font-bold mb-6">
                      What you'll learn
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {courseData.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Description */}
                {/* <Card className="bg-transparent border border-gray-300">
                  <CardContent className="p-6 space-y-4 text-slate-700">
                    <h3 className="text-2xl font-bold">Course Description</h3>
                    <p>
                      Welcome to the most comprehensive React course online!
                    </p>
                    <p>
                      Learn production-ready modern React apps, build real-world
                      projects, and more.
                    </p>
                    <p>
                      Each section is tailored to practical learning and
                      hands-on builds.
                    </p>
                  </CardContent>
                </Card> */}

                {/* Instructor */}
                <Card className="bg-transparent border border-gray-300">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-6">
                      Meet Your Instructor
                    </h3>
                    <div className="flex items-start gap-4">
                      <img
                        src={courseData.instructor.image}
                        alt="Instructor"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-lg">
                          {courseData.instructor.name}
                        </h4>
                        <p className="text-slate-600">
                          {courseData.instructor.title}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {courseData.instructor.rating} Instructor Rating
                          </div>
                          <span>
                            {courseData.instructor.students.toLocaleString()}{" "}
                            Students
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                <Card className="bg-transparent border border-gray-300">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4">
                      Course Curriculum
                    </h3>
                    <div className="space-y-4">
                      {courseData.chapters.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50"
                        >
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p
                              className="text-sm text-slate-600"
                              dangerouslySetInnerHTML={{
                                __html: sanitizeHTML(item.description),
                              }}
                            ></p>{" "}
                            <span> {item.duration}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-8">
                <Card className="bg-transparent border border-gray-300">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4">Student Reviews</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-slate-900">
                          {courseData.rating}
                        </div>
                        <div className="flex justify-center mt-2 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-6 h-6 ${
                                i < Math.floor(courseData.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-slate-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-slate-600">
                          {courseData.totalRatings.toLocaleString()} ratings
                        </p>
                      </div>
                      <div className="space-y-2">
                        {ratingBreakdown.map((r) => (
                          <div
                            key={r.stars}
                            className="flex items-center gap-3"
                          >
                            <div className="w-20 flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{r.stars}</span>
                            </div>
                            <Progress
                              value={r.percentage}
                              className="flex-1 h-2"
                            />
                            <span className="w-10 text-sm text-slate-600">
                              {r.percentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <StudentReviews />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block space-y-6 bg-transparent">
            <CoursePreview courseData={courseData} />
            <Card className="bg-[#F8F9F5] border border-gray-300">
              <CardContent className="p-6 bg-transparent">
                <h3 className="font-semibold mb-4">This course includes:</h3>
                <div className="space-y-3">
                  {courseData.includes.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm"
                    >
                      <item.icon className="w-4 h-4 text-slate-600" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Section */}
        <div className="mt-16">
          <RelatedCourses />
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
