import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const AppFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Courses', href: '#' },
    { name: 'Instructors', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Refund Policy', href: '#' },
  ];

  const courseCategories = [
    { name: 'Web Development', href: '#' },
    { name: 'Mobile Development', href: '#' },
    { name: 'Data Science', href: '#' },
    { name: 'UI/UX Design', href: '#' },
    { name: 'Digital Marketing', href: '#' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground relative">
      {/* Back to Top Button */}
      <Button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-accent hover:bg-accent/90 text-accent-foreground w-12 h-12 rounded-full shadow-medium"
        size="icon"
      >
        <ChevronUp className="w-5 h-5" />
      </Button>

      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-2">LearnHub</h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Empowering learners worldwide with high-quality courses and expert instruction. 
                Join thousands of students on their journey to success.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4" />
                <span>hello@learnhub.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Course Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {courseCategories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <div className="space-y-4">
              <p className="text-sm text-primary-foreground/80">
                Subscribe to our newsletter for updates and exclusive offers.
              </p>
              
              {/* Newsletter Signup */}
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                />
                <Button 
                  size="sm" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Subscribe
                </Button>
              </div>

              {/* Social Media Links */}
              <div>
                <p className="text-sm font-medium mb-2">Follow Us</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-8 h-8 bg-primary-foreground/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors group"
                      aria-label={social.name}
                    >
                      <social.icon className="w-4 h-4 group-hover:text-accent-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        {/* Support Links */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {supportLinks.map((link, index) => (
              <div key={link.name} className="flex items-center">
                <a
                  href={link.href}
                  className="text-xs text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
                {index < supportLinks.length - 1 && (
                  <span className="mx-3 text-primary-foreground/40">•</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6 bg-primary-foreground/20" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/70">
          <div>
            <p>&copy; 2024 LearnHub. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <span>Made with ❤️ for learners worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;