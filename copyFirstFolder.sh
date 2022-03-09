#!/bin/bash

if [ $# -ne 0 ]; then

choice=$1

if [ $choice == 1 ]; then
cat README.md | grep "^[[:digit:]]" | sed 's/\. /_/' | tr A-Z a-z | tr ' ' '-' | while read folder; do 
mkdir $folder
echo "${folder} created.."
done
elif [ $choice == 2 ]; then 
main=1_rock-paper-scissors
ls | grep "^[2-7]" | while read folder; do
cp $main/* $folder/
echo "${folder} copied.."
done
fi

else
echo "Please input CHOICE = 1/2 ..."
fi