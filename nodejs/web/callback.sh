#!/bin/bash

DATE=`date +%F | sed 's/-//g'``date +%T | sed 's/://g'`
#echo $DATE
MEMORY=./logs/memory/callback$DATE.txt
cp ./logs/ASA.txt $MEMORY
dos2unix $MEMORY
cat ./head.txt $MEMORY > ./script.txt
cat ./script.txt ./foot.txt > ./script.html
# chmod u+x time.sh
