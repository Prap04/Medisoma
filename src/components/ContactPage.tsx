import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Users } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    urgency: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      urgency: 'medium'
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Support</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Get in touch with our medical support team for technical assistance, 
            training, or any questions about Medisoma CT Scan Analysis Platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800 rounded-xl border border-blue-700/30 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Emergency Support</h4>
                    <p className="text-slate-300">+1 (555) 123-4567</p>
                    <p className="text-slate-400 text-sm">24/7 Critical Care Support</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Email Support</h4>
                    <p className="text-slate-300">support@medisoma.com</p>
                    <p className="text-slate-400 text-sm">Response within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Headquarters</h4>
                    <p className="text-slate-300">123 Medical Center Drive</p>
                    <p className="text-slate-300">Boston, MA 02115</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-slate-800 rounded-xl border border-blue-700/30 p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Support Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-300">Emergency Support</span>
                  <span className="text-green-400">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">General Support</span>
                  <span className="text-slate-400">Mon-Fri 8AM-8PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Training & Setup</span>
                  <span className="text-slate-400">Mon-Fri 9AM-5PM EST</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-slate-800 rounded-xl border border-blue-700/30 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700 rounded-lg transition-colors">
                  User Manual & Documentation
                </button>
                <button className="w-full text-left px-4 py-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700 rounded-lg transition-colors">
                  Video Training Library
                </button>
                <button className="w-full text-left px-4 py-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700 rounded-lg transition-colors">
                  System Requirements
                </button>
                <button className="w-full text-left px-4 py-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700 rounded-lg transition-colors">
                  FAQ & Troubleshooting
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-xl border border-blue-700/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <MessageCircle className="h-6 w-6 mr-3" />
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Dr. John Smith"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="doctor@hospital.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Technical Support Request"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Priority Level
                    </label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => handleChange('urgency', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Low - General Inquiry</option>
                      <option value="medium">Medium - Technical Issue</option>
                      <option value="high">High - Urgent Support Needed</option>
                      <option value="critical">Critical - Emergency</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please describe your issue or question in detail. Include any error messages, steps to reproduce the problem, and your system information if relevant."
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">
                    * Required fields
                  </div>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-200 font-semibold"
                  >
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-12 bg-slate-800 rounded-xl border border-blue-700/30 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
              <Users className="h-6 w-6 mr-3" />
              Our Medical Support Team
            </h3>
            <p className="text-slate-300">
              Our support team consists of experienced medical professionals and technical experts 
              who understand the critical nature of diagnostic imaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-white mb-2">Medical Specialists</h4>
              <p className="text-slate-300 text-sm">Board-certified radiologists available for clinical consultation</p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-white mb-2">Technical Support</h4>
              <p className="text-slate-300 text-sm">Expert technical team for system integration and troubleshooting</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-white mb-2">24/7 Emergency</h4>
              <p className="text-slate-300 text-sm">Round-the-clock support for critical care situations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;