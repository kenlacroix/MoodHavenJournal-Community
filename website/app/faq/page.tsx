export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-gray-800 space-y-10">
      <h1 className="text-3xl font-bold text-blue-700 text-center">Frequently Asked Questions</h1>

      <div className="space-y-6">

        <div>
          <h2 className="font-semibold text-lg text-blue-600">🔒 How secure is my data?</h2>
          <p>
            In the community edition, all your data is stored locally on your device. Nothing is uploaded or shared. 
            Our goal is to respect your privacy by default — your journal entries never leave your machine unless you choose to export them.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg text-blue-600">📤 Can I export my journal?</h2>
          <p>
            Exporting is a planned feature — we aim to allow encrypted backups and local export options in a future version.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg text-blue-600">📱 Will there be a mobile app?</h2>
          <p>
            Yes — a mobile version is part of our long-term roadmap. We’re exploring secure syncing and seamless writing across devices as a future Pro feature.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg text-blue-600">🌱 What’s the difference between the Community and future versions?</h2>
          <p>
            The Community version is free, open, and entirely local. Future versions may offer optional Pro features like encrypted sync,
            multi-device access, and advanced insights — but the core journaling experience will always stay distraction-free and privacy-first.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg text-blue-600">🤝 How do I contribute?</h2>
          <p>
            We'd love your help! You can <a href="https://github.com/kenlacroix/MoodHavenJournal-Community" className="text-blue-600 underline" target="_blank">visit our GitHub repo</a>, suggest features, report issues, or join the discussion on shaping the future of MoodHaven.
          </p>
        </div>

      </div>
    </div>
  );
}
