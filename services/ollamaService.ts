import axios from "axios";

const ollamaApiUrl = `${process.env.INDEX_API_BASE_URI}/ollama/api/generate`;

const getResponseFromOllama = async (data: object) => {
  try {
    const response = await axios.post(ollamaApiUrl, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching response from Ollama:", error);
    return null;
  }
};

export default getResponseFromOllama;
