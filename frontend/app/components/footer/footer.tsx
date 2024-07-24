import { CircleUser, Menu, Package2, Search, Handshake, Mail } from "lucide-react"
import Link from "next/link"

export default function Footer() {
    return (
      <footer className="bg-muted py-12">
        <div className="max-w-full flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Link href="#" className="flex flex-col items-center gap-2" prefetch={false}>
              <Handshake className="w-5 h-5" />
              <span className="text-xl font-bold tracking-tighter">Trip Sharing</span>
            </Link>
            <p className="text-sm text-muted-foreground tracking-tighter">Share Experience, split the bills.</p>
          </div>
          <p className="text-sm text-muted-foreground tracking-tighter">dmitry@trip-sharing.com</p>
        </div>
      </footer>
    )
  }