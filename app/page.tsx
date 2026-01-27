export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-sky-600 mb-4">
          Welcome to LMS
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          Learn. Practice. Grow.
        </p>

        <button className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition">
          Get Started
        </button>
      </div>
    </main>
  );
}
