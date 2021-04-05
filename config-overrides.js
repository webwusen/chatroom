const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  // add an alias for "ag-grid-react" imports
  addWebpackAlias({
    "@": path.resolve(__dirname, "./src"),
  })
);
