export function cn(...args) {
  const styles = Array.isArray(args[0]) ? args[0] : Array.from(args);
  return styles.join(' ');
}