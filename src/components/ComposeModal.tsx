import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ComposeModalProps {
  onClose: () => void;
  onSubmit: (content: string) => void;
}

const MAX_CHARS = 280;

export function ComposeModal({ onClose, onSubmit }: ComposeModalProps) {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (content.trim() && content.length <= MAX_CHARS) {
      onSubmit(content.trim());
    }
  };

  const charCount = content.length;
  const isOverLimit = charCount > MAX_CHARS;
  const charPercentage = Math.min((charCount / MAX_CHARS) * 100, 100);

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}>×</button>
          <h3 className="modal-title">NEW_BROADCAST</h3>
        </div>

        <div className="compose-area">
          <div className="compose-avatar">A</div>
          <textarea
            ref={textareaRef}
            className="compose-input"
            placeholder="what's on your mind, anon?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />
        </div>

        <div className="modal-footer">
          <div className="char-counter">
            <svg className="char-ring" viewBox="0 0 32 32">
              <circle
                className="char-ring-bg"
                cx="16"
                cy="16"
                r="14"
                fill="none"
                strokeWidth="2"
              />
              <circle
                className="char-ring-progress"
                cx="16"
                cy="16"
                r="14"
                fill="none"
                strokeWidth="2"
                strokeDasharray={`${charPercentage * 0.88} 88`}
                style={{
                  stroke: isOverLimit ? 'var(--hot-pink)' :
                    charCount > MAX_CHARS * 0.9 ? '#ffaa00' : 'var(--electric-lime)'
                }}
              />
            </svg>
            <span className={`char-count ${isOverLimit ? 'over' : ''}`}>
              {MAX_CHARS - charCount}
            </span>
          </div>

          <motion.button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={!content.trim() || isOverLimit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            BROADCAST
          </motion.button>
        </div>
      </motion.div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(5, 5, 5, 0.9);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 80px;
          z-index: 1000;
        }

        .modal-content {
          width: 100%;
          max-width: 560px;
          background: var(--void-black);
          border: 1px solid var(--border-gray);
          position: relative;
        }

        .modal-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--electric-lime), var(--hot-pink));
        }

        .modal-header {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-gray);
        }

        .close-btn {
          width: 36px;
          height: 36px;
          background: transparent;
          border: none;
          color: var(--cream);
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
          margin-right: 16px;
        }

        .close-btn:hover {
          color: var(--hot-pink);
          background: var(--hover-gray);
        }

        .modal-title {
          font-family: 'Archivo Black', sans-serif;
          font-size: 0.9rem;
          color: var(--cream);
          letter-spacing: 0.05em;
        }

        .compose-area {
          display: flex;
          gap: 12px;
          padding: 20px;
        }

        .compose-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, var(--hot-pink), var(--electric-lime));
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.2rem;
          color: var(--void-black);
          flex-shrink: 0;
        }

        .compose-input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--cream);
          font-family: 'JetBrains Mono', monospace;
          font-size: 1rem;
          line-height: 1.6;
          resize: none;
          min-height: 120px;
        }

        .compose-input:focus {
          outline: none;
        }

        .compose-input::placeholder {
          color: var(--muted-gray);
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 16px;
          padding: 16px 20px;
          border-top: 1px solid var(--border-gray);
        }

        .char-counter {
          position: relative;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .char-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .char-ring-bg {
          stroke: var(--border-gray);
        }

        .char-ring-progress {
          transition: stroke-dasharray 0.2s ease;
        }

        .char-count {
          font-size: 0.65rem;
          color: var(--cream-muted);
        }

        .char-count.over {
          color: var(--hot-pink);
        }

        .submit-btn {
          padding: 12px 24px;
          background: var(--electric-lime);
          border: none;
          color: var(--void-black);
          font-family: 'Archivo Black', sans-serif;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .submit-btn:hover:not(:disabled) {
          background: var(--cream);
        }

        .submit-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        @media (max-width: 600px) {
          .modal-overlay {
            padding-top: 0;
            align-items: flex-start;
          }

          .modal-content {
            min-height: 100vh;
            border: none;
          }
        }
      `}</style>
    </motion.div>
  );
}