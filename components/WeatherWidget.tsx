"use client";

import { Cloud } from "lucide-react";

export default function WeatherWidget() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Cloud className="h-8 w-8 text-amber-500" />
          <div>
            <div className="text-2xl font-normal text-slate-900">32°</div>
            <div className="text-xs text-slate-500">Sunny · New Delhi</div>
          </div>
        </div>
      </div>
    </div>
  );
}
