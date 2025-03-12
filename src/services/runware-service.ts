
const API_ENDPOINT = "https://api.runware.ai/v1";

export interface GenerateVideoParams {
  prompt: string;
  apiKey: string;
  duration?: number;
  style?: string;
  script?: string;
}

export class RunwareService {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async generateVideo(params: GenerateVideoParams): Promise<string> {
    try {
      console.log("Generating video with Runware AI using prompt:", params.prompt);
      
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            taskType: "authentication",
            apiKey: this.apiKey
          },
          {
            taskType: "videoGeneration",
            prompt: params.prompt,
            duration: params.duration || 60,
            style: params.style || "educational",
            script: params.script
          }
        ])
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Runware API error:", errorData);
        throw new Error(errorData.message || "Failed to generate video");
      }
      
      const data = await response.json();
      console.log("Runware API response:", data);
      
      // Extract video URL from response
      const videoTask = data.data.find((item: any) => item.taskType === "videoGeneration");
      if (!videoTask || !videoTask.videoURL) {
        throw new Error("No video URL in response");
      }
      
      return videoTask.videoURL;
    } catch (error) {
      console.error("Error generating video with Runware AI:", error);
      throw error;
    }
  }
}
