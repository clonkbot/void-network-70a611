import { motion } from 'framer-motion';

interface SidebarProps {
  onCompose: () => void;
}

const navItems = [
  { icon: '◈', label: 'HOME', active: true },
  { icon: '◎', label: 'EXPLORE', active: false },
  { icon: '◉', label: 'NOTIFS', active: false },
  { icon: '◆', label: 'MESSAGES', active: false },
  { icon: '⬡', label: 'PROFILE', active: false },
];

export function Sidebar({ onCompose }: SidebarProps) {
  return (
    <aside className="sidebar">
      <motion.div
        className="logo-container"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="logo glitch" data-text="VOID">VOID</h1>
        <span className="logo-tag">// network</span>
      </motion.div>

      <nav className="nav-menu">
        {navItems.map((item, index) => (
          <motion.button
            key={item.label}
            className={`nav-item ${item.active ? 'active' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.active && <span className="nav-indicator" />}
          </motion.button>
        ))}
      </nav>

      <motion.button
        className="compose-btn"
        onClick={onCompose}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="compose-icon">+</span>
        <span className="compose-label">BROADCAST</span>
      </motion.button>

      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">A</div>
          <div className="user-info">
            <span className="user-name">anon_user</span>
            <span className="user-handle">@anon_user</span>
          </div>
        </div>
      </div>

      <style>{`
        .sidebar {
          padding: 20px;
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: sticky;
          top: 0;
        }

        .logo-container {
          margin-bottom: 32px;
        }

        .logo {
          font-family: 'Archivo Black', sans-serif;
          font-size: 2rem;
          color: var(--cream);
          letter-spacing: -0.02em;
        }

        .logo-tag {
          display: block;
          font-size: 0.65rem;
          color: var(--electric-lime);
          margin-top: -4px;
          letter-spacing: 0.1em;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 16px;
          background: transparent;
          border: none;
          color: var(--cream-muted);
          font-family: 'Archivo Black', sans-serif;
          font-size: 0.9rem;
          cursor: pointer;
          text-align: left;
          position: relative;
          transition: all 0.15s ease;
        }

        .nav-item:hover {
          color: var(--cream);
          background: var(--hover-gray);
        }

        .nav-item.active {
          color: var(--cream);
        }

        .nav-icon {
          font-size: 1.2rem;
          width: 24px;
          text-align: center;
        }

        .nav-indicator {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background: var(--electric-lime);
        }

        .compose-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 24px;
          padding: 16px 24px;
          background: var(--electric-lime);
          border: none;
          color: var(--void-black);
          font-family: 'Archivo Black', sans-serif;
          font-size: 0.9rem;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
          overflow: hidden;
        }

        .compose-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.4s ease;
        }

        .compose-btn:hover::after {
          left: 100%;
        }

        .compose-icon {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid var(--border-gray);
        }

        .user-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 4px;
          transition: background 0.15s ease;
          cursor: pointer;
        }

        .user-card:hover {
          background: var(--hover-gray);
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--hot-pink), var(--electric-lime));
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Archivo Black', sans-serif;
          font-size: 1rem;
          color: var(--void-black);
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-family: 'Archivo Black', sans-serif;
          font-size: 0.85rem;
          color: var(--cream);
        }

        .user-handle {
          font-size: 0.75rem;
          color: var(--cream-muted);
        }

        @media (max-width: 1200px) {
          .logo-tag,
          .nav-label,
          .compose-label,
          .user-info {
            display: none;
          }

          .sidebar {
            align-items: center;
            padding: 20px 10px;
          }

          .nav-item {
            justify-content: center;
            padding: 14px;
          }

          .compose-btn {
            padding: 16px;
          }
        }

        @media (max-width: 600px) {
          .sidebar {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
}