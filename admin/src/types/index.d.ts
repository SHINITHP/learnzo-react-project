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

export interface ChapterFormProps {
  initialData: { chapters: IChapter[] };
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

export interface ICourse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    userId: string;
    title: string;
    description?: string;
    imageUrl?: string;
    price?: number;
    isPublished: boolean;
    categoryId?: string;
    category?: ICategory;
    chapters: IChapter[];
    attachments: IAttachment[];
    purchases: string[];
    createdAt: string;
    updatedAt: string;
  };
}

export interface IUpdateCoursePayload {
  title?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  attachments?: string[];
  isPublished?: boolean;
  categoryId?: string;
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

export interface IChapter {
  _id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  position: number;
  isPublished?: boolean;
  isFree?: boolean;
  muxData?: string;
  courseId: string;
  userProgress?: string[];
  createdAt?: string;
  updatedAt?: string;
}
