import HouseMain from './_components/HouseMain';
import HouseMenu from './_components/HouseMenu';

interface houseAddress {
  params: {
    houseAddress: string;
  }
}

const HousePage = ({ params: { houseAddress } }: houseAddress) => {
  return (
    <div
      className='bg-rose-400 flex h-screen items-center'
    >
      <HouseMenu />
      <HouseMain />
    </div>
  );
}

export default HousePage;