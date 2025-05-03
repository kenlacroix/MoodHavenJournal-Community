import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-sm text-gray-500">
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-6 space-y-2 sm:space-y-0 mb-4">
          <Link href="https://moodhaven.substack.com" target="_blank" rel="noopener noreferrer">
            Substack
          </Link>
          <Link href="https://github.com/kenlacroix/MoodHavenJournal-Community" target="_blank" rel="noopener noreferrer">
            GitHub
          </Link>
          <Link href="https://x.com/moodhavenapp" target="_blank" rel="noopener noreferrer">
            X (Twitter)
          </Link>
          <Link href="https://bsky.app/profile/moodhavenapp.bsky.social" target="_blank" rel="noopener noreferrer">
            Bluesky
          </Link>
          <Link href="https://www.linkedin.com/company/moodhavenapp/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </Link>
        </div>

        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} MoodHaven Journal. Built with care by Ken LaCroix.
        </p>
      </div>
    </footer>
  );
}
