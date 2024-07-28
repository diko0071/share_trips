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
                I wanted to create something that helps me find a new friend and people during my nomad life: share experience, emotions, and maybe even split the bills on expensive Airbnb! 
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 relative">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Became a nomad</h2>
                  <p className="text-muted-foreground md:text-lg">
                  I left my home country more than 2.5 years ago. I haven't lived at the same city for more than 2 months in the past few years. Here how the nomand path has started.
                  </p>
                </div>
              </div>
              <img
                src="/view.png"
                width="550"
                height="310"
                alt="Humble Beginnings"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
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
            <img
                src="/airbnb_2.png"
                alt="Rapid Growth"
                className="mx-auto w-full h-auto max-w-full rounded-xl object-cover object-center"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Airbnb as a home</h2>
                  <p className="text-muted-foreground md:text-lg">
                  Every 2 months it's a new Airbnb. Over 30+ apartments in the last 2 years. Because I travel alone, it is very difficult to make new friends, social circle and generally find my own company. Especially for introverts who don't really want to go looking for a hangout. 
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute lg:inset-y-0 lg:left-1/2 lg:-translate-x-1/2 lg:w-px inset-x-0 bottom-0 h-px lg:h-auto w-full bg-muted-foreground/20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 py-2 rounded-full border">
              <span className="font-bold">2023</span>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 relative">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Desire to share experience</h2>
                  <p className="text-muted-foreground md:text-lg">
                    This year I really want not just to travel, but to meet, communicate and share experince with other
                    people who want the same. And want give a change to do the same for everyone. Because, it is really cool when you in the new country / citry and able to find someone with similar interests, isn't it? 
                  </p>
                </div>
              </div>
              <img
                src="/text_and_logo.png"
                width="550"
                height="310"
                alt="Continuous Innovation"
                className="mx-auto w-full h-auto max-w-full rounded-xl object-cover object-center"
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