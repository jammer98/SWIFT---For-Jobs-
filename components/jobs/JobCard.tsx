import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Job } from "@/types/job";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function formatSalary(job: Job) {
  if (!job.salary_min && !job.salary_max) return null;
  if (job.salary_min && job.salary_max) {
    return `${currency.format(job.salary_min)} – ${currency.format(job.salary_max)}`;
  }
  return currency.format((job.salary_min ?? job.salary_max)!);
}

export function JobCard({ job }: { job: Job }) {
  const salary = formatSalary(job);

  return (
    <Link href={`/jobs/${job.id}`} className="block">
      <Card className="h-full transition-colors hover:border-foreground/20">
        <CardHeader className="gap-1">
          <h3 className="font-medium leading-tight">{job.title}</h3>
          <p className="text-sm text-muted-foreground">{job.company_name}</p>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {job.location && <span>{job.location}</span>}
          {job.employment_type && (
            <Badge variant="secondary" className="capitalize">
              {job.employment_type.replace("-", " ")}
            </Badge>
          )}
          {salary && <span>{salary}</span>}
        </CardContent>
      </Card>
    </Link>
  );
}