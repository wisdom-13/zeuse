import { HouseBuild } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getHouseBuildByAddress = async (address: string): Promise<HouseBuild | null> => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: data, error: error } = await supabase
    .from('houses')
    .select(`
        *, 
        board:board!inner(*),
        widget:widget!inner(*),
        style:style!inner(*),
        family:family!inner(*)
    `)
    .eq('address', address)
    .single();

  if (error) {
    console.log(error.message);
  }

  return (data as HouseBuild) || null;
}

export default getHouseBuildByAddress;