#! /bin/bash
# Image name
IN="node:8.2.1-wheezy"

CN="express"
CHN="back"

docker container stop $CN
docker container rm $CN
# docker image rm $MYIN

# local & container volume
LV="$(dirname $(pwd))"
CV="/root/repo/"

# local & container expose
# ports for testing
LP="9000"
CP="9000"

# db container name
DBN="mymongo"

# docker build
# docker build -t $MYIN .

docker run -it \
    -p $LP:$CP \
    -v $LV:$CV \
    --link $DBN \
    --name $CN -h $CHN $IN "/bin/bash"
