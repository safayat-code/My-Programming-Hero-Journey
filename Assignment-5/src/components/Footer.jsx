import { HiOutlineMail } from "react-icons/hi";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const LINK_GROUPS = [
  { title: "Product", links: ["Home", "Technologies", "Projects"] },
  { title: "Company", links: ["About", "Contact", "Careers"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service"] },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-100 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <a href="#home" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center text-white text-sm font-bold">
                DS
              </span>
              <span className="font-bold text-slate-900 text-lg">
                Dev <span className="text-gradient">Stack</span>
              </span>
            </a>
            <p className="mt-4 text-sm text-slate-500 max-w-xs">
              Curated tools, technologies, and resources for developers
              building modern software.
            </p>
            <div className="mt-4 flex items-center gap-4 text-slate-400">
              <a
                href="https://github.com"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-700"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-700"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-700"
              >
                <FaLinkedin size={18} />
              </a>
              <a href="mailto:hello@devstack.dev" aria-label="Email" className="hover:text-slate-700">
                <HiOutlineMail size={19} />
              </a>
            </div>
          </div>

          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-slate-900 text-sm">{group.title}</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-500">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-slate-800 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dev Stack. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-slate-800">Privacy</a>
            <a href="#" className="hover:text-slate-800">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
