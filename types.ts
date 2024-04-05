export interface UserDetails {
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
  view: string;
  link: string;
  role: number;
  sort_order: number;
}

export interface BoardList extends Board {
  posts: PostFamily[];
}

export interface Post {
  id: string;
  board_id: string;
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

export interface Memo {
  id: string;
  board_id: string;
  title: string;
  content: string;
  name: string;
  parent_id: string;
  family_id: string;
  is_secret: boolean;
  password: string;
  created_at: Date;
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
  box_style: {
    opacity: string,
    border: string,
    radius: string
  }
}

export interface Widget {
  id: string;
  house_id: string;
  type: string;
  grid: { col: number, row: number };
  order: number;
  image_array: Array<string>;
  board_id: string;
  date: string;
  option: string;
}

export interface Family {
  id: string;
  user_id: string;
  house_id: string;
  nick_name?: string;
  description?: string;
  avatar_url?: string;
  role: string;
  is_owner: boolean;
}

export interface FileWithPreview extends File {
  preview?: string;
}