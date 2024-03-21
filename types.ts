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
  is_published: boolean;
  created_at: string;
}

export interface HouseNav extends House {
  family: Family[];
  board: Board[];
}

export interface HouseBuild extends House {
  family: Family[];
  board: Board[];
  style: Style;
  widget: Widget[];
}

export interface Board {
  id: string;
  house_id: string;
  title: string;
  name: string;
  type: string;
  role: number;
  sort: number;
}

export interface BoardList extends Board {
  posts: PostFamily[];
}

export interface Post {
  id: string;
  house_id: string;
  family_id: string;
  title: string;
  content: string;
  tag: string;
  thumbnail_path: string;
  role: number;
  password: string;
  created_at: Date;
}

export interface PostFamily extends Post {
  family: Family;
}


export interface Style {
  house_id: string;
  menu_position: string;
  bg_color: string;
  bg_image: string;
  logo_image: string;
  color: string;
  radius: string;
  mode: string;
}

export interface Widget {
  id: string;
  house_id: string;
  type: string;
  size: string;
  order: number;
  image_array: string;
  board_id: string;
  date: string;
  option: string;
}

export interface Family {
  user_id: string;
  house_id: string;
  nick_name?: string;
  avatar_url?: string;
  role: string;
  is_owner: boolean;
}