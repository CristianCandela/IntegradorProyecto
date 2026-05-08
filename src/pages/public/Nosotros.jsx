import Hero from "../../components/Hero";
import heroVideo from "../../images/hero.mp4";

export default function Nosotros() {
  return (
    <main>
        <Hero 
              video={heroVideo}
              titulo="Elige al"
              highlight="profesor perfecto"
              subtitulo="Reseñas verificadas y comparativas para tomar las mejores decisiones académicas con ProfeMatch."
        />
        <section style={{ paddingTop: "140px" }} className="container text-center animate__animated animate__fadeIn">
        <div className="row mt-5 g-4">
        </div>
        </section>
    </main>
    
  );
}