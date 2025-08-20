# Digital WWW PWA

<a href="https://lakesoffire.org/" target="_blank" rel="noreferrer"><img alt="Lakes of Fire: Great Lakes Regional Burn" src="https://lakesoffire.org/wp-content/uploads/2024/01/LoF_Logo.png" width="452" height="417"></a>

Lakes of Fire Digital What Where When Guide

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/next?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or run `yarn run nx graph` to visually explore what was created. Now, let's get you up to speed!

## Development Environment Quick Start

1. [Install NVM on your development machine](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script)
2. In your project directory, run `nvm install`. This will install the node version specified in .nvmrc to ensure we're all on the same version.
3. Install the yarn package manager: `npm install --global yarn`
4. Get the latest project dependencies by running `yarn install`

## VSCode Quick Start

1. Install [VSCode](https://code.visualstudio.com/Download)
2. Install [Docker Desktop](https://www.docker.com/get-started/)
3. Install the Dev Containers plugin for VSCode `ms-vscode-remote.remote-containers`
4. In VSCode open **Dev Containers: Reopen in Container**

VSCode will load a dev container with the correct version of Node.js, Postgres, the standard plugins, and run `yarn install` and TypeORM migrations on startup.

## Run Postgres in your local environment

If you are not using the VSCode dev container, you will need to bootstrap Postgres with docker-compose

First, override the hostname in `.env.local`

```sh
echo "TYPEORM_HOST=localhost" >> .env.local
```

Now you can bootstrap Postgres. See the Docker Desktop link above if you neeed to install it.

```sh
docker compose up -d postgres
```

Run the TypeORM migrations to configure entities:

```sh
yarn db:migrate:local
```

To stop the postgres container:

```sh
docker compose stop
```

## Run the development server

To run the UI server for your app, with service workers disabled, run:

```sh
yarn serve
```

To run both the UI and API server, with service workers disabled, run:

> [!WARNING]
> The API will throw an error if VPATE_JWT_SECRET env variable is not set.

```sh
yarn serve:uiapi
```

To run the UI with service workers enabled, run:

```sh
yarn serve:sw
```

If everything runs correctly, you should be able to view the development app at [http://localhost:4200](http://localhost:4200).

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
yarn run nx g @nx/next:app demo
```

To generate a new library, use:

```sh
yarn run nx g @nx/react:lib mylib
```

You can use `yarn run nx list` to get a list of installed plugins. Then, run `yarn run nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/next?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
