import { House } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getHouseByAddress = async (address: string): Promise<House | null> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const { data: housesData, error: housesError } = await supabase
    .from('houses')
    .select(`
        *, 
        style:style!inner(*),
        family:family!inner(*)
    `)
    .eq('address', address)
    .eq('family.is_owner', true)
    .single();

  if (housesError) {
    console.log(housesError.message);
  }

  return (housesData as House) || null;
}

export default getHouseByAddress;