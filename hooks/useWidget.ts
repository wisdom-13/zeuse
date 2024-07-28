import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeWidgetById, updateWidgetOrder } from '@/services/houseService';
import { Widget as WidgetType } from '@/types';
import { toast } from 'sonner';

export const useWidget = (address: string) => {
  const queryClient = useQueryClient();

  const removeWidget = useMutation<void, Error, { widget: WidgetType; }>({
    mutationFn: async ({ widget }) => {
      await removeWidgetById(widget);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['house', address] });
      toast.success('위젯이 성공적으로 삭제되었습니다.');
    },
    onError: (error) => {
      toast.error(`위젯을 삭제하는 중 오류가 발생했습니다: ${error.message}`);
    },
  });

  const updateWidget = useMutation<void, Error, WidgetType[]>({
    mutationFn: async (widgets) => {
      await updateWidgetOrder(widgets);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['house', address] });
      toast.success('위젯 순서가 성공적으로 업데이트되었습니다.');
    },
    onError: (error) => {
      toast.error(`위젯 순서를 업데이트하는 중 오류가 발생했습니다: ${error.message}`);
    },
  });

  return {
    removeWidget,
    updateWidget,
  };
};
