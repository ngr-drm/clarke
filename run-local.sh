#!/bin/bash

echo "running migrations..."
pnpm run migrations & PID=$!
wait $PID

echo "running development server..."
pnpm run dev:watch 