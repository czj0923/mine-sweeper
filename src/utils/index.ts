//范围内生成随机整数 [min,max)
export function getRandom(min: number, max: number): [number, number] {
  const x = Math.floor(Math.random() * min);
  const y = Math.floor(Math.random() * max);
  return [x, y];
}
