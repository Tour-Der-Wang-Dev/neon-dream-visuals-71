
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const aiModels = [
    'DALL-E 3',
    'Stable Diffusion XL',
    'Midjourney v6',
    'Playground v2.5',
    'Leonardo AI',
    'Adobe Firefly',
  ];

  const filteredModels = aiModels.filter(model =>
    model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="glass border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Search className="w-5 h-5" />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-12 right-0 w-80 glass-premium border border-purple-500/20 rounded-lg p-4 z-50 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Search AI Models</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 glass border border-purple-500/20 rounded-md focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="max-h-48 overflow-y-auto">
              {filteredModels.length > 0 ? (
                filteredModels.map((model, index) => (
                  <button
                    key={model}
                    className="w-full text-left p-2 hover:bg-purple-500/10 rounded transition-colors text-sm"
                    onClick={() => {
                      setSearchQuery(model);
                      setIsOpen(false);
                    }}
                  >
                    {model}
                  </button>
                ))
              ) : (
                <p className="text-muted-foreground text-sm p-2">No models found</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
