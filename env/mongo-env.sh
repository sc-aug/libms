#! /bin/bash
# image name
IN="mongo:3.4.5"
# container name
CN="mymongo"
# container hostname
CHN="db"

docker container stop $CN
docker container rm $CN

LV=$(pwd)"/db"
CV="/data/db"

LP="27017"
CP="27017"

docker run -it -p $LP:$CP -v $LV:$CV --name $CN -h $CHN $IN /bin/bash
