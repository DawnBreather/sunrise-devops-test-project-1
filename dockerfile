FROM ubuntu:18.04
RUN apt update
RUN apt install curl mongodb git -y
RUN mkdir -p ~/.ssh
#RUN chmod 777 -R ./ssh

ADD id_rsa ~/.ssh/

#RUN ssh-agent ./ssh

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Set debconf to run non-interactively
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

# Install base dependencies
RUN apt-get update && apt-get install -y -q --no-install-recommends \
        apt-transport-https \
        build-essential \
        ca-certificates \
        curl \
        git \
        libssl-dev \
        wget \
    && rm -rf /var/lib/apt/lists/*

#ENV NVM_DIR /root/.nvm
#ENV NODE_VERSION 11.12.0

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

ENV NVM_DIR /root/.nvm
ENV NODE_VERSION 11.12.0

RUN echo `whoami`
RUN echo $HOME
RUN ls -la $HOME

RUN . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH

RUN export NVM_DIR="$HOME/.nvm"
RUN [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
RUN [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

RUN git clone git@github.com:DawnBreather/sunrise-devops-test-project-1.git

#RUN rm ./tmp/id_rsa

RUN nvm install stable
RUN cd sunrise-devops-test-project-1 && npm install && npm run demon
EXPOSE 3000
