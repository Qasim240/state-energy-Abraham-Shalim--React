// src/constants/categoryConfig.js
import {
  detailBanner, roof, solarPenels, collectionImg,
  // …any other images you already have
} from "../../../imagesPath";

export const CATEGORY_CONFIG = {
  ROOF: {
    banner: detailBanner,
    variants: ["Shingle", "Flat", "Metal", "Tile"],
    adders: ["Fascia", "Rain Gutters"],
    fields: [
      { name: "squareFootage", label: "Square Footage", type: "number", placeholder: "2000", unit: "sq ft" },
      { name: "color",          label: "Color",           type: "text",   placeholder: "Red"                },
    ],
  },

  SOLAR: {
    banner: solarPenels,
    variants: ["Roof-Mount", "Ground-Mount"],
    adders: ["Monitoring", "Optimizer", "Battery"],
    fields: [
      { name: "totalKW",    label: "Total System kW",  type: "number", placeholder: "6.5", unit: "kW" },
      { name: "panelBrand", label: "Panel Brand",      type: "text",   placeholder: "SunPower"        },
    ],
  },

  HVAC: {
    banner: collectionImg,
    variants: ["Split", "Package", "Ductless"],
    adders: ["Smart Thermostat"],
    fields: [
      { name: "area",        label: "Area Served",    type: "number", placeholder: "2500", unit: "sq ft" },
      { name: "seerRating",  label: "SEER Rating",    type: "number", placeholder: "18"                 },
    ],
  },

  // …add more categories here
};
