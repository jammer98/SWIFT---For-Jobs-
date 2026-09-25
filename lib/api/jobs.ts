import { apiFetch } from "./client";
import type { JobsListResponse, JobFilters } from "@/types/job";
import type { JobDetail } from "@/types/job";

export function getJobs(filters: JobFilters = {}) {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.location) params.set("location", filters.location);
  if (filters.employmentType) params.set("employmentType", filters.employmentType);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));

  const query = params.toString();
  return apiFetch<JobsListResponse>(`/jobs${query ? `?${query}` : ""}`);
}

export function getJob(id: string) {
  return apiFetch<JobDetail>(`/jobs/${id}`);
}