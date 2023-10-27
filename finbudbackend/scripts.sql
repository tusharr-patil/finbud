-- Script to run finbud using docker
docker create newtwork finbudNetwork
docker run --name mysqldb --network finbudNetwork -e MYSQL_ROOT_PASSWORD=1234 -d mysql:5.7
docker run --name finbudbackend -p 8090:8090 --network finbudNetwork -d finbudbackend
