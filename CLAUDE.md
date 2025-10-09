# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Flask Portfolio Website Architecture

This is a modern Flask-based portfolio website for Aditya Agarwal, an AI/ML Engineer. The application features dynamic GitHub integration, an admin interface for content management, and modern frontend animations.

## Development Commands

### Running the Application

```bash
# Development server
python app.py
# or
flask run

# Production server with Gunicorn
gunicorn app:app
```

### Environment Setup

- Create `.env` file with required environment variables:
  - `GITHUB_TOKEN`: GitHub API token for repository access
  - `ADMIN_ROUTE_SECRETS`: Randomized admin route URL
- Install dependencies: `pip install -r requirements.txt`
- Python version: 3.11.12 (specified in runtime.txt)

## Core Architecture

### Application Structure

- **app.py**: Main Flask application with route definitions
- **views.py**: Business logic and template rendering functions
- **config.py**: Environment-based configuration management
- **wsgi.py**: Gunicorn production server configuration
- **bot.py**: GitHub API integration using PyGithub

### Data Management System

The application uses a hybrid data approach:

1. **Static Configuration**: `data.json` contains skills categorized by type
2. **CSV Databases**: `/static/db/` contains:
   - `landing_page_projects.csv`: Featured project selections
   - `certs.csv`: Certification data with platforms and dates
3. **Dynamic GitHub Data**: Real-time repository information via GitHub API

### Template Architecture

- **base.html**: Master template with SEO meta tags, Tailwind CSS, and custom animations
- **v4.html**: Main portfolio page with sections for hero, skills, projects, certifications
- **admin.html**: Content management interface for updating featured projects and skills
- **resume.html**: Dedicated resume page
- **error.html**: Custom error handling page

## Frontend Features

### Modern Animations & Interactions

The site includes sophisticated CSS animations:

- **Box Reveal**: Sequential text reveal with sliding colored bars
- **Blur Fade**: Staggered scroll-triggered animations with blur-to-focus effects
- **Ripple Button**: Expanding gradient circles on hover for social links
- **Rainbow Button**: Subtle animated gradient borders for call-to-action buttons

### JavaScript Functionality (`static/js/modern.js`)

- Intersection Observer for scroll-triggered animations
- Magnetic cursor effects and hover interactions
- Timeline animations for certifications
- Easter egg implementation (Konami code)
- Mobile-responsive touch interactions

### Responsive Design

- Tailwind CSS 4.0 with mobile-first approach
- Custom CSS properties for violet/blue gradient theme
- Grid background pattern with animated colored dots
- Inter font family for modern typography

## Admin Interface

### Content Management

Access via environment-configured route (`/admin/{ADMIN_ROUTE_SECRETS}`)

- **Project Management**: Select featured projects from GitHub repositories
- **Skills Management**: Add new skills dynamically to JSON configuration
- **Real-time Updates**: Changes reflect immediately without code deployment

### Data Flow

1. GitHub API fetches repository data
2. Admin interface allows selection of featured projects
3. Form submissions update CSV/JSON files
4. Frontend displays updated content immediately

## Deployment Configuration

### Heroku Setup

- **Procfile**: `web: gunicorn app:app`
- **Runtime**: Python 3.11.2
- **Dependencies**: 30 packages including Flask 3.0.2, Gunicorn 22.0.0, PyGithub 1.55

### Performance Optimizations

- Static asset caching headers (30 days for images)
- Gunicorn worker configuration with request limits
- Lazy loading for images and GitHub API calls
- Comprehensive SEO optimization

## Key Development Patterns

### Separation of Concerns

- Clear routing (app.py) → business logic (views.py) → presentation (templates)
- Modular configuration management with environment variables
- Dedicated GitHub integration module

### Content Update Workflow

1. Admin selects featured projects → CSV update
2. Skills added via form → JSON update
3. GitHub API provides real-time repository data
4. Template rendering combines static and dynamic content

### Modern Web Standards

- Progressive enhancement with JavaScript
- Accessibility considerations (semantic HTML, alt tags)
- SEO best practices (Open Graph, Twitter Cards, Schema.org structured data)
- Performance optimization (caching, lazy loading)

## File Organization

```text
/
├── app.py                 # Flask application and routes
├── views.py              # Business logic and template rendering
├── config.py             # Configuration management
├── wsgi.py               # Production server setup
├── bot.py                # GitHub API integration
├── data.json             # Skills and static configuration
├── requirements.txt      # Python dependencies
├── Procfile             # Heroku deployment
├── templates/           # Jinja2 templates
├── static/
│   ├── js/modern.js     # Interactive JavaScript
│   ├── css/            # Additional stylesheets
│   ├── img/            # Profile images and assets
│   ├── icons/          # Technology skill icons
│   └── db/             # CSV data files
└── .env                # Environment variables (not in repo)
```

## Important Notes

### GitHub Integration

- Uses PyGithub for repository data fetching
- Requires valid GITHUB_TOKEN in environment
- Admin interface dynamically populates from user's repositories
- Featured projects stored in CSV for persistence

### Custom Animations

- Box reveal animations use CSS custom properties with delays
- Blur fade effects triggered by Intersection Observer
- Ripple and rainbow button effects use pure CSS
- All animations respect reduced motion preferences

### SEO & Performance

- Comprehensive meta tag implementation for social sharing
- Schema.org structured data for person/professional profile
- Optimized loading with lazy loading and caching headers
- Mobile-first responsive design approach

### Security Considerations

- Admin routes obfuscated via environment variables
- GitHub token secured in environment configuration
- Form handling includes basic validation
- Static file serving with appropriate headers

## Design System

### Visual Style

- Clean, minimalist design approach
- Violet (#a855f7) and Blue (#3b82f6) gradient theme
- Ample white space for uncluttered look
- Inter font family with clear typography hierarchy

### UI Components

- Custom animated buttons with ripple and rainbow effects
- Interactive skill cards with hover animations
- Timeline components for certifications and experience
- Responsive grid layouts with Tailwind CSS

### Accessibility Features

- High-contrast color combinations
- Semantic HTML structure with proper alt tags
- Mobile-friendly touch targets
- Reduced motion support for animations

## Core Design Considerations

Design a modern, professional-looking app interface that adheres to the following criteria:

Visual Style:

- Use a clean, minimalist design approach
- Implement a cohesive color scheme with 2-3 primary colors and appropriate accent colors
- Incorporate ample white space for a sleek, uncluttered look
- Use modern typography with a clear hierarchy (headings, subheadings, body text)

Layout and Structure:

- Create an intuitive, user-friendly navigation system
- Design a responsive layout that adapts seamlessly to different screen sizes
- Use a grid-based layout for consistent alignment and spacing

UI Elements:

- Design custom icons that align with the overall visual style
- Create visually appealing and interactive buttons, forms, and other UI components
- Implement subtle animations and transitions for a polished feel

UX Considerations:

- Ensure clear visual feedback for user actions
- Optimize the user flow to minimize the number of steps for key tasks
- Implement intuitive gestures and interactions for mobile users

Branding:

- Incorporate the app's logo and brand identity seamlessly into the design
- Maintain consistency with the brand's visual language across all screens

Accessibility:

- Use high-contrast color combinations for text and backgrounds
- Ensure all interactive elements are easily tappable on mobile devices
- Include alt text for images and icons

Current Trends:

- Consider incorporating trendy design elements like glassmorphism or neumorphism, if appropriate
- Use subtle gradients or textures to add depth and interest
