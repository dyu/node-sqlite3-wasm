#!/bin/sh

[ -e node_modules ] || pnpm install
make && pnpm test
