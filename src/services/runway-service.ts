
const API_ENDPOINT = "https://api.runwayml.com/v2/generate";

export interface GenerateVideoParams {
  prompt: string;
  apiKey: string;
  model?: string;
  style?: string;
  script?: string;
}

export class RunwayService {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async generateVideo(params: GenerateVideoParams): Promise<string> {
    try {
      console.log("Generating video with Runway AI using prompt:", params.prompt);
      
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'API-Version': '2'
        },
        body: JSON.stringify({
          prompt: params.prompt,
          model: params.model || "stable-diffusion",
          style: params.style || "educational",
          script: params.script
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Runway API error:", errorData);
        throw new Error(errorData.message || "Failed to generate video");
      }
      
      const data = await response.json();
      console.log("Runway API response:", data);
      
      // Extract video URL from response (adjust based on Runway API response structure)
      if (!data.output || !data.output.video_url) {
        throw new Error("No video URL in response");
      }
      
      return data.output.video_url;
    } catch (error) {
      console.error("Error generating video with Runway AI:", error);
      throw error;
    }
  }
}
