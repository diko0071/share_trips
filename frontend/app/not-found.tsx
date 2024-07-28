import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="max-w-md text-center space-y-4">
        <img src="/404.svg" width={300} height={300} alt="404 Error" className="mx-auto" />
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
          Oops! Page not found.
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400">
          The page you're looking for doesn't exist.
        </p>
        <Button>
        <Link
          href="/"
          prefetch={false}
          >
            Go back to all trips!
          </Link>
        </Button>
      </div>
    </div>
  )
}