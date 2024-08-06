#!/bin/bash

echo "running migrations..."
pnpm sandbox:migrations & PID=$!
wait $PID

echo "running sandbox server..."
pnpm run sandbox:run