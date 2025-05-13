export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button skeleton */}
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-6 animate-pulse"></div>
      
      {/* Pokemon detail card skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8 animate-pulse">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center">
            {/* Pokemon image skeleton */}
            <div className="w-full md:w-1/3 h-64 md:h-80 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            
            {/* Pokemon info skeleton */}
            <div className="md:w-2/3 md:pl-8 mt-6 md:mt-0">
              <div className="flex items-center mb-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-40 mr-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
              
              <div className="flex gap-2 mb-6">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16 mb-2"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-12"></div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16 mb-2"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats and evolution skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Stats skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-4"></div>
          
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full bg-gray-300 dark:bg-gray-600"
                    style={{ width: `${Math.random() * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Evolution skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-36 mb-4"></div>
          
          <div className="flex flex-wrap justify-center items-center gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
                    <div className="mt-2 text-center">
                      <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-10 mx-auto mb-1"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16 mx-auto"></div>
                    </div>
                  </div>
                </div>
                
                {i < 2 && (
                  <div className="mx-2">
                    <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
