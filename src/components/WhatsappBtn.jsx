export default function WhatsappBtn() {
  const phone = "51900000000"; // Cambia por tu número
  const msg = "Hola ProfeMatch, necesito ayuda con mi acceso.";
  
  return (
    <a 
      href={`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
    >
      <i className="bi bi-whatsapp"></i>
    </a>
  );
}