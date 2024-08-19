import Image from "next/image";

export default function TemporarilyStop() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src="/heart.svg" alt="Temporarily Stop" width={250} height={250} />
      <h1 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-3xl lg:text-3xl">
        We are taking a short break:(
      </h1>
      <p className="mt-4 text-center tracking-tighter text-gray-7000">
        Please check back soon!
      </p>
    </div>
  );
}