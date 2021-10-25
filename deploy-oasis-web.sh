#/bin/bash

echo "building configuration for production....."
sleep 1

ng build --configuration=production

echo "Build is finished ..., listing /dist/oasis"
ls ./dist/oasis

echo "uploading files into s3://planta-oasis"
sleep 1
aws s3 cp ./dist/oasis s3://planta-oasis --recursive --profile javier.meza

echo "finish deployment of oasis-web application"
echo "bye...."
exit 0


