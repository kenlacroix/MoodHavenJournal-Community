interface MuseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MuseModal({ isOpen, onClose }: MuseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          aria-label="Close Muse Modal"
        >
          ✖️
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Muse Companion
        </h2>
        <div className="flex flex-col space-y-4">
          <button className="bg-blue-100 p-3 rounded hover:bg-blue-200 transition">
            Reflect
          </button>
          <button className="bg-green-100 p-3 rounded hover:bg-green-200 transition">
            Center
          </button>
          <button className="bg-yellow-100 p-3 rounded hover:bg-yellow-200 transition">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
