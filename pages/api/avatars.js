import { ImageResponse } from "@vercel/og";
import { SvgBuilder } from "svg-builder";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "edge",
};

const colors = [
  "#ffc857",
  "#e9724c",
  "#c5283d",
  "#481d24",
  "#255f85",
  "#edffec",
  "#61e786",
  "#5a5766",
  "#48435c",
  "#9792e3",
] as const;

function randomColor(seed) {
  return colors[random(0, colors.length, seed)];
}

function random(min, max, seed) {
  return Math.floor(min + (max - min) * seed);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const svg = new SvgBuilder({
    width: 100,
    height: 100,
  });

  svg.rect({
    width: "100%",
    height: "100%",
    fill: randomColor(Math.random()),
  });

  svg.circle({
    cx: random(20, 40, Math.random()),
    cy: random(20, 40, Math.random() / 2),
    r: random(1, 9, Math.random()),
    fill: "black",
  });

  svg.circle({
    cx: random(60, 80, Math.random()),
    cy: random(20, 40, Math.random()),
    r: random(1, 9, Math.random()),
    fill: "black",
  });

  svg.path({
    d: `M ${random(20, 40, Math.random())} ${random(
      40,
      60,
      Math.random()
    )} Q ${random(30, 50, Math.random())} ${random(
      50,
      70,
      Math.random()
    )} ${random(60, 80, Math.random())} ${random(40, 60, Math.random())}`,
    stroke: "black",
    "stroke-width": random(1, 9, Math.random()),
    fill: "none",
  });

  const svgString = svg.toString();

  return new ImageResponse(svgString, {
    width: 100,
    height: 100,
  }).send(res);
}
