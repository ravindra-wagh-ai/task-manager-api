FROM bitnami/node
ARG ACCESS_KEY_ID
ARG SECRET_ACCESS_KEY 
ARG REGION
ARG PORT
ARG SECRET_NAME
ENV ACCESS_KEY_ID=${ACCESS_KEY_ID}
ENV SECRET_ACCESS_KEY=${SECRET_ACCESS_KEY}
ENV REGION=${REGION}
ENV PORT=80
ENV SECRET_NAME=${SECRET_NAME}
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN ls -al
COPY . .
RUN npm i --save-dev typescript
RUN npm run build
EXPOSE 80
CMD npm start