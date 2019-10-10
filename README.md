At YouTube, links in the description of the videos are converted to an ugly link upon click. This link enables tracking for YouTube.

For example, the links in the description of the videos

- `https://github.com/microsoft/PowerToys` will be replaced with:
- `https://www.youtube.com/redirect?q=https%3A%2F%2Fgithub.com%2Fmicrosoft%2FPowerToys&redir_token=b0euJIFvUfZ23wYlGHnZjQ3zHpZ8MTU3MDgxOTM2NEAxNTcwNzMyOTY0&event=video_description&v=4pteCeFXnsw`

This script removes Youtube's link-conversion/tracking feature.
This speeds up loading and allows you to right-click or tap to copy the link URL.

## History

- october 2019 - Forked from https://github.com/Rob--W/dont-track-me-google and adapted for YouTube
