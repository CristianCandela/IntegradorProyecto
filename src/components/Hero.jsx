

export default function Hero({ video, titulo, subtitulo, highlight }) {
  return (
    <section className="hero-section">
     
      <video autoPlay muted loop playsInline className="hero-video" key={video}>
        <source src={video} type="video/mp4" />
      </video>
      
      <div className="overlay"></div>
      
      <div className="container position-relative text-center">
        <span className="badge-custom">✨ La plataforma de confianza para estudiantes universitarios</span>
        <h1 className="display-3 fw-bold mt-4">
          {titulo} <span className="highlight">{highlight}</span>
        </h1>
        <p className="lead mx-auto mt-3" style={{ maxWidth: "600px", opacity: 0.9 }}>
          {subtitulo}
        </p>
      </div>
    </section>
  );
}