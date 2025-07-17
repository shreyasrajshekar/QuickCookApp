export async function getDishRecipe(dishName) {
  const prompt = `Give a simple recipe for the dish "${dishName}" using common ingredients.`;
  const apiKey = 'AIzaSyD3WzjHHxqT5j9kgJ1B2ZU0NbJ6ib-BC5o'; 

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No recipe found.";
}