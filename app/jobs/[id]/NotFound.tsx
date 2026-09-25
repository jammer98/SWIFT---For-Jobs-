export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-xl font-semibold">Job not found</h1>
      <p className="mt-2 text-muted-foreground">
        This job may have been removed or the link is incorrect.
      </p>
    </main>
  );
}