import { Button } from '@/components/ui/button';
import Link from 'next/link';


const Custom404 = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-y-4'>
      <h1 className='text-4xl font-bold'>😢 길을 잃은 것 같아요...</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link href={'/'}>
        <Button>ZEUSE 메인으로 돌아가기</Button>
      </Link>
    </div>
  );
};

export default Custom404;