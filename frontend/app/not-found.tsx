import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4 dark:bg-gray-900">
      <div className="max-w-md text-center space-y-4">
        <img src="/404.svg" width={300} height={300} alt="404 Error" className="mx-auto" />
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
          Oops! Page not found.
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow-sm transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
          prefetch={false}
        >
          Go back to the home
        </Link>
      </div>
    </div>
  )
}