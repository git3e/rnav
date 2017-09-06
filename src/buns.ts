const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
  angle = (angle - 90) * Math.PI / 180;
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle)
  };
};

const describeArc = (
  x: number,
  y: number,
  r: number,
  startAngle: number,
  endAngle: number,
  continueLine?: boolean
) => {
  const start: any = polarToCartesian(x, y, r, (startAngle %= 360));
  const end: any = polarToCartesian(x, y, r, (endAngle %= 360));
  const large = Math.abs(endAngle - startAngle) >= 180;
  const alter = endAngle > startAngle;
  return `${continueLine ? "L" : "M"}${start.x},${start.y},
    A${r},${r},0
    ${large ? 1 : 0},
    ${alter ? 1 : 0},
    ${end.x}, ${end.y}`;
};

export const describeSector = (
  x: number,
  y: number,
  r: number,
  r2: number,
  startAngle: number,
  endAngle: number
) => {
  return `${describeArc(x, y, r, startAngle, endAngle)}
  ${describeArc(x, y, r2, endAngle, startAngle, true)}Z`;
};
