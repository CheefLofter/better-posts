import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-700">
      <div className="relative h-[700px] w-[700px]">
        
        <Image
          src="/backgrounds/background-2.jpg"
          alt="Background"
          fill
          className="object-cover"
        />

        
        <div className="absolute inset-0 z-10 flex items-center justify-center p-2">
          <Image
            src="/image.png"
            alt="Top image"
            width={650}
            height={650}
            className="object-contain rounded-3xl shadow-xl/60 "
          />
        </div>
      </div>
    </div>
  );
}