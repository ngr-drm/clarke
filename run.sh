#!/bin/bash
echo "validating enviroment..."

if [ $API_ENV == "local" ] 
then
  echo "running migrations..."
  pnpm run migrations & PID=$!
  wait $PID

  echo "running local server..."
  pnpm run dev:watch & PID=$!
  wait $PID

  echo "ENV: $API_ENV is up"
fi

if [ $API_ENV == "docker" ] 
then
  echo "running migrations..."
  pnpm run migrations:docker & PID=$!
  wait $PID

  echo "running docker server..."
  pnpm run dev:docker & PID=$!
  wait $PID

  echo "ENV: $API_ENV is up"
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