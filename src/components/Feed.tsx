import { motion } from 'framer-motion';
import { Post } from '../App';
import { PostCard } from './PostCard';

interface FeedProps {
  posts: Post[];
  onLike: (postId: string) => void;
  onRepost: (postId: string) => void;
}

export function Feed({ posts, onLike, onRepost }: FeedProps) {
  return (
    <div className="feed">
      <motion.header
        className="feed-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="feed-title">FEED</h2>
        <div className="feed-tabs">
          <button className="tab active">FOR_YOU</button>
          <button className="tab">FOLLOWING</button>
        </div>
      </motion.header>

      <div className="posts-container">
        {posts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            index={index}
            onLike={onLike}
            onRepost={onRepost}
          />
        ))}
      </div>

      <style>{`
        .feed {
          min-height: 100vh;
          padding-bottom: 60px;
        }

        .feed-header {
          position: sticky;
          top: 0;
          background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(12px);
          z-index: 50;
          border-bottom: 1px solid var(--border-gray);
        }

        .feed-title {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.2rem;
          padding: 16px 20px 0;
          color: var(--cream);
        }

        .feed-tabs {
          display: flex;
          padding: 0 20px;
        }

        .tab {
          flex: 1;
          padding: 16px 0;
          background: transparent;
          border: none;
          color: var(--cream-muted);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          cursor: pointer;
          position: relative;
          transition: color 0.15s ease;
        }

        .tab:hover {
          color: var(--cream);
        }

        .tab.active {
          color: var(--cream);
        }

        .tab.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 3px;
          background: var(--electric-lime);
        }

        .posts-container {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}