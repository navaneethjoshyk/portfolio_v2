import MatrixShaderBackground from "@/components/ui/matrix-shader-background";

export default function Home() {
  return (
    <>
      {/* Full-screen Matrix Shader Background with integrated text */}
      <MatrixShaderBackground
        className="dark:block hidden"
        name="Navaneeth Joshy K"
        title="Front-End Developer at B12Feed"
        skills="Figma • React • Tailwind CSS"
        interests="UI/UX Design • Accessibility • Web Development"
      />

      {/* Social Links */}
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
    </>
  );
}
