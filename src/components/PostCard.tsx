import { motion } from 'framer-motion';
import { Post } from '../App';

interface PostCardProps {
  post: Post;
  index: number;
  onLike: (postId: string) => void;
  onRepost: (postId: string) => void;
}

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);

  if (minutes < 1) return 'now';
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function PostCard({ post, index, onLike, onRepost }: PostCardProps) {
  return (
    <motion.article
      className="post-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="post-edge" />

      <div className="post-avatar">
        <span className="avatar-letter">{post.author.avatar}</span>
      </div>

      <div className="post-content">
        <div className="post-header">
          <span className="post-author">{post.author.name}</span>
          <span className="post-handle">@{post.author.handle}</span>
          <span className="post-separator">·</span>
          <span className="post-time">{formatTime(post.timestamp)}</span>
        </div>

        <p className="post-text">{post.content}</p>

        <div className="post-actions">
          <motion.button
            className="action-btn reply-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="action-icon">◇</span>
            <span className="action-count">{post.replies}</span>
          </motion.button>

          <motion.button
            className={`action-btn repost-btn ${post.isReposted ? 'active' : ''}`}
            onClick={() => onRepost(post.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="action-icon">⟳</span>
            <span className="action-count">{post.reposts}</span>
          </motion.button>

          <motion.button
            className={`action-btn like-btn ${post.isLiked ? 'active' : ''}`}
            onClick={() => onLike(post.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="action-icon">{post.isLiked ? '◆' : '◇'}</span>
            <span className="action-count">{post.likes}</span>
          </motion.button>

          <motion.button
            className="action-btn share-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="action-icon">↗</span>
          </motion.button>
        </div>
      </div>

      <style>{`
        .post-card {
          display: flex;
          gap: 12px;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-gray);
          position: relative;
          transition: background 0.15s ease;
          cursor: pointer;
        }

        .post-card:hover {
          background: var(--hover-gray);
        }

        .post-edge {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(
            180deg,
            var(--electric-lime) 0%,
            var(--hot-pink) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .post-card:hover .post-edge {
          opacity: 1;
        }

        .post-avatar {
          width: 48px;
          height: 48px;
          background: var(--border-gray);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }

        .post-avatar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, var(--electric-lime) 0%, var(--hot-pink) 100%);
          opacity: 0.2;
        }

        .avatar-letter {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.2rem;
          color: var(--cream);
          position: relative;
          z-index: 1;
        }

        .post-content {
          flex: 1;
          min-width: 0;
        }

        .post-header {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 4px;
        }

        .post-author {
          font-family: 'Archivo Black', sans-serif;
          font-size: 0.9rem;
          color: var(--cream);
        }

        .post-handle {
          font-size: 0.85rem;
          color: var(--cream-muted);
        }

        .post-separator {
          color: var(--muted-gray);
        }

        .post-time {
          font-size: 0.85rem;
          color: var(--cream-muted);
        }

        .post-text {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--cream);
          margin-bottom: 12px;
          word-wrap: break-word;
        }

        .post-actions {
          display: flex;
          gap: 4px;
          margin-left: -8px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: transparent;
          border: none;
          color: var(--cream-muted);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .action-icon {
          font-size: 1rem;
        }

        .reply-btn:hover {
          color: var(--cream);
        }

        .repost-btn:hover,
        .repost-btn.active {
          color: var(--electric-lime);
        }

        .like-btn:hover,
        .like-btn.active {
          color: var(--hot-pink);
        }

        .share-btn:hover {
          color: var(--cream);
        }

        .action-count {
          min-width: 20px;
        }

        @media (max-width: 600px) {
          .post-card {
            padding: 12px 16px;
          }

          .post-avatar {
            width: 40px;
            height: 40px;
          }

          .post-text {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </motion.article>
  );
}