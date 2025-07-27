import React, { useState } from "react";
import { ChevronDown, ChevronRight, Play, Lock, FileText, Video, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz';
  isFree: boolean;
  isCompleted?: boolean;
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
  isExpanded?: boolean;
}

interface CourseCurriculumProps {
  chapters: Chapter[];
  totalDuration: string;
  completionRate?: number;
}

const CourseCurriculum: React.FC<CourseCurriculumProps> = ({ 
  chapters, 
  totalDuration, 
  completionRate = 0 
}) => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([chapters[0]?.id || ""]);
  const [playingLesson, setPlayingLesson] = useState<string | null>(null);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const getTotalLessons = () => {
    return chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);
  };

  const getCompletedLessons = () => {
    return chapters.reduce((total, chapter) => 
      total + chapter.lessons.filter(lesson => lesson.isCompleted).length, 0
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'reading': return FileText;
      case 'quiz': return CheckCircle;
      default: return Video;
    }
  };

  return (
    <Card className="shadow-card border-0 bg-gradient-card">
      <CardContent className="p-8">
        {/* Header */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Play className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Course Curriculum</h3>
              <p className="text-muted-foreground">
                {chapters.length} sections • {getTotalLessons()} lessons • {totalDuration} total length
              </p>
            </div>
          </div>

          {/* Progress Overview */}
          {completionRate > 0 && (
            <div className="bg-muted/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Your Progress</span>
                <span className="text-sm text-muted-foreground">
                  {getCompletedLessons()}/{getTotalLessons()} lessons completed
                </span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
          )}
        </div>

        {/* Curriculum Content */}
        <div className="space-y-4">
          {chapters.map((chapter, chapterIndex) => {
            const isExpanded = expandedChapters.includes(chapter.id);
            const completedLessons = chapter.lessons.filter(l => l.isCompleted).length;
            const progressPercentage = (completedLessons / chapter.lessons.length) * 100;

            return (
              <Collapsible 
                key={chapter.id}
                open={isExpanded}
                onOpenChange={() => toggleChapter(chapter.id)}
              >
                <CollapsibleTrigger asChild>
                  <div className="group cursor-pointer p-6 border border-border rounded-xl hover:shadow-elegant hover:bg-muted/30 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          )}
                          <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                            Section {chapterIndex + 1}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {chapter.title}
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            {chapter.lessons.length} lessons • {chapter.duration}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {completionRate > 0 && (
                          <div className="text-right space-y-1">
                            <div className="text-sm font-medium">
                              {completedLessons}/{chapter.lessons.length}
                            </div>
                            <Progress value={progressPercentage} className="w-16 h-1" />
                          </div>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {chapter.duration}
                        </Badge>
                      </div>
                    </div>

                    {isExpanded && (
                      <p className="text-muted-foreground mt-3 ml-8">
                        {chapter.description}
                      </p>
                    )}
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-2 mt-2">
                  {chapter.lessons.map((lesson, lessonIndex) => {
                    const IconComponent = getTypeIcon(lesson.type);
                    const isPlaying = playingLesson === lesson.id;

                    return (
                      <div
                        key={lesson.id}
                        className={`group ml-8 p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                          isPlaying 
                            ? 'border-primary bg-primary/5 shadow-elegant' 
                            : 'border-transparent hover:border-border hover:bg-muted/20'
                        }`}
                        onClick={() => setPlayingLesson(isPlaying ? null : lesson.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              lesson.isCompleted 
                                ? 'bg-course-success text-white' 
                                : lesson.isFree 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'bg-muted text-muted-foreground'
                            }`}>
                              {lesson.isCompleted ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : lesson.isFree ? (
                                <IconComponent className="w-4 h-4" />
                              ) : (
                                <Lock className="w-4 h-4" />
                              )}
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                  {chapterIndex + 1}.{lessonIndex + 1}
                                </span>
                                <h5 className={`font-medium ${isPlaying ? 'text-primary' : 'group-hover:text-primary'} transition-colors`}>
                                  {lesson.title}
                                </h5>
                                {lesson.isFree && (
                                  <Badge variant="outline" className="text-xs bg-course-success/10 text-course-success border-course-success/20">
                                    Free Preview
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {lesson.duration}
                            </div>
                            
                            {(lesson.isFree || lesson.isCompleted) && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className={isPlaying ? 'text-primary' : 'opacity-0 group-hover:opacity-100'}
                              >
                                <Play className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>

        {/* Summary Footer */}
        <div className="mt-8 p-6 bg-muted/30 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-semibold">Ready to start learning?</h4>
              <p className="text-sm text-muted-foreground">
                Get lifetime access to all {getTotalLessons()} lessons
              </p>
            </div>
            <Button variant="default" size="lg">
              Enroll Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;