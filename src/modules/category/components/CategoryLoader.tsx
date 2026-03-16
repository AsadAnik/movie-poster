export const CategoryLoader = () => {
  return (
    <div className="fixed inset-0 bg-[#050811] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-b-2 border-primary-500 rounded-full animate-spin"></div>
        <p className="text-primary-400 font-bold tracking-[0.3em] uppercase animate-pulse">Scanning Archive</p>
      </div>
    </div>
  );
};
