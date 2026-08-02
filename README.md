# Baig Tours Pakistan

A modern full-stack tour agency website built to showcase travel packages across Pakistan. The platform allows visitors to explore destinations, view tour details, and stay updated with the latest travel offerings. Content is managed through Sanity CMS, making it easy to update packages and website information without changing the code.

## Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### CMS
- Sanity CMS

## Features

- Responsive and modern user interface
- Tour package listings
- Destination details
- Dynamic content managed through Sanity CMS
- Image management with Sanity
- Fast and SEO-friendly Next.js application
- Clean and scalable project structure

## Project Structure

```
baig-tours/
├── app/
├── components/
├── public/
├── sanity/
├── lib/
├── styles/
└── ...
```

## Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/baig-tours.git
cd baig-tours
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` file and add the required environment variables.

```env
MONGODB_URI=your_mongodb_connection
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2025-01-01
SANITY_TOKEN=your_token
```

### Run the development server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

## Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas
- **CMS:** Sanity

## Author

**Kiran Ghafoor**
