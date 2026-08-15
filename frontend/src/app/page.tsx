import Dashboard from "@/components/Dashboard";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-8 bg-white">
      <h1 className="text-4xl font-bold text-center mb-8 text-black">RailGuard AI - Digital Twin</h1>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto h-[600px]">
        <div className="w-full lg:w-1/3 h-full">
          <Dashboard />
        </div>
        <div className="w-full lg:w-2/3 h-full relative z-0">
          <Map />
        </div>
      </div>
    </main>
  );
}
