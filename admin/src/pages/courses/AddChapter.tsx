import { Banner } from "@/components/banner";
import ChapterAccessForm from "@/components/chapter-access-form";
import { ChapterActions } from "@/components/chapter-action";
import ChapterDescriptionForm from "@/components/chapter-description-form";
import ChapterTitleForm from "@/components/chapter-title-form";
import PageMeta from "@/components/common/PageMeta";
import { IconBadge } from "@/components/icon-badge";
import ChapterVideoForm from "@/components/video-form";
import { useGetChapterByIdQuery } from "@/services/chapterApi";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const AddChapter = () => {
  const navigate = useNavigate();
  const { id, chapterId } = useParams<{ id: string; chapterId: string }>();

  if (!id || !chapterId) navigate("/courses");

  const { data, isLoading, error } = useGetChapterByIdQuery({
    courseId: id!,
    chapterId: chapterId!,
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

  const chapter = data?.data;

  if (!chapter) {
    navigate(`/courses/${id}`);
  }

  const requiredFields = [
    chapter?.title,
    chapter?.description,
    chapter?.videoUrl,
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
        {!chapter?.isPublished && (
          <Banner
            className="text-red-700 mt-6"
            variant="warning"
            label="This chapter is unpublished. It will not be visible in the course."
          />
        )}
        <div className="rounded-2xl px-2 py-5 md:px-5 md:py-7 xl:px-5 xl:py-8 ">
          <div className="flex items-center justify-between ">
            <div className="w-full ">
              <button
                onClick={() => navigate(`/courses/${id}`)}
                className="flex items-center text-sm hover:opacity-75 transition mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to course setup
              </button>

              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col gap-y-2">
                  <h1 className="text-xl md:text-2xl font-medium">
                    Chapter creation
                  </h1>
                  <span className="text-xs md:text-sm text-slate-700">
                    Complete all fields {completionText}
                  </span>
                </div>
                <ChapterActions
                  disabled={!isComplete}
                  courseId={id!}
                  chapterId={chapterId!}
                  isPublished={chapter?.isPublished || false}
                />
              </div>
            </div>
          </div>
          <div className="grid mt-16 grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} />
                  <h2 className="text-xl">Customize your chapter</h2>
                </div>
                {/* chapter-title */}
                <ChapterTitleForm
                  initialData={data.data}
                  courseId={id!}
                  chapterId={chapterId!}
                />
                {/* chapter-description */}
                <ChapterDescriptionForm
                  initialData={data.data}
                  courseId={id!}
                  chapterId={chapterId!}
                />
              </div>
              <div>
                <div className="flex items-center gap-x-2 mt-8">
                  <IconBadge icon={Eye} />
                  <h2 className="text-xl">Access Settings</h2>
                </div>
                <ChapterAccessForm
                  initialData={data.data}
                  courseId={id!}
                  chapterId={chapterId!}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Video} />
                <h2 className="text-xl">Add a Video</h2>
              </div>
              <ChapterVideoForm
                initialData={data.data}
                courseId={id!}
                chapterId={chapterId!}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddChapter;
