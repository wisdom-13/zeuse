import { Navbar } from './_components/navbar';

const MarketingLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='h-full'>
      {/* <Navbar /> */}
      <main className='h-full pt-96'>
        {children}
      </main>
    </div>
  );
}

export default MarketingLayout;