#!/bin/sh
set -ex

# Run Prisma migrations
prisma migrate deploy

# Start the application
exec node server.js