import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Star,
  Clock,
  Users,
  CheckCircle,
  ShieldCheck,
  Play,
  Download,
  Award,
  Infinity,
  Monitor,
  Smartphone,
} from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  // Mock course data - in real app this would come from props/context
  const course = {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    originalPrice: 149.99,
    discountPrice: 89.99,
    discount: 40,
    image: "/placeholder.svg",
    rating: 4.8,
    students: 12847,
    duration: "42 hours",
    lessons: 156,
    description:
      "Master modern web development with React, Node.js, and MongoDB. Build real-world projects and learn industry best practices.",
    highlights: [
      "Build 10+ real-world projects",
      "Learn React, Node.js, MongoDB",
      "Get job-ready with portfolio projects",
      "Lifetime access to course materials",
      "Certificate of completion",
    ],
    includes: [
      { icon: Play, text: "42 hours of on-demand video" },
      { icon: Download, text: "Downloadable resources" },
      { icon: Award, text: "Certificate of completion" },
      { icon: Infinity, text: "Lifetime access" },
      { icon: Monitor, text: "Access on desktop" },
      { icon: Smartphone, text: "Access on mobile" },
    ],
  };

  const handleStripeCheckout = () => {
    // This will redirect to Stripe Checkout
    // In real implementation, this would call your backend to create a checkout session
    console.log("Redirecting to Stripe checkout...", {
      email,
      courseId: course.id,
    });
    // window.location.href = stripeCheckoutUrl;
  };

  return (
    <div className="min-h-screen bg-background py-32">
      <div className="container">
        {/* <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Button> */}
        <h1 className="text-2xl font-bold text-foreground" >CheckOut</h1>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Info & Checkout */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Preview */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="secondary"
                        className="bg-accent text-accent-foreground"
                      >
                        {course.discount}% OFF
                      </Badge>
                    </div>
                    <h1 className="text-xl font-bold mb-2">{course.title}</h1>
                    <p className="text-sm text-muted-foreground mb-3">
                      by {course.instructor}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Checkout Form */}
            <Card className="py-6">
              <CardHeader>
                <CardTitle>Complete Your Purchase</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email for course access"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    We'll send your course access details to this email
                  </p>
                </div>

                <Button
                  onClick={handleStripeCheckout}
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  size="lg"
                  disabled={!email}
                >
                  Proceed to Payment
                </Button>

                <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  <span>Secure payment powered by Stripe</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 py-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Course Details */}
                <div className="flex gap-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      by {course.instructor}
                    </p>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-warning text-warning" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-muted-foreground" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-muted-foreground" />
                    <span>{course.lessons} lessons</span>
                  </div>
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Original Price</span>
                    <span className="line-through text-muted-foreground">
                      ${course.originalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Discount</span>
                    <Badge
                      variant="secondary"
                      className="bg-accent text-accent-foreground"
                    >
                      {course.discount}% OFF
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount Amount</span>
                    <span className="text-success">
                      -$
                      {(course.originalPrice - course.discountPrice).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${course.discountPrice}</span>
                </div>

                {/* Security Badge */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-success-light p-3 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
