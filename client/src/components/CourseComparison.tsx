import { CheckCircle, X, Star, Users, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CourseComparison = () => {
  const courses = [
    {
      id: 1,
      name: "This Course",
      price: 89.99,
      originalPrice: 199.99,
      rating: 4.8,
      students: 45632,
      duration: "32.5 hours",
      features: {
        "Lifetime Access": true,
        "Certificate": true,
        "Mobile App": true,
        "Downloadable Resources": true,
        "Community Access": true,
        "1-on-1 Support": true,
        "Project Reviews": true,
        "Job Assistance": true,
        "Updated Content": true,
        "Money Back Guarantee": true
      },
      highlight: true
    },
    {
      id: 2,
      name: "Competitor A",
      price: 129.99,
      originalPrice: 249.99,
      rating: 4.2,
      students: 23450,
      duration: "28 hours",
      features: {
        "Lifetime Access": false,
        "Certificate": true,
        "Mobile App": false,
        "Downloadable Resources": true,
        "Community Access": false,
        "1-on-1 Support": false,
        "Project Reviews": false,
        "Job Assistance": false,
        "Updated Content": true,
        "Money Back Guarantee": true
      },
      highlight: false
    },
    {
      id: 3,
      name: "Competitor B",
      price: 79.99,
      originalPrice: 159.99,
      rating: 3.9,
      students: 18200,
      duration: "24 hours",
      features: {
        "Lifetime Access": true,
        "Certificate": false,
        "Mobile App": true,
        "Downloadable Resources": false,
        "Community Access": true,
        "1-on-1 Support": false,
        "Project Reviews": false,
        "Job Assistance": false,
        "Updated Content": false,
        "Money Back Guarantee": false
      },
      highlight: false
    }
  ];

  return (
    <Card className="shadow-card border-0 bg-gradient-card">
      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Compare Courses</h3>
            <p className="text-muted-foreground">
              See how our course stacks up against the competition
            </p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-w-full">
              {courses.map((course) => (
                <div 
                  key={course.id}
                  className={`relative rounded-2xl border-2 transition-all duration-300 ${
                    course.highlight 
                      ? 'border-primary bg-primary/5 shadow-glow scale-105' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {course.highlight && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1 font-semibold">
                        🏆 Best Value
                      </Badge>
                    </div>
                  )}

                  <div className="p-6 space-y-6">
                    {/* Course Header */}
                    <div className="text-center space-y-3">
                      <h4 className={`text-xl font-bold ${course.highlight ? 'text-primary' : ''}`}>
                        {course.name}
                      </h4>
                      
                      <div className="space-y-2">
                        <div className="flex items-baseline justify-center gap-2">
                          <span className={`text-3xl font-bold ${course.highlight ? 'text-primary' : ''}`}>
                            ${course.price}
                          </span>
                          <span className="text-lg text-muted-foreground line-through">
                            ${course.originalPrice}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {course.rating}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {(course.students / 1000).toFixed(1)}k
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.duration}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3">
                      {Object.entries(course.features).map(([feature, included]) => (
                        <div key={feature} className="flex items-center justify-between">
                          <span className="text-sm">{feature}</span>
                          {included ? (
                            <CheckCircle className="w-5 h-5 text-course-success" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button 
                      variant={"outline"} 
                      className="w-full"
                      size="lg"
                    >
                      {course.highlight ? "Enroll Now" : "Learn More"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Note */}
          <div className="text-center text-sm text-muted-foreground bg-muted/30 p-4 rounded-xl">
            <p>
              💡 <strong>Pro tip:</strong> Our course offers the best value with lifetime access, 
              comprehensive support, and regular updates - all at a competitive price!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseComparison;