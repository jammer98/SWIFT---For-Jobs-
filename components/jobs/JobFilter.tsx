import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EMPLOYMENT_TYPES = ["full-time", "part-time", "contract", "internship"] as const;

export function JobFilters({
  defaultValues,
}: {
  defaultValues: { q?: string; location?: string; employmentType?: string };
}) {
  return (
    <form action="/jobs" method="get" className="flex flex-wrap gap-2">
      <Input
        name="q"
        placeholder="Search jobs"
        defaultValue={defaultValues.q}
        className="max-w-xs"
      />
      <Input
        name="location"
        placeholder="Location"
        defaultValue={defaultValues.location}
        className="max-w-[160px]"
      />
      <select
        name="employmentType"
        defaultValue={defaultValues.employmentType ?? ""}
        className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
      >
        <option value="">Any type</option>
        {EMPLOYMENT_TYPES.map((type) => (
          <option key={type} value={type} className="capitalize">
            {type.replace("-", " ")}
          </option>
        ))}
      </select>
      <Button type="submit">Search</Button>
    </form>
  );
}