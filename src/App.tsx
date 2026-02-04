import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { Feed } from './components/Feed';
import { RightPanel } from './components/RightPanel';
import { ComposeModal } from './components/ComposeModal';
import './styles.css';

export interface Post {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  likes: number;
  reposts: number;
  replies: number;
  isLiked: boolean;
  isReposted: boolean;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

const initialPosts: Post[] = [
  {
    id: generateId(),
    author: { name: 'void_walker', handle: 'void_walker', avatar: 'V' },
    content: 'just deployed my consciousness to the mainnet. latency is wild but the vibes are immaculate',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    likes: 42,
    reposts: 7,
    replies: 3,
    isLiked: false,
    isReposted: false,
  },
  {
    id: generateId(),
    author: { name: 'NEURAL.eth', handle: 'neural_eth', avatar: 'N' },
    content: 'hot take: the algorithm is just vibes with extra steps',
    timestamp: new Date(Date.now() - 1000 * 60 * 23),
    likes: 128,
    reposts: 34,
    replies: 12,
    isLiked: true,
    isReposted: false,
  },
  {
    id: generateId(),
    author: { name: 'glitch_prophet', handle: 'glitch_prophet', avatar: 'G' },
    content: 'debugging at 3am hits different when you realize the bug was inside you all along',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    likes: 89,
    reposts: 21,
    replies: 8,
    isLiked: false,
    isReposted: true,
  },
  {
    id: generateId(),
    author: { name: 'cyber.dreamer', handle: 'cyber_dreamer', avatar: 'C' },
    content: 'new project dropping soon. its either going to change everything or break the internet. no in between.',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    likes: 234,
    reposts: 56,
    replies: 19,
    isLiked: false,
    isReposted: false,
  },
  {
    id: generateId(),
    author: { name: 'staticnoise', handle: 'static_noise', avatar: 'S' },
    content: 'sometimes i feel like im just a series of API calls wrapped in existential dread',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    likes: 567,
    reposts: 123,
    replies: 45,
    isLiked: true,
    isReposted: false,
  },
];

function App() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleNewPost = (content: string) => {
    const newPost: Post = {
      id: generateId(),
      author: { name: 'anon_user', handle: 'anon_user', avatar: 'A' },
      content,
      timestamp: new Date(),
      likes: 0,
      reposts: 0,
      replies: 0,
      isLiked: false,
      isReposted: false,
    };
    setPosts([newPost, ...posts]);
    setIsComposeOpen(false);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const handleRepost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isReposted: !post.isReposted,
          reposts: post.isReposted ? post.reposts - 1 : post.reposts + 1,
        };
      }
      return post;
    }));
  };

  return (
    <div className="app-container">
      <div className="noise-overlay" />
      <div className="scan-line" />

      <motion.div
        className="main-layout"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Sidebar onCompose={() => setIsComposeOpen(true)} />

        <main className="main-content">
          <Feed
            posts={posts}
            onLike={handleLike}
            onRepost={handleRepost}
          />
        </main>

        <RightPanel />
      </motion.div>

      <AnimatePresence>
        {isComposeOpen && (
          <ComposeModal
            onClose={() => setIsComposeOpen(false)}
            onSubmit={handleNewPost}
          />
        )}
      </AnimatePresence>

      <footer className="app-footer">
        <span>Requested by <a href="https://twitter.com/0xArchetype" target="_blank" rel="noopener noreferrer">@0xArchetype</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer">@clonkbot</a></span>
      </footer>
    </div>
  );
}

export default App;