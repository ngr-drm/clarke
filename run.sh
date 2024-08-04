#!/bin/bash

echo "running migrations..."

pnpm run migrations & PID=$!

wait $PID

echo "validating enviroment..."

if [ $API_ENV == "local" ] 
then
  echo "running local server..."
  pnpm run dev:watch
fi

if [ $API_ENV == "docker" ] 
then
  echo "running containers..."
  pnpm run dev:docker 
fi

if [ $API_ENV == "sandbox" ] 
then
  echo "running sandbox server..."
  pnpm run start 
fi


\