
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';

interface PromptSuggestionsProps {
  prompt: string;
  onSuggestionClick: (suggestion: string) => void;
}

const PromptSuggestions = ({ prompt, onSuggestionClick }: PromptSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const allSuggestions = [
    "a futuristic cityscape at sunset with neon lights",
    "a majestic dragon flying over mountains",
    "a cozy cabin in a snowy forest",
    "a surreal underwater world with floating islands",
    "a steampunk airship in the clouds",
    "a magical forest with glowing mushrooms",
    "a cyberpunk street scene at night",
    "a peaceful zen garden with cherry blossoms",
    "a space station orbiting a distant planet",
    "a vintage car on a desert highway"
  ];

  useEffect(() => {
    if (prompt.length > 2) {
      const filtered = allSuggestions.filter(s => 
        s.toLowerCase().includes(prompt.toLowerCase()) ||
        prompt.toLowerCase().split(' ').some(word => s.toLowerCase().includes(word))
      ).slice(0, 3);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [prompt]);

  if (suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-2 glass-premium border border-purple-500/20 rounded-lg p-3 space-y-2">
      <div className="flex items-center space-x-2 text-sm text-purple-400 font-inter">
        <Lightbulb className="w-4 h-4" />
        <span>Suggestions</span>
      </div>
      {suggestions.map((suggestion, index) => (
        <Badge
          key={index}
          variant="outline"
          className="cursor-pointer hover:bg-purple-500/20 transition-colors text-xs p-2 border-purple-500/30 font-inter"
          onClick={() => onSuggestionClick(suggestion)}
        >
          {suggestion}
        </Badge>
      ))}
    </div>
  );
};

export default PromptSuggestions;
