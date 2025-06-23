export default function AdminArea() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Admin Area</h1>
      <div className="space-y-4">
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          You get here only if you are a member of the Admins group.
        </p>
      </div>
    </main>
  );
}
