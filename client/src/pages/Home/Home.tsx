import { Props } from "./types/Props";

export default function Home({}: Props) {
  return (
    <section className="w-full h-screen flex items-center justify-center flex-col px-4">
      <div className="text-center flex items-center gap-2 flex-wrap">
        <img
          src="/tanstack.webp"
          alt="tanstack"
          className="w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-300 hover:drop-shadow-lg hover:scale-110"
        />

        <p className="text-3xl md:text-4xl font-bold">+</p>

        <img
          src="/vite.svg"
          alt="vite"
          className="w-16 h-16 md:w-20 md:h-20 transition-all duration-300 hover:drop-shadow-lg hover:scale-110"
        />

        <p className="text-3xl md:text-4xl font-bold">+</p>

        <img
          src="/react.svg"
          alt="react"
          className="w-24 h-24 md:w-36 md:h-36 transition-all duration-300 hover:drop-shadow-lg hover:scale-110"
        />

        <p className="text-3xl md:text-4xl font-bold">+</p>

        <img
          src="/Typescript.png"
          alt="typescript"
          className="w-16 h-16 md:w-20 md:h-20 transition-all duration-300 hover:drop-shadow-lg hover:scale-110"
        />
      </div>

      <div className="mt-6 text-center">
        <p className="text-xl md:text-2xl font-semibold text-gray-200">
          TanStack Router with Vite
        </p>
        <p className="text-base md:text-lg text-gray-300">
          Modern and scalable routing for React applications
        </p>
        <p>File based Routing SSR with DevTools</p>
        <p className="mt-6">Start by creating your first route at</p>
        <p className="mt-2 p-3 bg-gray-800 rounded-md">
          ./src/routes/index.lazy.tsx
        </p>
      </div>
    </section>
  );
}
