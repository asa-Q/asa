#!/bin/bash

DATE=`date +%F | sed 's/-//g'``date +%T | sed 's/://g'`
#echo $DATE
MEMORY=memory/callback$DATE.txt
cp ASA.txt $MEMORY
dos2unix $MEMORY

# chmod u+x time.sh
