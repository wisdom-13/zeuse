import { supabase } from '@/config/supabaseClient';
import { HouseBuild, Widget as WidgetType } from '@/types';

export const fetchHouseByAddress = async (address?: string): Promise<HouseBuild | null> => {
  if (!address) return null;
  const { data, error } = await supabase
    .from('houses')
    .select(`
      *, 
      widget(*),
      board(*),
      style:style!inner(*),
      family:family!inner(*)
    `)
    .eq('address', address)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as HouseBuild;
};

export const removeWidgetById = async (widget: WidgetType): Promise<void> => {
  if (widget.type == 'image' && widget.image_array) {
    await supabase
      .storage
      .from('widget')
      .remove(widget.image_array);
  }

  const { error } = await supabase
    .from('widget')
    .delete()
    .eq('id', widget.id);

  if (error) {
    throw new Error(error.message);
  }
};

export const updateWidgetOrder = async (widgets: WidgetType[]): Promise<void> => {
  for (let i = 0; i < widgets.length; i++) {
    const data = widgets[i];
    await supabase
      .from('widget')
      .update({ order: i })
      .eq('id', data.id);
  }
};
