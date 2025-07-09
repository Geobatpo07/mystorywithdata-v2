import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  MapPinIcon, 
  PhoneIcon,
  CodeBracketIcon,
  ChartBarIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Services', href: '/services' },
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Data Analytics', href: '/services/analytics' },
        { name: 'Power BI Reports', href: '/reports' },
        { name: 'Machine Learning', href: '/services/ml' },
        { name: 'Consulting', href: '/services/consulting' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog Articles', href: '/blog' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Documentation', href: '/docs' },
        { name: 'Support', href: '/support' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: '🔗' },
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'GitHub', href: '#', icon: '🐱' },
    { name: 'Email', href: 'mailto:contact@mystorywithdata.com', icon: '📧' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-width section-padding">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 group mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MS</span>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                MyStoryWithData
              </span>
            </Link>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Transforming data into compelling stories that drive business decisions and innovation.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <EnvelopeIcon className="w-4 h-4 text-primary-400" />
                <span>contact@mystorywithdata.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <MapPinIcon className="w-4 h-4 text-primary-400" />
                <span>Data Analytics Hub</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <PhoneIcon className="w-4 h-4 text-primary-400" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-center mb-2">
                <ChartBarIcon className="w-8 h-8 text-primary-400" />
              </div>
              <div className="text-2xl font-bold text-white">100+</div>
              <div className="text-sm text-gray-300">Reports Created</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-center mb-2">
                <CodeBracketIcon className="w-8 h-8 text-primary-400" />
              </div>
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-300">ML Models</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-center mb-2">
                <AcademicCapIcon className="w-8 h-8 text-primary-400" />
              </div>
              <div className="text-2xl font-bold text-white">5+</div>
              <div className="text-sm text-gray-300">Years Experience</div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-300">
              © {currentYear} MyStoryWithData. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-300 hover:text-primary-400 transition-colors text-lg"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <Link to="/privacy" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
