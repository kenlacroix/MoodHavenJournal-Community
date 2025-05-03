export default function FoundersPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-gray-800 space-y-8">
      <h1 className="text-3xl font-bold text-blue-700 text-center">Meet the Founder</h1>

      <p className="text-lg leading-relaxed">
        Hi, I’m Ken LaCroix — creator of MoodHaven Journal. I started this project because I couldn’t find a journaling
        space that felt truly safe, calm, and respectful of personal growth. Most platforms either felt too clinical, too public,
        or too commercial.
      </p>

      <p className="text-lg leading-relaxed">
        MoodHaven is my response: a labor of love rooted in one belief — <strong>your thoughts should stay yours</strong>. 
        No ads. No tracking. No pressure. Just a space to write, reflect, and grow.
      </p>

      <p className="text-lg leading-relaxed">
        This project is still early — we’re in an alpha community phase, and we’re building it together. If you believe in
        mindful design, privacy, and personal growth, I’d love for you to join the journey.
      </p>

      <div className="text-center pt-6">
        <a
          href="https://github.com/kenlacroix/MoodHavenJournal-Community"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
          target="_blank"
        >
          Contribute on GitHub
        </a>
      </div>
    </div>
  );
}
