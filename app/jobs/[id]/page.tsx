import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getJob } from "@/lib/api/jobs";
import { ApiError } from "@/lib/api/client";

async function loadJob(id: string) {
  try {
    return await getJob(id);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const job = await loadJob(id);
  return {
    title: `${job.title} at ${job.company_name} — Swift for Jobs`,
    description: job.description.slice(0, 160),
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await loadJob(id);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold">{job.title}</h1>
      <p className="mt-1 text-muted-foreground">{job.company_name}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {job.location && <span>{job.location}</span>}
        {job.employment_type && (
          <Badge variant="secondary" className="capitalize">
            {job.employment_type.replace("-", " ")}
          </Badge>
        )}
        {job.status === "closed" && <Badge variant="destructive">Closed</Badge>}
      </div>

      <div className="mt-8 whitespace-pre-line text-sm leading-relaxed">
        {job.description}
      </div>

      <Button className="mt-8" disabled={job.status === "closed"}>
        {job.status === "closed" ? "No longer accepting applications" : "Apply"}
      </Button>
    </main>
  );
}