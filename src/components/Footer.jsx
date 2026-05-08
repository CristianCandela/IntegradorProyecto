import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFacebookF, 
  faXTwitter, 
  faInstagram, 
  faLinkedinIn 
} from "@fortawesome/free-brands-svg-icons";
import logoClaro from "../images/Logo1.png"; 

export default function Footer() {
  return (
    <footer className="footer-custom py-5">
      <div className="container text-center">
        
        {/* LOGO */}
        <div className="mb-4">
          <img src={logoClaro} alt="ProfeMatch Logo" height="50" />
        </div>

        {/* TEXTO ADAPTADO */}
        <p className="footer-text mx-auto mb-4">
          La plataforma líder para la conexión académica, permitiendo a estudiantes 
          encontrar al docente ideal mediante reseñas verificadas y un sistema 
          transparente de evaluación educativa.
        </p>

        {/* ICONOS DE REDES SOCIALES */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          {[
            { icon: faFacebookF, link: "https://facebook.com" },
            { icon: faXTwitter, link: "https://twitter.com" },
            { icon: faInstagram, link: "https://instagram.com" },
            { icon: faLinkedinIn, link: "https://linkedin.com" }
          ].map((social, index) => (
            <a 
              key={index}
              href={social.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon-btn"
            >
              <FontAwesomeIcon icon={social.icon} />
            </a>
          ))}
        </div>

        {/* COPYRIGHT */}
        <div className="footer-copy pt-4 border-top border-secondary border-opacity-25">
          <small>© 2026 ProfeMatch. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
}