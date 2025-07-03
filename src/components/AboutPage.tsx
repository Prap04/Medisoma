import React from 'react';
import { Users, Heart, Target, Eye, Lightbulb, Award, ArrowRight, Brain, Zap, Shield } from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Zap,
      title: 'Accelerate Diagnosis',
      description: 'Identify potential issues that might be missed during initial examination'
    },
    {
      icon: Shield,
      title: 'Reduce Diagnostic Errors',
      description: 'Comprehensive AI-assisted analysis to minimize human error'
    },
    {
      icon: Heart,
      title: 'Build Patient Trust',
      description: 'Transparent, technology-backed diagnostic support'
    },
    {
      icon: Target,
      title: 'Improve Healthcare Outcomes',
      description: 'Catch critical conditions in their early stages'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-900/50 px-4 py-2 rounded-full border border-blue-700/50 mb-6">
            <Users className="h-4 w-4 text-blue-400" />
            <span className="text-blue-200 text-sm">About Our Platform</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">About Us</h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            We are a team of passionate and curious students from Ramiah Institute of Technology, 
            united by a shared vision to revolutionize healthcare through innovative technology.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="mb-20">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-700/30 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p>
                    Our team comprises four dedicated individuals who recognized a critical gap in medical diagnosis that needed urgent attention.
                  </p>
                  <p>
                    As students passionate about the intersection of technology and healthcare, we understand that 
                    behind every diagnosis is a human life. Our commitment goes beyond creating innovative software – 
                    we're dedicated to building solutions that genuinely improve patient outcomes.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-8 rounded-xl border border-blue-500/30">
                  <Brain className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Ramiah Institute of Technology</h3>
                    <p className="text-blue-300">Where innovation meets healthcare</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Problem & Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Problem */}
          <div className="bg-red-900/20 backdrop-blur-sm rounded-2xl border border-red-700/30 p-8">
            <div className="bg-red-600 p-3 rounded-xl w-fit mb-6">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-6">The Problem We're Solving</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Healthcare professionals face an ongoing challenge: hemorrhages and other critical conditions 
                often go undetected until they reach advanced stages, when treatment options become limited 
                and outcomes less favorable.
              </p>
              <p>
                Misdiagnosis and delayed diagnosis continue to be significant concerns in the medical field, 
                affecting patient outcomes and eroding trust between healthcare providers and patients.
              </p>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-green-900/20 backdrop-blur-sm rounded-2xl border border-green-700/30 p-8">
            <div className="bg-green-600 p-3 rounded-xl w-fit mb-6">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-6">Our Solution: Medisoma</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Born from our collective determination to make a meaningful impact in healthcare, Medisoma is 
                an AI-powered diagnostic platform designed to support medical professionals in making faster, 
                more accurate diagnoses.
              </p>
              <p>
                Our platform serves as an intelligent second opinion, helping doctors verify their clinical 
                assessments while providing patients with greater confidence in their care.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto">
              We believe that technology should enhance human expertise, not replace it. Medisoma empowers 
              healthcare providers with advanced AI analysis tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-blue-700/30 p-6 text-center">
                  <div className="bg-blue-600 p-3 rounded-xl w-fit mx-auto mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vision */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-blue-700/30 p-8 md:p-12 text-center">
            <div className="bg-purple-600 p-4 rounded-xl w-fit mx-auto mb-6">
              <Eye className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
            <p className="text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto mb-8">
              We envision a future where every patient receives timely, accurate diagnosis, and where healthcare 
              professionals have access to cutting-edge tools that enhance their clinical decision-making. Through 
              Medisoma, we're working to bridge the gap between human expertise and artificial intelligence, creating 
              a healthcare ecosystem that benefits both providers and patients.
            </p>
            <div className="inline-flex items-center space-x-2 text-blue-400 font-semibold">
              <span>Transforming healthcare, one diagnosis at a time</span>
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Why We Do This */}
        <div className="mb-20">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-700/30 p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-4 rounded-xl w-fit mx-auto mb-6">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Why We Do This</h2>
            </div>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                As students passionate about the intersection of technology and healthcare, we understand that 
                behind every diagnosis is a human life. Our commitment goes beyond creating innovative software – 
                we're dedicated to building solutions that genuinely improve patient outcomes and support the 
                incredible work that healthcare professionals do every day.
              </p>
              <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-6 rounded-xl border border-blue-500/30">
                <p className="text-lg font-semibold text-blue-300">
                  Ready to experience the future of diagnostic support? Join us in transforming healthcare, one diagnosis at a time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl border border-yellow-700/30 p-8">
            <div className="bg-yellow-600 p-3 rounded-xl w-fit mx-auto mb-6">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Recognition</h2>
            <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Our innovative approach to AI-powered medical diagnosis has been recognized by leading healthcare 
              professionals and technology experts, validating our commitment to improving patient care through 
              advanced technology solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;