import { House } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getHouseByAddress = async (address: string): Promise<House | null> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const { data: data, error: error } = await supabase
    .from('houses')
    .select('*')
    .eq('address', address)
    .single();

  if (error) {
    console.log(error.message);
  }

  return (data as House) || null;
}

export default getHouseByAddress;