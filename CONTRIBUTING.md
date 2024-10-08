# Contributing

First off, thank you for considering contributing to aVToolz. It's people like you that make aVToolz such a great tool.

No matter how big or small, any contribution is welcome and highly appreciated.

Following are the steps to contribute to this project:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Push to the branch
6. Create a new Pull Request
7. Wait for the review
8. Get your changes merged
9. Celebrate your success 🎉

# Development

Choose any of the below methods to start working on this project:

## Develop using Devcontainers (Recommended)

### Requirements

1.  [VSCode](https://code.visualstudio.com/Download)
2.  [Git](https://git-scm.com/)
3.  [Docker](https://docs.docker.com/engine/install/)

### Instructions

1.  Make sure all the `requirements` are installed.
1.  Clone the repository

        ```bash
        git clone https://github.com/a0v0/avtoolz && cd avtoolz
        ```

1.  Open the repo in VSCode
1.  Install this VSCode extension: [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
1.  Press `F1` and select `Dev Container: Open Folder in Container`
1.  Wait for the development container to build.
1.  Run `task dev` in the terminal to start the development server.

## Develop natively

### Requirements

1.  [VSCode](https://code.visualstudio.com/Download)
2.  [Git](https://git-scm.com/)
3.  [Node](https://nodejs.org/en/download/package-manager) (see [.node-version](.node-version) to see which version to install)
4.  [pnpm](https://pnpm.io/)
5.  [Taskfile](https://taskfile.dev/)

### Instructions

1.  Install project dependencies

    ```bash
    task install
    ```

1.  Start the development server

    ```
    task run
    ```

---

Got a question or stuck with a problem? Ask on [Github Discussions](https://github.com/a0v0/avtoolz/discussions)
