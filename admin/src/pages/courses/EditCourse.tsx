import CategoryForm from "@/components/category-form";
import DescriptionForm from "@/components/description-form";
import { IconBadge } from "@/components/icon-badge";
import ImageForm from "@/components/image-form";
import PriceForm from "@/components/price-form";
import TitleForm from "@/components/title-form";
import { useLazyGetCategoriesQuery } from "@/services/categoryApi";
import { useLazyGetCourseByIdQuery } from "@/services/courseApi";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { useParams } from "react-router-dom";
import AttachmentForm from "@/components/attachment-form";
import ChapterForm from "@/components/chapter-form";
import PageMeta from "@/components/common/PageMeta";
import { useEffect } from "react";

const EditCourse = () => {
  //   const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [triggerGetCourse, { data, isLoading, error }] =
    useLazyGetCourseByIdQuery();
  const [triggerGetCategories, { data: categories }] =
    useLazyGetCategoriesQuery();

  useEffect(() => {
    // Call once when component mounts
    triggerGetCourse(id!);
    triggerGetCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100%] w-full p-5 text-center bg-black">
        Loading course details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[100%] dark:bg-transparent w-full p-5 text-center ">
        Failed to load the course. Please try again later.
      </div>
    );
  }

  if (!data?.data) {
    // Will be redirected by useEffect
    return null;
  }

  return (
    <>
      <PageMeta
        title="LearnEase Admin Panel"
        description="LearnEase admin edit course page"
      />
      <div className="grid mt-16 grid-cols-1 lg:grid-cols-2 gap-6 rounded-2xl md:border border-gray-200 md:bg-white px-2 py-5 md:px-5 md:py-7 md:dark:border-gray-800 md:dark:bg-white/[0.03] xl:px-5 xl:py-8">
        <div>
          <div className="flex  items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} size="default" />
            <h1 className="text-lg">Customize your course</h1>
          </div>
          <TitleForm initialData={{ title: data.data?.title }} />
          <DescriptionForm
            initialData={{ description: data.data.description }}
          />
          <ImageForm
            initialData={{
              imageUrl: data.data?.imageUrl || "",
            }}
          />
          <CategoryForm
            initialData={{ categoryId: data.data.categoryId || "" }}
            options={(categories?.data ?? []).map((cat) => ({
              label: cat.name,
              value: cat._id,
            }))}
          />
          <div>
            <div className="flex items-center gap-x-2 mt-10">
              <IconBadge icon={CircleDollarSign} />
              <h2 className="text-xl">Sell your course</h2>
            </div>
            <PriceForm initialData={{ price: data.data?.price || 0 }} />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Course Chapters</h2>
            </div>
            <ChapterForm initialData={{ chapters: data.data.chapters }} />
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-xl">Resources & Attachments</h2>
            </div>
            <AttachmentForm
              initialData={{ attachments: data.data?.attachments }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// MultiFileUpload

export default EditCourse;
