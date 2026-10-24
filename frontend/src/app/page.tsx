import HeroSection from "@/components/sections/HomeSection";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import Testimonial from "@/components/sections/Testimonial";
import NewsLetters from "@/components/sections/NewsLetters";
import Achievements from "@/components/sections/achivements";
import FAQSection from "@/components/sections/questions";
import BlogPreview from "@/components/sections/BlogPreview";
import { getAllPosts } from "@/lib/blog";

export default async function Home() {
  const posts = await getAllPosts();
  const previewPosts = posts.slice(0, 3);

  return (
    <main className="min-h-screen bg-white text-[#0A0F1E]">
      {/* Luminous Entice Blue (#0F67FF) & Crisp White ambient mesh gradient */}
      <div
        className="relative"
        style={{
          background: `
            radial-gradient(ellipse 65% 50% at 50% -10%, rgba(15, 103, 255, 0.16) 0%, rgba(15, 103, 255, 0.05) 50%, transparent 80%),
            radial-gradient(ellipse 45% 35% at 90% 25%, rgba(15, 103, 255, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 10% 45%, rgba(15, 103, 255, 0.06) 0%, transparent 65%),
            #ffffff
          `,
        }}
      >
        <HeroSection />
        <About />
        <Features />
      </div>
      <Achievements />
      <FAQSection />
      <Testimonial />
      <BlogPreview posts={previewPosts} />
      <NewsLetters />
    </main>
  );
}
