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

## Requirements

<!-- - [Docker](https://www.docker.com/) -->

- [VSCode](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en/)
- [Taskfile](https://taskfile.dev/#/installation)
- [pnpm](https://pnpm.io/)

## Running Locally

1.  Clone the repository

        ```bash
        git clone https://github.com/a0v0/avtoolz && cd avtoolz
        ```

<!-- 2. Install this VSCode extension: [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
2.  Press `F1` and select `Dev Container: Open Folder in Container`
3.  Wait for the development container to build
4.  Press `F5` or run `task dev` in the terminal to start the development server. -->

5.  Install dependencies

    ```bash
    task install
    ```

6.  Start the development server

    ```
    task run
    ```

    For more commands, see [Taskfile](./Taskfile.yml)
