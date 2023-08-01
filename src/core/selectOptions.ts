import { BorderType } from "./baseModel";
import { I18n } from "./i18n";

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
    label: {
      zh: "文字",
      en: "Font",
    } as I18n,
  },
  {
    value: "img",
    label: {
      zh: "图片",
      en: "Image",
    } as I18n,
  },
  {
    value: "a",
    label: {
      zh: "链接",
      en: "Link",
    } as I18n,
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
