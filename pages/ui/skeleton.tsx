const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


export function CardSkeleton() {
    return (
      <div
        className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
      >
        <div className="flex p-4">
          <div className="w-5 h-5 bg-gray-200 rounded-md" />
          <div className="w-16 h-6 ml-2 text-sm font-medium bg-gray-200 rounded-md" />
        </div>
        <div className="flex items-center justify-center px-4 py-8 truncate bg-white rounded-xl">
          <div className="w-20 bg-gray-200 rounded-md h-7" />
        </div>
      </div>
    );
  }
export default function DashboardSkeleton() {
    return (
      <>
        <div
          className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </>
    );
  }