import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  handleChange: (value: string) => void;
  className?: string;
}

const SearchBar = ({
  value,
  handleChange,
  className
}: SearchBarProps) => {
  return (
    <div className={cn(
      'relative',
      className && className
    )}>
      <Input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className='pl-9'
        placeholder='제목 또는 내용으로 검색'
      />
      <Search
        size={16}
        className='absolute top-1/2 left-3 -translate-y-1/2'
      />
    </div>
  );
}

export default SearchBar;