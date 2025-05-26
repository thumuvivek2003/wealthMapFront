
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield, Users, BarChart3, Database, Search, FileText, CheckCircle, Star, ArrowRight, Play } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import MapLogo from '../../assets/images/map.jpeg'

const Landing = () => {
    const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 sticky top-0 bg-white/90 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
                <img src={MapLogo} alt="Logo"  className="rounded" />
              </div>
              <span className="text-xl font-bold text-slate-900">Wealth Map</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors">How It Works</a>
              <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
              <a href="#faq" className="text-slate-600 hover:text-slate-900 transition-colors">FAQ</a>
            </nav>
            <div className="flex items-center space-x-3">
            <Button
                onClick={() => navigate('/login')}
                variant="ghost"
                className="text-slate-600 hover:text-slate-900"
                >
                Sign In
            </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute inset-0 opacity-40">
          <div 
            className="w-full h-full" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-6 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                🚀 Now serving 500+ enterprise clients
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 leading-tight mb-6">
                Unlock the Power of{" "}
                <span className="bg-gradient-to-r from-blue-600 to-slate-800 bg-clip-text text-transparent">Property & Wealth</span>{" "}
                Intelligence
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Empower your team with seamless access to U.S. property ownership and net worth data—all in one interactive platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors px-8 py-4 text-lg">
                  Request Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2 border-slate-300 text-slate-700 hover:bg-slate-50">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-slate-500">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                  Free 30-day trial
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                  No setup fees
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                  Cancel anytime
                </div>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 via-blue-800 to-slate-900 p-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Interactive Property Map</h3>
                      <Badge className="bg-white/20 text-white border-white/30">Live Data</Badge>
                    </div>
                    <div className="flex-1 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-full bg-white/5 rounded-lg border border-white/20 relative overflow-hidden">
                          <div className="absolute top-4 left-4 space-y-2">
                            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-700"></div>
                          </div>
                          <div className="absolute bottom-4 right-4 bg-white/90 rounded-lg p-3 text-xs">
                            <div className="font-medium text-slate-900">Property Value</div>
                            <div className="text-emerald-600 font-bold">$2.4M</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full animate-float opacity-80"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full animate-float opacity-60" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 mb-8">Trusted by leading companies worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            {['TechCorp', 'DataFlow', 'Pinnacle', 'Velocity', 'Nexus'].map((company, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-slate-400">{company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              Everything you need for comprehensive wealth intelligence
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with premium data sources to deliver unparalleled insights
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Comprehensive U.S. Property Coverage",
                description: "Access complete property ownership data across all 50 states with real-time updates and historical trends.",
                color: "text-blue-600 bg-blue-50"
              },
              {
                icon: BarChart3,
                title: "Owner Net Worth Analysis",
                description: "Get detailed wealth profiles with confidence scores and risk assessments for informed decision making.",
                color: "text-slate-700 bg-slate-50"
              },
              {
                icon: Database,
                title: "Third-Party Data Integrations",
                description: "Seamlessly integrated with Here.com, PitchBook, Wealth Engine, and other premium data sources.",
                color: "text-emerald-600 bg-emerald-50"
              },
              {
                icon: Shield,
                title: "Enterprise-Grade Security",
                description: "Bank-level encryption, SOC 2 compliance, and GDPR readiness ensure your data stays protected.",
                color: "text-red-600 bg-red-50"
              },
              {
                icon: Users,
                title: "Team Collaboration Tools",
                description: "Share insights, create custom reports, and collaborate with your team in real-time.",
                color: "text-cyan-600 bg-cyan-50"
              },
              {
                icon: FileText,
                title: "Advanced Reporting",
                description: "Generate custom reports with exportable data and automated insights for stakeholders.",
                color: "text-indigo-600 bg-indigo-50"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border border-slate-200 shadow-sm">
                <CardContent className="p-8">
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Get started in minutes with our streamlined onboarding process
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Company Registration",
                description: "Sign up your organization and configure user access permissions."
              },
              {
                step: "02",
                title: "Employee Onboarding",
                description: "Invite team members and set up personalized dashboards and preferences."
              },
              {
                step: "03",
                title: "Explore Interactive Map",
                description: "Navigate the comprehensive U.S. property map with advanced filtering options."
              },
              {
                step: "04",
                title: "Generate Insights",
                description: "Create custom reports and export data for strategic decision making."
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-slate-700 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-slate-300 transform -translate-y-0.5"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              Trusted by industry leaders
            </h2>
            <p className="text-xl text-slate-600">
              See what our customers are saying about Wealth Map
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Wealth Map has transformed how we analyze market opportunities. The depth of property and ownership data is unmatched.",
                author: "Sarah Chen",
                role: "VP of Strategy",
                company: "Premier Real Estate",
                rating: 5
              },
              {
                quote: "The integration with our existing tools was seamless. Our team productivity has increased by 40% since implementation.",
                author: "Michael Rodriguez",
                role: "Data Director",
                company: "Apex Analytics",
                rating: 5
              },
              {
                quote: "Enterprise-grade security with consumer-grade usability. Exactly what we needed for our compliance requirements.",
                author: "Jennifer Thompson",
                role: "CTO",
                company: "Secure Investments",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border border-slate-200 shadow-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-slate-700 mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.author}</div>
                    <div className="text-sm text-slate-600">{testimonial.role}</div>
                    <div className="text-sm text-slate-500">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about Wealth Map
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "How secure is our data?",
                answer: "We employ bank-level encryption, maintain SOC 2 compliance, and are GDPR ready. All data is stored in secure, geographically distributed data centers with 99.9% uptime guarantee."
              },
              {
                question: "What data sources do you integrate with?",
                answer: "We integrate with premium data providers including Here.com for location intelligence, PitchBook for company data, Wealth Engine for net worth analysis, and several other authoritative sources."
              },
              {
                question: "How long does onboarding take?",
                answer: "Most organizations are up and running within 24-48 hours. Our dedicated onboarding team provides personalized training and setup assistance for your team."
              },
              {
                question: "Can we export data and reports?",
                answer: "Yes, all data and reports can be exported in multiple formats including CSV, PDF, and Excel. You can also integrate with your existing BI tools via our API."
              },
              {
                question: "Do you offer custom integrations?",
                answer: "Absolutely. Our enterprise plans include custom API integrations and dedicated technical support to connect with your existing workflows and tools."
              }
            ].map((faq, index) => (
              <Card key={index} className="border border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Ready to unlock wealth intelligence for your team?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 500+ companies already using Wealth Map to make data-driven decisions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-slate-800 hover:bg-slate-100 px-8 py-4 text-lg font-medium">
              Request Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
              Sign Up Your Company
            </Button>
          </div>
          <p className="text-sm text-blue-100 mt-6">
            30-day free trial • No setup fees • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <img src={MapLogo} className="rounded"/>
                </div>
                <span className="text-xl font-bold">Wealth Map</span>
              </div>
              <p className="text-slate-400 mb-4">
                Empowering teams with comprehensive U.S. property and wealth intelligence.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">© 2024 Wealth Map. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;