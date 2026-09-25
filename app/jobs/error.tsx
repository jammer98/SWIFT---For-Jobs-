"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 text-center">
      <p className="text-muted-foreground">Unable to load jobs.</p>
      <Button variant="outline" className="mt-4" onClick={() => reset()}>
        Try again
      </Button>
    </main>
  );
}