import { getJobs } from "@/lib/api/jobs";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFilters } from "@/components/jobs/JobFilter";
import { JobPagination } from "@/components/jobs/JobPagenation";
import type { EmploymentType } from "@/types/job";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" && params.q ? params.q : undefined;
  const location =
    typeof params.location === "string" && params.location ? params.location : undefined;
  const employmentType =
    typeof params.employmentType === "string" && params.employmentType
      ? (params.employmentType as EmploymentType)
      : undefined;
  const page = Number(params.page) || 1;

  const { jobs, total, totalPages } = await getJobs({ q, location, employmentType, page });

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Jobs</h1>
      <p className="mt-1 text-sm text-muted-foreground">{total} open roles</p>

      <div className="mt-4">
        <JobFilters defaultValues={{ q, location, employmentType }} />
      </div>

      {jobs.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          No jobs match your filters.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      <JobPagination page={page} totalPages={totalPages} params={{ q, location, employmentType }} />
    </main>
  );
}