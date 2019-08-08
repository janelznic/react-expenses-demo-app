import React, { useRef, useEffect } from 'react';
import { Expenses } from '../Interfaces'
import * as d3 from 'd3';

interface IProps {
  data: Expenses[];
  width: number;
  height: number;
  colors: Array<string>;
}

export const PieChartComponent = (props: IProps) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (props.data && d3Container.current) {
      const svg: any = d3.select(d3Container.current);

      const radius: number = Math.min(props.width, props.height) / 2;
      const color: any = d3.scaleOrdinal().range(props.colors);

      const vis: any = svg
        .append('svg')
        .data([props.data])
        .attr('width', props.width)
        .attr('height', props.height)
        .append('g')
        .attr('transform', `translate(${radius}, ${radius})`);

      const arc: any = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius);

      const pie: any = d3
        .pie()
        .value((res: any) => res.value);

      const arcs: any = vis
        .selectAll('g.slice')
        // @ts-ignore
        .data(pie)
        .enter()
        .append('g')
        .attr('class', 'slice');

      arcs
        .append('path')
        .attr('fill', (res: Expenses, i: any) => color(i))
        .attr('d', arc);

      arcs
        .append('text')
        .attr('transform', (res: any) => {
          res.innerRadius = 0;
          res.outerRadius = radius;
          return `translate(${arc.centroid(res)})`;
        })
        .attr('text-anchor', 'middle')
        .attr('style', 'z-index: 1000;')
        .text((res: any) => {
          if (res.value > 0) {
            return res.data.label;
          }
        })
          .append('tspan')
            .attr('x', 0)
            .attr('dy', '1.2em')
            .text((res: any) => {
              if (res.value > 0) {
                return `(${res.value})`;
              }
            });
    }
  }, [props.data, props.width, props.height, props.colors]);

  return <svg className="d3-component" width={props.width} height={props.height} ref={d3Container} />;
};
