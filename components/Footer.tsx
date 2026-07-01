import { Globe, Mail, Rss, Share2 } from "lucide-react";

const FOOTER_LINKS = {
  About: ["Our Story", "Team", "Careers", "Press"],
  Contact: ["Support", "Advertise", "Partnerships", "Feedback"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
                N
              </div>
              <span className="text-xl font-bold text-slate-900">
                NEWSLY
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              Your premium source for curated news. Stay informed with stories
              that matter.
            </p>
            <div className="mt-4 flex gap-3">
              {[
                { icon: Share2, label: "Share" },
                { icon: Globe, label: "Website" },
                { icon: Rss, label: "RSS Feed" },
                { icon: Mail, label: "Email" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors hover:bg-primary hover:text-white"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-3 text-sm font-bold text-slate-900">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 transition-colors hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} NEWSLY. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
