export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      collection_images: {
        Row: {
          added_at: string
          collection_id: string
          id: string
          image_id: string
          position: number | null
        }
        Insert: {
          added_at?: string
          collection_id: string
          id?: string
          image_id: string
          position?: number | null
        }
        Update: {
          added_at?: string
          collection_id?: string
          id?: string
          image_id?: string
          position?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "collection_images_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_images_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "generated_images"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          cover_image_id: string | null
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          metadata: Json | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cover_image_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          metadata?: Json | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cover_image_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          metadata?: Json | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collections_cover_image_id_fkey"
            columns: ["cover_image_id"]
            isOneToOne: false
            referencedRelation: "generated_images"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string
          id: string
          metadata: Json | null
          reference_id: string | null
          reference_type: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description: string
          id?: string
          metadata?: Json | null
          reference_id?: string | null
          reference_type?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string
          id?: string
          metadata?: Json | null
          reference_id?: string | null
          reference_type?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      generated_images: {
        Row: {
          created_at: string
          credits_used: number
          download_count: number | null
          error_message: string | null
          id: string
          image_url: string
          is_public: boolean | null
          like_count: number | null
          model: string
          parameters: Json | null
          processing_time_ms: number | null
          prompt: string
          safety_rating: Json | null
          status: string | null
          user_id: string
          view_count: number | null
        }
        Insert: {
          created_at?: string
          credits_used?: number
          download_count?: number | null
          error_message?: string | null
          id?: string
          image_url: string
          is_public?: boolean | null
          like_count?: number | null
          model: string
          parameters?: Json | null
          processing_time_ms?: number | null
          prompt: string
          safety_rating?: Json | null
          status?: string | null
          user_id: string
          view_count?: number | null
        }
        Update: {
          created_at?: string
          credits_used?: number
          download_count?: number | null
          error_message?: string | null
          id?: string
          image_url?: string
          is_public?: boolean | null
          like_count?: number | null
          model?: string
          parameters?: Json | null
          processing_time_ms?: number | null
          prompt?: string
          safety_rating?: Json | null
          status?: string | null
          user_id?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "generated_images_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      image_interactions: {
        Row: {
          created_at: string
          id: string
          image_id: string
          interaction_type: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_id: string
          interaction_type: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image_id?: string
          interaction_type?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "image_interactions_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "generated_images"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          is_verified: boolean | null
          preferences: Json | null
          social_links: Json | null
          subscription_id: string | null
          updated_at: string
          username: string | null
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          is_verified?: boolean | null
          preferences?: Json | null
          social_links?: Json | null
          subscription_id?: string | null
          updated_at?: string
          username?: string | null
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          preferences?: Json | null
          social_links?: Json | null
          subscription_id?: string | null
          updated_at?: string
          username?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      prompt_library: {
        Row: {
          category: string | null
          created_at: string
          id: string
          is_public: boolean | null
          prompt: string
          tags: string[] | null
          title: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          is_public?: boolean | null
          prompt: string
          tags?: string[] | null
          title: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          is_public?: boolean | null
          prompt?: string
          tags?: string[] | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prompt_library_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string
          current_period_start: string
          id: string
          metadata: Json | null
          plan_type: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end: string
          current_period_start: string
          id?: string
          metadata?: Json | null
          plan_type: string
          status: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          id?: string
          metadata?: Json | null
          plan_type?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      usage_analytics: {
        Row: {
          created_at: string
          event_data: Json
          event_type: string
          id: string
          ip_address: unknown | null
          processed: boolean
          session_id: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          event_data?: Json
          event_type: string
          id?: string
          ip_address?: unknown | null
          processed?: boolean
          session_id?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          event_data?: Json
          event_type?: string
          id?: string
          ip_address?: unknown | null
          processed?: boolean
          session_id?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_credits: {
        Row: {
          bonus_credits: number | null
          created_at: string
          credits_remaining: number
          credits_used: number
          id: string
          lifetime_credits_used: number | null
          monthly_limit: number | null
          plan_type: string
          reset_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bonus_credits?: number | null
          created_at?: string
          credits_remaining?: number
          credits_used?: number
          id?: string
          lifetime_credits_used?: number | null
          monthly_limit?: number | null
          plan_type?: string
          reset_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bonus_credits?: number | null
          created_at?: string
          credits_remaining?: number
          credits_used?: number
          id?: string
          lifetime_credits_used?: number | null
          monthly_limit?: number | null
          plan_type?: string
          reset_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_credits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      deduct_credits: {
        Args: { user_id: string; credits_to_deduct: number }
        Returns: boolean
      }
      deduct_credits_v2: {
        Args: {
          user_id: string
          credits_to_deduct: number
          description?: string
          reference_id?: string
          reference_type?: string
        }
        Returns: boolean
      }
      track_usage: {
        Args: {
          user_id: string
          event_type: string
          event_data?: Json
          session_id?: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
