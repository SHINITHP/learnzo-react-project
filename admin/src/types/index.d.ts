export interface IStatProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: string | number;
  trend?: number;
  trendType?: "up" | "down";
}

export interface OverviewChartProps {
  data: { name: string; total: number }[];
}

export interface Sale {
  id: string | number;
  name: string;
  email: string;
  image: string;
  total: number;
}

export interface RecentSalesCardProps {
  data: Sale[];
}

export interface Product {
  number: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  status: string;
  description: string;
}

export interface TopProductsTableProps {
  products: Product[];
}

export interface ISignInResponse {
  success: boolean;
  message: string;
  data: {
    admin: {
      email: string;
      userId: string;
    };
    token: string;
  };
}

export interface ISignInRequest {
  email: string;
  password: string;
}

export interface TitleFormProps {
  initialData: {
    title: string;
  };
}

export interface DescriptionFormProps {
  initialData: {
    description?: string;
  };
}
export interface LearningOutcomesFormProps {
  initialData: {
    outcomes?: string[];
  };
}

export interface ImageFormProps {
  initialData: {
    imageUrl: string;
  };
}
export interface AttachementUploadsProps {
  initialData: {
    attachments: IAttachment[];
  };
}
export interface ChaptersListProps {
  items: IChapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}
export interface ModulesListProps {
  items: IModule[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export interface ChapterFormProps {
  initialData: { chapters: IChapter[] };
}

export interface IModule {
  _id: string;
  title: string;
  position: number;
  isPublished?: boolean;
  isFree: boolean;
  chapters: IChapter[];
}

export interface ModuleFormProps {
  initialData: { modules: IModule[] };
}

export interface FileUploadProps {
  initialData: {
    imageUrl: string;
  };
  isEditing: boolean;
}

export interface PriceFormProps {
  initialData: {
    price: number;
  };
}

export interface ICategory {
  _id: string;
  name: string;
}

export interface ICourse {
  _id: string;
  author: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isPublished: boolean;
  categoryId?: ICategory | null;
  difficultyLevel?: string;
  outcomes?: [];
  languages?: string[];
  hours?: string;
  modules: IModule[] | [];
  chapters: IChapter[];
  attachments: IAttachment[];
  purchases: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICourseResponse {
  success: boolean;
  message: string;
  data: ICourse[];
}
export interface ICourseByIDResponse {
  success: boolean;
  message: string;
  data: ICourse;
}
export interface ICourseCreationResponse {
  success: boolean;
  message: string;
  data: ICourse;
}

export interface IUpdateCoursePayload {
  title?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isFree?: boolean;
  videoUrl?: string;
  attachments?: string[];
  hours?: string;
  isPublished?: boolean;
  languages?: string[];
  categoryId?: string;
  difficultyLevel?: string;
  outcomes?: string[];
}

export interface IUpdateChapterPayload {
  title?: string;
  description?: string;
  videoUrl?: string;
  position?: number;
  isPublished?: boolean;
  isFree?: boolean;
}

export interface ICategoryResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
  }[];
}

export interface IAttachment {
  _id: string;
  name: string;
  url: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMuxData {
  _id: string;
  courseId: Types.ObjectId;
  chapterId: Types.ObjectId;
  assetId: string;
  playbackId?: string;
  status: "waiting" | "ready" | "errored";
  uploadedBy: Types.ObjectId;
  createdAt?: Date;
}

export interface IChapter {
  _id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  position: number;
  isPublished?: boolean;
  isFree: boolean;
  muxData?: IMuxData | null;
  courseId: string;
  userProgress?: string[];
  createdAt?: string;
  updatedAt?: string;
}
