"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-2xl text-white">Khodiyar</span>
              <span className="font-medium text-lg text-gray-300">Alumni Portal</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Connecting alumni and students to build a stronger community and create opportunities for growth and development.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/events" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* User Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">User</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/login" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  href="/register" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/profile" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">
                  Khodiyar Campus, University Road, <br />
                  City Center, State - 380000
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <a 
                  href="tel:+919876543210" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  +91 9876 543 210
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <a 
                  href="mailto:info@khodiyaralumni.edu" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  info@khodiyaralumni.edu
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>© {currentYear} Khodiyar Alumni Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;