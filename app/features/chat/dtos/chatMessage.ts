export default interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  model?: string;
  content: string;
  sources?: string[];
  loading?: boolean;
  error?: boolean;
  tokens?: number;
}