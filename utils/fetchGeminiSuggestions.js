export async function getDishSuggestions(groceryList, apiKey) {
  const prompt = `Suggest 5 dishes I can cook using these groceries: ${groceryList.join(", ")}. Just return dish names, no explanation.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return "Error: Failed to fetch suggestions.";
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No suggestions found.";
  } catch (error) {
    console.error("Network error:", error);
    return "Error: Network issue.";
  }
}

