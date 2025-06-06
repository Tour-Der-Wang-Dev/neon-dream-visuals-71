
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle,
  Zap,
  Shield,
  Users,
  Clock
} from 'lucide-react';

const EnterpriseContact = () => {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    employees: '',
    useCase: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const enterpriseFeatures = [
    { icon: Zap, title: 'Unlimited Generation', description: 'No limits on image generation' },
    { icon: Shield, title: 'Enhanced Security', description: 'SOC 2 compliance & data privacy' },
    { icon: Users, title: 'Team Management', description: 'User roles & permissions' },
    { icon: Clock, title: 'Priority Support', description: '24/7 dedicated support team' }
  ];

  if (isSubmitted) {
    return (
      <Card className="glass-premium p-8 border-green-500/20 text-center">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-foreground/60 mb-6">
          We've received your enterprise inquiry. Our team will contact you within 24 hours to discuss your needs.
        </p>
        <div className="space-y-2 text-sm text-foreground/60">
          <p>Expected response time: Within 24 hours</p>
          <p>Next steps: Technical consultation call</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enterprise Benefits */}
      <Card className="glass-premium p-6 border-purple-500/20">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2 flex items-center justify-center">
            <Building2 className="w-6 h-6 mr-2 text-blue-400" />
            Enterprise Solutions
          </h3>
          <p className="text-foreground/60">
            Powerful AI image generation for teams and businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {enterpriseFeatures.map((feature, index) => (
            <div key={index} className="p-4 glass rounded-lg text-center">
              <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-2">{feature.title}</h4>
              <p className="text-xs text-foreground/60">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Badge className="bg-gradient-primary text-lg px-4 py-2">
            Custom pricing available
          </Badge>
        </div>
      </Card>

      {/* Contact Form */}
      <Card className="glass-premium p-6 border-purple-500/20">
        <h4 className="text-xl font-semibold mb-6">Get in Touch</h4>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name *</label>
              <Input
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Acme Corporation"
                required
                className="glass border-purple-500/30 focus:border-purple-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Doe"
                required
                className="glass border-purple-500/30 focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Email *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john@company.com"
                required
                className="glass border-purple-500/30 focus:border-purple-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="glass border-purple-500/30 focus:border-purple-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Company Size</label>
            <select
              value={formData.employees}
              onChange={(e) => handleInputChange('employees', e.target.value)}
              className="w-full p-3 glass border border-purple-500/30 rounded-md focus:border-purple-500 focus:outline-none bg-transparent"
            >
              <option value="" className="bg-gray-800">Select company size</option>
              <option value="1-10" className="bg-gray-800">1-10 employees</option>
              <option value="11-50" className="bg-gray-800">11-50 employees</option>
              <option value="51-200" className="bg-gray-800">51-200 employees</option>
              <option value="201-1000" className="bg-gray-800">201-1000 employees</option>
              <option value="1000+" className="bg-gray-800">1000+ employees</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Primary Use Case</label>
            <select
              value={formData.useCase}
              onChange={(e) => handleInputChange('useCase', e.target.value)}
              className="w-full p-3 glass border border-purple-500/30 rounded-md focus:border-purple-500 focus:outline-none bg-transparent"
            >
              <option value="" className="bg-gray-800">Select primary use case</option>
              <option value="marketing" className="bg-gray-800">Marketing & Advertising</option>
              <option value="ecommerce" className="bg-gray-800">E-commerce Product Images</option>
              <option value="content" className="bg-gray-800">Content Creation</option>
              <option value="design" className="bg-gray-800">Design & Creative</option>
              <option value="social" className="bg-gray-800">Social Media</option>
              <option value="other" className="bg-gray-800">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Tell us about your specific requirements, expected usage volume, or any questions you have..."
              rows={4}
              className="glass border-purple-500/30 focus:border-purple-500 resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-primary hover:opacity-90 text-white font-medium py-3 text-lg"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Sending Message...
              </>
            ) : (
              <>
                <Mail className="w-5 h-5 mr-2" />
                Send Enterprise Inquiry
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* Contact Information */}
      <Card className="glass-premium p-6 border-purple-500/20">
        <h4 className="text-lg font-semibold mb-4">Other Ways to Reach Us</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center space-y-2">
            <Mail className="w-8 h-8 text-blue-400 mx-auto" />
            <div className="font-medium">Email</div>
            <div className="text-sm text-foreground/60">enterprise@aiimage.com</div>
          </div>
          <div className="text-center space-y-2">
            <Phone className="w-8 h-8 text-green-400 mx-auto" />
            <div className="font-medium">Phone</div>
            <div className="text-sm text-foreground/60">+1 (555) 123-4567</div>
          </div>
          <div className="text-center space-y-2">
            <Calendar className="w-8 h-8 text-purple-400 mx-auto" />
            <div className="font-medium">Schedule Call</div>
            <div className="text-sm text-foreground/60">Book a demo session</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EnterpriseContact;
