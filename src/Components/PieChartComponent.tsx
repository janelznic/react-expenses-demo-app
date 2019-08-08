import React, { useRef, useEffect } from 'react';
import { Expenses } from '../Interfaces'
import * as d3 from 'd3';

interface IProps {
  data: Expenses[];
  width: number;
  height: number;
  colors: Array<string>;
}

/* Component */
export const PieChartComponent = (props: IProps) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (props.data && d3Container.current) {
      const svg = d3.select(d3Container.current);

      const radius = Math.min(props.width, props.height) / 2;
      const color = d3.scaleOrdinal().range(props.colors);

      const vis = svg
        .append('svg') // create the SVG element inside the <body>
        .data([props.data]) // associate our data with the document
        .attr('width', props.width) // set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr('height', props.height)
        .append('g') // make a group to hold our pie chart
        .attr('transform', `translate(${radius}, ${radius})`); // move the center of the pie chart from 0, 0 to radius, radius

      const arc = d3
        .arc() // this will create <path> elements for us using arc data
        .innerRadius(0)
        .outerRadius(radius);

      const pie = d3
        .pie() // this will create arc data for us given a list of values
        .value((res: any) => res.value); // we must tell it out to access the value of each element in our data array

      const arcs = vis
        .selectAll('g.slice') // this selects all <g> elements with class slice (there aren't any yet)
        // @ts-ignore
        .data(pie) // associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
        .enter() // this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
        .append('g') // create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
        .attr('class', 'slice'); // allow us to style things in the slices (like text)

      arcs
        .append('path')
        .attr('fill', (res: Expenses, i: any) => color(i)) // set the color for each slice to be chosen from the color function defined above
        .attr('d', arc); // this creates the actual SVG path using the associated data (pie) with the arc drawing function

      arcs
        .append('text') // add a label to each slice
        .attr('transform', (res: any) => {
          // set the label's origin to the center of the arc
          // we have to make sure to set these before calling arc.centroid
          res.innerRadius = 0;
          res.outerRadius = radius;
          return `translate(${arc.centroid(res)})`; // this gives us a pair of coordinates like [50, 50]
        })
        .attr('text-anchor', 'middle') //center the text on it's origin
        .text((res: Expenses) => res.value); // get the label from our original data array
    }
  }, [props.data, props.width, props.height, props.colors]);

  return <svg className="d3-component" width={props.width} height={props.height} ref={d3Container} />;
};
