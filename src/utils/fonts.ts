// src/utils/fonts.ts
// @ts-ignore
import MonaSansRegular from '../../fonts/MonaSans-Regular.ttf';
// @ts-ignore
import MonaSansMedium from '../../fonts/MonaSans-Medium.ttf';
// @ts-ignore
import MonaSansBold from '../../fonts/MonaSans-Bold.ttf';

export const fonts = [
  { name: 'MonaSans', data: MonaSansRegular, weight: 400 as const, style: 'normal' as const },
  { name: 'MonaSans', data: MonaSansMedium, weight: 500 as const, style: 'normal' as const },
  { name: 'MonaSans', data: MonaSansBold, weight: 700 as const, style: 'normal' as const },
];