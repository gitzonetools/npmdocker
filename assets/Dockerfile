FROM hosttoday/ht-docker-node:npmci
RUN yarn global add npmdocker
COPY ./buildContextDir /workspace
WORKDIR /workspace
ENV CI=true
CMD ["npmdocker","runinside"];
