const API_BASE_URL = "https://api.useapi.net/v1/minimax";

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
      console.log("🌐 MiniMax API: Generating video with prompt:", params.prompt);
      console.log("🔑 Using API key:", params.apiKey ? `${params.apiKey.substring(0, 8)}...` : 'MISSING');
      
      // Step 1: Create video generation task
      console.log("📡 Making request to MiniMax API...");
      const generationResponse = await fetch(`${API_BASE_URL}/videos/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          prompt: params.prompt,
          model: params.model || "T2V-01",
          promptOptimization: true
        })
      });
      
      console.log("📈 Response status:", generationResponse.status);
      console.log("📊 Response headers:", Object.fromEntries(generationResponse.headers.entries()));
      
      if (!generationResponse.ok) {
        const errorData = await generationResponse.json();
        console.error("❌ MiniMax API generation error:", errorData);
        throw new Error(errorData.error || "Failed to start video generation");
      }
      
      const generationData: VideoResponse = await generationResponse.json();
      console.log("📋 MiniMax generation response:", generationData);
      
      const videoId = generationData.videoId;
      if (!videoId) {
        throw new Error("No video ID received");
      }
      
      // Step 2: Poll for results
      console.log("Polling for video generation results...");
      return await this.pollForResults(videoId);
      
    } catch (error) {
      console.error("Error generating video with MiniMax API:", error);
      throw error;
    }
  }

  private async pollForResults(videoId: string): Promise<string> {
    const maxAttempts = 60; // Max 10 minutes (60 * 10 seconds)
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      try {
        const response = await fetch(`${API_BASE_URL}/videos/${videoId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data: VideoStatus = await response.json();
        console.log(`Poll attempt ${attempts + 1}:`, data);
        
        // Status 2 means completed
        if (data.status === 2 && data.statusFinal && data.videoURL) {
          console.log("Video generation completed!");
          // Use downloadURL if available (for paid accounts without watermark), otherwise use videoURL
          return data.downloadURL || data.videoURL;
        } else if (data.statusLabel.toLowerCase().includes('failed') || data.statusLabel.toLowerCase().includes('error')) {
          throw new Error(`Video generation failed: ${data.statusLabel}`);
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