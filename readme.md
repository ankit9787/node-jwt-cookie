### About

- This is testing JWT token with help of cookies
- Created a JWT token with some expiry time
- Using a node js express project, getting that token in /login router in index.html file
- now using JS, setting document cookie i.e. broswer cookie with same thing
- now htting second api /profile with that same token in auth headers to fetch api
- so as long as token in not expired, able to hit /profile url
- even able to hit it from different tabs, as cookie is set in user browser level, so it will work as small session and user will be not logged out
- obvious disadvantage is cookie is visible, token can be stolen, malformed but still practising so chill


## files
- index.html - a basic html page making two api request, frst give token , second some result on proper token
- index.js - express node js server with two apis for token generation and validation