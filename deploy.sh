name=task-service
PORT=8001
SALT=14
READER_HOST=localhost
WRITER_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=Witbdc#2.0
DB_NAME=taskdb

#Build docker image and run it
docker build -t $name . --build-arg PORT = $PORT --build-arg SALT = $SALT --build-arg READER_HOST = $READER_HOST --build-arg WRITER_HOST = $WRITER_HOST --build-arg DB_PORT = $DB_PORT --build-arg DB_USER = $DB_USER --build-arg DB_PASS = $DB_PASS --build-arg DB_NAME = $DB_NAME
docker run -d -it -p 80:80 --name $name --restart always $name
id=$(docker ps -qf "name=$name")
echo "Docker container ($id) is up and running"
exit
