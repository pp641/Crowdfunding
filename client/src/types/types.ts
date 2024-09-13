export interface Project {
    _id: string;
    creatorName: string;
    title: string;
    description: string;
    category: string;
    targetAmount: any | string;
    fundedAmount: any |string;
    deadline: string;
    links?: string;
    images?: string[];
    videos?: string[];
  }
  