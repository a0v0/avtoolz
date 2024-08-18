FROM mcr.microsoft.com/playwright:v1.44.1-jammy

RUN apt update 
# Install homebrew
# RUN apt-get update && \
#     apt-get install -y -q --allow-unauthenticated \
#     git \
#     sudo \
#     build-essential \
#     unzip
# RUN useradd -m -s /bin/zsh linuxbrew && \
#     usermod -aG sudo linuxbrew &&  \
#     mkdir -p /home/linuxbrew/.linuxbrew && \
#     chown -R linuxbrew: /home/linuxbrew/.linuxbrew
# USER linuxbrew
# RUN /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
# USER root
# RUN chown -R $CONTAINER_USER: /home/linuxbrew/.linuxbrew
# ENV PATH="/home/linuxbrew/.linuxbrew/bin:${PATH}"
# RUN git config --global --add safe.directory /home/linuxbrew/.linuxbrew/Homebrew
# USER linuxbrew

# Install deps
# RUN brew install go-task
# RUN brew install node@22 pnpm

# Reset user
# USER root

# Set environment variables
# RUN echo 'export PATH=$PATH:.fvm/flutter_sdk/bin' >> ~/.profile
# RUN echo 'export PATH=$PATH:~/.pub-cache/bin' >> ~/.profile


# Playwright dependencies
RUN apt-get install -y xvfb
RUN apt-get install -qqy x11-apps

# chromium dependencies
# RUN apt-get install -y libnss3 \
#                        libxss1 \
#                        libasound2 \
#                        fonts-noto-color-emoji

# additional actions related to your project
ENTRYPOINT ["/bin/sh", "-c", "/usr/bin/xvfb-run -a $@", ""]