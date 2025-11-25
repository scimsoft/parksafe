import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Listing } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const modelId = "gemini-2.5-flash";

/**
 * Generates a compelling listing description based on raw features.
 */
export const generateListingDescription = async (
  location: string,
  type: string,
  features: string[],
  vibe: string
): Promise<string> => {
  if (!apiKey) {
    console.warn("No API Key found");
    return "API Key missing. Please provide a description manually.";
  }

  const prompt = `
    You are a professional copywriter for a premium camping and parking rental site (like Airbnb for campervans).
    Write a short, inviting, and warm description (max 80 words) for a parking space with the following details:
    - Location: ${location}
    - Type: ${type}
    - Key Features: ${features.join(', ')}
    - Desired Vibe: ${vibe}

    Do not use hashtags. Focus on the experience.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "Could not generate description.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating description. Please try again.";
  }
};

/**
 * Smart Search: Uses Gemini to rank listings based on natural language query.
 * Returns a list of Listing IDs.
 */
export const searchListingsWithAI = async (
  query: string,
  allListings: Listing[]
): Promise<string[]> => {
  if (!apiKey) return allListings.map(l => l.id);

  // Create a simplified version of listings to save tokens and reduce complexity
  const simplifiedListings = allListings.map(l => ({
    id: l.id,
    desc: `${l.title} - ${l.description} - ${l.location} - ${l.type} - Amenities: ${l.amenities.join(', ')}`
  }));

  const prompt = `
    You are a helpful travel assistant for campervan owners.
    The user is searching for a parking spot with this query: "${query}"

    Here is the database of available spots:
    ${JSON.stringify(simplifiedListings)}

    Rank the spots based on how well they match the user's intent.
    Return a JSON object containing an array of IDs in order of relevance.
    Only return the JSON.
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      ids: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Ordered list of matching listing IDs"
      }
    },
    required: ["ids"]
  };

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result.ids || [];
  } catch (error) {
    console.error("Gemini Search Error:", error);
    // Fallback: simple text match
    const lowerQuery = query.toLowerCase();
    return allListings
      .filter(l =>
        l.title.toLowerCase().includes(lowerQuery) ||
        l.description.toLowerCase().includes(lowerQuery) ||
        l.location.toLowerCase().includes(lowerQuery)
      )
      .map(l => l.id);
  }
};
