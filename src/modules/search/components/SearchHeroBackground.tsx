export const SearchHeroBackground = () => {
  return (
    <>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/bg-cover.avif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      {/* Dark overlays for readability */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background/40 z-0" />
    </>
  );
};
