import imageUs from "@/public/images/us.jpg";
import Image from "next/image";

const HomePageElement = () => {
  return (
    <div id="container" className="min-h-screen p-8 pt-16 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-6xl font-extrabold text-slate-700">
          <span className="block">Welcome to</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0d77e0] to-[#4bdb73]">
            Echo Interview!
          </span>
        </h1>
        <div className="flex justify-center w-full text-slate-900 opacity-50 text-[15px] leading-[1.9em] tracking-[0.03em] text-center px-8">
          This is your personal mock interviewer — listening, scoring, and
          coaching you instantly. Get real-time feedback on every answer and
          actionable tips to boost your performance. Practice now and get ready
          to ace your next interview!
        </div>
        <div className="flex w-full justify-center mt-4">
          <Image src={imageUs} alt="group" />
        </div>
      </div>
    </div>
  );
};

export default HomePageElement;
