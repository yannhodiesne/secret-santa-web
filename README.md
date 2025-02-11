# Secret Santa Web

A tiny web app letting you and your Discord friends organize a Secret Santa without breaking the secret part of it!

## Usage

The recommended way is to use the provided Docker image: `ghcr.io/yannhodiesne/secret-santa-web:release`

These environement variables are mandatory:
 - `NUXT_SESSION_PASSWORD`: server secret for sessions handling, at least 32 random characters
 - `NUXT_OAUTH_DISCORD_CLIENT_ID`: the OAuth2 client ID provided by Discord after creating an application on their [developers interface](https://discord.com/developers/applications)
 - `NUXT_OAUTH_DISCORD_CLIENT_SECRET`: the OAuth2 client secret provided by Discord after creating an application on their [developers interface](https://discord.com/developers/applications)
 - `NUXT_DB_PATH`: the path where the SQLite database will be stored *inside the container*
 - `NUXT_ADMIN_IDS`: a comma-separated list of Discord user IDs to be granted the admin role when logged in
   - the admin role lets those users manage the Secret Santa, such as removing other participants, editing the generation constraints, and generate the Secret Santa once everything is ready
 - `NUXT_GUILD_ID`: the Discord guild ID used to check if a Discord user can log in and participate
   - only members of this guild will be able to log in to the website, others will only be redirected to the homepage

> Do *not* forget to put your `NUXT_DB_PATH` inside a Docker volume to avoid losing your registered participants and generated Secret Santas !

### Discord OAuth2 redirect URL

In order for the login process to work properly, you need to add the `/api/auth/discord` route to the authorized redirects in the OAuth2 section of their [developers interface](https://discord.com/developers/applications).

Example:
 - `http://localhost:3000/api/auth/discord` for development
 - `http://secretsanta.net/api/auth/discord` for production

## Development

### Setup

Make sure to install the dependencies:

```bash
yarn install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
yarn dev
```
