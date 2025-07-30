# Puma Punku Eco Lodge Website

A modern, responsive website for Puma Punku Eco Lodge located on Isla del Sol, Lake Titicaca, Bolivia.

## Features

- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Navigation**: Fixed navigation with smooth scrolling
- **Booking System**: Contact form with validation for reservations
- **Service Showcase**: Dedicated sections for accommodations, tours, and restaurant
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## Sections

1. **Hero Section**: Eye-catching banner with call-to-action buttons
2. **About**: Introduction to the eco-lodge and its unique features
3. **Accommodations**: Three room types with amenities
4. **Tours**: Four different tour options available
5. **Restaurant**: Traditional Bolivian cuisine with three-course meals
6. **Contact**: Location information and contact details
7. **Booking**: Reservation form with date validation

## Technologies Used

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript**: Interactive features and form validation
- **Font Awesome**: Icons for enhanced visual appeal
- **Google Fonts**: Poppins font family for modern typography

## Setup Instructions

1. **Download/Clone** the website files to your local directory
2. **Add Images**: Place your high-quality images in the `images/` folder:
   - `hero-bg.jpg` - Main hero background (recommended: 1920x1080px)
   - `logo.png` - Lodge logo (recommended: 200x80px)
   - `lodge-exterior.jpg` - Lodge exterior photo
   - `standard-room.jpg` - Standard room interior
   - `family-room.jpg` - Family room interior
   - `suite.jpg` - Suite interior
   - `ruins-tour.jpg` - Ancient ruins tour photo
   - `cultural-tour.jpg` - Cultural experience photo
   - `sunset-tour.jpg` - Sunset/stargazing photo
   - `hiking-tour.jpg` - Hiking adventure photo
   - `restaurant.jpg` - Restaurant interior

3. **Update Contact Information**: 
   - Replace placeholder phone numbers in `index.html`
   - Update email addresses as needed
   - Add actual social media links

4. **Test Locally**: Open `index.html` in a web browser
5. **Deploy**: Upload all files to your web hosting service

## Customization

### Colors
The website uses CSS custom properties for easy color customization. Update the `:root` section in `styles.css`:

```css
:root {
    --primary-color: #2c5530;    /* Dark green */
    --secondary-color: #8b4513;  /* Brown */
    --accent-color: #d4af37;     /* Gold */
    /* ... other colors */
}
```

### Content
- Update text content directly in `index.html`
- Modify menu items in the restaurant section
- Add or remove tour offerings
- Update room descriptions and amenities

### Functionality
- The booking form currently shows a success message
- To connect to a real booking system, modify the form submission handler in `script.js`
- Add backend integration for actual email sending/database storage

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Mobile

## Performance Features

- Optimized CSS with efficient selectors
- Smooth scroll behavior
- Lazy loading ready (images fade in when loaded)
- Responsive images support
- Minimal JavaScript for fast loading

## SEO Features

- Semantic HTML structure
- Meta description and keywords
- Open Graph ready (add og: meta tags as needed)
- Schema markup ready for local business
- Clean URL structure with anchor navigation

## Accessibility

- Keyboard navigation support
- Screen reader friendly markup
- High contrast colors
- Focus indicators for interactive elements
- Alt text support for images

## Future Enhancements

Consider adding:
- Image gallery/lightbox for rooms and tours
- Online booking integration with calendar
- Multi-language support (Spanish/English)
- Customer reviews section
- Blog/news section
- Google Maps integration
- Weather widget
- Social media feed integration

## Support

For technical support or customization requests, please contact your web developer.

---

**Puma Punku Eco Lodge**  
*Authentic Bolivian Experience on Lake Titicaca*