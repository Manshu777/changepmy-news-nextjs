export default function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[20px] bg-white shadow-md">
      <div className="aspect-[16/10] bg-slate-200" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 rounded-lg bg-slate-200" />
        <div className="h-4 w-full rounded-lg bg-slate-200" />
        <div className="h-3 w-1/2 rounded-lg bg-slate-200" />
        <div className="flex justify-between pt-2">
          <div className="h-3 w-20 rounded-lg bg-slate-200" />
          <div className="h-3 w-16 rounded-lg bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
