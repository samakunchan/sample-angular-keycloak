FROM node:24 as cache
# Step 1 Download npm dependencies and additionnal packages (chrome,etc.)
LABEL maintainer="cedric.badjah@emvista.com"
LABEL build=true

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install

# Installs latest Chromium package for test
# Les 3 runs suivants ne marchent plus. Le 4ème est la correction, mais je dois lancer les tests unitaires pour voir si ça fonctionne à 100%.
#RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
#RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
#RUN apt-get update && apt-get install -yq google-chrome-stable
# Install Chrome Stable when specified
RUN if [ -n "$CHROME_STABLE_VERSION" ]; then \
    wget -q -O /tmp/chrome.deb https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_STABLE_VERSION}-1_amd64.deb && \
    apt install -y /tmp/chrome.deb &&\
    rm /tmp/chrome.deb; \
  elif [ "$USE_CHROME_STABLE" = "true" ]; then \
    cd /tmp &&\
    wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb &&\
    dpkg -i google-chrome-stable_current_amd64.deb;\
  fi
RUN npm install -g @angular/cli@20

FROM cache as environment
#Step 2 Copy dev environment
COPY . .

FROM environment as test
RUN npm run test-ci


FROM test as build
RUN npm run build-prod


FROM nginx:1.29.1-alpine as docker_image

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
WORKDIR /usr/share/nginx/html

COPY src/assets/config/config.json .
COPY src/assets/config/application.json .
COPY --from=build /app/dist/d3-project/ .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
