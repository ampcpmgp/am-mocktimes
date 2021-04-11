import { addParameters } from "@storybook/svelte";
import "modern-css-reset";

addParameters({
  backgrounds: [
    { name: "grey", value: "#ccc" },
    { name: "lightgreen", value: "lightgreen" },
  ],
});
