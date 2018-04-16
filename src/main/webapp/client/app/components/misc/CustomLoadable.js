// https://github.com/thejameskyle/react-loadable
// import React from "react";
import Loadable from "react-loadable";
import Loader from "./Loader";

import { immutableObjectMerge } from "../../helpers/util";

export default options =>
  Loadable(
    immutableObjectMerge(
      {
        loading: Loader,
        delay: 0,
        timeout: 20000 // 20 sec
      },
      options
    )
  );
