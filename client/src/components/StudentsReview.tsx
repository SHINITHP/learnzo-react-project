import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StudentReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      rating: 5,
      date: "2 weeks ago",
      comment: "Absolutely fantastic course! Sarah explains complex concepts in a very clear and understandable way. The projects are practical and really help solidify the learning. Highly recommended for anyone wanting to master React.",
      helpful: 12
    },
    {
      id: 2,
      name: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      rating: 5,
      date: "1 month ago",
      comment: "This course exceeded my expectations. The curriculum is well-structured, starting from basics and gradually building up to advanced topics. The TypeScript integration section was particularly valuable.",
      helpful: 8
    },
    {
      id: 3,
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      rating: 4,
      date: "3 weeks ago",
      comment: "Great course with lots of practical examples. The instructor is knowledgeable and the pace is just right. My only suggestion would be to include more testing examples in the earlier sections.",
      helpful: 5
    },
    {
      id: 4,
      name: "Jessica Taylor",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      rating: 5,
      date: "1 week ago",
      comment: "Perfect for both beginners and intermediate developers. The real-world projects really help you understand how to apply React concepts in actual applications. Worth every penny!",
      helpful: 15
    }
  ];

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <Card key={review.id} className='bg-transparent border border-gray-300'>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <img 
                src={review.avatar} 
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold">{review.name}</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-500">{review.date}</span>
                </div>
                
                <p className="text-slate-700 mb-3 leading-relaxed">
                  {review.comment}
                </p>
                
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                    Report
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="text-center">
        <Button variant="outline" className="font-semibold">
          Show All Reviews
        </Button>
      </div>
    </div>
  );
};

export default StudentReviews;