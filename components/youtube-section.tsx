"use client"

const manualVideos = [
  {
    id: "1",
    title: "SIP will not Work | Hard Truth",
    description: "Most SIPs fail due to behavioral mistakes, not market returns.",
    videoId: "-2Wz5oeMFNo",
    thumbnail: "https://img.youtube.com/vi/-2Wz5oeMFNo/maxresdefault.jpg",
  },
  {
    id: "2",
    title: "Smallcap Funds Underperform | Shocking Data",
    description: "Why midcap funds beat smallcaps in India over the long term.",
    videoId: "qCbxqPuUX7A",
    thumbnail: "https://img.youtube.com/vi/qCbxqPuUX7A/maxresdefault.jpg",
  },
  {
    id: "3",
    title: "12% Return in Mutual Funds is a lie??",
    description: "The real truth behind 12% returns and market volatility.",
    videoId: "BZ8ruGOjCVA",
    thumbnail: "https://img.youtube.com/vi/BZ8ruGOjCVA/maxresdefault.jpg",
  },
  {
    id: "4",
    title: "Top 5 Liquid Funds 2025 | Step-by-Step Selection",
    description: "A risk-first framework for selecting the right liquid funds.",
    videoId: "p8mN-Gr8vSE",
    thumbnail: "https://img.youtube.com/vi/p8mN-Gr8vSE/maxresdefault.jpg",
  },
]

export function YoutubeSection() {
  return (
    <section id="videos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-teal-600 mb-2">VIDEO TUTORIALS</h2>
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Learn From Our Experts</h3>
          <p className="text-lg text-gray-600">
            Watch our comprehensive video guides on financial planning and investing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {manualVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-video bg-black relative group cursor-pointer"
              >
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 flex items-center justify-center transition-colors">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h4>
                <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/@mindrupee_yt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Subscribe to Our Channel
          </a>
        </div>
      </div>
    </section>
  )
}
