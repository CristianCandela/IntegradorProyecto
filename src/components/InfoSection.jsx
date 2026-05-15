import React from 'react';

const InfoSection = ({ 
  badge, 
  titulo, 
  highlight, 
  parrafos, 
  imagen, 
  imageRight = true,
  stats = [] 
}) => {
  return (
    <section className="info-section py-5 position-relative overflow-hidden">
      <div className="container py-5">
        <div className={`row align-items-center g-5 ${imageRight ? '' : 'flex-row-reverse'}`}>
          
          {/* Contenido de Texto */}
          <div className="col-lg-6">
            <div className="info-content animate__animated animate__fadeIn">
              {badge && (
                <span className="badge bg-purple-soft text-violet-main mb-3 px-3 py-2 round-pill fw-bold">
                  {badge}
                </span>
              )}
              <h2 className="display-4 fw-bold text-indigo-deep mb-4">
                {titulo} <span className="text-gradient-primary">{highlight}</span>
              </h2>
              <div className="info-text-box">
                {parrafos.map((text, index) => (
                  <p key={index} className="lead-sm text-muted mb-4">
                    {text}
                  </p>
                ))}
              </div>
              
              {/* Stats dinámicos */}
              {stats.length > 0 && (
                <div className="mt-5 d-flex gap-4 align-items-center">
                  {stats.map((stat, i) => (
                    <React.Fragment key={i}>
                      <div className="info-stat">
                        <h3 className="fw-bold text-violet-main mb-0">{stat.value}</h3>
                        <small className="text-muted">{stat.label}</small>
                      </div>
                      {i < stats.length - 1 && <div className="divider-v"></div>}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Contenedor de Imagen */}
          <div className="col-lg-6">
            <div className="info-image-wrapper">
              <img 
                src={imagen} 
                alt={titulo} 
                className="img-fluid round-xl shadow-2xl main-info-img"
              />
              {/* Decoración flotante sutil */}
              <div className="info-glow-decoration"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InfoSection;
