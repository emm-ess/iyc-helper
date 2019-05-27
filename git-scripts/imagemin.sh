#!/bin/bash

missing_command=false
# check dependencies
command -v npx optipng >/dev/null 2>&1 || {
    echo "Please install npm package optipng-bin to reduce images size before commit"
    missing_command=true
}
command -v npx jpegoptim >/dev/null 2>&1 || {
    echo "Please install npm package jpegtran-bin to reduce images size before commit"
    missing_command=true
}
command -v npx svgo >/dev/null 2>&1 || {
    echo "Please install npm package svgo to reduce images size before commit"
    missing_command=true
}

if $missing_command
then
    exit 1;
fi

STAGED=false

for i in "$@"
do
case $i in
    --staged)
    STAGED=true
    shift
    ;;
    *)
    ;;
esac
done


if $STAGED
then
    files=`git diff --cached --name-only --diff-filter=d`
else
    files=`find ./src ./public -name '*.jpg' -o -name '*.png' -o -name '*.gif' -o -name '*.svg'`
fi



png=""
for file in `echo "$files" | grep -E '.png\$|.gif\$'`
do
    png=`echo $png $file`
done

jpg=""
for file in `echo "$files" | grep -E '.jpg\$|.jpeg\$'`
do
    jpg=`echo $jpg $file`
done

svg=""
for file in `echo "$files" | grep ".svg\$"`
do
    svg=`echo $svg $file`
done



if [ ! -z "$png" ]
then
    npx optipng -o5 -strip all $png
fi

if [ ! -z "$svg" ]
then
    npx svgo $svg
fi

if [ ! -z "$jpg" ]
then
    npx jpegoptim -t $jpg
fi
