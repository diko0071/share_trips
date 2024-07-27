'use client'

import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Why this tool exists?</h1>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                Discover the story behind our company and how we've grown to become a leading provider of innovative
                solutions.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 relative">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Humble Beginnings</h2>
                  <p className="text-muted-foreground md:text-lg">
                    Our story began in a small garage, where two passionate individuals set out to revolutionize the
                    industry. With limited resources but an abundance of determination, they built the foundation for
                    what would become a thriving enterprise.
                  </p>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Humble Beginnings"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
            </div>
            <div className="absolute lg:inset-y-0 lg:left-1/2 lg:-translate-x-1/2 lg:w-px inset-x-0 bottom-0 h-px lg:h-auto w-full bg-muted-foreground/20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 py-2 rounded-full border">
              <span className="font-bold">2019</span>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 relative">
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Rapid Growth"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Rapid Growth</h2>
                  <p className="text-muted-foreground md:text-lg">
                    As our innovative solutions gained traction, we experienced rapid growth, expanding our team and
                    opening new offices around the world. This period of exponential development allowed us to reach
                    more customers and make a greater impact in the industry.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute lg:inset-y-0 lg:left-1/2 lg:-translate-x-1/2 lg:w-px inset-x-0 bottom-0 h-px lg:h-auto w-full bg-muted-foreground/20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 py-2 rounded-full border">
              <span className="font-bold">2021</span>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 relative">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Continuous Innovation</h2>
                  <p className="text-muted-foreground md:text-lg">
                    Driven by our passion for innovation, we have consistently pushed the boundaries of what's possible.
                    By investing in research and development, we've been able to introduce groundbreaking products and
                    services that have revolutionized the industry.
                  </p>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Continuous Innovation"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 py-2 rounded-full border">
              <span className="font-bold">2024</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}