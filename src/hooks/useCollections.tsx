
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Collection {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  cover_image_id: string | null;
  created_at: string;
  updated_at: string;
  metadata: Record<string, any>;
}

export const useCollections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('collections')
        .select('*')
        .order('created_at', { ascending: false });
      
      setCollections(data || []);
    } catch (error) {
      toast.error('Failed to fetch collections');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createCollection = async (name: string, description?: string, isPublic = false) => {
    try {
      const { data } = await supabase
        .from('collections')
        .insert({
          name,
          description,
          is_public: isPublic,
          user_id: (await supabase.auth.getUser()).data.user?.id
        })
        .select()
        .single();
      
      if (data) {
        setCollections(prev => [data, ...prev]);
        toast.success('Collection created successfully');
        return data;
      }
    } catch (error) {
      toast.error('Failed to create collection');
      console.error(error);
    }
  };

  const addImageToCollection = async (collectionId: string, imageId: string) => {
    try {
      await supabase
        .from('collection_images')
        .insert({
          collection_id: collectionId,
          image_id: imageId
        });
      
      toast.success('Image added to collection');
    } catch (error) {
      toast.error('Failed to add image to collection');
      console.error(error);
    }
  };

  const removeImageFromCollection = async (collectionId: string, imageId: string) => {
    try {
      await supabase
        .from('collection_images')
        .delete()
        .eq('collection_id', collectionId)
        .eq('image_id', imageId);
      
      toast.success('Image removed from collection');
    } catch (error) {
      toast.error('Failed to remove image from collection');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return {
    collections,
    loading,
    createCollection,
    addImageToCollection,
    removeImageFromCollection,
    refetch: fetchCollections
  };
};
