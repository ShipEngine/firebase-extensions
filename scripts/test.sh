#!/bin/bash

# Use TTY Colors
export FORCE_COLOR=true

# Run all tests consecutively
yarn workspaces foreach -vi run test | yarn format-logs