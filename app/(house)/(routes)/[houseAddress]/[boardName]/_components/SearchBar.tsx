import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  handleChange: (value: string) => void;
}

const SearchBar = ({
  value,
  handleChange
}: SearchBarProps) => {
  return (
    <div className='relative'>
      <Input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className=' mt-4 pl-9 '
        placeholder='제목 또는 내용으로 검색'
      />
      <Search
        size={16}
        className='absolute top-1/2 left-3'
      />
    </div>
  );
}

export default SearchBar;