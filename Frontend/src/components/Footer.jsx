import { Mail } from 'lucide-react';

// lucide-react no longer ships brand/social icons (Instagram, LinkedIn, X, etc.)
// so these are simple inline SVGs styled to match the rest of the icon set.
function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const footerLinks = [
  {
    heading: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Notes', href: '/notes' },
      { label: 'Community', href: '/community' },
      { label: "PYQ's", href: '/pyqs' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Events', href: '/events' },
      { label: 'Marketplace', href: '/marketplace' },
      { label: 'Teams', href: '/teams' },
      { label: 'Help Center', href: '/help' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const socials = [
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
  { icon: XIcon, href: '#', label: 'X' },
  { icon: Mail, href: 'mailto:hello@campushub.edu.in', label: 'Email' },
];

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm">
                C
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">CampusHub</p>
                <p className="text-[11px] text-slate-400 leading-tight">Bennett University</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your campus. One digital hub. Notes, doubts, teams & more — all in one place.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white mb-4">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} CampusHub. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-red-600 hover:text-white transition"
              >
                <Icon width={16} height={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;