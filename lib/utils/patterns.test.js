import test from "ava";
import * as patterns from "./patterns";

test("getActionKeys", t => {
  t.deepEqual(
    patterns.getActionKeys({
      action: [],
    }),
    ["action"]
  );

  t.deepEqual(patterns.getActionKeys(["sleep", 1000]), []);

  t.deepEqual(patterns.getActionKeys([["sleep", 1000]]), []);
});
