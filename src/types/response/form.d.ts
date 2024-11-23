export interface FormList {
  updatedAt: Date;
  createdAt: Date;
  isPublic: boolean;
  scrapCount: number;
  applyCount: number;
  imageUrls: Array<string>;
  recruitmentEndDate: Date;
  recruitmentStartDate: Date;
  title: string;
  id: number;
}
