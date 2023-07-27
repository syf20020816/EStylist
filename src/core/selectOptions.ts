import { BorderType } from "./baseModel";

export const Direction = [
  {
    value: "x",
    label: "x",
  },
  {
    value: "y",
    label: "y",
  },
];
export const FontFamily = [
  {
    value: "Helvetica",
    label: "Helvetica",
  },
  {
    value: "Arial Narrow",
    label: "Arial Narrow",
  },
  {
    value: "Verdana",
    label: "Verdana",
  },
  {
    value: "Arial",
    label: "Arial",
  },
  {
    value: "Franklin Gothic Medium",
    label: "Franklin Gothic Medium",
  },
];

export const ModelTypes = [
  {
    value: "div",
    label: "文字",
  },
  {
    value: "img",
    label: "图片",
  },
  {
    value: "a",
    label: "链接",
  },
];

export const TextAlign = [
  {
    value: "left",
    label: "left",
  },
  {
    value: "right",
    label: "right",
  },
  {
    value: "center",
    label: "center",
  },
  {
    value: "justify",
    label: "justify",
  },
];

export const JustifyContent = [
  {
    value: "start",
    label: "start",
  },
  {
    value: "end",
    label: "end",
  },
  {
    value: "center",
    label: "center",
  },
  {
    value: "baseline",
    label: "baseline",
  },
];

export const BorderTypes = [
  {
    label: "solid",
    value: BorderType.solid,
  },
  {
    label: "dashed",
    value: BorderType.dashed,
  },
  {
    label: "dotted",
    value: BorderType.dotted,
  },
  {
    label: "double",
    value: BorderType.double,
  },
];
