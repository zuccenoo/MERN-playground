import { useState, useEffect } from 'react';

export default function TypeWriter({ text, speed = 50 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let pauseTime = 0;

    const interval = setInterval(() => {
      if (pauseTime > 0) {
        pauseTime--;
        return;
      }

      if (!isDeleting) {
        // Typing phase
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          // Finished typing, pause before deleting
          setIsTyping(false);
          pauseTime = 100; // 5 seconds pause
          isDeleting = true;
        }
      } else {
        // Deleting phase - delete one word at a time
        if (index > 0) {
          // Find the last space before current index
          let spaceIndex = text.lastIndexOf(' ', index - 1);
          if (spaceIndex === -1) {
            // No space found, delete everything
            index = 0;
          } else {
            // Delete back to the space
            index = spaceIndex;
          }
          setDisplayedText(text.slice(0, index));
        } else {
          // Finished deleting, pause before typing again
          pauseTime = 10; // ~0.5 seconds pause (10 * 50ms)
          isDeleting = false;
          setIsTyping(true);
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayedText}
      {showCursor && <span className="animate-pulse">|</span>}
    </span>
  );
}
