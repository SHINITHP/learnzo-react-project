import { Banner } from "@/components/banner";
import ChapterForm from "@/components/chapter-form";
import PageMeta from "@/components/common/PageMeta";
import { IconBadge } from "@/components/icon-badge";
import ModuleAccessForm from "@/components/Module/module-access-form";
import { ModuleActions } from "@/components/Module/module-action";
import ModuleTitleForm from "@/components/Module/module-title-form";
import { useGetModulesByIdQuery } from "@/services/modulesApi";
import {
  ArrowLeft,
  Eye,
  LayoutDashboard,
  ListChecks,
  Video,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

const AddModules = () => {
  const navigate = useNavigate();
  const { id, moduleId } = useParams<{ id: string; moduleId: string }>();

  if (!id || !moduleId) navigate("/courses");

  const { data, isLoading, error } = useGetModulesByIdQuery({
    courseId: id!,
    moduleId: moduleId!,
  });

  if (isLoading) {
    return (
      <div className="flex mt-16 justify-center items-center h-[100%] w-full p-5 text-center bg-black">
        Loading course details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex mt-16 justify-center items-center h-[100%] dark:bg-transparent w-full p-5 text-center ">
        Failed to load the course. Please try again later.
      </div>
    );
  }

  if (!data) navigate(`/courses/${id}`);

  const module = data?.data;

  if (!module) {
    navigate(`/courses/${id}`);
  }

  const requiredFields = [
    module?.title,
    module?.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  if (!data?.data) {
    return null;
  }

  return (
    <>
      <PageMeta
        title="LearnEase Admin Panel"
        description="LearnEase admin edit Chapter page"
      />
      <div className="mt-16 rounded-2xl md:border border-gray-200 md:bg-white md:dark:border-gray-800 md:dark:bg-white/[0.03]">
        <div className="rounded-2xl">
          <div className="flex items-center justify-between ">
            <div className="w-full ">
              <Link
                to={`/courses/${id}`}
                className="inline-flex items-center text-sm text-white hover:text-muted-foreground px-6 mt-10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to course setup
              </Link>

              {!module?.isPublished && (
                <Banner
                  className="bg-amber-200 text-amber-900 mt-6"
                  variant="warning"
                  label="This chapter is unpublished. It will not be visible in the course."
                />
              )}

              <div className="flex items-center justify-between w-full px-2 py-5 md:px-5 md:py-7 xl:px-6 xl:py-8">
                <div className="flex flex-col gap-y-2">
                  <h1 className="text-xl md:text-2xl font-medium">
                    Module creation
                  </h1>
                  <span className="text-xs md:text-sm text-slate-700">
                    Complete all fields {completionText}
                  </span>
                </div>
                <ModuleActions
                  disabled={!isComplete}
                  courseId={id!}
                  moduleId={moduleId!}
                  isPublished={module?.isPublished || false}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2 py-5 md:px-5 md:py-7 xl:px-5 xl:py-8">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} />
                  <h2 className="text-xl">Customize your Module</h2>
                </div>
                {/* chapter-title */}
                <ModuleTitleForm
                  initialData={data.data}
                  courseId={id!}
                  moduleId={moduleId!}
                />
              </div>
              <div>
                <div className="flex items-center gap-x-2 mt-8">
                  <IconBadge icon={Eye} />
                  <h2 className="text-xl">Access Settings</h2>
                </div>
                <ModuleAccessForm
                  initialData={data.data}
                  courseId={id!}
                  moduleId={moduleId!}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Module Chapters</h2>
              </div>
              <ChapterForm initialData={data.data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddModules;
