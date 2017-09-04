#! /bin/bash
# Image name
#IN="node:8.2.1-wheezy"
# My new Image Name
MYIN="ng-img"

CN="angular"
CHN="client"

docker container stop $CN
docker container rm $CN
#docker image rm $MYIN

# local & container volume
LV="$(dirname $(pwd))"
CV="/root/repo/"

# local & container expose
# ports for testing
LP="8000"
CP="8000"

# docker build
#docker build -t $MYIN .

docker run -it \
    -p $LP:$CP -v $LV:$CV \
    --name $CN -h $CHN $MYIN "/bin/bash"
