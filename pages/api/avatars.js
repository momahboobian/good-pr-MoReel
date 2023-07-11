import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

function random(min, max, seed) {
  return Math.floor(min + (max - min) * seed);
}

const colors = [
  // "#ffc857",
  // "#e9724c",
  // "#c5283d",
  // "#481d24",
  // "#255f85",
  // "#edffec",
  // "#61e786",
  // "#5a5766",
  // "#48435c",
  // "#9792e3",
];

function randomColor(seed) {
  return colors[random(0, colors.length, seed)];
}

export default function handler(req, res) {
  return new ImageResponse(
    (
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="30" cy="30" r="4" fill="black" />
        <circle cx="70" cy="30" r="4" fill="black" />
        <path
          d="M 30 50 Q 50 60 70 50"
          stroke="black"
          stroke-width="5"
          fill="none"
        />
      </svg>
    ),
    {
      width: 100,
      height: 100,
    }
  );
}
