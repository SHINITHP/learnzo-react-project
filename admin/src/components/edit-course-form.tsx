import CategoryForm from "@/components/category-form";
import DescriptionForm from "@/components/description-form";
import { IconBadge } from "@/components/icon-badge";
import ImageForm from "@/components/image-form";
import TitleForm from "@/components/title-form";
import { LayoutDashboard, ListChecks } from "lucide-react";

const EditCourseForm = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-5 xl:py-8">
      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={LayoutDashboard} size={"default"} />
          <h1 className="text-lg">Customize your course</h1>
        </div>
        <TitleForm initialData={{ title: "sdsd" }} courseId={"course.id"} />
        <DescriptionForm
          initialData={{ description: "sdsd" }}
          courseId={"course.id"}
        />
        <ImageForm
          initialData={{
            imageUrl: "https://picsum.photos/seed/picsum/200/300",
          }}
          courseId={"course.id"}
        />
        <CategoryForm
          initialData={{ categoryId: "sdsd" }}
          courseId={"deded"}
          options={[
            {
              label: "deded",
              value: "credred",
            },
          ]}
        />
      </div>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={ListChecks} />
            <h2 className="text-xl">Course Chapters</h2>
          </div>
          {/* <ChaptersForm initialData={course} courseId={course.id} /> */}
        </div>
      </div>
    </div>
  )
}

export default EditCourseForm;