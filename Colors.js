const colorCombinations = [
{"light": "#ff9999", "mid": "#af2121", "dark": "#5b0000"},
{"light": "#ff9999", "mid": "#ff8800", "dark": "#5b0000"},
{"light": "#ff9999", "mid": "#ffd800", "dark": "#5b0000"},
{"light": "#ff9999", "mid": "#feff32", "dark": "#5b0000"},
{"light": "#ff9999", "mid": "#e1fe38", "dark": "#5b0000"},
{"light": "#ff9999", "mid": "#54e500", "dark": "#5b0000"},
{"light": "#ff9999", "mid": "#19ff47", "dark": "#5b0000"},
{"light": "#ff9999", "mid": "#00ffaa", "dark": "#5b0000"},
{"light": "#ff9999", "mid": "#32fff4", "dark": "#5b0000"},
{"light": "#ff9999", "mid": "#117ef2", "dark": "#5b0000"},
{"light": "#ff9999", "mid": "#0a9cd6", "dark": "#5b0000"},
{"light": "#ff9999", "mid": "#3b0aff", "dark": "#5b0000"},
{"light": "#ff9999", "mid": "#980aff", "dark": "#5b0000"},
{"light": "#ff9999", "mid": "#ff00ae", "dark": "#5b0000"},
{"light": "#ff9999", "mid": "#434364", "dark": "#5b0000"},
{"light": "#ff9999", "mid": "#666699", "dark": "#5b0000"},
{"light": "#ff9999", "mid": "#9696b9", "dark": "#5b0000"},
{"light": "#ff9999", "mid": "#4582b3", "dark": "#5b0000"},
{"light": "#ff9999", "mid": "#d1681d", "dark": "#5b0000"},
{"light": "#f7d3d3", "mid": "#ff8800", "dark": "#951d1d"},
{"light": "#f7d3d3", "mid": "#ffd800", "dark": "#951d1d"},
{"light": "#f7d3d3", "mid": "#feff32", "dark": "#951d1d"},
{"light": "#f7d3d3", "mid": "#e1fe38", "dark": "#951d1d"},
{"light": "#f7d3d3", "mid": "#54e500", "dark": "#951d1d"},
{"light": "#f7d3d3", "mid": "#19ff47", "dark": "#951d1d"},
{"light": "#f7d3d3", "mid": "#00ffaa", "dark": "#951d1d"},
{"light": "#f7d3d3", "mid": "#32fff4", "dark": "#951d1d"},
{"light": "#f7d3d3", "mid": "#117ef2", "dark": "#951d1d"},
{"light": "#f7d3d3", "mid": "#0a9cd6", "dark": "#951d1d"},
{"light": "#f7d3d3", "mid": "#3b0aff", "dark": "#951d1d"},
{"light": "#f7d3d3", "mid": "#980aff", "dark": "#951d1d"},
{"light": "#f7d3d3", "mid": "#ff00ae", "dark": "#951d1d"},
{"light": "#f7d3d3", "mid": "#434364", "dark": "#951d1d"},
{"light": "#f7d3d3", "mid": "#666699", "dark": "#951d1d"},
{"light": "#f7d3d3", "mid": "#9696b9", "dark": "#951d1d"},
{"light": "#f7d3d3", "mid": "#4582b3", "dark": "#951d1d"},
{"light": "#f7d3d3", "mid": "#d1681d", "dark": "#951d1d"},
{"light": "#ffd199", "mid": "#ffd800", "dark": "#663300"},
{"light": "#ffd199", "mid": "#feff32", "dark": "#663300"},
{"light": "#ffd199", "mid": "#e1fe38", "dark": "#663300"},
{"light": "#ffd199", "mid": "#54e500", "dark": "#663300"},
{"light": "#ffd199", "mid": "#19ff47", "dark": "#663300"},
{"light": "#ffd199", "mid": "#00ffaa", "dark": "#663300"},
{"light": "#ffd199", "mid": "#32fff4", "dark": "#663300"},
{"light": "#ffd199", "mid": "#117ef2", "dark": "#663300"},
{"light": "#ffd199", "mid": "#0a9cd6", "dark": "#663300"},
{"light": "#ffd199", "mid": "#3b0aff", "dark": "#663300"},
{"light": "#ffd199", "mid": "#980aff", "dark": "#663300"},
{"light": "#ffd199", "mid": "#ff00ae", "dark": "#663300"},
{"light": "#ffd199", "mid": "#434364", "dark": "#663300"},
{"light": "#ffd199", "mid": "#666699", "dark": "#663300"},
{"light": "#ffd199", "mid": "#9696b9", "dark": "#663300"},
{"light": "#ffd199", "mid": "#4582b3", "dark": "#663300"},
{"light": "#ffd199", "mid": "#d1681d", "dark": "#663300"},
{"light": "#fef8cc", "mid": "#feff32", "dark": "#997f00"},
{"light": "#fef8cc", "mid": "#e1fe38", "dark": "#997f00"},
{"light": "#fef8cc", "mid": "#54e500", "dark": "#997f00"},
{"light": "#fef8cc", "mid": "#19ff47", "dark": "#997f00"},
{"light": "#fef8cc", "mid": "#00ffaa", "dark": "#997f00"},
{"light": "#fef8cc", "mid": "#32fff4", "dark": "#997f00"},
{"light": "#fef8cc", "mid": "#117ef2", "dark": "#997f00"},
{"light": "#fef8cc", "mid": "#0a9cd6", "dark": "#997f00"},
{"light": "#fef8cc", "mid": "#3b0aff", "dark": "#997f00"},
{"light": "#fef8cc", "mid": "#980aff", "dark": "#997f00"},
{"light": "#fef8cc", "mid": "#ff00ae", "dark": "#997f00"},
{"light": "#fef8cc", "mid": "#434364", "dark": "#997f00"},
{"light": "#fef8cc", "mid": "#666699", "dark": "#997f00"},
{"light": "#fef8cc", "mid": "#9696b9", "dark": "#997f00"},
{"light": "#fef8cc", "mid": "#4582b3", "dark": "#997f00"},
{"light": "#fef8cc", "mid": "#d1681d", "dark": "#997f00"},
{"light": "#feff99", "mid": "#e1fe38", "dark": "#4c4c19"},
{"light": "#feff99", "mid": "#54e500", "dark": "#4c4c19"},
{"light": "#feff99", "mid": "#19ff47", "dark": "#4c4c19"},
{"light": "#feff99", "mid": "#00ffaa", "dark": "#4c4c19"},
{"light": "#feff99", "mid": "#32fff4", "dark": "#4c4c19"},
{"light": "#feff99", "mid": "#117ef2", "dark": "#4c4c19"},
{"light": "#feff99", "mid": "#0a9cd6", "dark": "#4c4c19"},
{"light": "#feff99", "mid": "#3b0aff", "dark": "#4c4c19"},
{"light": "#feff99", "mid": "#980aff", "dark": "#4c4c19"},
{"light": "#feff99", "mid": "#ff00ae", "dark": "#4c4c19"},
{"light": "#feff99", "mid": "#434364", "dark": "#4c4c19"},
{"light": "#feff99", "mid": "#666699", "dark": "#4c4c19"},
{"light": "#feff99", "mid": "#9696b9", "dark": "#4c4c19"},
{"light": "#feff99", "mid": "#4582b3", "dark": "#4c4c19"},
{"light": "#feff99", "mid": "#d1681d", "dark": "#4c4c19"},
{"light": "#f8fed6", "mid": "#54e500", "dark": "#839e00"},
{"light": "#f8fed6", "mid": "#19ff47", "dark": "#839e00"},
{"light": "#f8fed6", "mid": "#00ffaa", "dark": "#839e00"},
{"light": "#f8fed6", "mid": "#32fff4", "dark": "#839e00"},
{"light": "#f8fed6", "mid": "#117ef2", "dark": "#839e00"},
{"light": "#f8fed6", "mid": "#0a9cd6", "dark": "#839e00"},
{"light": "#f8fed6", "mid": "#3b0aff", "dark": "#839e00"},
{"light": "#f8fed6", "mid": "#980aff", "dark": "#839e00"},
{"light": "#f8fed6", "mid": "#ff00ae", "dark": "#839e00"},
{"light": "#f8fed6", "mid": "#434364", "dark": "#839e00"},
{"light": "#f8fed6", "mid": "#666699", "dark": "#839e00"},
{"light": "#f8fed6", "mid": "#9696b9", "dark": "#839e00"},
{"light": "#f8fed6", "mid": "#4582b3", "dark": "#839e00"},
{"light": "#f8fed6", "mid": "#d1681d", "dark": "#839e00"},
{"light": "#c1ff9e", "mid": "#19ff47", "dark": "#123300"},
{"light": "#c1ff9e", "mid": "#00ffaa", "dark": "#123300"},
{"light": "#c1ff9e", "mid": "#32fff4", "dark": "#123300"},
{"light": "#c1ff9e", "mid": "#117ef2", "dark": "#123300"},
{"light": "#c1ff9e", "mid": "#0a9cd6", "dark": "#123300"},
{"light": "#c1ff9e", "mid": "#3b0aff", "dark": "#123300"},
{"light": "#c1ff9e", "mid": "#980aff", "dark": "#123300"},
{"light": "#c1ff9e", "mid": "#ff00ae", "dark": "#123300"},
{"light": "#c1ff9e", "mid": "#434364", "dark": "#123300"},
{"light": "#c1ff9e", "mid": "#666699", "dark": "#123300"},
{"light": "#c1ff9e", "mid": "#9696b9", "dark": "#123300"},
{"light": "#c1ff9e", "mid": "#4582b3", "dark": "#123300"},
{"light": "#c1ff9e", "mid": "#d1681d", "dark": "#123300"},
{"light": "#d6fede", "mid": "#00ffaa", "dark": "#00991e"},
{"light": "#d6fede", "mid": "#32fff4", "dark": "#00991e"},
{"light": "#d6fede", "mid": "#117ef2", "dark": "#00991e"},
{"light": "#d6fede", "mid": "#0a9cd6", "dark": "#00991e"},
{"light": "#d6fede", "mid": "#3b0aff", "dark": "#00991e"},
{"light": "#d6fede", "mid": "#980aff", "dark": "#00991e"},
{"light": "#d6fede", "mid": "#ff00ae", "dark": "#00991e"},
{"light": "#d6fede", "mid": "#434364", "dark": "#00991e"},
{"light": "#d6fede", "mid": "#666699", "dark": "#00991e"},
{"light": "#d6fede", "mid": "#9696b9", "dark": "#00991e"},
{"light": "#d6fede", "mid": "#4582b3", "dark": "#00991e"},
{"light": "#d6fede", "mid": "#d1681d", "dark": "#00991e"},
{"light": "#9effde", "mid": "#32fff4", "dark": "#007f55"},
{"light": "#9effde", "mid": "#117ef2", "dark": "#007f55"},
{"light": "#9effde", "mid": "#0a9cd6", "dark": "#007f55"},
{"light": "#9effde", "mid": "#3b0aff", "dark": "#007f55"},
{"light": "#9effde", "mid": "#980aff", "dark": "#007f55"},
{"light": "#9effde", "mid": "#ff00ae", "dark": "#007f55"},
{"light": "#9effde", "mid": "#434364", "dark": "#007f55"},
{"light": "#9effde", "mid": "#666699", "dark": "#007f55"},
{"light": "#9effde", "mid": "#9696b9", "dark": "#007f55"},
{"light": "#9effde", "mid": "#4582b3", "dark": "#007f55"},
{"light": "#9effde", "mid": "#d1681d", "dark": "#007f55"},
{"light": "#ccfefc", "mid": "#117ef2", "dark": "#00998e"},
{"light": "#ccfefc", "mid": "#0a9cd6", "dark": "#00998e"},
{"light": "#ccfefc", "mid": "#3b0aff", "dark": "#00998e"},
{"light": "#ccfefc", "mid": "#980aff", "dark": "#00998e"},
{"light": "#ccfefc", "mid": "#ff00ae", "dark": "#00998e"},
{"light": "#ccfefc", "mid": "#434364", "dark": "#00998e"},
{"light": "#ccfefc", "mid": "#666699", "dark": "#00998e"},
{"light": "#ccfefc", "mid": "#9696b9", "dark": "#00998e"},
{"light": "#ccfefc", "mid": "#4582b3", "dark": "#00998e"},
{"light": "#ccfefc", "mid": "#d1681d", "dark": "#00998e"},
{"light": "#a7cffa", "mid": "#0a9cd6", "dark": "#053365"},
{"light": "#a7cffa", "mid": "#3b0aff", "dark": "#053365"},
{"light": "#a7cffa", "mid": "#980aff", "dark": "#053365"},
{"light": "#a7cffa", "mid": "#ff00ae", "dark": "#053365"},
{"light": "#a7cffa", "mid": "#434364", "dark": "#053365"},
{"light": "#a7cffa", "mid": "#666699", "dark": "#053365"},
{"light": "#a7cffa", "mid": "#9696b9", "dark": "#053365"},
{"light": "#a7cffa", "mid": "#4582b3", "dark": "#053365"},
{"light": "#a7cffa", "mid": "#d1681d", "dark": "#053365"},
{"light": "#d8f2fc", "mid": "#3b0aff", "dark": "#0072a3"},
{"light": "#d8f2fc", "mid": "#980aff", "dark": "#0072a3"},
{"light": "#d8f2fc", "mid": "#ff00ae", "dark": "#0072a3"},
{"light": "#d8f2fc", "mid": "#434364", "dark": "#0072a3"},
{"light": "#d8f2fc", "mid": "#666699", "dark": "#0072a3"},
{"light": "#d8f2fc", "mid": "#9696b9", "dark": "#0072a3"},
{"light": "#d8f2fc", "mid": "#4582b3", "dark": "#0072a3"},
{"light": "#d8f2fc", "mid": "#d1681d", "dark": "#0072a3"},
{"light": "#b5a3fe", "mid": "#980aff", "dark": "#15006b"},
{"light": "#b5a3fe", "mid": "#ff00ae", "dark": "#15006b"},
{"light": "#b5a3fe", "mid": "#434364", "dark": "#15006b"},
{"light": "#b5a3fe", "mid": "#666699", "dark": "#15006b"},
{"light": "#b5a3fe", "mid": "#9696b9", "dark": "#15006b"},
{"light": "#b5a3fe", "mid": "#4582b3", "dark": "#15006b"},
{"light": "#b5a3fe", "mid": "#d1681d", "dark": "#15006b"},
{"light": "#edd6fe", "mid": "#ff00ae", "dark": "#2c004c"},
{"light": "#edd6fe", "mid": "#ff00ae", "dark": "#5c009e"},
{"light": "#edd6fe", "mid": "#434364", "dark": "#2c004c"},
{"light": "#edd6fe", "mid": "#434364", "dark": "#5c009e"},
{"light": "#edd6fe", "mid": "#666699", "dark": "#2c004c"},
{"light": "#edd6fe", "mid": "#666699", "dark": "#5c009e"},
{"light": "#edd6fe", "mid": "#9696b9", "dark": "#2c004c"},
{"light": "#edd6fe", "mid": "#9696b9", "dark": "#5c009e"},
{"light": "#edd6fe", "mid": "#4582b3", "dark": "#2c004c"},
{"light": "#edd6fe", "mid": "#4582b3", "dark": "#5c009e"},
{"light": "#edd6fe", "mid": "#d1681d", "dark": "#2c004c"},
{"light": "#edd6fe", "mid": "#d1681d", "dark": "#5c009e"},
{"light": "#ff99de", "mid": "#434364", "dark": "#660045"},
{"light": "#ff99de", "mid": "#434364", "dark": "#930065"},
{"light": "#ff99de", "mid": "#666699", "dark": "#660045"},
{"light": "#ff99de", "mid": "#666699", "dark": "#930065"},
{"light": "#ff99de", "mid": "#9696b9", "dark": "#660045"},
{"light": "#ff99de", "mid": "#9696b9", "dark": "#930065"},
{"light": "#ff99de", "mid": "#4582b3", "dark": "#660045"},
{"light": "#ff99de", "mid": "#4582b3", "dark": "#930065"},
{"light": "#ff99de", "mid": "#d1681d", "dark": "#660045"},
{"light": "#ff99de", "mid": "#d1681d", "dark": "#930065"}
];