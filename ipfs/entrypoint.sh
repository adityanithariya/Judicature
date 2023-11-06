#!/bin/sh

ipfs init

ipfs bootstrap rm all

exec "$@"
