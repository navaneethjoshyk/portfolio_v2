export default function Home() {
  // The animated background + name/title text now live in the root layout
  // (components/ui/matrix-shader-background.tsx) so the WebGL canvas stays
  // mounted across navigation instead of being torn down and recreated
  // every time you come back to "/".
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-auto animate-fade-in-1000">
      <div className="flex items-center gap-6 text-gray-400">
        <a
          href="https://github.com/navaneethjoshyk"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors duration-200"
        >
          GitHub
        </a>
        <span className="text-gray-600">•</span>
        <a
          href="https://www.linkedin.com/in/navaneethjoshyk/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors duration-200"
        >
          LinkedIn
        </a>
        <span className="text-gray-600">•</span>
        <a
          href="mailto:navaneethjoshyk8@gmail.com"
          className="hover:text-white transition-colors duration-200"
        >
          Email
        </a>
      </div>
    </div>
  );
}
