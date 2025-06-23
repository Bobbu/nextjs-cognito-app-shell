// app/about/page.tsx

export const metadata = {
  title: "About Us | Any Stupid Idea",
  description: "Learn more about Any Stupid Idea and our mission.",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <div className="space-y-4">
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          You have discovered Any Stupid Idea. This is a place where people can 
          and are even encouraged to explore all sorts of crazy (and even stupid) 
          ideas.
        </p>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Any Stupid Idea is a forward-thinking company focused on delivering
          high-quality solutions for fun if not profit. Our team is passionate
          about innovation, integrity, and enjoying their work days.
        </p>
      </div>
    </main>
  );
}
