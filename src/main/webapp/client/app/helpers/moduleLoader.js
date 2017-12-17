import { contains } from "./util";

const importModulesOnDemand = (location, action) => {
  if (action === "PUSH") {
    if (contains(location.pathname, "about")) {
      import(/* webpackChunkName: "brandspage" */ "../components/brands")
        .then(module => module)
        .catch(chunkLoadFailed);
    }
  }
};

export function chunkLoadFailed(err) {
  console.error("Failed to load chunk => " + err);
}

export function importModules(history) {
  // Load immediate dependencies => modules required in all pages
  import(/* webpackChunkName: "searchpage" */ "../components/search")
    .then(module => module)
    .catch(chunkLoadFailed);

  // Load current page immediate dependencies => load accessible modules from the page
  history.listen(importModulesOnDemand);
}
