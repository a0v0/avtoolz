# Media Uploads

FTAs can upload a media file by sending a post request to `api.frisbane.com/media/upload`. All unauthenticated requests are rejected.

FTAs may have to convert the Image files to webp format before uploading.

> Note: Only certain file formats are allowed when uploading meida file. See all [supported file formats](##supported-formats).

## Supported File Formats

- Video: `webm, mp4`
- Image: `webp`

## Config

```yaml
########################
##### MEDIA CONFIG #####
########################
# Config pertaining to user media uploads (videos, image, image descriptions).
Media:
  # Int. Maximum allowed image upload size in bytes.
  # Examples: [2097152, 10485760]
  # Default: 5242880-- aka 5MB
  MediaImageMaxSize: 5242880

  # Int. Maximum allowed video upload size in bytes.
  # Examples: [2097152, 10485760]
  # Default: 41943040 -- aka 40MB
  MediaVideoMaxSize: 41943040

  # Int. Minimum amount of characters required as an image or video description.
  # Examples: [500, 1000, 1500]
  # Default: 0 (not required)
  MediaDescriptionMinChars: 0

  # Int. Maximum amount of characters permitted in an image or video description.
  # Examples: [500, 1000, 1500]
  # Default: 500
  MediaDescriptionMaxChars: 500
```
