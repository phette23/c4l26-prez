module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/css")
  eleventyConfig.addPassthroughCopy("src/js")

  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("src/css/")

  // Create a collection of all slides, sorted by order
  eleventyConfig.addCollection("slides", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/slides/*.md").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0)
    })
  })

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  }
}
