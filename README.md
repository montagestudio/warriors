Warriors
==============

This is the Montage app template.

run `npm install` to grab the dependencies

run `gulp` to run server / css injection / auto-reload

Layout
------

The template contains the following files and directories:

* `index.html`
* `package.json` – Describes your app and its dependencies
* `README.markdown` – This readme. Replace the current content with a description of your app
* `ui/` – Directory containing all the UI .reel directories.
  * `main.reel` – The main interface component
* `core/` – Directory containing all core code for your app.
* `node_modules/` – Directory containing all npm packages needed, including Montage. Any packages here must be included as `dependencies` in `package.json` for the Montage require to find them.
* `assets/` – Assets such as global styles and images for your app

Create the following directories if you need them:

* `locale/` – Directory containing localized content.
* `lib/` – Directory containing other JS libraries. If a library doesn’t support the CommonJS "exports" object it will need to be loaded through a `<script>` tag.
* `test/` – Directory containing tests for your app.
