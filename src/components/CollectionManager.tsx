
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Folder, Lock, Globe } from 'lucide-react';
import { useCollections } from '@/hooks/useCollections';

interface CollectionManagerProps {
  imageId?: string;
  onImageAdded?: () => void;
}

const CollectionManager = ({ imageId, onImageAdded }: CollectionManagerProps) => {
  const { collections, loading, createCollection, addImageToCollection } = useCollections();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string>('');

  const handleCreateCollection = async () => {
    if (!newCollectionName.trim()) return;
    
    const collection = await createCollection(
      newCollectionName.trim(),
      newCollectionDescription.trim() || undefined,
      isPublic
    );
    
    if (collection && imageId) {
      await addImageToCollection(collection.id, imageId);
      onImageAdded?.();
    }
    
    setShowCreateDialog(false);
    setNewCollectionName('');
    setNewCollectionDescription('');
    setIsPublic(false);
  };

  const handleAddToExistingCollection = async () => {
    if (!selectedCollection || !imageId) return;
    
    await addImageToCollection(selectedCollection, imageId);
    onImageAdded?.();
    setSelectedCollection('');
  };

  return (
    <div className="space-y-4">
      {/* Add to existing collection */}
      {imageId && collections.length > 0 && (
        <div className="flex space-x-2">
          <Select value={selectedCollection} onValueChange={setSelectedCollection}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Add to collection..." />
            </SelectTrigger>
            <SelectContent>
              {collections.map((collection) => (
                <SelectItem key={collection.id} value={collection.id}>
                  <div className="flex items-center space-x-2">
                    <Folder className="w-4 h-4" />
                    <span>{collection.name}</span>
                    {collection.is_public ? (
                      <Globe className="w-3 h-3 text-green-500" />
                    ) : (
                      <Lock className="w-3 h-3 text-gray-500" />
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            onClick={handleAddToExistingCollection}
            disabled={!selectedCollection}
            size="sm"
          >
            Add
          </Button>
        </div>
      )}

      {/* Create new collection */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Create New Collection
          </Button>
        </DialogTrigger>
        <DialogContent className="glass-premium border-purple-500/20">
          <DialogHeader>
            <DialogTitle>Create New Collection</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="collection-name">Collection Name</Label>
              <Input
                id="collection-name"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Enter collection name..."
                className="glass border-purple-500/30"
              />
            </div>
            
            <div>
              <Label htmlFor="collection-description">Description (Optional)</Label>
              <Textarea
                id="collection-description"
                value={newCollectionDescription}
                onChange={(e) => setNewCollectionDescription(e.target.value)}
                placeholder="Describe your collection..."
                className="glass border-purple-500/30"
                rows={3}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="public-collection"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
              <Label htmlFor="public-collection">Make collection public</Label>
            </div>
            
            <div className="flex space-x-2">
              <Button
                onClick={handleCreateCollection}
                disabled={!newCollectionName.trim() || loading}
                className="flex-1 bg-gradient-premium"
              >
                {loading ? 'Creating...' : 'Create Collection'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCreateDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Collections grid */}
      {collections.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collections.map((collection) => (
            <Card key={collection.id} className="glass-premium p-4 border-purple-500/20">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Folder className="w-4 h-4" />
                    <h3 className="font-semibold">{collection.name}</h3>
                    {collection.is_public ? (
                      <Badge variant="outline" className="text-xs">
                        <Globe className="w-3 h-3 mr-1" />
                        Public
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        <Lock className="w-3 h-3 mr-1" />
                        Private
                      </Badge>
                    )}
                  </div>
                  {collection.description && (
                    <p className="text-sm text-foreground/60 line-clamp-2">
                      {collection.description}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionManager;
