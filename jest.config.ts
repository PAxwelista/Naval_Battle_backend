import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node", // important pour backend, pas jsdom
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // si tu utilises des alias
  },
  verbose: true,
};

export default config;