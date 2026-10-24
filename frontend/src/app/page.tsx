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
      <HeroSection />
      <About />
      <Features />
      <Achievements />
      <FAQSection />
      <Testimonial />
      <BlogPreview posts={previewPosts} />
      <NewsLetters />
    </main>
  );
}
