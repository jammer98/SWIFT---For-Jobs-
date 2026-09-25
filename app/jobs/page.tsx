import { getJobs } from "@/lib/api/jobs";
import { JobCard } from "@/components/jobs/JobCard";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const { jobs, total } = await getJobs({ page });

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Jobs</h1>
      <p className="mt-1 text-sm text-muted-foreground">{total} open roles</p>

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
    </main>
  );
}