export interface UserDetails {
  id: string;
  name?: string;
}

export interface Houses {
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
  role: string;
  is_owner: boolean;
}