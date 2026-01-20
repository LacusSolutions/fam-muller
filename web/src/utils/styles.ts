export type ClassValue =
  | boolean
  | ClassValue[]
  | null
  | Record<string, boolean | null | undefined>
  | string
  | undefined;

export function clsx(...classValues: ClassValue[]): string {
  const classNames: string[] = [];

  for (const value of classValues) {
    if (!value) {
      continue;
    }

    if (typeof value === 'string' && value.trim()) {
      classNames.push(value);
    } else if (Array.isArray(value)) {
      classNames.push(clsx(value));
    } else if (typeof value === 'object') {
      for (const [className, condition] of Object.entries(value)) {
        if (condition) {
          classNames.push(className);
        }
      }
    }
  }

  return classNames.join(' ');
}
