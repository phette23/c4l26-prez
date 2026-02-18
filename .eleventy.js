import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight"

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight)

  // Copy static assets (automatically watches too)
  const dirs = ["src/css", "src/img", "src/js"]
  dirs.forEach(dir => {
    eleventyConfig.addPassthroughCopy(dir)
  })

  // Create a collection of all slides, sorted by order
  eleventyConfig.addCollection("slides", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/slides/*.md").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0)
    })
  })

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  }
}
