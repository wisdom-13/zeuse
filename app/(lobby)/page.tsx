import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import getHousesByUserId from '@/action/getHousesByUserId';
import { HouseList } from '@/components/HouseList';

import { Main } from './_components/Main';
import { Footer } from './_components/Footer';

const MarketingPage = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: { session } } = await supabase.auth.getSession();
  const houses = await getHousesByUserId();

  return (
    <div className='flex flex-col h-[calc(100vh+88px)] items-center'>
      <div className='flex flex-col h-screen items-center justify-center text-center gap-t-8 flex-1 px-6 pb-10'>
        <Main />
        {session?.user && <HouseList houses={houses} />}
      </div>
      <Footer />
    </div>
  );
}

export default MarketingPage;