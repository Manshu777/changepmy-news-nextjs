import { formatBriefingDate } from "@/lib/utils";

export default function BriefingHeader() {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-normal text-slate-900">Your briefing</h1>
      <p className="mt-1 text-sm text-slate-500">{formatBriefingDate()}</p>
    </div>
  );
}
