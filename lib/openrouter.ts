const API_KEY = process.env.OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function generateChapterContent({
  thesisTitle,
  thesisStatement,
  bibliography,
  chapterNumber,
  chapterTitle,
  centralIdea,
}) {
  const prompt = `
    Escribe el capítulo ${chapterNumber} de una tesis con el título "${thesisTitle}".
    Enunciado de la tesis: ${thesisStatement}
    Título del capítulo: ${chapterTitle}
    Idea central del capítulo: ${centralIdea}

    El capítulo debe tener cinco partes, cada una con nueve párrafos.
    Cada párrafo debe ser largo y rico en contenido, citando autores de la siguiente bibliografía:
    ${bibliography}

    Por favor, genera el contenido del capítulo siguiendo estas instrucciones.
  `;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate chapter content');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}