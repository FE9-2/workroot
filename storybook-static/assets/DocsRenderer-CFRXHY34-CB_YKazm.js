const __vite__mapDeps = (i, m = __vite__mapDeps, d = m.f || (m.f = ["./index-BrnU7xv7.js", "./index-DJO9vBfz.js"])) =>
  i.map((i) => d[i]);
import { _ as c } from "./iframe-zchCIFEx.js";
import { R as e, r as p } from "./index-DJO9vBfz.js";
import { ae as l, af as u, ag as h, ah as E } from "./index-DfkMsJpm.js";
import { renderElement as d, unmountElement as x } from "./react-18-BWhC85Cb.js";
import "../sb-preview/runtime.js";
import "./index-DJdX7xnk.js";
import "./index-j_8AUxV0.js";
import "./index-DrFu-skq.js";
var _ = { code: l, a: u, ...h },
  D = class extends p.Component {
    constructor() {
      super(...arguments), (this.state = { hasError: !1 });
    }
    static getDerivedStateFromError() {
      return { hasError: !0 };
    }
    componentDidCatch(t) {
      let { showException: r } = this.props;
      r(t);
    }
    render() {
      let { hasError: t } = this.state,
        { children: r } = this.props;
      return t ? null : e.createElement(e.Fragment, null, r);
    }
  },
  A = class {
    constructor() {
      (this.render = async (t, r, n) => {
        let s = { ..._, ...(r == null ? void 0 : r.components) },
          a = E;
        return new Promise((m, i) => {
          c(
            async () => {
              const { MDXProvider: o } = await import("./index-BrnU7xv7.js");
              return { MDXProvider: o };
            },
            __vite__mapDeps([0, 1]),
            import.meta.url
          )
            .then(({ MDXProvider: o }) =>
              d(
                e.createElement(
                  D,
                  { showException: i, key: Math.random() },
                  e.createElement(o, { components: s }, e.createElement(a, { context: t, docsParameter: r }))
                ),
                n
              )
            )
            .then(() => m());
        });
      }),
        (this.unmount = (t) => {
          x(t);
        });
    }
  };
export { A as DocsRenderer, _ as defaultComponents };
