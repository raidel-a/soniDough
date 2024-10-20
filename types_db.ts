export type Json =
  | { [key: string]: Json | undefined }
  | Json[]
  | boolean
  | null
  | number
  | string;

export interface Database {
  public: {
    CompositeTypes: {
      [_ in never]: never;
    };
    Enums: {
      pricing_plan_interval: "day" | "month" | "week" | "year";
      pricing_type: "one_time" | "recurring";
      subscription_status:
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "trialing"
        | "unpaid";
    };
    Functions: {
      [_ in never]: never;
    };
    Tables: {
      customers: {
        Insert: {
          id: string;
          stripe_customer_id?: null | string;
        };
        Relationships: [
          {
            columns: ["id"];
            foreignKeyName: "customers_id_fkey";
            isOneToOne: true;
            referencedColumns: ["id"];
            referencedRelation: "users";
          },
        ];
        Row: {
          id: string;
          stripe_customer_id: null | string;
        };
        Update: {
          id?: string;
          stripe_customer_id?: null | string;
        };
      };
      liked_songs: {
        Insert: {
          created_at?: string;
          song_id: number;
          user_id: string;
        };
        Relationships: [
          {
            columns: ["song_id"];
            foreignKeyName: "liked_songs_song_id_fkey";
            isOneToOne: false;
            referencedColumns: ["id"];
            referencedRelation: "songs";
          },
          {
            columns: ["user_id"];
            foreignKeyName: "liked_songs_user_id_fkey";
            isOneToOne: false;
            referencedColumns: ["id"];
            referencedRelation: "users";
          },
        ];
        Row: {
          created_at: string;
          song_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          song_id?: number;
          user_id?: string;
        };
      };
      prices: {
        Insert: {
          active?: boolean | null;
          currency?: null | string;
          description?: null | string;
          id: string;
          interval?:
            | Database["public"]["Enums"]["pricing_plan_interval"]
            | null;
          interval_count?: null | number;
          metadata?: Json | null;
          product_id?: null | string;
          trial_period_days?: null | number;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount?: null | number;
        };
        Relationships: [
          {
            columns: ["product_id"];
            foreignKeyName: "prices_product_id_fkey";
            isOneToOne: false;
            referencedColumns: ["id"];
            referencedRelation: "products";
          },
        ];
        Row: {
          active: boolean | null;
          currency: null | string;
          description: null | string;
          id: string;
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null;
          interval_count: null | number;
          metadata: Json | null;
          product_id: null | string;
          trial_period_days: null | number;
          type: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount: null | number;
        };
        Update: {
          active?: boolean | null;
          currency?: null | string;
          description?: null | string;
          id?: string;
          interval?:
            | Database["public"]["Enums"]["pricing_plan_interval"]
            | null;
          interval_count?: null | number;
          metadata?: Json | null;
          product_id?: null | string;
          trial_period_days?: null | number;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount?: null | number;
        };
      };
      products: {
        Insert: {
          active?: boolean | null;
          description?: null | string;
          id: string;
          image?: null | string;
          metadata?: Json | null;
          name?: null | string;
        };
        Relationships: [];
        Row: {
          active: boolean | null;
          description: null | string;
          id: string;
          image: null | string;
          metadata: Json | null;
          name: null | string;
        };
        Update: {
          active?: boolean | null;
          description?: null | string;
          id?: string;
          image?: null | string;
          metadata?: Json | null;
          name?: null | string;
        };
      };
      songs: {
        Insert: {
          author?: null | string;
          created_at?: string;
          id?: number;
          image_path?: null | string;
          song_path?: null | string;
          title?: null | string;
          user_id?: null | string;
        };
        Relationships: [
          {
            columns: ["user_id"];
            foreignKeyName: "songs_user_id_fkey";
            isOneToOne: false;
            referencedColumns: ["id"];
            referencedRelation: "users";
          },
        ];
        Row: {
          author: null | string;
          created_at: string;
          id: number;
          image_path: null | string;
          song_path: null | string;
          title: null | string;
          user_id: null | string;
        };
        Update: {
          author?: null | string;
          created_at?: string;
          id?: number;
          image_path?: null | string;
          song_path?: null | string;
          title?: null | string;
          user_id?: null | string;
        };
      };
      subscriptions: {
        Insert: {
          cancel_at?: null | string;
          cancel_at_period_end?: boolean | null;
          canceled_at?: null | string;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: null | string;
          id: string;
          metadata?: Json | null;
          price_id?: null | string;
          quantity?: null | number;
          status?: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end?: null | string;
          trial_start?: null | string;
          user_id: string;
        };
        Relationships: [
          {
            columns: ["price_id"];
            foreignKeyName: "subscriptions_price_id_fkey";
            isOneToOne: false;
            referencedColumns: ["id"];
            referencedRelation: "prices";
          },
          {
            columns: ["user_id"];
            foreignKeyName: "subscriptions_user_id_fkey";
            isOneToOne: false;
            referencedColumns: ["id"];
            referencedRelation: "users";
          },
        ];
        Row: {
          cancel_at: null | string;
          cancel_at_period_end: boolean | null;
          canceled_at: null | string;
          created: string;
          current_period_end: string;
          current_period_start: string;
          ended_at: null | string;
          id: string;
          metadata: Json | null;
          price_id: null | string;
          quantity: null | number;
          status: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end: null | string;
          trial_start: null | string;
          user_id: string;
        };
        Update: {
          cancel_at?: null | string;
          cancel_at_period_end?: boolean | null;
          canceled_at?: null | string;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: null | string;
          id?: string;
          metadata?: Json | null;
          price_id?: null | string;
          quantity?: null | number;
          status?: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end?: null | string;
          trial_start?: null | string;
          user_id?: string;
        };
      };
      users: {
        Insert: {
          avatar_url?: null | string;
          billing_address?: Json | null;
          full_name?: null | string;
          id: string;
          payment_method?: Json | null;
        };
        Relationships: [
          {
            columns: ["id"];
            foreignKeyName: "users_id_fkey";
            isOneToOne: true;
            referencedColumns: ["id"];
            referencedRelation: "users";
          },
        ];
        Row: {
          avatar_url: null | string;
          billing_address: Json | null;
          full_name: null | string;
          id: string;
          payment_method: Json | null;
        };
        Update: {
          avatar_url?: null | string;
          billing_address?: Json | null;
          full_name?: null | string;
          id?: string;
          payment_method?: Json | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
  };
}
