import presetEnv from "postcss-preset-env";

export default {
  plugins: [
    presetEnv({
      stage: 2,
      features: {
        "nesting-rules": true,
        "custom-properties": false,
        "cascade-layers": false,
        "is-pseudo-class": false,
      },
      browsers: [
        ">= 0.25%",
        "last 2 versions",
        "not dead",
        "Chrome >= 69",
        "Firefox >= 68",
        "Safari >= 12",
      ],
    }),
  ],
};
