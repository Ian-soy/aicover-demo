import axios from "axios";

const ollamaApiUrl = "http://localhost:3001/api/generate";

const getResponseFromOllama = async (inputData: object) => {
  try {
    const response = await axios.post(ollamaApiUrl, inputData);
    return response.data;
  } catch (error) {
    console.error("Error fetching response from Ollama:", error);
    return null;
  }
};

export default getResponseFromOllama;
