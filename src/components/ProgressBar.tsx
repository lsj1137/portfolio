export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className=" fixed hidden md:block md:left-10 top-[50%] h-[50%] w-1 -translate-y-1/2 bg-gray-200 rounded-full">
      <div
        className={`absolute top-0 left-0 bg-yellow-200 w-1 rounded-full`}
        style={{
          height: `${progress * 100}%`,
        }}
      />
    </div>
  );
}
