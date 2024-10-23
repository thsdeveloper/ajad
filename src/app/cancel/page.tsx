export default function CancelPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                <div className="mb-4 text-red-500">
                    <svg
                        className="w-16 h-16 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Pagamento não Concluído
                </h1>
                <p className="text-gray-600 mb-6">
                    O processo de pagamento foi cancelado ou não foi concluído.
                </p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                    Tentar Novamente
                </button>
            </div>
        </div>
    );
}