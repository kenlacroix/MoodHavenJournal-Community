import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-20">
      {/* Hero Section */}
      <section className="text-center mt-12 px-4">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Your Private, Calm Space to Reflect
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          MoodHaven Journal gives you a warm, secure corner of the web—where your thoughts stay yours.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="https://moodhaven.substack.com"
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
            target="_blank"
          >
            Join the Community
          </Link>
          <Link
            href="https://github.com/kenlacroix/MoodHavenJournal-Community"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition"
            target="_blank"
          >
            Contribute on GitHub
          </Link>
        </div>
      </section>

      {/* Value Props */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 text-center">
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-2">🔒 Privacy</h3>
          <p className="text-sm text-gray-600">
            Your entries stay with you. Encrypted and local-first—no cloud, no leaks.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-2">🌿 Calm Interface</h3>
          <p className="text-sm text-gray-600">
            Minimal, distraction-free writing that helps you breathe and reflect.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-2">🤝 Community</h3>
          <p className="text-sm text-gray-600">
            Help shape a tool for thoughtful people everywhere. Open, transparent, collaborative.
          </p>
        </div>
      </section>

      {/* Newsletter Preview */}
      <section className="bg-gray-50 rounded-xl p-6 shadow-sm mx-4">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">From the Newsletter</h2>
        <p className="text-sm text-gray-600 mb-4">
          “Welcome! I’m excited to invite you into MoodHaven, a passion-project journaling space that puts your privacy first.”
        </p>
        <Link
          href="https://moodhaven.substack.com"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
          target="_blank"
        >
          Subscribe
        </Link>
      </section>

      {/* Founder Preview */}
      <section className="text-center px-4">
        <blockquote className="italic text-gray-700 mb-4 max-w-2xl mx-auto">
          “I created MoodHaven Journal because I couldn’t find a journaling space that felt truly safe—calm, private, and respectful of personal growth.”
        </blockquote>
        <Link
          href="/founders"
          className="text-blue-600 font-semibold hover:underline"
        >
          Read My Story →
        </Link>
      </section>
    </div>
  );
}
