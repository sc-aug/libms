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
# ports for testing
LP1="7000"
CP1="7000"
LP2="8000"
CP2="8000"

# db container name
DBN="mymongo"

#docker run -it -p $LP:$CP -v $LV:$CV --link $DBN --name $CN -h $CHN $IN "/bin/bash"
docker run -it -p $LP1:$CP1 -p $LP2:$LP2 -v $LV:$CV --name $CN -h $CHN $IN "/bin/bash"
