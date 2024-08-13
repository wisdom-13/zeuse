import { useState } from 'react';
import { ChromePicker } from 'react-color';
import { Button } from './ui/button';
import withSettingItem from './shared/withSettingItem';

interface ColorPickerButtonProps {
  color: string;
  handleChange?: (color: string) => void;
}

export const ColorPickerButton = ({
  color,
  handleChange
}: ColorPickerButtonProps) => {
  const [bgColor, setBgColor] = useState(color);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const onChange = (color: any) => {
    setBgColor(color.hex);
    handleChange && handleChange(bgColor);
  }

  return (
    <>
      <Button
        variant='secondary'
        size='sm'
        className='p-2'
        onClick={() => setDisplayColorPicker(!displayColorPicker)}
      >
        <div className='rounded-md w-20 h-full' style={{ backgroundColor: bgColor }} />
      </Button>
      {displayColorPicker ? (
        <>
          <div
            className='top-0 right-0 bottom-0 left-0 z-[9999] fixed'
            onClick={() => setDisplayColorPicker(false)}
          />
          <div className='top-12 right-2 z-[9999] absolute'>
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


export const ColorPickerButtonWithSetting = withSettingItem(ColorPickerButton);

