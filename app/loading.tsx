export default function LoadingPage() {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <div className="h-8 w-8 mx-auto border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
          </div>
          <p className="text-sm text-gray-500">Loading Dudefinder magic...</p>
        </div>
      </div>
    );
  }