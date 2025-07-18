import CategoryForm from "@/components/category-form";
import DescriptionForm from "@/components/description-form";
import { IconBadge } from "@/components/icon-badge";
import ImageForm from "@/components/image-form";
import PriceForm from "@/components/price-form";
import TitleForm from "@/components/title-form";
import { useLazyGetCategoriesQuery } from "@/services/categoryApi";
import { useLazyGetCourseByIdQuery } from "@/services/courseApi";
import {
  ArrowLeft,
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
  Loader2,
} from "lucide-react";
import { useParams } from "react-router-dom";
import AttachmentForm from "@/components/attachment-form";
import ChapterForm from "@/components/chapter-form";
import PageMeta from "@/components/common/PageMeta";
import { useEffect } from "react";
import { Banner } from "@/components/banner";
import { CourseActions } from "@/components/course-action";
import LearningOutcomesForm from "@/components/learning-outcome-form";
import LanguageForm from "@/components/language-form";
import HoursForm from "@/components/course-hours-form";
import { Link } from "react-router-dom";

const EditCourse = () => {
  const { id } = useParams<{ id: string }>();
  const [triggerGetCourse, { data, isLoading, error }] =
    useLazyGetCourseByIdQuery();
  const [triggerGetCategories, { data: categories }] =
    useLazyGetCategoriesQuery();

  useEffect(() => {
    triggerGetCourse(id!);
    triggerGetCategories();
  }, []);

  const course = data?.data;

  if (isLoading) {
    return (
      <div className="absolute h-screen w-full bg-slate-500.20 top-0 right-0 rounded-m flex items-center justify-center">
        <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
      </div>
    );
  }

  if (error) {
    console.log("error :", error);
    return (
      <div className="flex justify-center items-center h-screen dark:bg-transparent w-full p-5 text-center ">
        Failed to load the course. Please try again later.
      </div>
    );
  }

  if (!course) {
    return null;
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.hours,
    course.languages,
    course.outcomes,
    course.chapters.some((chapter) => chapter.isPublished),
    course.attachments,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <PageMeta
        title="LearnEase Admin Panel"
        description="LearnEase admin edit course page"
      />
      <div className="mt-16 rounded-2xl md:border border-gray-200 md:bg-white md:dark:border-gray-800 md:dark:bg-white/[0.03]">
        <Link
          to="/courses"
          className="inline-flex items-center text-sm text-white hover:text-muted-foreground px-6 mt-10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Link>

        {!course?.isPublished && (
          <Banner
            className="bg-amber-200 text-amber-900 mt-6"
            variant="warning"
            label="This Course is unpublished. It will not be visible to the users."
          />
        )}

        <div className="flex items-center justify-between px-2 py-5 md:px-5 md:py-7 xl:px-6 xl:py-8">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          {/* Add Actions */}
          <CourseActions
            disabled={!isComplete}
            courseId={id!}
            isPublished={course.isPublished}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2 py-5 md:px-5 md:py-7 xl:px-5 xl:py-8">
          <div>
            <div className="flex  items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} size="default" />
              <h1 className="text-lg">Customize your course</h1>
            </div>
            <TitleForm initialData={{ title: course?.title }} />
            <DescriptionForm
              initialData={{ description: course.description }}
            />
            <ImageForm
              initialData={{
                imageUrl: course.imageUrl || "",
              }}
            />
            <CategoryForm
              initialData={{ categoryId: course.categoryId || "" }}
              options={(categories?.data ?? []).map((cat) => ({
                label: cat.name,
                value: cat._id,
              }))}
            />

            <LanguageForm
              initialData={{
                languages: course.languages,
              }}
            />
            <HoursForm
              initialData={{
                hours: course.hours || "",
              }}
            />

            <div>
              <div className="flex items-center gap-x-2 mt-10">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm initialData={{ price: course?.price || 0 }} />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Chapters</h2>
              </div>
              <ChapterForm initialData={{ chapters: course.chapters }} />
            </div>

            <LearningOutcomesForm initialData={{ outcomes: course.outcomes }} />

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm
                initialData={{ attachments: course?.attachments }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default EditCourse;
