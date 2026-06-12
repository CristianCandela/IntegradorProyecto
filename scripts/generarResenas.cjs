const fs = require('fs');
const path = require('path');

const filePath = path.join('d:', 'ProyectosUni', 'Integrador', 'IntegradorProyecto', 'src', 'data', 'profesoresData.js');
let content = fs.readFileSync(filePath, 'utf8');

const match = content.match(/export const profesoresData = (\[[\s\S]*\]);/);
if (!match) {
  console.error('Could not find profesoresData array');
  process.exit(1);
}

let arrayStr = match[1];
let array;
try {
  eval('array = ' + arrayStr);
} catch (e) {
  console.error('Eval failed', e);
  process.exit(1);
}

const comentariosPositivos = [
  'Excelente profe, sus clases son muy claras y siempre está dispuesto a ayudar.',
  'El profe es chévere, te resuelve las dudas sin problema.',
  'Su metodología es increíble. Hace que la clase sea dinámica y entretenida.',
  'Muy buena onda y dedicado. Resuelve todo lo que le preguntes.',
  'El mejor profe que he tenido. Se nota que sabe un montón.',
  'Sus materiales de estudio son súper completos, me salvaron en el parcial.',
  'Inspira confianza y explica con mucha paciencia.',
  'Excelente dominio del tema y se le entiende todo clarito.',
  'Es re puntual y las clases se pasan volando.',
  'Clases 10/10. Muy recomendado si quieres aprender de verdad.',
  'El profe domina a la perfección, además sus ejemplos ayudan bastante.',
  'Buenísimo, siempre llega a tiempo y explica con ganas.'
];

const comentariosNeutros = [
  'El profe explica bien pero a veces va muy rápido.',
  'Es exigente, no te regala nada pero aprendes bastante.',
  'El profe es chévere pero a veces termina la clase antes de tiempo.',
  'Las clases son buenas, aunque podría ir más despacio en los temas trancas.',
  'Buen profe, pero a veces demora en responder el chat.',
  'Muy pro, pero me gustaría que ponga más ejemplos.',
  'Sabe mucho, pero a veces es difícil seguirle el ritmo.',
  'El contenido sirve, pero la exigencia es fuerte.',
  'Se nota que sabe su tema pero cuesta entenderle al principio.',
  'A veces te marea un poco con tanta teoría, pero si le preguntas te aclara.'
];

const comentariosCriticos = [
  'A veces tarda en responder los mensajes pero la clase en sí está bien.',
  'Domina el tema pero es muy exigente con los tiempos, casi no hay margen.',
  'Siento que le falta paciencia si no entiendes a la primera.',
  'La clase es full teoría, faltan más casos prácticos.',
  'Sus horarios son medio pesados, cuesta cuadrar.',
  'Podría mejorar cómo explica, a veces da muchas vueltas.',
  'El profe sabe, pero no se le entiende bien cuando va rápido.',
  'No me gustó tanto su método, muy estricto con la asistencia y entregas.',
  'Pésimo para contestar correos, tienes que insistirle un montón.'
];

function getRandomDate() {
  const baseDate = new Date('2026-06-12T10:00:00');
  const daysToSubtract = Math.floor(Math.random() * 20);
  baseDate.setDate(baseDate.getDate() - daysToSubtract);
  return baseDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function getRandomItems(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}


const desiredRatings = [
  3.2, 3.4, 3.6, 3.8,
  4.0, 4.1, 4.2, 4.3, 4.3, 4.4,
  4.6, 4.7, 4.8, 4.9, 4.9, 5.0
];
// Shuffle 
desiredRatings.sort(() => 0.5 - Math.random());

array = array.map((p, i) => {
  if (i < desiredRatings.length) {
    p.rating = desiredRatings[i];
  }

  const rating = p.rating;
  let pool = [];

  if (rating >= 4.5) {

    pool = [...getRandomItems(comentariosPositivos, 2), ...getRandomItems(comentariosNeutros, 1)];
  } else if (rating >= 3.9) {

    pool = [...getRandomItems(comentariosPositivos, 1), ...getRandomItems(comentariosNeutros, 2)];
  } else {

    pool = [...getRandomItems(comentariosNeutros, 1), ...getRandomItems(comentariosCriticos, 2)];
  }


  pool = pool.sort(() => 0.5 - Math.random());


  p.criteriosEvaluacion = {
    Puntualidad: Math.min(5, Math.max(1, Number((rating + (Math.random() * 0.6 - 0.3)).toFixed(1)))),
    Claridad: Math.min(5, Math.max(1, Number((rating + (Math.random() * 0.6 - 0.3)).toFixed(1)))),
    Dominio: Math.min(5, Math.max(1, Number((rating + 0.2).toFixed(1)))),
    Profesionalismo: Math.min(5, Math.max(1, Number((rating + 0.1).toFixed(1)))),
    Exigencia: Number((p.dificultad / 2).toFixed(1)),
    Disponibilidad: rating >= 4.5 ? 4.8 : (rating >= 3.9 ? 3.8 : 2.9)
  };

  p.resenasDestacadas = pool.map((comentario) => {
    let puntuaciones = { ...p.criteriosEvaluacion };

    if (comentariosCriticos.includes(comentario)) {
      puntuaciones.Puntualidad = Math.max(1, Number((puntuaciones.Puntualidad - 0.8).toFixed(1)));
      puntuaciones.Disponibilidad = Math.max(1, Number((puntuaciones.Disponibilidad - 1).toFixed(1)));
      puntuaciones.Claridad = Math.max(1, Number((puntuaciones.Claridad - 0.5).toFixed(1)));
    } else if (comentariosPositivos.includes(comentario)) {
      puntuaciones.Claridad = Math.min(5, Number((puntuaciones.Claridad + 0.5).toFixed(1)));
    }

    return {
      estudiante: 'Anónimo',
      curso: p.curso,
      fecha: getRandomDate(),
      puntuaciones: puntuaciones,
      comentario: comentario
    };
  });

  return p;
});

const newArrayStr = JSON.stringify(array, null, 2);
content = content.replace(match[1], newArrayStr);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated reseñas and ratings in profesoresData.js');
