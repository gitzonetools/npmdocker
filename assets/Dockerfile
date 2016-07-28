FROM hosttoday/ht-docker-node:npmts
COPY ./buildContextDir /workspace
WORKDIR /workspace
ENV CI=true
CMD ["npm","test"];
