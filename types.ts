import Stripe from "stripe";

export interface Song {
  author: string;
  id: string;
  image_path: string;
  song_path: string;
  title: string;
  user_id: string;
}

export interface UserDetails {
  avatar_url?: string;
  billing_address?: Stripe.Address;
  first_name: string;
  full_name?: string;
  id: string;
  last_name: string;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Product {
  active?: boolean;
  description?: string;
  id: string;
  image?: string;
  metadata?: Stripe.Metadata;
  name?: string;
}

export interface Price {
  active?: boolean;
  currency?: string;
  description?: string;
  id: string;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  metadata?: Stripe.Metadata;
  product_id?: string;
  products?: Product;
  trial_period_days?: null | number;
  type?: Stripe.Price.Type;
  unit_amount?: number;
}

export interface Subscription {
  cancel_at?: string;
  cancel_at_period_end?: boolean;
  canceled_at?: string;
  created: string;
  current_period_end: string;
  current_period_start: string;
  ended_at?: string;
  id: string;
  metadata?: Stripe.Metadata;
  price_id?: string;
  prices?: Price;
  quantity?: number;
  status?: Stripe.Subscription.Status;
  trial_end?: string;
  trial_start?: string;
  user_id: string;
}

export interface valuue {
  
}