const API_BASE_URL = "https://api.aimlapi.com/v2";

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
      console.log("Generating video with AIML API using prompt:", params.prompt);
      
      // Step 1: Create generation task
      const generationResponse = await fetch(`${API_BASE_URL}/generate/video/minimax/generation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: "minimax/hailuo-02",
          prompt: params.prompt
        })
      });
      
      if (!generationResponse.ok) {
        const errorData = await generationResponse.json();
        console.error("AIML API generation error:", errorData);
        throw new Error(errorData.message || errorData.error || "Failed to start video generation");
      }
      
      const generationData = await generationResponse.json();
      console.log("AIML generation response:", generationData);
      
      const generationId = generationData.generation_id;
      if (!generationId) {
        throw new Error("No generation ID received");
      }
      
      // Step 2: Poll for results
      console.log("Polling for video generation results...");
      return await this.pollForResults(generationId);
      
    } catch (error) {
      console.error("Error generating video with AIML API:", error);
      throw error;
    }
  }

  private async pollForResults(generationId: string): Promise<string> {
    const maxAttempts = 60; // Max 10 minutes (60 * 10 seconds)
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      try {
        const response = await fetch(`${API_BASE_URL}/generate/video/minimax/generation?generation_id=${generationId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log(`Poll attempt ${attempts + 1}:`, data);
        
        if (data.status === 'completed' && data.video_url) {
          console.log("Video generation completed!");
          return data.video_url;
        } else if (data.status === 'failed') {
          throw new Error(data.error || "Video generation failed");
        }
        
        // Wait 10 seconds before next poll
        await new Promise(resolve => setTimeout(resolve, 10000));
        attempts++;
        
      } catch (error) {
        console.error("Error polling for results:", error);
        throw error;
      }
    }
    
    throw new Error("Video generation timed out");
  }
}