import { NavLink } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--gradient-midnight)',
        color: 'var(--text-inverse)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm"
                style={{
                  background: 'var(--gradient-amber)',
                  color: 'var(--midnight)',
                }}
              >
                S
              </div>
              <span className="text-xl font-bold tracking-tight">
                Shop<span style={{ color: 'var(--amber)' }}>Sphere</span>
              </span>
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: 'var(--slate-light)' }}
            >
              Your premium destination for curated products. Quality meets
              convenience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--amber)' }}
            >
              Quick Links
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { name: 'Home', to: '/' },
                { name: 'Cart', to: '/cart' },
                { name: 'Orders', to: '/order-history' },
                { name: 'Profile', to: '/profile' },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="text-sm transition-colors duration-200"
                  style={{ color: 'var(--slate-light)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--amber-light)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'var(--slate-light)')
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--amber)' }}
            >
              Get in Touch
            </h3>
            <div className="flex flex-col gap-2">
              <p className="text-sm" style={{ color: 'var(--slate-light)' }}>
                <FaEnvelope className="inline mr-2" />
                support@shopsphere.com
              </p>
              <p className="text-sm" style={{ color: 'var(--slate-light)' }}>
                +91 12345 67890
              </p>
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: 'var(--text-inverse)',
                }}
              >
                <FaGithub size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: 'var(--text-inverse)',
                }}
              >
                <FaLinkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-10 pt-6 text-center text-xs"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--slate-light)',
          }}
        >
          &copy; {currentYear} ShopSphere. Crafted with care by John Robert.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
