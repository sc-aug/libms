#! /bin/bash
# Image name
IN="node:8.2.1-wheezy"
# My new Image Name
MYIN="ng-img"

CN="ng-lib"
CHN="os"

docker container stop $CN
docker container rm $CN
# docker image rm $MYIN

# local & container volume
LV="$(dirname $(pwd))"
CV="/root/repo/"

# local & container expose
# ports for testing
LP1="7000"
CP1="7000"
LP2="8000"
CP2="8000"

# db container name
DBN="mymongo"

# docker build
# docker build -t $MYIN .

docker run -it \
    -p $LP1:$CP1 -p $LP2:$CP2 \
    -v $LV:$CV --link $DBN \
    --name $CN -h $CHN $MYIN "/bin/bash"
