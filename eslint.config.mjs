import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: ["jest.config.js"] },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Ordinary apostrophes/quotes in copy render fine unescaped; this rule
      // would force HTML-entity-encoding routine text across every page.
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
