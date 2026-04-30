# 🏢 Bimsara Real Estate - Website Clone Project

> A modern, full-stack real estate website built with React and Node.js

[![React](https://img.shields.io/badge/React-19.2.5-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2.1-lightgrey.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Executive Summary

This project is a complete clone of bimsara.com, a professional real estate website featuring property sales, rentals, and management services. Built with modern web technologies, it provides a seamless user experience across all devices.

### 🎯 Project Goals

- **Professional Design**: Clean, modern interface matching industry standards
- **User-Friendly**: Intuitive navigation and responsive design
- **Feature-Rich**: Property listings, inquiry forms, testimonials, and tools
- **Scalable**: Built with growth and future enhancements in mind
- **SEO Optimized**: Search engine friendly for maximum visibility

## ✨ Key Features

### 🏠 Core Functionality

1. **Service Pages**
   - Property Sellers Portal
   - Property Buyers Portal
   - Landlords Services
   - Tenants Services

2. **Interactive Tools**
   - Land Grading Calculator
   - Property Valuation Tool
   - Downloadable Resources

3. **Content Management**
   - Company Information
   - Team Profiles
   - Client Testimonials
   - Video Testimonials
   - Google Reviews Integration

4. **Communication**
   - Contact Forms
   - Inquiry Forms (by service type)
   - Email Notifications
   - Department Routing

5. **User Experience**
   - Responsive Design (Mobile, Tablet, Desktop)
   - Smooth Animations
   - Fast Loading Times
   - Accessibility Compliant

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.5 | UI Framework |
| React Router DOM | 7.14.2 | Navigation |
| Axios | 1.15.2 | HTTP Client |
| Framer Motion | 12.38.0 | Animations |
| React Hook Form | 7.74.0 | Form Management |
| Leaflet | 1.9.4 | Maps |
| Swiper | 12.1.3 | Carousels |
| React Toastify | 11.1.0 | Notifications |
| Recharts | 3.8.1 | Charts |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | Latest | Runtime |
| Express | 5.2.1 | Web Framework |
| Nodemailer | 8.0.7 | Email Service |
| CORS | 2.8.6 | Security |
| Dotenv | 17.4.2 | Configuration |

## 📁 Project Structure

```
bimsara-real-estate/
├── frontend/          # React application
│   ├── public/        # Static assets
│   └── src/           # Source code
│       ├── components/  # React components
│       ├── pages/       # Page components
│       ├── services/    # API services
│       ├── utils/       # Utilities
│       ├── data/        # Mock data
│       └── styles/      # CSS files
│
├── backend/           # Node.js server
│   ├── src/
│   │   ├── routes/      # API routes
│   │   ├── controllers/ # Request handlers
│   │   ├── services/    # Business logic
│   │   ├── utils/       # Utilities
│   │   ├── config/      # Configuration
│   │   ├── templates/   # Email templates
│   │   └── data/        # Mock data
│   └── server.js        # Entry point
│
└── docs/              # Documentation
    ├── DEVELOPER_1_TASKS.md
    ├── DEVELOPER_2_TASKS.md
    ├── DEVELOPER_3_TASKS.md
    └── TEAM_TASK_DISTRIBUTION.md
```

For detailed structure, see [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bimsara-real-estate
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Configure Environment Variables**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env with your credentials
   ```

### Running the Application

#### Development Mode

**Terminal 1 - Frontend:**
```bash
cd frontend
npm start
```
Opens at: http://localhost:3000

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
Runs at: http://localhost:5000

#### Production Build

```bash
cd frontend
npm run build
```

## 📊 Project Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| **Phase 1**: Setup & Planning | Week 1 | ✅ Complete |
| **Phase 2**: Frontend Development | Weeks 2-4 | 🔄 In Progress |
| **Phase 3**: Backend Development | Week 3 | 🔄 In Progress |
| **Phase 4**: Integration & Testing | Week 4 | ⏳ Pending |
| **Phase 5**: Deployment | Week 5 | ⏳ Pending |

**Estimated Completion**: 4-6 weeks

## 👥 Team Structure

### Development Team (3 Developers)

**Developer 1 - Layout & Core Pages Lead**
- Responsibilities: Foundation, Layout, Homepage, Service Pages
- Components: Header, Footer, Hero Section, Service Cards
- Status: In Progress

**Developer 2 - Content & Forms Lead**
- Responsibilities: About Pages, Contact, Forms, Testimonials
- Components: Forms, Testimonials, Team Pages, Content Pages
- Status: In Progress

**Developer 3 - Features & Integration Lead**
- Responsibilities: Tools, Downloads, Backend, Deployment
- Components: Land Grading Tool, API, Email Service, SEO
- Status: In Progress

## 📈 Features Breakdown

### Completed ✅
- [x] Project setup and configuration
- [x] Dependency installation
- [x] Folder structure creation
- [x] Environment configuration
- [x] Documentation

### In Progress 🔄
- [ ] Frontend components development
- [ ] Backend API development
- [ ] Form implementations
- [ ] Email service setup

### Planned ⏳
- [ ] Database integration
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Property management system
- [ ] Advanced search functionality
- [ ] Payment gateway integration

## 🔒 Security Features

- ✅ Environment variable protection
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Secure email handling
- ✅ XSS protection
- ✅ SQL injection prevention (when DB added)

## 📱 Responsive Design

Optimized for:
- 📱 Mobile (320px - 768px)
- 📱 Tablet (768px - 1024px)
- 💻 Desktop (1024px+)
- 🖥️ Large Screens (1920px+)

## 🎨 Design System

- **Colors**: Professional blue and white theme
- **Typography**: Modern, readable fonts
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable, modular design
- **Animations**: Smooth, performant transitions

## 📧 Contact & Support

For project inquiries:
- **Project Manager**: [Name]
- **Tech Lead**: [Name]
- **Email**: [email@company.com]

## 📝 Documentation

- [Project Structure](PROJECT_STRUCTURE.md) - Detailed folder organization
- [Developer 1 Tasks](docs/DEVELOPER_1_TASKS.md) - Layout & Core Pages
- [Developer 2 Tasks](docs/DEVELOPER_2_TASKS.md) - Content & Forms
- [Developer 3 Tasks](docs/DEVELOPER_3_TASKS.md) - Features & Integration
- [Team Distribution](docs/TEAM_TASK_DISTRIBUTION.md) - Complete workflow

## 🚀 Deployment

### Recommended Platforms

**Frontend:**
- Netlify (Recommended)
- Vercel
- AWS S3 + CloudFront

**Backend:**
- Render (Recommended)
- Railway
- Heroku
- AWS EC2

## 📊 Performance Targets

- ⚡ Page Load Time: < 3 seconds
- 🎯 Lighthouse Performance: > 90
- ♿ Accessibility Score: > 95
- 🔍 SEO Score: > 95
- 📱 Mobile Friendly: 100%

## 🔄 Version Control

- **Main Branch**: Production-ready code
- **Develop Branch**: Integration branch
- **Feature Branches**: Individual features
- **Commit Convention**: `[DEV1/DEV2/DEV3] type: description`

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original design inspiration: bimsara.com
- React community for excellent documentation
- Open source contributors

---

**Project Status**: 🟢 Active Development  
**Version**: 1.0.0  
**Last Updated**: April 28, 2026  
**Maintained By**: Development Team

---

### 📞 Quick Links

- [Live Demo](#) (Coming Soon)
- [API Documentation](#) (Coming Soon)
- [Design System](#) (Coming Soon)
- [User Guide](#) (Coming Soon)

---

**Built with ❤️ by the Development Team**
