#!/bin/sh

set -e

VERSION=$1

[ ! -n "$VERSION" ] && echo "Enter release version: " && read VERSION

echo "Releasing $VERSION - are you sure? (y/n):" && read CONFIRM && [ "$CONFIRM" != "y" ] && exit 0

npm version $VERSION --message "[release] $VERSION"

# publish
git push origin refs/tags/v$VERSION
git push -u origin master
npm publish --access public
echo "Released $VERSION"
