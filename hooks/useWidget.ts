import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeWidgetById, updateWidget } from "@/services/houseService";
import { Widget as WidgetType } from "@/types";
import { toast } from "sonner";

export const useWidget = (address: string) => {
  const queryClient = useQueryClient();

  const removeWidget = useMutation<void, Error, { widget: WidgetType }>({
    mutationFn: async ({ widget }) => {
      await removeWidgetById(widget);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["house", address] });
      toast.success("위젯이 성공적으로 삭제되었습니다.");
    },
    onError: (error) => {
      toast.error(`위젯을 삭제하는 중 오류가 발생했습니다: ${error.message}`);
    },
  });

  const updateWidgetMutation = useMutation<void, Error, WidgetType[]>({
    mutationFn: async (widgets: WidgetType[]) => {
      for (const widget of widgets) {
        await updateWidget([widget]);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["house", address] });
      toast.success("위젯 레이아웃이 성공적으로 업데이트되었습니다.");
    },
    onError: (error) => {
      toast.error(
        `위젯 레이아웃을 업데이트하는 중 오류가 발생했습니다: ${error.message}`
      );
    },
  });

  return {
    removeWidget,
    updateWidget: updateWidgetMutation,
  };
};
