import React from 'react';
import { Link } from 'react-router-dom';

const CtaFinal = () => {
  return (
    <section className="cta-final-section">
      <div className="cta-gradient-card p-5 text-center position-relative overflow-hidden">
       
        <div className="cta-blur-blob"></div>
        
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <h2 className="display-5 fw-bold text-white mb-3">
            Empieza a tomar mejores <br className="d-none d-md-block" /> decisiones académicas hoy
          </h2>
          <p className="text-white opacity-90 lead mb-5 mx-auto" style={{ maxWidth: '700px' }}>
            Únete a la comunidad estudiantil que está transformando la forma de elegir docentes universitarios.
          </p>
          
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Link to="/login" className="text-decoration-none">
              <button className="btn-cta-primary hover-lift">
                Iniciar Sesión
              </button>
            </Link>
            
            <Link to="/registro" className="text-decoration-none">
              <button className="btn-cta-outline hover-lift">
                Registrarme
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaFinal;