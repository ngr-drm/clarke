#!/bin/bash

echo "running migrations..."

pnpm run migrations & PID=$!

wait $PID

echo "validating enviroment..."

if [ $API_ENV == "local" ] 
then
  echo "running local server..."
  pnpm run dev:watch & PID=$!
  wait $PID
else
  echo "running sandbox server..."
  pnpm run start & PID=$!
  wait $PID
fi

