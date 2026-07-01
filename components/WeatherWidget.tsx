"use client";

import { Cloud, Droplets, Wind } from "lucide-react";

export default function WeatherWidget() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-gradient-to-br from-primary to-blue-600 p-5 text-white shadow-lg shadow-primary/20">
      <div className="mb-1 text-xs font-medium uppercase tracking-wider opacity-80">
        Weather
      </div>
      <div className="mb-4 text-lg font-semibold">New Delhi, India</div>

      <div className="flex items-center gap-4">
        <Cloud className="h-12 w-12 opacity-90" />
        <div>
          <div className="text-3xl font-bold">32°C</div>
          <div className="text-sm opacity-80">Partly Cloudy</div>
        </div>
      </div>

      <div className="mt-4 flex gap-4 border-t border-white/20 pt-4 text-xs">
        <div className="flex items-center gap-1.5">
          <Droplets className="h-3.5 w-3.5" />
          <span>65% Humidity</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Wind className="h-3.5 w-3.5" />
          <span>12 km/h</span>
        </div>
      </div>
    </div>
  );
}
