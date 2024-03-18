import { House } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getHousesByUserId = async (): Promise<House[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const {
    data: sessionData,
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    return [];
  }

  const { data: familyData, error: familyError } = await supabase
    .from('family')
    .select('house_id')
    .eq('user_id', sessionData.session?.user.id);

  if (familyError || !familyData || familyData.length == 0) {
    return [];
  }

  const houseIds = familyData?.map(family => family.house_id);
  const { data: housesData, error: housesError } = await supabase
    .from('houses')
    .select('*')
    .in('id', houseIds)
    .order('created_at', { ascending: false });

  if (housesError) {
    console.log(housesError.message);
  }

  return (housesData as Houses[]) || [];
}

export default getHousesByUserId;