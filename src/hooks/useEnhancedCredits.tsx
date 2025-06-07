
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface CreditTransaction {
  id: string;
  user_id: string;
  transaction_type: 'debit' | 'credit' | 'refund' | 'bonus';
  amount: number;
  description: string;
  reference_id: string | null;
  reference_type: string | null;
  created_at: string;
  metadata: Record<string, any>;
}

export interface EnhancedUserCredits {
  id: string;
  user_id: string;
  credits_remaining: number;
  credits_used: number;
  plan_type: string;
  monthly_limit: number;
  reset_date: string;
  bonus_credits: number;
  lifetime_credits_used: number;
  created_at: string;
  updated_at: string;
}

export const useEnhancedCredits = () => {
  const [credits, setCredits] = useState<EnhancedUserCredits | null>(null);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCredits = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('user_credits')
        .select('*')
        .single();
      
      if (data) {
        setCredits(data);
      }
    } catch (error) {
      console.error('Failed to fetch credits:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data } = await supabase
        .from('credit_transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      setTransactions(data || []);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  const deductCredits = async (amount: number, description: string, referenceId?: string, referenceType?: string) => {
    try {
      const { data, error } = await supabase.rpc('deduct_credits_v2', {
        user_id: (await supabase.auth.getUser()).data.user?.id,
        credits_to_deduct: amount,
        description,
        reference_id: referenceId,
        reference_type: referenceType
      });

      if (error) throw error;

      if (data) {
        await fetchCredits();
        await fetchTransactions();
        return true;
      } else {
        toast.error('Insufficient credits');
        return false;
      }
    } catch (error) {
      console.error('Failed to deduct credits:', error);
      toast.error('Failed to deduct credits');
      return false;
    }
  };

  const addCredits = async (amount: number, description: string, type: 'credit' | 'bonus' | 'refund' = 'credit') => {
    try {
      const userId = (await supabase.auth.getUser()).data.user?.id;
      
      // Add credit transaction
      await supabase
        .from('credit_transactions')
        .insert({
          user_id: userId,
          transaction_type: type,
          amount,
          description
        });

      // Update user credits
      const updateField = type === 'bonus' ? 'bonus_credits' : 'credits_remaining';
      await supabase
        .from('user_credits')
        .update({
          [updateField]: supabase.sql`${updateField} + ${amount}`,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      await fetchCredits();
      await fetchTransactions();
      toast.success(`Added ${amount} ${type} credits`);
    } catch (error) {
      console.error('Failed to add credits:', error);
      toast.error('Failed to add credits');
    }
  };

  useEffect(() => {
    fetchCredits();
    fetchTransactions();
  }, []);

  return {
    credits,
    transactions,
    loading,
    deductCredits,
    addCredits,
    refetch: () => {
      fetchCredits();
      fetchTransactions();
    }
  };
};
