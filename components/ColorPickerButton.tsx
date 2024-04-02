import { useState } from 'react';
import { ChromePicker } from 'react-color';
import { Button } from './ui/button';

interface ColorPickerButtonProps {
  color: string;
  handleChange?: () => void;
}

const ColorPickerButton = ({
  color,
  handleChange
}: ColorPickerButtonProps) => {
  const [bgColor, setBgColor] = useState(color);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const onChange = (color: any) => {
    setBgColor(color.hex);
    handleChange && handleChange();
  }

  return (
    <>
      <Button
        variant='secondary'
        size='sm'
        className='p-2'
        onClick={() => setDisplayColorPicker(!displayColorPicker)}
      >
        <div className='w-20 h-full rounded-md' style={{ backgroundColor: bgColor }} />
      </Button>
      {displayColorPicker ? (
        <>
          <div
            className='fixed top-0 left-0 right-0 bottom-0 z-[9999]'
            onClick={() => setDisplayColorPicker(false)}
          />
          <div className='absolute z-[9999] right-2 top-12'>
            <ChromePicker
              color={bgColor}
              disableAlpha={true}
              onChange={onChange}
              className='shadow-orange-300'
            />
          </div>
        </>
      ) : null}
    </>
  )
}


export default ColorPickerButton;