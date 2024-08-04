name=scribesr-identity

#Build docker image and run it
docker build -t $name .
docker run -d -it -p 80:80 --name $name --restart always $name
id=$(docker ps -qf "name=$name")
echo "Docker container ($id) is up and running"
#iid=$(docker images $name -q)
#docker tag $iid 363780699952.dkr.ecr.ap-south-1.amazonaws.com/$name
#docker push 363780699952.dkr.ecr.ap-south-1.amazonaws.com/$name
exit
