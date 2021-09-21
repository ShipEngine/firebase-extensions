#!/bin/bash

# Use TTY Colors
export FORCE_COLOR=true

# Clean all Workspaces
yarn workspaces foreach -pv run clean