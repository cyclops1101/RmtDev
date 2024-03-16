export type JobItem = {
  id: number;
  company: string;
  title: string;
  badgeLetters: string;
  daysAgo: number;
  relevanceScore: number;
};

export type JobItemDetail = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  salary: string;
  location: string;
  coverImgURL: string;
  companyURL: string;
};
