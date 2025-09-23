const API_ENDPOINT = "https://api.heilou.ai/v1/generate";

export interface GenerateVideoParams {
  prompt: string;
  apiKey: string;
  model?: string;
  style?: string;
  script?: string;
}

export class HeilouService {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async generateVideo(params: GenerateVideoParams): Promise<string> {
    try {
      console.log("Generating video with Heilou AI using prompt:", params.prompt);
      
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept-Version': '1'
        },
        body: JSON.stringify({
          prompt: params.prompt,
          model: params.model || "heilou-video-v1",
          style: params.style || "educational",
          script: params.script
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Heilou API error:", errorData);
        throw new Error(errorData.message || errorData.error || "Failed to generate video");
      }
      
      const data = await response.json();
      console.log("Heilou API response:", data);
      
      // Extract video URL from response (adjust based on Heilou API response structure)
      if (!data.output || !data.output.video_url) {
        throw new Error("No video URL in response");
      }
      
      return data.output.video_url;
    } catch (error) {
      console.error("Error generating video with Heilou AI:", error);
      throw error;
    }
  }
}