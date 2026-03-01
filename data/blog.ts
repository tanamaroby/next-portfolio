// Blog post data — metadata + structured content blocks

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "code"; lang: string; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; variant: "tip" | "note" | "warning"; text: string }
  | { type: "hr" };

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  readTime: number; // minutes
  tags: string[];
  content: ContentBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  // ─── 1. Next.js App Router ──────────────────────────────────────────────────
  {
    slug: "nextjs-app-router-deep-dive",
    title: "Next.js App Router: What I've Learned After a Year in Production",
    description:
      "The App Router rewrites how you think about data fetching, layouts, and rendering. Here's what actually matters after shipping it on real client projects.",
    date: "2026-01-15",
    readTime: 8,
    tags: ["Next.js", "React", "TypeScript", "Web Dev"],
    content: [
      {
        type: "p",
        text: "Next.js 13 introduced the App Router in 2022, and it reached a production-stable state in Next.js 13.4 (May 2023). Since then I've used it on every client project at TrieTech, replacing the Pages Router entirely. After a year of real-world usage — including large ERPs, social platforms, and e-commerce systems — here's a frank assessment of where it shines and where it still trips you up.",
      },
      {
        type: "h2",
        text: "React Server Components Are the Headline Feature",
      },
      {
        type: "p",
        text: "The biggest conceptual shift in the App Router is React Server Components (RSC). By default, every component inside `app/` renders on the server and ships zero JavaScript to the client. This completely changes how you think about data fetching — instead of `useEffect` + loading states, you fetch data directly inside async server components.",
      },
      {
        type: "code",
        lang: "tsx",
        text: `// app/projects/page.tsx — fetches on the server, no client JS needed
export default async function ProjectsPage() {
  const projects = await db.projects.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <ul>
      {projects.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}`,
      },
      {
        type: "p",
        text: "The elimination of client-side data fetching waterfalls is a genuine performance win. First Contentful Paint is faster because the browser receives fully-rendered HTML, not a loading skeleton waiting on an API call.",
      },
      {
        type: "h2",
        text: "Nested Layouts Eliminate Boilerplate",
      },
      {
        type: "p",
        text: "Before the App Router, sharing layouts across pages required wrapping every `_app.tsx` export or composing layout components manually. Nested layouts in the App Router make this declarative. A `layout.tsx` at any level of the folder tree automatically wraps all children routes.",
      },
      {
        type: "code",
        lang: "text",
        text: `app/
  layout.tsx          ← root layout (html, body, providers)
  (marketing)/
    layout.tsx        ← marketing shell (navbar, footer)
    page.tsx          ← /
    about/page.tsx    ← /about
  (app)/
    layout.tsx        ← authenticated shell (sidebar, session check)
    dashboard/
      page.tsx        ← /dashboard`,
      },
      {
        type: "p",
        text: "Route groups (folders wrapped in parentheses) let you apply different layouts to different route subtrees without affecting the URL. This is invaluable when you have a public marketing site and a separate authenticated application under the same domain.",
      },
      {
        type: "h2",
        text: "Streaming SSR with Suspense",
      },
      {
        type: "p",
        text: "When a server component awaits slow data, it can stream HTML incrementally using `<Suspense>`. The browser starts rendering the page shell immediately while waiting for the slow part to resolve. This gives you a perceived performance improvement without any client-side JavaScript.",
      },
      {
        type: "code",
        lang: "tsx",
        text: `import { Suspense } from "react";
import { SlowDataTable } from "./slow-data-table";

export default function Page() {
  return (
    <section>
      <h1>Dashboard</h1>
      {/* Streams the table in once the slow query resolves */}
      <Suspense fallback={<TableSkeleton />}>
        <SlowDataTable />
      </Suspense>
    </section>
  );
}`,
      },
      {
        type: "h2",
        text: "Server Actions Cut the API Layer",
      },
      {
        type: "p",
        text: 'Server Actions (stable since Next.js 14) let you call server-side functions directly from client components using the `"use server"` directive — no API route required. For straightforward mutations like form submissions, this reduces boilerplate significantly.',
      },
      {
        type: "code",
        lang: "tsx",
        text: `"use server";

export async function createProject(formData: FormData) {
  const name = formData.get("name") as string;
  await db.projects.create({ data: { name } });
  revalidatePath("/projects");
}`,
      },
      {
        type: "callout",
        variant: "tip",
        text: "Server Actions are not a replacement for a proper API layer in complex apps. For any endpoint that needs to be consumed externally (mobile apps, third-party integrations), stick with Route Handlers.",
      },
      {
        type: "h2",
        text: "The Rough Edges",
      },
      {
        type: "ul",
        items: [
          "The `use client` / `use server` boundary takes time to internalise. Passing non-serialisable props (functions, class instances) across the boundary still causes confusing errors.",
          "Caching behaviour changed significantly between Next.js 13, 14, and 15. In Next.js 15, `fetch` requests are no longer cached by default — a breaking change from prior versions. Always pin your Next.js version until you've read the upgrade guide.",
          "Third-party libraries that rely on React context or browser APIs must be placed behind `use client`, and wrapping them in provider components adds indirection.",
          "The dev server is noticeably slower than the Pages Router equivalentfor large apps, though the production build performance is unaffected.",
        ],
      },
      {
        type: "h2",
        text: "Verdict",
      },
      {
        type: "p",
        text: "The App Router is the right architectural direction. Collocating data fetching with the component that needs it, eliminating redundant client-side JavaScript, and making layouts composable are all genuine improvements. The learning curve is real but front-loaded — once the RSC mental model clicks, development velocity increases. Every new project I start uses the App Router.",
      },
    ],
  },

  // ─── 2. React Performance ──────────────────────────────────────────────────
  {
    slug: "react-performance-patterns",
    title: "React Performance Patterns That Actually Matter in Production",
    description:
      "Skip the premature optimisation. Here are the profiling-backed techniques that make a measurable difference on real user devices.",
    date: "2026-01-28",
    readTime: 7,
    tags: ["React", "Performance", "TypeScript", "Web Dev"],
    content: [
      {
        type: "p",
        text: "React is fast by default for most UI work. The cases where it struggles — janky animations, slow filter interactions, sluggish infinite lists — almost always trace back to one of a few root causes. This post is about those causes and the targeted fixes that actually show up in profiler traces.",
      },
      {
        type: "h2",
        text: "Profile First, Optimise Second",
      },
      {
        type: "p",
        text: "React DevTools ships a Profiler panel that records a flame graph of every render. Before reaching for `useMemo` or `memo`, open the Profiler, record an interaction that feels slow, and find the component that's taking the most time. Optimising the wrong thing is how you end up with a codebase full of memoization that does nothing measurable.",
      },
      {
        type: "callout",
        variant: "note",
        text: "The React Compiler (announced at React Conf 2024, available as an opt-in in React 19) automatically applies memoization where it's safe to do so. On projects using React 19+, you may find that manual `useMemo` / `useCallback` is increasingly unnecessary.",
      },
      {
        type: "h2",
        text: "The Right Use of memo, useMemo, and useCallback",
      },
      {
        type: "p",
        text: "`React.memo` prevents a component from re-rendering when its parent re-renders, as long as its props haven't changed (shallow comparison). It's worth adding when a component is expensive to render and its props are stable.",
      },
      {
        type: "code",
        lang: "tsx",
        text: `const ExpensiveChart = React.memo(function ExpensiveChart({ data }: { data: DataPoint[] }) {
  // expensive d3 / canvas rendering
  return <canvas ref={canvasRef} />;
});`,
      },
      {
        type: "p",
        text: "`useCallback` stabilises a function reference across renders. Without it, passing a callback to a memoized child defeats the memoization because a new function instance is created on every render.",
      },
      {
        type: "code",
        lang: "tsx",
        text: `// Without useCallback, ExpensiveChart re-renders every time Parent renders
// because onDataPoint is a new function reference each time
const onDataPoint = useCallback((point: DataPoint) => {
  setSelected(point);
}, []); // stable — only created once`,
      },
      {
        type: "p",
        text: "`useMemo` caches the result of an expensive computation. The classic use case is deriving sorted or filtered data from a large array.",
      },
      {
        type: "code",
        lang: "tsx",
        text: `const sortedItems = useMemo(
  () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
  [items] // only re-sort when items array reference changes
);`,
      },
      {
        type: "h2",
        text: "useTransition for Non-Blocking State Updates",
      },
      {
        type: "p",
        text: "React 18 introduced `useTransition`, which marks a state update as non-urgent. While the transition is pending, the current UI stays interactive. This is the right fix for filter/search interactions that re-render a large list — the input stays responsive while the list update happens concurrently.",
      },
      {
        type: "code",
        lang: "tsx",
        text: `const [isPending, startTransition] = useTransition();

function handleSearch(query: string) {
  setQuery(query); // urgent — input updates immediately
  startTransition(() => {
    setFilteredResults(computeResults(query)); // non-urgent — can yield to input
  });
}`,
      },
      {
        type: "h2",
        text: "Virtualise Long Lists",
      },
      {
        type: "p",
        text: "Rendering 10,000 rows in the DOM is always slow, regardless of how well you memoize. Virtualization renders only the rows visible in the viewport. `@tanstack/react-virtual` is the most composable option; `react-window` and AG Grid are better for grid-shaped data.",
      },
      {
        type: "code",
        lang: "tsx",
        text: `import { useVirtualizer } from "@tanstack/react-virtual";

const virtualizer = useVirtualizer({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 48, // row height in px
});

return (
  <div ref={parentRef} style={{ overflow: "auto", height: 600 }}>
    <div style={{ height: virtualizer.getTotalSize() }}>
      {virtualizer.getVirtualItems().map((row) => (
        <div
          key={row.key}
          style={{ position: "absolute", top: row.start, height: row.size }}
        >
          {items[row.index].name}
        </div>
      ))}
    </div>
  </div>
);`,
      },
      {
        type: "h2",
        text: "Code Splitting at Route and Component Level",
      },
      {
        type: "p",
        text: "Bundle size directly affects Time to Interactive. With the Pages Router, per-page code splitting was automatic. In the App Router, server components are never included in the client bundle at all. For heavy client-only components (rich text editors, chart libraries, map embeds), use `dynamic()` with `ssr: false` to defer loading until the component is needed.",
      },
      {
        type: "code",
        lang: "tsx",
        text: `import dynamic from "next/dynamic";

const RichEditor = dynamic(() => import("@/components/rich-editor"), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});`,
      },
      {
        type: "h2",
        text: "Quick Wins Checklist",
      },
      {
        type: "ol",
        items: [
          "Profile with React DevTools before any optimization.",
          "Lift state as high as needed but no higher — unnecessary shared state causes unnecessary re-renders.",
          "Keys on list items must be stable and unique, not array index.",
          "Avoid creating objects/arrays inline in JSX props passed to memoized children.",
          "Use `useTransition` for search/filter interactions on large datasets.",
          "Virtualise any list over ~200 items.",
          "Move one-off expensive computations to the server (RSC or API route).",
        ],
      },
    ],
  },

  // ─── 3. AG Grid ─────────────────────────────────────────────────────────────
  {
    slug: "ag-grid-production-lessons",
    title:
      "AG Grid in Production: Lessons from Building Complex Enterprise Tables",
    description:
      "AG Grid is the most powerful data grid for React, but it has a steep learning curve. Here's what I wish I'd known before shipping it in a production ERP.",
    date: "2026-02-10",
    readTime: 9,
    tags: ["AG Grid", "React", "TypeScript", "Enterprise"],
    content: [
      {
        type: "p",
        text: "When a client's requirements include inline editing, server-side pagination over 500,000 rows, Excel export, row grouping, and column pinning — all in the same table — the realistic shortlist narrows to one: AG Grid. I've used it across multiple ERP and data-intensive projects. It's genuinely excellent, but the documentation density and the gap between Community and Enterprise features can catch you off-guard.",
      },
      {
        type: "h2",
        text: "Community vs Enterprise: Draw the Line Early",
      },
      {
        type: "p",
        text: "AG Grid Community is MIT-licensed and covers most use cases: sorting, filtering, pagination, cell editing, custom renderers. AG Grid Enterprise (commercial licence) adds row grouping, pivoting, Master-Detail rows, Excel export, range selection, clipboard, and the server-side row model with full lazy-loading support. If your project needs even one Enterprise feature, budget for the licence early — retrofitting it later means re-testing extensively.",
      },
      {
        type: "ul",
        items: [
          "Community: client-side sorting/filtering, pagination, cell editing, custom cell/header renderers, themes.",
          "Enterprise only: Row Grouping, Pivot, Aggregation, Master-Detail, Excel Export, Server-Side Row Model, Range Selection, Clipboard, Sidebar panels.",
        ],
      },
      {
        type: "h2",
        text: "The Server-Side Row Model for Large Datasets",
      },
      {
        type: "p",
        text: "For tables with more than a few thousand rows, the default Client-Side Row Model loads everything into the browser and filters/sorts in memory. This works well up to ~100k rows on fast machines, but becomes sluggish and memory-heavy beyond that. If you're pulling data from a database, the Server-Side Row Model (Enterprise) is the right choice: AG Grid asks your server for exactly the rows in the current viewport, and sends sort/filter params via the `IServerSideDatasource` interface.",
      },
      {
        type: "code",
        lang: "tsx",
        text: `const datasource: IServerSideDatasource = {
  getRows: async (params: IServerSideGetRowsParams) => {
    const { startRow, endRow, sortModel, filterModel } = params.request;

    const { rows, totalCount } = await api.getInventory({
      offset: startRow,
      limit: endRow - startRow,
      sort: sortModel,
      filter: filterModel,
    });

    params.success({ rowData: rows, rowCount: totalCount });
  },
};

<AgGridReact
  rowModelType="serverSide"
  serverSideDatasource={datasource}
  cacheBlockSize={100}
/>`,
      },
      {
        type: "h2",
        text: "Custom Cell Renderers",
      },
      {
        type: "p",
        text: "AG Grid renders cells using its own virtual DOM by default. You can replace this with any React component using `cellRenderer`. The component receives an `ICellRendererParams` object with the row data, value, and grid API.",
      },
      {
        type: "code",
        lang: "tsx",
        text: `import type { ICellRendererParams } from "ag-grid-react";

interface StatusCellProps extends ICellRendererParams {
  value: "active" | "inactive" | "pending";
}

function StatusCell({ value }: StatusCellProps) {
  const colour = { active: "green", inactive: "red", pending: "amber" }[value];
  return (
    <span className={\`badge badge-\${colour}\`}>
      {value}
    </span>
  );
}

// In column definition:
const colDefs: ColDef[] = [
  { field: "status", cellRenderer: StatusCell },
];`,
      },
      {
        type: "callout",
        variant: "warning",
        text: "React cell renderers introduce React reconciliation overhead per cell. For tables with thousands of visible cells, this can hurt scroll performance. Consider using plain HTML string renderers (`cellRenderer: (p) => \`<span>...\``) for simple cases.",
      },
      {
        type: "h2",
        text: "Stable Row Identity with getRowId",
      },
      {
        type: "p",
        text: "Always define `getRowId` so AG Grid can track rows across updates. Without it, applying a data transaction (add, update, remove) re-renders the entire grid rather than patching the affected rows. This is the single most common source of AG Grid performance regressions I've debugged.",
      },
      {
        type: "code",
        lang: "tsx",
        text: `<AgGridReact
  getRowId={(params) => params.data.id}
  // Now applyTransaction({ update: [changedRow] }) only re-renders that one row
/>`,
      },
      {
        type: "h2",
        text: "Theming in v32+",
      },
      {
        type: "p",
        text: "AG Grid v32 (released mid-2024) introduced a new CSS-variable-based theming system that replaced the old SCSS theming pipeline. You define a theme object with `themeQuartz`, `themeBalham`, or your own base, and customise via CSS variables on the grid container or globally. This finally makes AG Grid play nicely with Tailwind-based design systems.",
      },
      {
        type: "code",
        lang: "tsx",
        text: `import { themeQuartz } from "ag-grid-community";

const myTheme = themeQuartz.withParams({
  accentColor: "var(--color-primary)",
  backgroundColor: "var(--color-card)",
  foregroundColor: "var(--color-card-foreground)",
  borderColor: "var(--color-border)",
});

<AgGridReact theme={myTheme} />`,
      },
      {
        type: "h2",
        text: "Tips That Saved Me Hours",
      },
      {
        type: "ul",
        items: [
          "Always pass `columnDefs` through `useMemo` — recreating them on every render causes the grid to reset column state.",
          "Use `suppressColumnVirtualisation={false}` (the default) so off-screen columns aren't rendered. Only turn it on if you need to take screenshots of the full grid.",
          "Store and restore column state (widths, order, visibility, sorts, filters) via `gridApi.getColumnState()` / `gridApi.applyColumnState()` to persist user preferences.",
          "`onGridReady` is the correct place to capture the Grid API reference — not a ref on the component.",
          "When combining AG Grid with React Query, call `gridApi.setGridOption('datasource', ...)` inside `useEffect` rather than passing the datasource directly as a prop to avoid stale closure issues.",
        ],
      },
    ],
  },

  // ─── 4. ERP / Bespoke ───────────────────────────────────────────────────────
  {
    slug: "modern-erp-bespoke-vs-saas",
    title:
      "The Modern ERP Scene: Why Bespoke Often Beats SaaS for Growing Businesses",
    description:
      "SAP and NetSuite aren't the only options. Here's how modern bespoke ERP systems compare to SaaS platforms — and when each makes sense.",
    date: "2026-02-20",
    readTime: 8,
    tags: ["ERP", "SaaS", "Architecture", "Business"],
    content: [
      {
        type: "p",
        text: "Every growing business eventually hits the wall where spreadsheets become untenable and a proper system becomes necessary. The traditional advice is to buy an off-the-shelf ERP — SAP, Oracle NetSuite, Microsoft Dynamics 365, or the open-source Odoo. Having designed and built bespoke ERP systems from scratch for manufacturing, distribution, and professional services companies, I've developed a more nuanced view.",
      },
      {
        type: "h2",
        text: "What an ERP Actually Is",
      },
      {
        type: "p",
        text: "ERP stands for Enterprise Resource Planning. At its core, an ERP integrates the information flows across an organisation's core business processes into a single system: inventory and warehouse management, purchase and sales orders, invoicing and accounting, HR and payroll, production planning, and CRM. The key value is data centralisation — a sales order automatically affects inventory levels, triggers a purchase order if stock is low, and flows into accounting without re-keying.",
      },
      {
        type: "h2",
        text: "The Case for SaaS ERP",
      },
      {
        type: "p",
        text: "The major SaaS ERP platforms have genuine strengths that bespoke systems struggle to match out of the box:",
      },
      {
        type: "ul",
        items: [
          "Regulatory compliance: SAP and Dynamics include region-specific tax rules, audit trails, and financial reporting standards built in.",
          "Best-practice workflows: decades of accumulated industry knowledge are baked into default configurations.",
          "Ecosystem: hundreds of certified integration partners, pre-built connectors to banks, logistics providers, and payment gateways.",
          "Vendor SLAs: guaranteed uptime, security patching, and disaster recovery — your IT team doesn't have to own any of that.",
        ],
      },
      {
        type: "p",
        text: "For a mid-market company with straightforward processes and the budget for enterprise software, a correctly configured SaaS ERP is often the right call.",
      },
      {
        type: "h2",
        text: "Where SaaS ERP Breaks Down",
      },
      {
        type: "p",
        text: "The problems typically emerge between 12 and 36 months after go-live:",
      },
      {
        type: "ul",
        items: [
          "Per-seat licensing compounds as the team grows. NetSuite's base licence plus full-access user seats can reach six figures annually for a 50-person team.",
          "The system imposes its process model on the business rather than the other way around. Workarounds accumulate — custom fields, complex approval chains and manual export-reimport steps defeat the point of integration.",
          "Customisation is expensive and fragile. SAP ABAP developers and Dynamics ISV partners quote high day rates; custom code breaks on vendor upgrades.",
          "Data is locked in the vendor's schema. Generating a non-standard report often means exporting to Excel, which is exactly the behaviour the ERP was supposed to replace.",
        ],
      },
      {
        type: "h2",
        text: "The Bespoke Alternative",
      },
      {
        type: "p",
        text: "A modern bespoke ERP is built specifically for a company's exact processes and data model. The technology choices have matured considerably: Next.js with TypeScript for the frontend, Supabase (managed Postgres) for the database with row-level security enforcing multi-tenant access control, and Supabase Realtime for live dashboard updates across the team.",
      },
      {
        type: "code",
        lang: "text",
        text: `Typical bespoke ERP stack (2025):
  Frontend:   Next.js + TypeScript + Tailwind CSS + AG Grid (data tables)
  Backend:    Supabase (Postgres + Row Level Security + Realtime + Storage)
  Auth:       Supabase Auth (email/password + SSO via SAML)
  Notifications: WhatsApp Business API / Twilio for mobile alerts
  Hosting:    Vercel (frontend) + Supabase cloud`,
      },
      {
        type: "p",
        text: "With this stack, a small engineering team can deliver a full-featured ERP with inventory management, purchase and sales orders, role-based access control, and mobile notifications in under three months — as we did for a manufacturing client whose entire production workflow is now automated end-to-end.",
      },
      {
        type: "h2",
        text: "Bespoke ERP Trade-offs",
      },
      {
        type: "p",
        text: "Bespoke isn't free of downsides. The main risks:",
      },
      {
        type: "ul",
        items: [
          "Vendor dependency shifts to the engineering partner. If the relationship breaks down and the code isn't well-documented, you have a problem. Mitigate this with clean architecture, comprehensive docs, and an escrow arrangement for the source code.",
          "You own the compliance burden. Tax rules, audit log requirements, and data retention policies must be implemented explicitly. Third-party libraries and Supabase's Postgres audit extension help, but it's not automatic.",
          "Time to first deploy is longer than signing up for NetSuite. Expect a proper discovery phase, not a two-week sprint.",
        ],
      },
      {
        type: "h2",
        text: "Decision Framework",
      },
      {
        type: "p",
        text: "After a number of these projects, here's the rough heuristic I use:",
      },
      {
        type: "ul",
        items: [
          "Standard processes (generic CRM, basic invoicing, payroll): use SaaS — HubSpot, Xero, QuickBooks handle these better than anything bespoke will.",
          "Highly specific processes that won't fit a standard template (custom manufacturing workflows, real-time logistics tracking, multi-warehouse allocation rules): bespoke.",
          "Data-intensive operations requiring custom reporting and analytics: bespoke, or a SaaS ERP with a separate data warehouse and BI layer.",
          "Fewer than 10 users, early-stage business: spreadsheets and Notion until you actually know what you need. Building an ERP for a business model that's still changing is expensive.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "The best bespoke ERP projects I've worked on started with a thorough process-mapping exercise before a single line of code was written. Understanding the actual data flows and decision points in the business is worth more than any technology choice.",
      },
      {
        type: "h2",
        text: "The Direction of Travel",
      },
      {
        type: "p",
        text: "The gap between SaaS and bespoke is narrowing. Platforms like Supabase, Neon, and PlanetScale have commoditised the database layer. Component libraries like ShadCN and AG Grid have closed the UI quality gap. AI-assisted code generation accelerates routine CRUD development. The result is that what would have cost $300k to build five years ago can be built for a fraction of that today — which changes the ROI calculus for bespoke significantly.",
      },
    ],
  },

  // ─── 5. DB Connection Pooling ───────────────────────────────────────────────
  {
    slug: "database-connection-pooling-serverless",
    title:
      "Database Connection Pooling in Serverless: Why Your Next.js App Might Be Exhausting Postgres",
    description:
      "Every cold-start serverless function opens a new database connection. At scale, this kills Postgres. Here's how connection pooling — and Supabase's Supavisor — fixes it.",
    date: "2026-02-25",
    readTime: 7,
    tags: ["PostgreSQL", "Supabase", "Next.js", "DevOps"],
    content: [
      {
        type: "p",
        text: "Postgres has a hard limit on simultaneous connections — typically 100 on a small instance, 500 on a medium one. A traditional Node.js server opens a pool of, say, 10 connections at startup and reuses them across all requests for the lifetime of the process. Serverless changes this contract completely.",
      },
      {
        type: "h2",
        text: "The Serverless Connection Problem",
      },
      {
        type: "p",
        text: "In a serverless environment — Vercel Edge Functions, AWS Lambda, or Next.js API routes deployed on Vercel — each function invocation is a separate process. There is no shared connection pool between requests. Each cold start opens a new connection to the database; each function teardown closes it (or more often, forgets to close it). Under moderate traffic, you quickly see errors like:",
      },
      {
        type: "code",
        lang: "text",
        text: `FATAL: sorry, too many clients already
remaining connection slots are reserved for non-replication superuser connections`,
      },
      {
        type: "p",
        text: "This isn't a code bug — it's a fundamental mismatch between the stateless serverless execution model and Postgres's stateful connection model.",
      },
      {
        type: "h2",
        text: "What a Connection Pooler Does",
      },
      {
        type: "p",
        text: "A connection pooler sits between your application and Postgres. Your serverless functions connect to the pooler (which can handle thousands of simultaneous connections cheaply), and the pooler maintains a small, stable set of real Postgres connections that it multiplexes across requests.",
      },
      {
        type: "ul",
        items: [
          "Transaction mode: a real Postgres connection is borrowed from the pool for the duration of a single transaction, then returned. This is the correct mode for serverless — supports thousands of app connections multiplexed over tens of real DB connections.",
          "Session mode: one real connection per client session. Useful for features that require session-level state (advisory locks, `SET LOCAL` settings, prepared statements). Not suitable for serverless due to high connection counts.",
          "Statement mode: most restrictive — each connection is returned after every statement. Only use when you don't need multi-statement transactions.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        text: "Transaction mode does not support session-level Postgres features: prepared statements, advisory locks, and `SET LOCAL` variables are reset after each transaction. If you use Prisma with transaction mode, set `pgbouncer=true` in your connection string and avoid prepared statements.",
      },
      {
        type: "h2",
        text: "Supabase Supavisor: Built-in Pooling",
      },
      {
        type: "p",
        text: "Supabase replaced PgBouncer with Supavisor — their own Elixir-based connection pooler — in 2024. Supavisor supports both transaction mode (port 6543) and session mode (port 5432), and it's configured automatically for every Supabase project. You don't need to run or manage your own pooler.",
      },
      {
        type: "code",
        lang: "text",
        text: `# Direct connection (session mode — for migrations, long-running scripts)
postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres

# Pooled connection (transaction mode — for serverless / Next.js API routes)
postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true`,
      },
      {
        type: "p",
        text: "The rule is simple: use the **pooled connection string (port 6543)** for your application runtime, and the **direct connection string (port 5432)** only for database migrations (where you need DDL statements and session-level features).",
      },
      {
        type: "h2",
        text: "Configuring Prisma for Supavisor",
      },
      {
        type: "p",
        text: "Prisma requires two separate connection strings: one for migrations (direct) and one for the runtime query engine (pooled). You configure this in your `schema.prisma` and `.env`:",
      },
      {
        type: "code",
        lang: "prisma",
        text: `// schema.prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")        // pooled — used at runtime
  directUrl = env("DIRECT_URL")          // direct — used for migrations
}`,
      },
      {
        type: "code",
        lang: "bash",
        text: `# .env
DATABASE_URL="postgresql://postgres.[ref]:[pw]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:[pw]@db.[ref].supabase.co:5432/postgres"`,
      },
      {
        type: "callout",
        variant: "tip",
        text: "Set `connection_limit=1` in your pooled DATABASE_URL when running in serverless. Prisma's internal pool becomes redundant when Supavisor is handling pooling — a limit of 1 prevents your function from trying to open multiple connections and exceeding the pool.",
      },
      {
        type: "h2",
        text: "Monitoring Connection Usage",
      },
      {
        type: "p",
        text: "Supabase Dashboard → Database → Connection Pooling shows real-time connection counts. A useful Postgres query to check active connections yourself:",
      },
      {
        type: "code",
        lang: "sql",
        text: `SELECT
  count(*) AS total,
  count(*) FILTER (WHERE state = 'active') AS active,
  count(*) FILTER (WHERE state = 'idle') AS idle,
  count(*) FILTER (WHERE wait_event_type = 'Lock') AS waiting
FROM pg_stat_activity
WHERE datname = 'postgres';`,
      },
      {
        type: "h2",
        text: "Quick Checklist",
      },
      {
        type: "ol",
        items: [
          "Use the pooled connection string (port 6543) for all Next.js API routes and Server Actions.",
          "Use the direct connection string (port 5432) only for `prisma migrate deploy` in CI/CD.",
          "Set `connection_limit=1` in the pooled DATABASE_URL if using Prisma.",
          "Add `?pgbouncer=true` to the pooled URL if using Prisma — required to disable prepared statements.",
          "Never commit either connection string to version control — use environment variables in Vercel project settings.",
          "Monitor pg_stat_activity if connections spike — check for missing `await` or unclosed DB clients in your code.",
        ],
      },
    ],
  },

  // ─── 6. Supabase Patterns ───────────────────────────────────────────────────
  {
    slug: "supabase-rls-realtime-productionpatterns",
    title:
      "Supabase in Production: Row-Level Security, Realtime, and Patterns That Actually Scale",
    description:
      "Supabase is more than a Firebase alternative. Here's how to use RLS policies, Realtime channels, and Edge Functions as load-bearing parts of a production system.",
    date: "2026-03-01",
    readTime: 10,
    tags: ["Supabase", "PostgreSQL", "TypeScript", "Architecture"],
    content: [
      {
        type: "p",
        text: "Supabase is a managed Postgres platform with a generous free tier and a frontend-friendly JavaScript client. Many developers discover it as a quick backend-as-a-service and don't look much deeper. That's a mistake — the features that make Supabase genuinely powerful for production systems are Row-Level Security, Realtime subscriptions, and Edge Functions. Here's what I've learned deploying it across several commercial projects.",
      },
      {
        type: "h2",
        text: "Row-Level Security Is Your Access Control Layer",
      },
      {
        type: "p",
        text: "Row-Level Security (RLS) is a native Postgres feature. When enabled on a table, every query — including those from the Supabase JavaScript client — is automatically filtered through policies that run in the database engine. The key insight: RLS moves access control out of your application code and into the database, where it can't be bypassed by a bug in your API layer.",
      },
      {
        type: "code",
        lang: "sql",
        text: `-- Enable RLS on the table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Users can only see their own orders
CREATE POLICY "users_see_own_orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert orders for themselves
CREATE POLICY "users_insert_own_orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);`,
      },
      {
        type: "p",
        text: "With these policies in place, a client calling `supabase.from('orders').select('*')` only ever receives rows where `user_id` matches the authenticated JWT. No application-layer filter is required, and no developer can accidentally forget to add one.",
      },
      {
        type: "callout",
        variant: "warning",
        text: "Always call `supabase.from('table').select()` from the authenticated client (initialized with the user's JWT), never the service-role key, in browser code. The service-role key bypasses all RLS policies — it should only be used in trusted server-side contexts like Edge Functions.",
      },
      {
        type: "h2",
        text: "Multi-Tenant RLS with Organisations",
      },
      {
        type: "p",
        text: "For SaaS products with team workspaces, you need a multi-tenant model: users belong to organisations, and permissions depend on both the user's identity and their role within the organisation. The pattern I use:",
      },
      {
        type: "code",
        lang: "sql",
        text: `-- Helper: returns the org IDs the current user belongs to
CREATE OR REPLACE FUNCTION auth.user_org_ids()
RETURNS uuid[] AS $$
  SELECT array_agg(organisation_id)
  FROM organisation_members
  WHERE user_id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Org-scoped read policy
CREATE POLICY "org_members_read_projects"
  ON projects FOR SELECT
  USING (organisation_id = ANY(auth.user_org_ids()));`,
      },
      {
        type: "p",
        text: "Marking the helper function `SECURITY DEFINER STABLE` is important: it runs with the definer's privileges (bypassing RLS on the `organisation_members` table) and its result is cached within the transaction, avoiding redundant queries for each row evaluated.",
      },
      {
        type: "h2",
        text: "Realtime: Broadcast vs Postgres Changes",
      },
      {
        type: "p",
        text: "Supabase Realtime has two distinct mechanisms that are often confused:",
      },
      {
        type: "ul",
        items: [
          "**Postgres Changes**: subscribes to a PostgreSQL logical replication stream. Every INSERT, UPDATE, or DELETE on a table emits an event to subscribed clients. Good for syncing data state — but the payload only includes changed rows, not the full result of a view or join.",
          "**Broadcast**: a low-latency pub/sub channel where clients can publish arbitrary JSON payloads to a named channel. No database persistence. Good for ephemeral collaboration events — cursor positions, typing indicators, presence.",
        ],
      },
      {
        type: "code",
        lang: "typescript",
        text: `import { createClient } from "@supabase/supabase-js";

const supabase = createClient(url, anonKey);

// Postgres Changes — receive DB mutations in real time
const channel = supabase
  .channel("inventory-changes")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "inventory" },
    (payload) => console.log("Row changed:", payload),
  )
  .subscribe();

// Broadcast — ephemeral pub/sub (e.g. live cursor positions)
const presenceChannel = supabase
  .channel("room:project-123")
  .on("broadcast", { event: "cursor" }, ({ payload }) => {
    updateCursor(payload.userId, payload.x, payload.y);
  })
  .subscribe();

// Publish a cursor event
await presenceChannel.send({
  type: "broadcast",
  event: "cursor",
  payload: { userId: currentUserId, x: 340, y: 120 },
});`,
      },
      {
        type: "callout",
        variant: "tip",
        text: "Postgres Changes respects RLS — a subscribed client only receives events for rows they're allowed to see. Broadcast is unfiltered within a channel; you control access at the channel subscription level.",
      },
      {
        type: "h2",
        text: "Edge Functions for Server-Side Logic",
      },
      {
        type: "p",
        text: "Supabase Edge Functions are Deno-based serverless functions deployed globally. They run in the same network region as your Supabase project, which means database round-trips are sub-millisecond. The primary use cases I reach for them:",
      },
      {
        type: "ul",
        items: [
          "Webhooks that must verify a signature and then mutate the database with the service-role key (e.g. Stripe webhooks updating subscription status).",
          "Scheduled jobs via Supabase Cron — run a function on a schedule to send digest emails, expire stale records, or sync external APIs.",
          "Any operation that requires the service-role key or a secret, but should not run in browser client code.",
        ],
      },
      {
        type: "code",
        lang: "typescript",
        text: `// supabase/functions/stripe-webhook/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, // bypasses RLS — safe inside Edge Function
);

serve(async (req) => {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    Deno.env.get("STRIPE_WEBHOOK_SECRET")!,
  );

  if (event.type === "customer.subscription.updated") {
    const sub = event.data.object as Stripe.Subscription;
    await supabase
      .from("subscriptions")
      .upsert({ stripe_subscription_id: sub.id, status: sub.status });
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
});`,
      },
      {
        type: "h2",
        text: "Storage + RLS for Private Files",
      },
      {
        type: "p",
        text: "Supabase Storage buckets support RLS policies too. Mark a bucket as private and define policies to control who can upload or download objects. The storage path convention I use for user-scoped files: `{user_id}/{filename}` — then a single policy covers all user files without per-file ACLs.",
      },
      {
        type: "code",
        lang: "sql",
        text: `-- Allow users to read only their own files in the "documents" bucket
CREATE POLICY "users_read_own_files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );`,
      },
      {
        type: "h2",
        text: "Performance: Generated Columns and Indexes",
      },
      {
        type: "p",
        text: "Since Supabase is just Postgres, all the standard performance tools apply. Two that pay off quickly in product work:",
      },
      {
        type: "ul",
        items: [
          "**Generated columns**: store a computed value (e.g. `full_name = first_name || ' ' || last_name`) as a real column. Queries can filter and sort on it without re-computing per row, and you can index it.",
          "**Partial indexes**: an index with a WHERE clause. If you frequently query `orders WHERE status = 'pending'`, a partial index on that subset is far smaller and faster than a full-table index on `status`.",
        ],
      },
      {
        type: "code",
        lang: "sql",
        text: `-- Generated column for fast full-name search
ALTER TABLE profiles
  ADD COLUMN full_name text GENERATED ALWAYS AS
    (first_name || ' ' || last_name) STORED;
CREATE INDEX profiles_full_name_idx ON profiles USING gin(to_tsvector('english', full_name));

-- Partial index for pending orders only
CREATE INDEX orders_pending_idx ON orders (created_at DESC)
  WHERE status = 'pending';`,
      },
      {
        type: "h2",
        text: "What Supabase Is Not",
      },
      {
        type: "p",
        text: "Supabase is not a magic scalability layer. The free tier pauses projects after one week of inactivity — unacceptable for production. The Pro plan ($25/month) keeps projects active and raises connection limits. For high-traffic applications you'll eventually need to right-size the compute add-on and tune Supavisor's pool size. It's still Postgres under the hood: slow queries need indexes, schema design decisions are permanent in ways that schema-less databases forgive, and migrations require care.",
      },
      {
        type: "callout",
        variant: "note",
        text: "Supabase's value proposition is that it gives you a production-grade Postgres backend — with auth, storage, realtime, and edge functions — without operating infrastructure. For most product teams and consulting projects, that trade-off is excellent.",
      },
    ],
  },
];

/** Lookup a post by slug — returns undefined if not found */
export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** All post slugs — used for static generation */
export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

/** Posts sorted newest-first — use this for all list rendering */
export function getSortedBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
