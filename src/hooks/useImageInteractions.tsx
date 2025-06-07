
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ImageInteraction {
  id: string;
  user_id: string;
  image_id: string;
  interaction_type: 'like' | 'bookmark' | 'share' | 'download' | 'view';
  created_at: string;
  metadata: Record<string, any>;
}

export const useImageInteractions = () => {
  const [loading, setLoading] = useState(false);

  const toggleInteraction = async (imageId: string, type: 'like' | 'bookmark') => {
    setLoading(true);
    try {
      const { data: existingInteraction } = await supabase
        .from('image_interactions')
        .select('*')
        .eq('image_id', imageId)
        .eq('interaction_type', type)
        .single();

      if (existingInteraction) {
        // Remove interaction
        await supabase
          .from('image_interactions')
          .delete()
          .eq('id', existingInteraction.id);
        
        toast.success(`Removed from ${type}s`);
        return false;
      } else {
        // Add interaction
        await supabase
          .from('image_interactions')
          .insert({
            image_id: imageId,
            interaction_type: type,
            user_id: (await supabase.auth.getUser()).data.user?.id
          });
        
        toast.success(`Added to ${type}s`);
        return true;
      }
    } catch (error) {
      toast.error(`Failed to ${type} image`);
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const trackView = async (imageId: string) => {
    try {
      await supabase
        .from('image_interactions')
        .insert({
          image_id: imageId,
          interaction_type: 'view',
          user_id: (await supabase.auth.getUser()).data.user?.id
        });
    } catch (error) {
      console.error('Failed to track view:', error);
    }
  };

  const getInteractions = async (imageId: string) => {
    try {
      const { data } = await supabase
        .from('image_interactions')
        .select('*')
        .eq('image_id', imageId);
      
      return data || [];
    } catch (error) {
      console.error('Failed to get interactions:', error);
      return [];
    }
  };

  return {
    toggleInteraction,
    trackView,
    getInteractions,
    loading
  };
};
