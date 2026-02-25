# On Searching for Library Standards that Align with Library Values

[Code4Lib 2026](https://2026.code4lib.org/) presentation built with [Eleventy](https://www.11ty.dev/).

## Setup

```bash
pnpm install
```

Enable GitHub Pages for deployment:

1. Repository Settings → Pages
2. Under "Build and deployment", select "GitHub Actions" as the source

## Develop

Start the development server with live reload:

```bash
npm start
```

Visit `http://localhost:8080` to view the presentation.

## Build

Build the static site for production:

```bash
npm run build
```

The site is generated in the `_site` directory.

## Using the Presentation

### Slide View

The main presentation view displays one slide at a time.

**Keyboard shortcuts:**

- `→` `↓` `Space` `Page Down` - Next slide
- `←` `↑` `Page Up` - Previous slide
- `Home` or `Cmd/Ctrl + ←` - First slide
- `End` or `Cmd/Ctrl + →` - Last slide

You can also use the navigation buttons at the bottom of the screen.

### Print View

Visit `/print.html` or select **Print View** from the slides view to see the presentation on a single page, optimized for printing to PDF.

## Adding New Slides

1. Create a new Markdown file in `src/slides/`
2. Add frontmatter with an `order` field to control slide sequence

## License

[CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/deed.en)
