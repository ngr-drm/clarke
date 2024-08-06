#!/bin/bash

echo "running migrations..."
pnpm run migrations & PID=$!
wait $PID

echo "running sandbox server..."
pnpm run sandbox:run