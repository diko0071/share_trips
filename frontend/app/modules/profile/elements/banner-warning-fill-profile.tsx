import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"


export default function BannerWarningFillProfile() {
  return (
    <div className="bg-yellow-50 border-b border-yellow-200 px-2 py-2 sm:px-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-2 w-2 text-yellow-400 mr-2" />
          <span className="text-sm font-medium text-yellow-800">Complete your profile set up</span>
        </div>
        <Link
          href="/register"
          prefetch={false}
        >
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-yellow-50 border-yellow-50 hover:bg-yellow-100 hover:border-yellow-100"
          >
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}