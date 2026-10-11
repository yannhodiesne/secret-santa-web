# Secret Santa Web

A tiny web app letting you and your Fluxer friends organize a Secret Santa without breaking the secret part of it!

## Usage

The recommended way is to use the provided Docker image: `ghcr.io/yannhodiesne/secret-santa-web:release`

These environement variables are mandatory:
 - `NUXT_SESSION_PASSWORD`: server secret for sessions handling, at least 32 random characters
 - `NUXT_FLUXER_CLIENT_ID`: the OAuth2 client ID of the Fluxer application
 - `NUXT_FLUXER_CLIENT_SECRET`: the OAuth2 client secret of the Fluxer application
 - `NUXT_FLUXER_API_URL`: the `api` endpoint of the Fluxer instance (defaults to `https://api.fluxer.app/v1` on the hosted instance)
 - `NUXT_FLUXER_MEDIA_URL`: the `media` endpoint of the Fluxer instance (defaults to `https://fluxerusercontent.com` on the hosted instance)
   - both can be read from `GET /.well-known/fluxer` on the instance origin
 - `NUXT_DB_PATH`: the path where the SQLite database will be stored *inside the container*
 - `NUXT_ADMIN_IDS`: a comma-separated list of Fluxer user IDs to be granted the admin role when logged in
   - the admin role lets those users manage the Secret Santa, such as removing other participants, editing the generation constraints, and generate the Secret Santa once everything is ready
 - `NUXT_GUILD_ID`: the Fluxer guild ID used to check if a Fluxer user can log in and participate
   - only members of this guild will be able to log in to the website, others will only be redirected to the homepage

> Do *not* forget to put your `NUXT_DB_PATH` inside a Docker volume to avoid losing your registered participants and generated Secret Santas !

### Fluxer OAuth2 redirect URL

In order for the login process to work properly, you need to add the `/api/auth/fluxer` route to the authorized redirect URIs of the Fluxer application.

Example:
 - `http://localhost:3000/api/auth/fluxer` for development
 - `http://secretsanta.net/api/auth/fluxer` for production

## Development

### Setup

Make sure to install the dependencies:

```bash
pnpm install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```
