#! /bin/bash
IN="node:8.2.1-wheezy"

CN="ng-lib"
CHN="os"

docker container stop $CN
docker container rm $CN

# local & container volume
CV="/root/repo/"
LV="/Users/chuan/myspace/docker/lib/"

# local & container expose
LP="8080"
CP="8080"

# db container name
DBN="mymongo"

#docker run -it -p $LP:$CP -v $LV:$CV --link $DBN --name $CN -h $CHN $IN "/bin/bash"
docker run -it -p $LP:$CP -v $LV:$CV --name $CN -h $CHN $IN "/bin/bash"
