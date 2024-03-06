import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function Error() {
  return (
    <div className="h-screen flex items-center justify-center flex-wrap">
      <Card className="w-full max-w-sm mx-auto pt-4">
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="space-y-2 text-center">
            <p className="text-3xl font-semibold">
              Oops! Something went wrong.
            </p>
            <p className="text-sm text-gray-500">
              We apologies for the inconvenience. An error has occurred. Please
              try again later.
            </p>
          </div>
          <div className="w-full">
            <Link
              className="w-full inline-block text-center rounded-md border border-gray-200 bg-white text-sm py-2 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="/"
            >
              Go Back
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
