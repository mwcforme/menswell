import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { downloadCsv } from "@/lib/admin/csv";
import { Loader2, Download } from "lucide-react";

interface Lead {
  id: string;
  created_at: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  service: string | null;
  location: string | null;
  source: string | null;
  crm_status: string;
  crm_error: string | null;
  page_url: string | null;
}

const STATUS_TONE: Record<string, string> = {
  ok: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  pending: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  failed: "bg-red-500/15 text-red-300 border-red-500/30",
};

export default function AdminLeads() {
  const [rows, setRows] = useState<Lead[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setError(null);
      let query = supabase
        .from("lead_captures")
        .select("id,created_at,name,email,phone,service,location,source,crm_status,crm_error,page_url")
        .order("created_at", { ascending: false })
        .limit(500);
      if (filter === "other") {
        query = query.not("crm_status", "in", "(ok,pending,failed)");
      } else if (filter !== "all") {
        query = query.eq("crm_status", filter);
      }
      const { data, error } = await query;
      if (cancelled) return;
      if (error) { setError(error.message); return; }
      setRows((data ?? []) as Lead[]);
    })();
    return () => { cancelled = true; };
  }, [filter]);

  const filtered = (rows ?? []).filter((r) => {
    if (!q) return true;
    const hay = `${r.name ?? ""} ${r.email ?? ""} ${r.phone ?? ""} ${r.service ?? ""} ${r.location ?? ""}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  const exportCsv = () => {
    downloadCsv(`leads-${new Date().toISOString().slice(0, 10)}.csv`, filtered, [
      { key: "created_at", header: "Created" },
      { key: "name", header: "Name" },
      { key: "email", header: "Email" },
      { key: "phone", header: "Phone" },
      { key: "service", header: "Service" },
      { key: "location", header: "Location" },
      { key: "source", header: "Source" },
      { key: "crm_status", header: "CRM Status" },
      { key: "crm_error", header: "CRM Error" },
      { key: "page_url", header: "Page" },
    ]);
  };

  return (
    <AdminLayout title="Leads">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          type="search"
          placeholder="Search name, email, phone…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="h-10 flex-1 min-w-[200px] rounded-md border border-white/10 bg-[#070B1F] px-3 text-sm placeholder:text-white/40 focus:border-[#E8670A] focus:outline-none"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 rounded-md border border-white/10 bg-[#070B1F] px-3 text-sm focus:border-[#E8670A] focus:outline-none"
        >
          <option value="all">All statuses</option>
          <option value="ok">OK</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="other">Other</option>
        </select>
        <button
          type="button"
          onClick={exportCsv}
          disabled={!filtered.length}
          className="flex h-10 items-center gap-2 rounded-md border border-white/10 bg-[#070B1F] px-3 text-sm hover:bg-white/5 disabled:opacity-40"
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      {error && <div className="mb-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</div>}

      {!rows && !error && (
        <div className="flex items-center gap-2 text-white/60">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      )}

      {rows && (
        <div className="overflow-auto rounded-xl border border-white/10 bg-[#070B1F]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-white/50">
              <tr>
                <Th>Created</Th><Th>Name</Th><Th>Contact</Th><Th>Service</Th><Th>Location</Th><Th>Source</Th><Th>CRM</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                  <Td>{new Date(r.created_at).toLocaleString()}</Td>
                  <Td>{r.name ?? "—"}</Td>
                  <Td>
                    <div>{r.email ?? "—"}</div>
                    <div className="text-xs text-white/50">{r.phone ?? ""}</div>
                  </Td>
                  <Td>{r.service ?? "—"}</Td>
                  <Td>{r.location ?? "—"}</Td>
                  <Td>{r.source ?? "—"}</Td>
                  <Td>
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${STATUS_TONE[r.crm_status] ?? "border-white/10 text-white/60"}`}>
                      {r.crm_status}
                    </span>
                    {r.crm_error && <div className="mt-1 max-w-[260px] truncate text-xs text-red-300" title={r.crm_error}>{r.crm_error}</div>}
                  </Td>
                </tr>
              ))}
              {!filtered.length && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-white/50">No leads match the current filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-3 text-xs text-white/40">Showing the most recent 500 records. Action buttons (retry CRM, mark contacted) are coming next.</p>
    </AdminLayout>
  );
}

const Th = ({ children }: { children: React.ReactNode }) => <th className="px-4 py-3 font-semibold">{children}</th>;
const Td = ({ children }: { children: React.ReactNode }) => <td className="px-4 py-3 align-top">{children}</td>;
