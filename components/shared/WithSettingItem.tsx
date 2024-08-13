import React from 'react';

interface SettingItemProps {
  title: string;
  description: string;
}

const withSettingItem = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentWithSettingItem = (props: P & SettingItemProps) => {
    const { title, description, ...restProps } = props;

    return (
      <div className='flex justify-between items-center'>
        <div>
          <h3 className='text-base'>{title}</h3>
          <p className='text-muted-foreground text-sm'>{description}</p>
        </div>
        <div>
          <WrappedComponent {...(restProps as P)} />
        </div>
      </div>
    );
  };

  return ComponentWithSettingItem;
};

export default withSettingItem;

