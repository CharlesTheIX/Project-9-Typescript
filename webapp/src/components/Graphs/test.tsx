'use client';

const Graph: React.FC = () => {
  // Example data
  const data = [20, 40, 35, 50, 30, 60, 80];

  // SVG dimensions and padding
  const width = 600;
  const height = 300;
  const padding = 40;

  // Step between points
  const stepX = (width - 2 * padding) / (data.length - 1);

  // Max Y for scaling
  const maxY = Math.max(...data);

  // Convert data points to SVG coordinates
  const points = data.map((val, i) => {
    const x = padding + i * stepX;
    const y = height - padding - (val / maxY) * (height - 2 * padding);
    return `${x},${y}`;
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>SVG Graph (No Dependencies)</h1>
      <svg width={width} height={height} style={{ border: '1px solid #ccc' }}>
        {/* Axes */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#ccc" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#ccc" />

        {/* Line path */}
        <polyline
          fill="none"
          stroke="#0070f3"
          strokeWidth="2"
          points={points.join(' ')}
        />

        {/* Data points */}
        {points.map((pt, i) => {
          const [x, y] = pt.split(',').map(Number);
          return <circle key={i} cx={x} cy={y} r="4" fill="#0070f3" />;
        })}
      </svg>
    </div>
  );
}

export default Graph;