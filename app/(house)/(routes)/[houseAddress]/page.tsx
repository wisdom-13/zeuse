import HouseMain from './_components/HouseMain';

interface houseAddress {
  params: {
    houseAddress: string;
  }
}

const HousePage = async ({ params: { houseAddress } }: houseAddress) => {
  return (
    <div
      className='flex h-full items-center justify-center gap-x-4'
    >
      <HouseMain />
    </div>
  );
}

export default HousePage;