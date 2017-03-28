FROM hosttoday/ht-docker-node:npmci
COPY ./buildContextDir /workspace
WORKDIR /workspace
ENV CI=true
CMD ["npmci","test","stable"];
