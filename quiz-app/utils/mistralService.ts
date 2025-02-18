import 'react-native-polyfill-globals/auto';
import { Mistral } from '@mistralai/mistralai';
import config from '../config';

export interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

export async function generateQuestions(subject: string, count: number): Promise<Question[]> {
  if (!config.MISTRAL_API_KEY) {
    throw new Error("MISTRAL_API_KEY is not defined");
  }
  
  const client = new Mistral({ apiKey: config.MISTRAL_API_KEY });

  try {
    const chatResponse = await client.chat.complete({
      model: 'mistral-small-latest',
      messages: [{
        role: 'user',
        content: `Generate ${count} multiple-choice questions about ${subject}. Return the output in JSON format like this: {"questions": [{"question": "Question text", "answers": ["A. Answer A", "B. Answer B", "C. Answer C", "D. Answer D"], "correctAnswer": "A"}]}`,
      }],
    });

    if (!chatResponse.choices || !chatResponse.choices[0]?.message?.content) {
      throw new Error("Invalid response from Mistral API");
    }

    let responseContent = (chatResponse.choices[0].message.content as string).trim();

    if (responseContent.startsWith("```json")) {
      responseContent = responseContent.replace(/^```json/, "").replace(/```$/, "").trim();
    }

    const result = JSON.parse(responseContent);

    if (!result.questions || !Array.isArray(result.questions)) {
      throw new Error("Unexpected JSON format from API");
    }

    return result.questions as Question[];
  } catch (error) {
    console.error("Error generating questions:", error);
    return [];
  }
}