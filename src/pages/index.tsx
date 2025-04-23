import TypingHome from "@/components/typing";
import Image from "next/image";

export default function Home() {

  return (
    <div className="flex flex-col justify-center items-center h-[100dvh]">
      <Image src={'/next.svg'} width={500} height={500} alt="NextJS" />
      <div className="mt-2 text-lg">
        <TypingHome />
      </div>
    </div>
  );
}
