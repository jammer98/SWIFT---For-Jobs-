import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function JobPagination({
  page,
  totalPages,
  params,
}: {
  page: number;
  totalPages: number;
  params: { q?: string; location?: string; employmentType?: string };
}) {
  if (totalPages <= 1) return null;

  function hrefForPage(targetPage: number) {
    const search = new URLSearchParams();
    if (params.q) search.set("q", params.q);
    if (params.location) search.set("location", params.location);
    if (params.employmentType) search.set("employmentType", params.employmentType);
    search.set("page", String(targetPage));
    return `/jobs?${search.toString()}`;
  }

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={page > 1 ? hrefForPage(page - 1) : undefined} />
        </PaginationItem>
        <PaginationItem>
          <span className="px-4 text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={page < totalPages ? hrefForPage(page + 1) : undefined} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}