## Contributing

First off, thank you for considering contributing to aVToolz. It's people like you that make aVToolz great.

No matter how big or small, any contribution is welcome and highly appreciated.

Following are the steps to contribute to this project:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Write test cases for your changes
5. Commit your changes
6. Push to the branch
7. Create a new Pull Request
8. Wait for the review
9. Get your changes merged
10. Celebrate your success 🎉

## Setting up development environment

#### Requirements

1.  [VSCode](https://code.visualstudio.com/Download)
2.  [Git](https://git-scm.com/)
3.  [fnm](https://github.com/Schniz/fnm)
4.  [Taskfile](https://taskfile.dev/)

#### Instructions

1.  Install project dependencies

    ```bash
    task install
    ```

1.  Start the development server

    ```
    task run
    ```

<!-- ### With Devcontainers

> Playwright testing tools do not work in devcontainers.
> You can however still use the devcontainer for development and testing other tools.

#### Requirements

1.  [VSCode](https://code.visualstudio.com/Download)
2.  [Git](https://git-scm.com/)
3.  [Docker](https://docs.docker.com/engine/install/)

#### Instructions

1.  Make sure all the `requirements` are installed.
1.  Clone the repository

        ```bash
        git clone https://github.com/a0v0/avtoolz && cd avtoolz
        ```

1.  Open the repo in VSCode
1.  Install this VSCode extension: [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
1.  Press `F1` and select `Dev Container: Open Folder in Container`
1.  Wait for the development container to build.
1.  Run `task dev` in the terminal to start the development server. -->

## Important notes

### Adding a new tool

1. Update meta about new tool in [tools.tsx](src/config/tools.tsx) and [routes.ts](src/config/routes.ts)
1. Add code for new tool in `tools` directory inside `src/app` directory.
1. Write test cases for the new tool.
1. Update documentation if required.
1. Icon for the tools can be found in this [figma file](https://www.figma.com/design/Vo1SWIWLnCnmrnpnysrTyX/avtoolz-icons)

## Support

Got a question or stuck with a problem? Ask on [Github Discussions](https://github.com/a0v0/avtoolz/discussions)
