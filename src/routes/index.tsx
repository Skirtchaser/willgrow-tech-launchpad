import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Willgrow.Tech for sale" },
      { name: "description", content: "Willgrow.Tech for sale" },
      { property: "og:title", content: "Willgrow.Tech for sale" },
      { property: "og:description", content: "Willgrow.Tech for sale" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <h1 className="text-4xl font-semibold text-foreground">Willgrow.Tech for sale</h1>
    </main>
  );
}
