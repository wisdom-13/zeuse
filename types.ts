export interface UserDetail {
  id: string;
  name?: string;
  avatar_url?: string;
}

export interface House {
  id: string;
  title: string;
  description?: string;
  address?: string;
  type: string;
  is_published: boolean
}

export interface Famity {
  user_id: string;
  house_id: string;
  nick_name?: string;
  avatar_url?: string;
  role: string;
  is_owner: boolean;
}