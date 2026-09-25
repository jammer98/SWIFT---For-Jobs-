export type EmploymentType = "full-time" | "part-time" | "contract" | "internship";

export interface Job {
  id: number;
  title: string;
  location: string | null;
  employment_type: EmploymentType | null;
  salary_min: number | null;
  salary_max: number | null;
  company_id: number;
  company_name: string;
  created_at: string;
}

export interface JobsListResponse {
  jobs: Job[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface JobFilters {
  q?: string;
  location?: string;
  employmentType?: EmploymentType;
  page?: number;
  limit?: number;
}

export interface JobDetail extends Job {
  description: string;
  status: "open" | "closed";
}