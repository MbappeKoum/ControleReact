export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pokédex</h1>
      
      {/* Skeleton for filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/5 mb-2"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Skeleton for Pokemon count */}
      <div className="mb-4">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
      </div>
      
      {/* Skeleton for Pokemon grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="p-4 flex flex-col items-center">
              <div className="w-40 h-40 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="mt-4 text-center w-full">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto mb-2"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto mb-2"></div>
                <div className="flex gap-2 justify-center">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
