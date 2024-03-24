import { HouseBuild } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getHouseWidgetByAddress = async (address: string): Promise<HouseBuild | null> => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: data, error: error } = await supabase
    .from('houses')
    .select(`
        *, 
        widget:widget!left(*),
        style:style!inner(*),
        board:board!inner(*),
        family:family!inner(*)
    `)
    .eq('address', address)
    .single();

  if (error) {
    console.log(error.message);
  }

  return (data as HouseBuild) || null;
}

export default getHouseWidgetByAddress;