// app/about/page.tsx

export const metadata = {
  title: "About Us | Acme",
  description: "Learn more about Acme and our mission.",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        Acme is a forward-thinking company focused on delivering high-quality solutions
        for modern businesses. Our team is passionate about innovation, integrity, and impact.
      </p>
    </main>
  );
}
