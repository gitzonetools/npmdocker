FROM hosttoday/ht-docker-node:npmci
RUN yarn global add @gitzone/tsdocker
COPY ./ /workspace
WORKDIR /workspace
ENV CI=true
CMD ["tsdocker","runinside"];
