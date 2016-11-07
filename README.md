# Cadasta API Docs

The Cadasta API docs provide documentation for Cadasta's REST API. The API docs are using [Docbox](https://github.com/mapbox/docbox), a React app that compiles Markdown documents into an HTML website. 

## Contributing

To edit contents of the documentation you have to edit Markdown files that live in [`content`](https://github.com/Cadasta/api-docs/tree/master/content). 

See [Docbox documentation](https://github.com/mapbox/docbox#writing-documentation) for further information.


## Installing and compiling docs locally

To view what your changes will look like on the website you need to compile the docs and run a local web server. [Follow docbox instructions](https://github.com/mapbox/docbox#development) to learn how to install and run the docs locally.


## Deployment

We host API docs on [Github pages](https://pages.github.com/); the current live site is pushed to `gh-pages` branch. There is a shell script that simplifies deployment. 

The script

1. Compiles the markdown files into an HTML website.
2. Clones the `gh-pages` branch into a new directory.
3. Copies the compiled HTML website into that directory.
4. Commits and pushes the contents to `gh-pages` (if there are changes).

To deploy API docs to `gh-pages` run:

```bash
./deploy.sh
```

**NOTE:** Using the shell script will only work if you have set up [SSH for Github](https://help.github.com/articles/which-remote-url-should-i-use/#cloning-with-ssh-urls) correctly. 
