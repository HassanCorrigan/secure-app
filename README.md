# secure-app

A secure web app using modern security mechanisms to prevent common web attacks.

Run npm install

**Required**: MongoDB connection string
**Required**: Google reCaptcha keys

Add the following environment variables

- **DB_USERNAME** <mongodb username>
- **DB_PASSWORD** <mongodb password>
- **COOKIE_SECRET** <string>
- **RECAPTCHA_SITE_KEY** <google reCaptcha>
- **RECAPTCHA_SECRET_KEY** <google reCaptcha>
- **PORT** <integer>
- **NODE_ENV** <production or development>

For development:
Add these to a .env file.
