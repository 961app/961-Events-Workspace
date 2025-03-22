import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';

interface ChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors: string[];
  valueFormatter?: (value: number) => string;
}

export function BarChart({ data, index, categories, colors, valueFormatter }: ChartProps) {
  return (
    <ResponsiveBar
      data={data}
      keys={categories}
      indexBy={index}
      margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
      padding={0.3}
      colors={colors}
      axisBottom={{
        tickSize: 0,
        tickPadding: 16,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 16,
        format: valueFormatter,
      }}
      gridYValues={4}
      theme={{
        grid: {
          line: {
            stroke: '#f3f4f6',
          },
        },
        axis: {
          ticks: {
            text: {
              fill: '#6b7280',
              fontSize: 12,
            },
          },
        },
      }}
      valueFormat={valueFormatter}
      tooltip={({ value, color }) => (
        <div
          style={{
            padding: 12,
            background: '#fff',
            borderRadius: 4,
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          }}
        >
          <span style={{ backgroundColor: color, width: 12, height: 12, display: 'inline-block', marginRight: 6, borderRadius: 2 }} />
          <strong>{valueFormatter ? valueFormatter(value) : value}</strong>
        </div>
      )}
    />
  );
}

export function LineChart({ data, index, categories, colors, valueFormatter }: ChartProps) {
  const lineData = categories.map((category) => ({
    id: category,
    data: data.map((d) => ({
      x: d[index],
      y: d[category],
    })),
  }));

  return (
    <ResponsiveLine
      data={lineData}
      margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
      colors={colors}
      axisBottom={{
        tickSize: 0,
        tickPadding: 16,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 16,
        format: valueFormatter,
      }}
      gridYValues={4}
      pointSize={8}
      pointColor="#ffffff"
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      theme={{
        grid: {
          line: {
            stroke: '#f3f4f6',
          },
        },
        axis: {
          ticks: {
            text: {
              fill: '#6b7280',
              fontSize: 12,
            },
          },
        },
      }}
      useMesh={true}
      tooltip={({ point }) => (
        <div
          style={{
            padding: 12,
            background: '#fff',
            borderRadius: 4,
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          }}
        >
          <span style={{ backgroundColor: point.serieColor, width: 12, height: 12, display: 'inline-block', marginRight: 6, borderRadius: 2 }} />
          <strong>{valueFormatter ? valueFormatter(point.data.yFormatted) : point.data.yFormatted}</strong>
        </div>
      )}
    />
  );
}