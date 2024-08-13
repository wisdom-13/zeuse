import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import withSettingItem from './withSettingItem';

interface SelectDropdownProps {
  options: string[];
  value: string;
  onChange: () => void;
  placeholder: string;
}


const SelectDropdown = ({ options, value, onChange, placeholder }: SelectDropdownProps) => (
  <Select defaultValue={value} onValueChange={onChange}>
    <SelectTrigger className='w-40'>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            <div className='flex items-center'>
              {option.color && <span className='inline-block mr-2 rounded-full w-5 h-5 shrink-0' style={{ background: option.color }}></span>}
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export const ImageUploadWithSetting = withSettingItem(SelectDropdown);