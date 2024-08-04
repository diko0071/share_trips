import { CircleUser, Menu, Package2, Search, Handshake, Mail } from "lucide-react"
import Link from "next/link"

export default function Footer() {
    return (
      <footer className="bg-muted py-12">
        <div className="max-w-full flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Link href="#" className="flex flex-col items-center gap-2" prefetch={false}>
              <img src="/logo.svg" alt="Logo" className="h-10 w-13" /> {/* Added logo.svg */}
            </Link>
            <p className="text-sm text-muted-foreground tracking-tighter">Participate. Meet. Split bills.</p>
          </div>
          <p className="text-sm text-muted-foreground tracking-tighter">dmitry@sharetrips.app</p>
        </div>
      </footer>
    )
  }