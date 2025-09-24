const API_BASE_URL = "https://api.aimlapi.com/v2";

export interface GenerateVideoParams {
  prompt: string;
  apiKey: string;
  model?: string;
  style?: string;
  script?: string;
}

export interface VideoResponse {
  id: string;
  videoId: string;
  task: {
    batchID: string;
    videoIDs: string[];
  };
  replyUrl?: string;
  replyRef?: string;
}

export interface VideoStatus {
  id: string;
  desc: string;
  coverURL?: string;
  videoURL?: string;
  downloadURL?: string;
  status: number;
  statusLabel: string;
  statusFinal: boolean;
  percent: number;
  width?: number;
  height?: number;
  videoId: string;
}

export class MinimaxService {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async generateVideo(params: GenerateVideoParams): Promise<string> {
    try {
      console.log("🌐 AIML API (MiniMax): Generating video with prompt:", params.prompt);
      console.log("🔑 Using API key:", params.apiKey ? `${params.apiKey.substring(0, 8)}...` : 'MISSING');
      
      // Step 1: Create generation task (AIML API)
      console.log("📡 Creating generation task on AIML API...");
      const generationResponse = await fetch(`${API_BASE_URL}/generate/video/minimax/generation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: params.model || "minimax/hailuo-02",
          prompt: params.prompt
        })
      });
      
      console.log("📈 Response status:", generationResponse.status);
      if (!generationResponse.ok) {
        const errorData = await generationResponse.json().catch(() => ({}));
        console.error("❌ AIML API generation error:", errorData);
        throw new Error((errorData as any).message || (errorData as any).error || "Failed to start video generation");
      }
      
      const generationData: any = await generationResponse.json();
      console.log("📋 AIML generation response:", generationData);
      
      const generationId = generationData.generation_id;
      if (!generationId) {
        throw new Error("No generation ID received");
      }
      
      // Step 2: Poll for results
      console.log("⏳ Polling for video generation results...");
      return await this.pollForResults(generationId);
      
    } catch (error) {
      console.error("Error generating video with AIML API (MiniMax):", error);
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
          const errorData = await response.json().catch(() => ({}));
          throw new Error((errorData as any).error || (errorData as any).message || `HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data: any = await response.json();
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