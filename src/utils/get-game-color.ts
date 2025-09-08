import convert from 'color-convert';

export function getGameColor(color: number) {
  // GameMaker uses 8-bit HSV values https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Drawing/Colour_And_Alpha/make_colour_hsv.htm
  const raw = convert.hsv.hex([(color * 8 * 360) / 255, 100, 100]);
  return `#${raw}`;
}
