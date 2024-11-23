import { FormList } from "./form";

export interface UserDetail {
  location: string;
  phoneNumber: string;
  storePhoneNumber: string;
  storeName: string;
  role: string;
  imageUrl: string;
  nickname: string;
  name: string;
  email: string;
  id: number;
}

export interface MyFormList {
  data: Array<FormList>;
  nextCursor: number | null;
}

export interface MyApplication {
  updatedAt: Date;
  createdAt: Date;
  status: string;
  resumeName: string;
  resumeId: number;
  form: {
    owner: {
      imageUrl: string;
      storeName: string;
      id: number;
    };
    recruitmentEndDate: Date;
    recruitmentStartDate: Date;
    description: string;
    title: string;
    id: number;
  };
  id: number;
}
