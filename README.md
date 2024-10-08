# ShareTrips — app for creating and sharing trips. 

![Preivew](/images/preview.png)

## Structure

### Backend
- Django — backend
- Supabase — database
- Redis — cache
- Azure Storage — image storage
- OpenAI — AI service
- Pexels — stock images
- Loops — email service

Env file: 
```
SECRET_KEY=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_PORT=
DJANGO_ALLOWED_HOSTS =
AZURE_CONTAINER=
AZURE_ACCOUNT_NAME=
AZURE_ACCOUNT_KEY=
REDIS_URL=
OPENAI_API_KEY=
PEXELS_API_KEY=
LOOPS_API_KEY = 
LOGIN = 
PASSWORD = 
OTP_TRANSACTION_ID = 
FRONTEND_URL = 
FRONTEND_URL_REGISTRATION = 
```

To run backend:
```
docker compose build
docker compose up
```

### Frontend
- NextJS — frontend

Env file: 
```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_DOMAIN_URL=
NEXT_PUBLIC_ENCRYPT_SECRET_KEY=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=
NEXT_PUBLIC_GOOGLE_REDIRECT_URI_REGISTRATION=
NEXT_PUBLIC_GOOGLE_SCOPE=
NEXT_PUBLIC_GOOGLE_RESPONSE_TYPE=
NEXT_PUBLIC_GOOGLE_ACCESS_TYPE=
NEXT_PUBLIC_GOOGLE_PROMPT=
```

To run frontend:
```
npm run build
npm run dev
```

## Contacts 
- Email: korzhov.work2019@gmail.com
- X: [Link](https://x.com/korzhov_dm)