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
      board: {
        Row: {
          house_id: string
          id: string
          link: string | null
          name: string | null
          order: number | null
          role: number | null
          title: string
          type: string
          view: string | null
        }
        Insert: {
          house_id?: string
          id?: string
          link?: string | null
          name?: string | null
          order?: number | null
          role?: number | null
          title: string
          type: string
          view?: string | null
        }
        Update: {
          house_id?: string
          id?: string
          link?: string | null
          name?: string | null
          order?: number | null
          role?: number | null
          title?: string
          type?: string
          view?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_board_house_id_fkey"
            columns: ["house_id"]
            isOneToOne: false
            referencedRelation: "houses"
            referencedColumns: ["id"]
          },
        ]
      }
      family: {
        Row: {
          avatar_path: string | null
          avatar_url: string | null
          description: string | null
          house_id: string
          id: string
          is_owner: boolean | null
          nick_name: string | null
          role: string | null
          user_id: string
        }
        Insert: {
          avatar_path?: string | null
          avatar_url?: string | null
          description?: string | null
          house_id?: string
          id?: string
          is_owner?: boolean | null
          nick_name?: string | null
          role?: string | null
          user_id?: string
        }
        Update: {
          avatar_path?: string | null
          avatar_url?: string | null
          description?: string | null
          house_id?: string
          id?: string
          is_owner?: boolean | null
          nick_name?: string | null
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_family_house_id_fkey"
            columns: ["house_id"]
            isOneToOne: false
            referencedRelation: "houses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_family_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      houses: {
        Row: {
          address: string
          created_at: string | null
          description: string | null
          id: string
          is_published: boolean | null
          title: string
          type: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_published?: boolean | null
          title: string
          type?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_published?: boolean | null
          title?: string
          type?: string | null
        }
        Relationships: []
      }
      memos: {
        Row: {
          board_id: string
          content: string | null
          created_at: string | null
          family_id: string | null
          id: string
          is_secret: boolean | null
          name: string | null
          parent_id: string | null
          password: string | null
          title: string | null
        }
        Insert: {
          board_id?: string
          content?: string | null
          created_at?: string | null
          family_id?: string | null
          id?: string
          is_secret?: boolean | null
          name?: string | null
          parent_id?: string | null
          password?: string | null
          title?: string | null
        }
        Update: {
          board_id?: string
          content?: string | null
          created_at?: string | null
          family_id?: string | null
          id?: string
          is_secret?: boolean | null
          name?: string | null
          parent_id?: string | null
          password?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_memos_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "board"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          board_id: string | null
          content: string | null
          created_at: string | null
          family_id: string | null
          house_id: string | null
          id: string
          option: Json | null
          password: string | null
          role: number | null
          tag: string | null
          thumbnail_path: string | null
          title: string
        }
        Insert: {
          board_id?: string | null
          content?: string | null
          created_at?: string | null
          family_id?: string | null
          house_id?: string | null
          id?: string
          option?: Json | null
          password?: string | null
          role?: number | null
          tag?: string | null
          thumbnail_path?: string | null
          title?: string
        }
        Update: {
          board_id?: string | null
          content?: string | null
          created_at?: string | null
          family_id?: string | null
          house_id?: string | null
          id?: string
          option?: Json | null
          password?: string | null
          role?: number | null
          tag?: string | null
          thumbnail_path?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_posts_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "board"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_posts_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_posts_house_id_fkey"
            columns: ["house_id"]
            isOneToOne: false
            referencedRelation: "houses"
            referencedColumns: ["id"]
          },
        ]
      }
      ripple: {
        Row: {
          content: string
          created_at: string | null
          family_id: string | null
          id: string
          is_deleted: boolean | null
          is_secret: boolean | null
          parent_id: string | null
          post_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          family_id?: string | null
          id?: string
          is_deleted?: boolean | null
          is_secret?: boolean | null
          parent_id?: string | null
          post_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          family_id?: string | null
          id?: string
          is_deleted?: boolean | null
          is_secret?: boolean | null
          parent_id?: string | null
          post_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ripple_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "ripple"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ripple_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ripple_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      style: {
        Row: {
          bg_color: string | null
          bg_image: string | null
          box_style: Json | null
          color: string | null
          house_id: string
          logo_image: string | null
          menu_position: string
          mode: string | null
          radius: string | null
        }
        Insert: {
          bg_color?: string | null
          bg_image?: string | null
          box_style?: Json | null
          color?: string | null
          house_id?: string
          logo_image?: string | null
          menu_position?: string
          mode?: string | null
          radius?: string | null
        }
        Update: {
          bg_color?: string | null
          bg_image?: string | null
          box_style?: Json | null
          color?: string | null
          house_id?: string
          logo_image?: string | null
          menu_position?: string
          mode?: string | null
          radius?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_style_house_id_fkey"
            columns: ["house_id"]
            isOneToOne: true
            referencedRelation: "houses"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          id: string
          name: string | null
        }
        Insert: {
          avatar_url?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          avatar_url?: string | null
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      widget: {
        Row: {
          grid: Json
          house_id: string
          id: string
          image_array: Json | null
          option_bool: boolean | null
          option_id: string | null
          option_text: string | null
          order: number | null
          type: string
        }
        Insert: {
          grid: Json
          house_id: string
          id?: string
          image_array?: Json | null
          option_bool?: boolean | null
          option_id?: string | null
          option_text?: string | null
          order?: number | null
          type: string
        }
        Update: {
          grid?: Json
          house_id?: string
          id?: string
          image_array?: Json | null
          option_bool?: boolean | null
          option_id?: string | null
          option_text?: string | null
          order?: number | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_widget_house_id_fkey"
            columns: ["house_id"]
            isOneToOne: false
            referencedRelation: "houses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
