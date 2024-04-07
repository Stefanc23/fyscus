'use client';

import { IconPickerItem } from 'react-icons-picker';

export type IconPickerProp = {
  value: string;
  size?: number;
};

const IconPicker: React.FC<IconPickerProp> = ({ value, size = 24 }) => {
  return <IconPickerItem value={value} size={size} color="#0086ff" />;
};

export default IconPicker;
