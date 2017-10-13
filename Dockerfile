FROM hosttoday/ht-docker-node:stable
LABEL author="Lossless GmbH <office@lossless.com>"

RUN yarn global add npmci npmdocker npmts ts-node