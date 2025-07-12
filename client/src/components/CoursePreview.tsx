import React from 'react';
import { Play, Clock, Users, Award, Globe, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CoursePreviewProps {
  courseData: {
    title: string;
    price: number;
    originalPrice: number;
    discount: number;
    preview: {
      image: string;
      video?: string;
    };
    includes: Array<{
      icon: any;
      text: string;
    }>;
  };
}

const CoursePreview: React.FC<CoursePreviewProps> = ({ courseData }) => {
  return (
    <Card className="sticky top-4 shadow-xl py-0 bg-[#F8F9F5] border border-gray-300">
      <CardContent className="p-0">
        {/* Preview Image/Video */}
        <div className="relative aspect-video bg-slate-900 rounded-t-lg overflow-hidden">
          <img 
            src={courseData.preview.image} 
            alt="Course Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Button size="lg" className="rounded-full w-16 h-16 bg-white/90 hover:bg-white text-slate-900">
              <Play className="w-6 h-6 ml-1" />
            </Button>
          </div>
          <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
            Preview this course
          </div>
        </div>

        <div className="p-6">
          {/* Pricing */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold">${courseData.price}</span>
              <span className="text-lg line-through text-slate-500">${courseData.originalPrice}</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                {courseData.discount}% off
              </span>
            </div>
            <p className="text-red-600 font-semibold text-sm">
              🔥 Sale ends in 2 days!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-6">
            <Button className="w-full bg-[#2F4021] hover:bg-[#3A4D28] text-white font-semibold py-3">
              Buy Now
            </Button>
            <Button variant="outline" className="w-full font-semibold py-3">
              Add to Cart
            </Button>
          </div>

          {/* Money Back Guarantee */}
          <div className="text-center text-sm text-slate-600 mb-6">
            30-Day Money-Back Guarantee
          </div>

          {/* What's Included */}
          <div>
            <h4 className="font-semibold mb-3">This course includes:</h4>
            <div className="space-y-2">
              {courseData.includes.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <item.icon className="w-4 h-4 text-slate-600 flex-shrink-0" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t text-center space-y-2">
            <Button variant="link" className="text-sm text-slate-600">
              Share this course
            </Button>
            <Button variant="link" className="text-sm text-slate-600">
              Gift this course
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursePreview;