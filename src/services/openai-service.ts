import OpenAI from 'openai';

export class OpenAIService {
  private openai: OpenAI | null = null;

  constructor(apiKey?: string) {
    if (apiKey) {
      this.openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });
    }
  }

  setApiKey(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async generateVideoIdeas(niche: string, prompt: string, days: number = 7): Promise<string[]> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an expert YouTube content strategist. Generate ${days} unique, engaging video ideas for the niche: ${niche}. Each idea should be:
            - Highly engaging and clickable
            - Unique and creative
            - Optimized for YouTube algorithm
            - Based on current trends
            - Suitable for the target audience
            
            Return exactly ${days} video ideas, one per line, without numbering.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 1000
      });

      const content = response.choices[0]?.message?.content || '';
      return content.split('\n').filter(line => line.trim().length > 0).slice(0, days);
    } catch (error) {
      console.error('Error generating video ideas:', error);
      throw new Error('Failed to generate video ideas');
    }
  }

  async generateVideoScript(videoIdea: string, niche: string): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an expert YouTube scriptwriter. Create an engaging, well-structured script for a YouTube video in the ${niche} niche. The script should be:
            - 3-5 minutes long when spoken
            - Include a strong hook in the first 15 seconds
            - Have clear sections with smooth transitions
            - Include call-to-actions
            - Be optimized for audience retention
            - Include suggested visual cues in [brackets]`
          },
          {
            role: "user",
            content: `Create a script for this video idea: ${videoIdea}`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error generating script:', error);
      throw new Error('Failed to generate script');
    }
  }

  async analyzeAndOptimize(content: string, niche: string): Promise<{
    suggestions: string[];
    optimizedTitle: string;
    tags: string[];
    description: string;
  }> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a YouTube optimization expert. Analyze the provided content and return a JSON object with:
            - suggestions: Array of 3-5 improvement suggestions
            - optimizedTitle: SEO-optimized video title (under 60 characters)
            - tags: Array of 10-15 relevant tags
            - description: Optimized video description (200-300 words)
            
            Focus on SEO, engagement, and YouTube algorithm optimization for the ${niche} niche.`
          },
          {
            role: "user",
            content: content
          }
        ],
        temperature: 0.5,
        max_tokens: 1500
      });

      const content_response = response.choices[0]?.message?.content || '{}';
      return JSON.parse(content_response);
    } catch (error) {
      console.error('Error analyzing content:', error);
      throw new Error('Failed to analyze content');
    }
  }
}

export const openaiService = new OpenAIService();