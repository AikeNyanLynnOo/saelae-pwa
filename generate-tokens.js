import { register } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";
import { transforms } from "style-dictionary/enums";

// will register them on StyleDictionary object
// that is installed as a dependency of this package.
register(StyleDictionary);

const generateTokens = async ({ sourceGlob, buildPath, destination }) => {
  const sd = new StyleDictionary({
    source: [sourceGlob],
    // preprocessors: ["tokens-studio"], // <-- since 0.16.0 this must be explicit
    platforms: {
      js: {
        transformGroup: "js", // <-- apply the tokens-studio transformGroup to apply all transforms
        transforms: transforms.nameCamel,
        buildPath: buildPath || "src/lib/",
        files: [
          {
            destination: "tokens.ts",
            format: "javascript/es6",
          },
        ],
      },

      css: {
        transformGroup: "tokens-studio", // <-- apply the tokens-studio transformGroup to apply all transforms
        transforms: ["name/kebab"], // <-- add a token name transform for generating token names, default is camel
        buildPath: buildPath || "src/lib/",
        files: [
          {
            destination: "tokens.css",
            format: "css/variables",
          },
        ],
      },
    },
  });

  await sd.cleanAllPlatforms();
  await sd.buildAllPlatforms();
};

generateTokens({
  sourceGlob: ["src/lib/*.json"],
});
