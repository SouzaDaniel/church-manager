import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type Cn = (...inputs: ClassValue[]) => string;
export const cn: Cn = (...inputs) => twMerge(clsx(inputs));
