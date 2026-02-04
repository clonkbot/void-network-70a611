import { useState } from 'react';
import { motion } from 'framer-motion';

const trendingTopics = [
  { tag: '#VOIDCORE', posts: '12.4K' },
  { tag: '#DEVLIFE', posts: '8.9K' },
  { tag: '#CYBERSPACE', posts: '6.2K' },
  { tag: '#GLITCH', posts: '4.7K' },
  { tag: '#NEONIGHTS', posts: '3.1K' },
];

const suggestedUsers = [
  { name: 'hex_machine', handle: 'hex_machine', avatar: 'H' },
  { name: 'data.wraith', handle: 'data_wraith', avatar: 'D' },
  { name: 'pixel_ghost', handle: 'pixel_ghost', avatar: 'P' },
];

export function RightPanel() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <aside className="right-panel">
      <motion.div
        className="search-container"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="search-icon">⌕</div>
        <input
          type="text"
          className="search-input"
          placeholder="SEARCH_VOID"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </motion.div>

      <motion.section
        className="panel-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h3 className="section-title">
          <span className="title-accent">//</span> TRENDING
        </h3>
        <div className="trending-list">
          {trendingTopics.map((topic, index) => (
            <motion.div
              key={topic.tag}
              className="trending-item"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
              whileHover={{ x: 4 }}
            >
              <span className="trending-tag">{topic.tag}</span>
              <span className="trending-posts">{topic.posts} posts</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="panel-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <h3 className="section-title">
          <span className="title-accent">//</span> WHO_TO_FOLLOW
        </h3>
        <div className="suggested-list">
          {suggestedUsers.map((user, index) => (
            <motion.div
              key={user.handle}
              className="suggested-item"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
            >
              <div className="suggested-avatar">{user.avatar}</div>
              <div className="suggested-info">
                <span className="suggested-name">{user.name}</span>
                <span className="suggested-handle">@{user.handle}</span>
              </div>
              <motion.button
                className="follow-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                FOLLOW
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.div
        className="panel-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="footer-links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
        </div>
        <p className="copyright">© 2026 VOID.network</p>
      </motion.div>

      <style>{`
        .right-panel {
          padding: 20px;
          height: 100vh;
          position: sticky;
          top: 0;
          overflow-y: auto;
        }

        .search-container {
          position: relative;
          margin-bottom: 20px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--cream-muted);
          font-size: 1rem;
        }

        .search-input {
          width: 100%;
          padding: 14px 14px 14px 40px;
          background: var(--void-deep);
          border: 1px solid var(--border-gray);
          color: var(--cream);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          transition: all 0.15s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--electric-lime);
          box-shadow: 0 0 0 1px var(--electric-lime);
        }

        .search-input::placeholder {
          color: var(--muted-gray);
          letter-spacing: 0.05em;
        }

        .panel-section {
          background: var(--void-deep);
          border: 1px solid var(--border-gray);
          margin-bottom: 20px;
          overflow: hidden;
        }

        .section-title {
          font-family: 'Archivo Black', sans-serif;
          font-size: 0.9rem;
          padding: 16px;
          border-bottom: 1px solid var(--border-gray);
          color: var(--cream);
        }

        .title-accent {
          color: var(--electric-lime);
        }

        .trending-list {
          padding: 8px 0;
        }

        .trending-item {
          display: flex;
          flex-direction: column;
          padding: 12px 16px;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .trending-item:hover {
          background: var(--hover-gray);
        }

        .trending-tag {
          font-family: 'Archivo Black', sans-serif;
          font-size: 0.9rem;
          color: var(--cream);
        }

        .trending-posts {
          font-size: 0.75rem;
          color: var(--cream-muted);
          margin-top: 2px;
        }

        .suggested-list {
          padding: 8px 0;
        }

        .suggested-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          transition: background 0.15s ease;
        }

        .suggested-item:hover {
          background: var(--hover-gray);
        }

        .suggested-avatar {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, var(--hot-pink), var(--electric-lime));
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Archivo Black', sans-serif;
          font-size: 1rem;
          color: var(--void-black);
          flex-shrink: 0;
        }

        .suggested-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .suggested-name {
          font-family: 'Archivo Black', sans-serif;
          font-size: 0.85rem;
          color: var(--cream);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .suggested-handle {
          font-size: 0.75rem;
          color: var(--cream-muted);
        }

        .follow-btn {
          padding: 8px 16px;
          background: var(--cream);
          border: none;
          color: var(--void-black);
          font-family: 'Archivo Black', sans-serif;
          font-size: 0.7rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .follow-btn:hover {
          background: var(--electric-lime);
        }

        .panel-footer {
          padding-top: 16px;
        }

        .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 8px;
        }

        .footer-links a {
          font-size: 0.7rem;
          color: var(--cream-muted);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .footer-links a:hover {
          color: var(--electric-lime);
        }

        .copyright {
          font-size: 0.7rem;
          color: var(--muted-gray);
        }

        @media (max-width: 900px) {
          .right-panel {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
}