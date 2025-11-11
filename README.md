# 🤖 Bot Templates Marketplace

Professional Telegram bot template marketplace with modern dark theme design and blue glow effects. Built with Next.js 16, React 19, and Tailwind CSS 4.

![Production Ready](https://img.shields.io/badge/Production-Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## ✨ Features

### 🎨 Design
- **Modern Dark Theme** - Sleek black background with blue/cyan gradient effects
- **Glass Morphism** - Beautiful glassmorphic UI elements with backdrop blur
- **Smooth Animations** - Hover effects, transitions, and micro-interactions
- **Responsive Design** - Perfectly adapts to all screen sizes
- **Blue Glow Effects** - Production-quality lighting and shadow effects

### 🚀 Functionality
- **Template Marketplace** - Browse and preview 9+ bot templates
- **Advanced Search** - Real-time search across template names and descriptions
- **Category Filtering** - Filter by Business, Support, Education, Health, Media
- **Smart Sorting** - Sort by popularity, rating, or price
- **Template Modals** - Detailed preview with features and pricing
- **Responsive Navigation** - Mobile-friendly menu with smooth transitions

### 💎 Components
- **Navbar** - Sticky navigation with mobile menu
- **Hero Section** - Eye-catching hero with animated stats
- **Template Grid** - Responsive grid with filtering
- **Template Cards** - Interactive cards with hover effects
- **Template Modal** - Full-screen template details
- **Features Section** - Highlight key benefits
- **CTA Section** - Call-to-action with social proof
- **Footer** - Complete footer with links and social media

## 🛠️ Tech Stack

- **Framework:** Next.js 16.0.1 (App Router)
- **UI Library:** React 19.2.0
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Font:** Geist & Geist Mono
- **Linting:** ESLint with Next.js config

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to the project
cd templates

# Install dependencies
npm install
```

## 🚀 Usage

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the result.

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
/templates
├── app/
│   ├── components/
│   │   ├── Navbar.tsx         # Navigation component
│   │   ├── Hero.tsx           # Hero section with stats
│   │   ├── TemplateGrid.tsx   # Template listing with filters
│   │   ├── TemplateCard.tsx   # Individual template card
│   │   ├── TemplateModal.tsx  # Template detail modal
│   │   ├── Features.tsx       # Features showcase
│   │   └── CTA.tsx            # Call-to-action + footer
│   ├── data/
│   │   └── templates.ts       # Template data
│   ├── page.tsx               # Main page
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── public/                    # Static assets
├── next.config.ts             # Next.js config
├── tailwind.config.ts         # Tailwind config
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies
```

## 🎨 Customization

### Colors
Edit gradient colors in `app/globals.css`:
```css
:root {
  --blue-glow: #3b82f6;
  --cyan-glow: #06b6d4;
}
```

### Templates
Add/edit templates in `app/data/templates.ts`:
```typescript
export const templates = [
  {
    id: 1,
    name: "Your Template",
    category: "Category",
    price: 49,
    description: "Description",
    features: ["Feature 1", "Feature 2"],
    rating: 4.9,
    sales: 234
  }
];
```

### Categories
Update categories in `app/data/templates.ts`:
```typescript
export const categories = ["All", "Business", "Support", "Education"];
```

## 🌟 Key Features

### Search Functionality
- Real-time search
- Searches across names and descriptions
- Clear button for quick reset

### Filtering System
- Category-based filtering
- Multiple sort options (popular, rating, price)
- Results counter

### Interactive Cards
- Hover animations
- Glow effects on hover
- Click to open detailed modal
- Rating and sales display

### Template Modal
- Full template details
- Feature list
- Technology stack
- Purchase CTA
- Money-back guarantee badge

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Perfect tablet experience
- **Desktop Enhanced** - Full desktop features
- **Breakpoints:** sm (640px), md (768px), lg (1024px)

## 🎯 Production Ready

- ✅ TypeScript for type safety
- ✅ ESLint configured
- ✅ Fully responsive
- ✅ Optimized images
- ✅ SEO friendly
- ✅ Fast page loads
- ✅ Clean code structure
- ✅ No console errors

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For support, email support@bottemplates.com or join our Telegram channel.

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**
