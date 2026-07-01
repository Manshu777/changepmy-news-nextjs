"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";

export default function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="rounded-[20px] bg-white p-5 shadow-md shadow-slate-200/50">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
        <Mail className="h-5 w-5 text-primary" />
      </div>
      <h3 className="mb-1 text-base font-bold text-slate-900">
        Daily Briefing
      </h3>
      <p className="mb-4 text-sm text-slate-500">
        Get the top stories delivered to your inbox every morning.
      </p>

      {submitted ? (
        <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          Thanks for subscribing!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            className="flex shrink-0 items-center justify-center rounded-xl bg-primary px-3 py-2 text-white transition-colors hover:bg-primary/90"
            aria-label="Subscribe"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}
