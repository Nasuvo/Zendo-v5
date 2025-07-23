const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { GoogleGenerativeAI } = require("@google/generative-ai");

admin.initializeApp();

const genAI = new GoogleGenerativeAI("AIzaSyAUC-as5SPpYbwdFELSCR9u1DdDOv3mrlk");

exports.searchProperties = functions.https.onCall(async (data, context) => {
  const query = data.query;

  if (!query) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with one argument 'query' containing the search query."
    );
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    You are a real estate search assistant. A user has provided the following natural language search query: "${query}".
    Convert this query into a Firestore-compatible filter object. The filter object should have the following properties, if they can be inferred from the query:
    - "propertyType": a string (e.g., "house", "apartment", "townhouse")
    - "minPrice": a number
    - "maxPrice": a number
    - "minBedrooms": a number
    - "maxBedrooms": a number
    - "minBathrooms": a number
    - "maxBathrooms": a number
    - "features": an array of strings (e.g., "pool", "garage", "garden")
    - "suburb": a string
    - "city": a string
    - "state": a string
    Return the filter object as a JSON string. If a value cannot be inferred, do not include the key in the object.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred while processing your request."
    );
  }
});
