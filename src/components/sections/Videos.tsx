const videos = [
  { id: "RqUYw2_Hjco", title: "Caroline Jones -- Video 1" },
  { id: "gb3bbkFsYSI", title: "Caroline Jones -- Video 2" },
  { id: "IyPD6AnWlRg", title: "Caroline Jones -- Video 3" },
  { id: "pkCzUqWKK5o", title: "Caroline Jones -- Video 4" },
];

export default function Videos() {
  return (
    <section
      id="videos"
      aria-label="Videos"
      data-bg="dark"
      className="relative bg-fixed bg-cover bg-center px-6 py-20 md:py-28"
      style={{
        backgroundImage:
          "url(/backgrounds/CarolineJones_DesktopBackground_1.jpg)",
      }}
    >
      <div className="absolute inset-0 bg-[#5D3635]/70" />

      <div className="relative z-10">
        <h2 className="sr-only">Videos</h2>
        <p className="mb-14 text-center font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.25em] text-[#DDE2CD] md:mb-20" aria-hidden="true">
          Videos
        </p>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          {videos.map((video) => (
            <div key={video.id} className="relative w-full aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                loading="lazy"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
