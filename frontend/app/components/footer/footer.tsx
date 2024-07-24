import { CircleUser, Menu, Package2, Search } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container max-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-start gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <Search className="w-8 h-8" />
            <span className="text-xl font-bold">Explore</span>
          </Link>
          <p className="text-muted-foreground">Discover the world's most breathtaking destinations.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              <Search className="w-6 h-6" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              <Package2 className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              <CircleUser className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium">Popular Destinations</h3>
          <ul className="grid gap-1">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                Paris, France
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                New York City, USA
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                Tokyo, Japan
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                Sydney, Australia
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                Rome, Italy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                London, UK
              </Link>
            </li>
          </ul>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium">Explore</h3>
          <ul className="grid gap-1">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                Destinations
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                Experiences
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                Deals
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                Travel Tips
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium">Contact</h3>
          <ul className="grid gap-1">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                <Search className="w-5 h-5 mr-2" />
                info@explore.com
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                <Search className="w-5 h-5 mr-2" />
                +1 (555) 123-4567
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                <Search className="w-5 h-5 mr-2" />
                123 Main St, Anytown USA
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container max-w-7xl mt-8 text-center text-sm text-muted-foreground">
        &copy; 2024 Explore. All rights reserved.
      </div>
    </footer>
  )
}