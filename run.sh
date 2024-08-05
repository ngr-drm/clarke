#!/bin/bash

echo "running migrations..."
pnpm run migrations & PID=$!
wait $PID

echo "set enviroment: echo $API_ENV"

if [ $API_ENV == "local" ] 
then
  pnpm run start & PID=$!
  wait $PID

  echo "local server is up"
fi

if [ $API_ENV == "sandbox" ] 
then
  echo "running migrations..."
  pnpm run migrations & PID=$!
  wait $PID

  echo "running sandbox server..."
  pnpm run start & PID=$!
  wait $PID

  echo "ENV: $API_ENV is up"
fi