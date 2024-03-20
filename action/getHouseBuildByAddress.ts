import { HouseBuild, HouseNav } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getHouseNavByAddress = async (address: string): Promise<HouseBuild | null> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const { data: data, error: error } = await supabase
    .from('houses')
    .select(`
        *, 
        board:board!inner(*),
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

export default getHouseNavByAddress;