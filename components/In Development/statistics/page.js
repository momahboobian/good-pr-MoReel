import ComingSoon from "@components/In Development/ComingSoon";
import Sidebar from "@components/Sidebar/Sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-between p-0">
      <div className="flex border-neutral-800  overflow-hidden rounded-lg">
        <Sidebar />
        <div className="flex flex-col items-center justify-center w-screen bg-[#070E0E] p-10">
          <div className="flex flex-col items-center justify-center text-white  space-y-10">
            <p className="text-lg mb-4 justify-cestanter">
              ---- Our website is under construction ----
            </p>
            <h1 className="text-3xl font-bold mb-4">Something Big is Coming</h1>
            <h1 className="text-2xl">
              Wait! We are launching soon with amazing features!
            </h1>
            <div className="flex items-center mt-4">
              <input
                type="email"
                className="bg-gray-800 text-white rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email, please"
              />
              <a className="bg-[#37BCBA] text-gray-900 rounded-r-md px-4 py-2 ml-2 focus:outline-none hover:bg-blue-600">
                Notify Me
              </a>
            </div>

            <div className="flex flex-col items-center justify-center space-y-10">
              <ComingSoon />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
