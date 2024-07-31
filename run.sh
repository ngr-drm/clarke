#!/bin/bash

echo "starting migrations..."

pnpm run migrations & PID=$!

wait $PID

echo "starting dev server..."

pnpm run dev:watch & PID=$!

wait $PID