import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, X, Instagram } from "lucide-react";
import Logo from "../assets/quickbite.png";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, url: "#", name: "Facebook" },
    { icon: X, url: "#", name: "Twitter" },
    { icon: Instagram, url: "#", name: "Instagram" },
  ];

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/" },
    { name: "Cart", path: "/cart" },
    { name: "Orders", path: "/order" },
    { name: "About", path: "/" },
    { name: "Contact", path: "/" },
  ];

  return (
    <footer className="bg-gradient-to-r from-[#c44569] to-[#d63447] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <img
              src={Logo}
              alt="Quickbite Logo"
              className="h-20 w-20 rounded-full mb-4 border border-4 border-pink-300"
            />
            <p className="text-sm mb-4">
              Quickbite is your go-to food delivery app, bringing delicious
              meals from your favorite local restaurants right to your doorstep.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.url}
                    className="hover:opacity-80"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Navigation</h3>
            <ul className="space-y-2">
              {navigationLinks.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.path} className="text-sm hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <div className="space-y-2">
              {[
                "Fast Delivery",
                "24/7 Support",
                "Easy Payment",
                "Fresh Food",
                "Large Menu",
                "Quality Service",
              ].map((item, idx) => (
                <p key={idx} className="text-sm">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail size={16} />
                <span>quickbite@google.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone size={16} />
                <span>9860811063</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin size={16} />
                <span>123 Satdobato, Lalitpur</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} Quickbite. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
