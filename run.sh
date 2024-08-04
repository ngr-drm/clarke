#!/bin/bash
echo "validating enviroment..."

if [ $API_ENV == "local" ] 
then
  echo "running migrations..."
  pnpm run migrations & PID=$!
  wait $PID

  echo "running local server..."
  pnpm run dev:watch
fi

if [ $API_ENV == "docker" ] 
then
  echo "running migrations..."
  pnpm run migrations:docker & PID=$!
  wait $PID
  echo "running tests..."
  pnpm run test:e2e:docker & PID=$!
  wait $PID
  echo "running docker server..."
  pnpm run dev:docker 
fi

if [ $API_ENV == "sandbox" ] 
then
  echo "running migrations..."
  pnpm run migrations & PID=$!
  wait $PID
  echo "running sandbox server..."
  pnpm run start 
fi