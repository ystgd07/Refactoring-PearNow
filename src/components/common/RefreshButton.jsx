export default function RefreshButton({ onClick, isLoading }) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="flex items-center px-3 py-1.5 text-sm text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
    >
      <svg
        className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      {isLoading ? '새로고침 중...' : '새로고침'}
    </button>
  );
}
