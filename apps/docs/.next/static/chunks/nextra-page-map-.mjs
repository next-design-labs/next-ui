import meta from "../../../pages/_meta.ts";
import components_meta from "../../../pages/components/_meta.ts";
import documentation_meta from "../../../pages/documentation/_meta.ts";
import examples_meta from "../../../pages/examples/_meta.ts";
export const pageMap = [{
  data: meta
}, {
  name: "components",
  route: "/components",
  children: [{
    data: components_meta
  }, {
    name: "button",
    route: "/components/button",
    frontMatter: {
      "sidebarTitle": "Button"
    }
  }]
}, {
  name: "documentation",
  route: "/documentation",
  children: [{
    data: documentation_meta
  }, {
    name: "accessibility",
    route: "/documentation/accessibility",
    frontMatter: {
      "sidebarTitle": "Accessibility"
    }
  }, {
    name: "changelog",
    route: "/documentation/changelog",
    frontMatter: {
      "sidebarTitle": "Changelog"
    }
  }, {
    name: "colors",
    route: "/documentation/colors",
    frontMatter: {
      "sidebarTitle": "Colors"
    }
  }, {
    name: "forms",
    route: "/documentation/forms",
    frontMatter: {
      "sidebarTitle": "Forms"
    }
  }, {
    name: "get-started",
    route: "/documentation/get-started",
    frontMatter: {
      "sidebarTitle": "Get Started"
    }
  }, {
    name: "introduction",
    route: "/documentation/introduction",
    frontMatter: {
      "sidebarTitle": "Introduction"
    }
  }, {
    name: "layout",
    route: "/documentation/layout",
    frontMatter: {
      "sidebarTitle": "Layout"
    }
  }, {
    name: "styling",
    route: "/documentation/styling",
    frontMatter: {
      "sidebarTitle": "Styling"
    }
  }, {
    name: "theme",
    route: "/documentation/theme",
    frontMatter: {
      "sidebarTitle": "Theme"
    }
  }, {
    name: "tokens",
    route: "/documentation/tokens",
    frontMatter: {
      "sidebarTitle": "Tokens"
    }
  }, {
    name: "typography",
    route: "/documentation/typography",
    frontMatter: {
      "sidebarTitle": "Typography"
    }
  }]
}, {
  name: "examples",
  route: "/examples",
  children: [{
    data: examples_meta
  }, {
    name: "example",
    route: "/examples/example",
    frontMatter: {
      "sidebarTitle": "Example"
    }
  }]
}, {
  name: "index",
  route: "/",
  frontMatter: {
    "sidebarTitle": "Index"
  }
}];