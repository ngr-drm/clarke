#!/bin/bash

echo "running build..."
pnpm run build & PID=$!
wait $PID

echo "running migrations..."
pnpm ci:migrations & PID=$!
wait $PID

echo "running sandbox server..."
pnpm run ci:run