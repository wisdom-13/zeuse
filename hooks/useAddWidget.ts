import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { Widget } from "@/types";

interface AddWidgetParams {
  houseId: string;
  type: string;
  grid: {
    col: number;
    row: number;
    x: number;
    y: number;
  };
  props?: Record<string, any>;
}

export const useAddWidget = (address: string) => {
  const supabaseClient = useSupabaseClient();
  const queryClient = useQueryClient();

  const addWidgetMutation = useMutation<Widget, Error, AddWidgetParams>({
    mutationFn: async ({ houseId, type, grid, props = {} }) => {
      const { data: newWidget, error } = await supabaseClient
        .from("widget")
        .insert({
          house_id: houseId,
          type: type,
          grid: grid,
          ...props,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return newWidget;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["house", address] });
      toast.success("위젯이 성공적으로 추가되었습니다.");
    },
    onError: (error) => {
      toast.error(`위젯을 추가하는 중 오류가 발생했습니다: ${error.message}`);
    },
  });

  return addWidgetMutation;
};
