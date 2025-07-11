import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { ChevronLeft, ChevronRight, Star, Check, Mail, Phone, User, X, Sparkles, Zap, Heart, ExternalLink, Eye, Filter } from 'lucide-react'
import './App.css'

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')
  const [portfolioFilter, setPortfolioFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVisible, setIsVisible] = useState({})
  const [countryCode, setCountryCode] = useState('+1')

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }))
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % portfolioSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Fetch user's country from IP and set the country code accordingly
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        // Map ISO country code to dial code
        const countryDialMap = {
          US: '+1',
          GB: '+44',
          EG: '+20',
          DE: '+49',
          FR: '+33',
          IN: '+91',
          AE: '+971',
          SA: '+966',
          KW: '+965',
          QA: '+974',
          OM: '+968',
          BH: '+973',
          JO: '+962',
          IQ: '+964',
          YE: '+967',
          JP: '+81',
          AU: '+61',
          TR: '+90',
          MA: '+212',
          DZ: '+213',
          TN: '+216',
          SD: '+249',
          LB: '+961',
          SY: '+963',
          PS: '+970',
        }
        if (data && data.country && countryDialMap[data.country]) {
          setCountryCode(countryDialMap[data.country])
        }
      })
      .catch(error => console.error('Error fetching country:', error))
  }, [])

  const portfolioSlides = [
    {
      title: "E-Commerce Excellence",
      description: "Modern online store with seamless shopping experience and advanced payment integration",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      category: "E-Commerce",
      color: "from-blue-500 to-blue-600",
      technologies: ["React", "Node.js", "Stripe", "MongoDB"]
    },
    {
      title: "Restaurant Elegance",
      description: "Fine dining website with online reservations and menu management system",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      category: "Restaurant",
      color: "from-emerald-500 to-emerald-600",
      technologies: ["Vue.js", "Firebase", "Stripe", "PWA"]
    },
    {
      title: "Tech Innovation Hub",
      description: "Cutting-edge technology company showcase with interactive demos",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      category: "Technology",
      color: "from-blue-600 to-blue-700",
      technologies: ["React", "TypeScript", "GraphQL", "AWS"]
    },
    {
      title: "Healthcare Solutions",
      description: "Medical practice website with appointment booking and patient portal",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
      category: "Healthcare",
      color: "from-emerald-600 to-blue-600",
      technologies: ["Angular", "Node.js", "PostgreSQL", "HIPAA"]
    }
  ]

  const portfolioProjects = [
    {
      id: 1,
      title: "TechStart Solutions",
      category: "technology",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      description: "Modern SaaS platform for startup management",
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
      liveUrl: "#",
      features: ["User Dashboard", "Analytics", "Team Collaboration", "API Integration"]
    },
    {
      id: 2,
      title: "Bella Vista Restaurant",
      category: "restaurant",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      description: "Elegant restaurant website with online reservations",
      technologies: ["Vue.js", "Firebase", "Stripe", "PWA"],
      liveUrl: "#",
      features: ["Online Reservations", "Menu Management", "Payment Processing", "Mobile App"]
    },
    {
      id: 3,
      title: "ShopEasy E-commerce",
      category: "ecommerce",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      description: "Full-featured online store with advanced analytics",
      technologies: ["React", "Express", "PostgreSQL", "Redis"],
      liveUrl: "#",
      features: ["Product Catalog", "Shopping Cart", "Payment Gateway", "Admin Panel"]
    },
    {
      id: 4,
      title: "HealthCare Plus",
      category: "healthcare",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      description: "Medical practice management system",
      technologies: ["Angular", "Node.js", "MySQL", "HIPAA"],
      liveUrl: "#",
      features: ["Patient Portal", "Appointment Booking", "Medical Records", "Billing System"]
    },
    {
      id: 5,
      title: "EduLearn Platform",
      category: "education",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      description: "Online learning management system",
      technologies: ["React", "Django", "PostgreSQL", "WebRTC"],
      liveUrl: "#",
      features: ["Course Management", "Video Streaming", "Progress Tracking", "Certificates"]
    },
    {
      id: 6,
      title: "FinanceFlow App",
      category: "finance",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
      description: "Personal finance management application",
      technologies: ["React Native", "Node.js", "MongoDB", "Plaid API"],
      liveUrl: "#",
      features: ["Expense Tracking", "Budget Planning", "Investment Tracking", "Reports"]
    }
  ]

  const services = [
    {
      icon: "🎨",
      title: "Custom Web Design",
      description: "Unique, professional designs tailored to your brand identity",
      color: "from-blue-400 to-blue-500",
      hoverColor: "from-blue-500 to-blue-600"
    },
    {
      icon: "📱",
      title: "Responsive Development",
      description: "Mobile-first approach ensuring perfect display on all devices",
      color: "from-emerald-400 to-emerald-500",
      hoverColor: "from-emerald-500 to-emerald-600"
    },
    {
      icon: "⚡",
      title: "Fast Performance",
      description: "Optimized websites that load quickly and rank well in search",
      color: "from-blue-500 to-emerald-500",
      hoverColor: "from-blue-600 to-emerald-600"
    },
    {
      icon: "🔧",
      title: "Easy Management",
      description: "User-friendly content management systems for easy updates",
      color: "from-emerald-500 to-blue-500",
      hoverColor: "from-emerald-600 to-blue-600"
    }
  ]

  const powerfulPoints = [
    {
      icon: "🏆",
      title: "Award-Winning Design",
      description: "Our designs have won multiple industry awards for excellence",
      color: "from-blue-400 to-blue-500"
    },
    {
      icon: "⚡",
      title: "Lightning Fast Delivery",
      description: "Get your website live in just 7-14 days, not months",
      color: "from-emerald-400 to-emerald-500"
    },
    {
      icon: "💰",
      title: "Best Value Guarantee",
      description: "Premium quality at competitive prices with money-back guarantee",
      color: "from-blue-500 to-emerald-500"
    },
    {
      icon: "🎯",
      title: "Results-Driven",
      description: "Websites designed to convert visitors into customers",
      color: "from-emerald-500 to-blue-500"
    }
  ]

  const pricingPlans = [
    {
      name: "Single Page Website",
      originalPrice: 300,
      currentPrice: 200,
      savings: 100,
      features: [
        "Professional single-page design",
        "Mobile responsive",
        "Contact form integration",
        "Basic SEO optimization",
        "1 month free support"
      ],
      popular: false,
      color: "from-blue-500 to-blue-600",
      glowColor: "shadow-blue-500/25"
    },
    {
      name: "Website + Logo",
      originalPrice: 399,
      currentPrice: 299,
      savings: 100,
      features: [
        "Multi-page professional website",
        "Custom logo design",
        "Mobile responsive",
        "Contact forms & integrations",
        "Advanced SEO optimization",
        "3 months free support"
      ],
      popular: true,
      color: "from-emerald-500 to-blue-500",
      glowColor: "shadow-emerald-500/25"
    },
    {
      name: "Complete Brand Package",
      originalPrice: 520,
      currentPrice: 420,
      savings: 100,
      features: [
        "Full website with multiple pages",
        "Professional logo design",
        "Business card design",
        "Brand guidelines",
        "Social media templates",
        "6 months free support"
      ],
      popular: false,
      color: "from-blue-600 to-emerald-600",
      glowColor: "shadow-blue-500/25"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % portfolioSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + portfolioSlides.length) % portfolioSlides.length)
  }

  const handleGetStarted = (planName) => {
    setSelectedPlan(planName)
    setIsFormOpen(true)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    // Frontend validation
    if (!formData.name || !formData.email || !formData.phone || !selectedPlan) {
      alert('Please fill in all fields and select a plan before submitting.');
      return;
    }
    setIsSubmitting(true)
    try {
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: countryCode + formData.phone,
          plan: selectedPlan
        })
      })
      if (response.ok) {
        alert(`Thank you ${formData.name}! We've received your request for the ${selectedPlan} plan. We'll contact you soon!`)
        setFormData({ name: '', email: '', phone: '' })
        setIsFormOpen(false)
        setSelectedPlan('')
      } else {
        const errorData = await response.json()
        alert('Failed to send request: ' + (errorData.error || 'Unknown error'))
      }
    } catch (error) {
      alert('Error sending email. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const filteredProjects = portfolioFilter === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === portfolioFilter)

  const categories = ['all', 'technology', 'restaurant', 'ecommerce', 'healthcare', 'education', 'finance']

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-emerald-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40 animate-slideDown shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                <Sparkles className="inline mr-2 text-blue-500 animate-spin" size={24} />
                BrandBoost
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-110">Home</a>
                <a href="#services" className="text-gray-500 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-110">Services</a>
                <a href="#portfolio" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-110">Portfolio</a>
                <a href="#pricing" className="text-gray-500 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-110">Pricing</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section with Bigger Slider */}
      <section id="home" className="relative pt-16 pb-20 bg-gradient-to-br from-blue-50 to-emerald-50" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.home ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fadeInUp">
              Boost Your Brand with
              <span className="block bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-700 bg-clip-text text-transparent animate-gradient-x">
                Stunning Websites
              </span>
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-8 animate-fadeInUp delay-300">
              Professional website creation services that help your business stand out online. 
              From concept to launch, we create websites that convert visitors into customers.
            </p>
            <div className="flex justify-center space-x-4 animate-fadeInUp delay-500">
              <Zap className="text-blue-500 animate-bounce" size={32} />
              <Heart className="text-emerald-500 animate-pulse" size={32} />
              <Sparkles className="text-blue-600 animate-spin" size={32} />
            </div>
          </div>

          {/* Enhanced Portfolio Slider - Much Bigger */}
          <div className="relative max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-200 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group">
              <div className="relative h-[600px]">
                <img 
                  src={portfolioSlides[currentSlide].image} 
                  alt={portfolioSlides[currentSlide].title}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent"></div>
                
                {/* Enhanced Overlay Content */}
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className={`inline-block bg-gradient-to-r ${portfolioSlides[currentSlide].color} text-white px-6 py-3 rounded-full text-sm font-medium animate-pulse shadow-lg`}>
                      {portfolioSlides[currentSlide].category}
                    </span>
                    {portfolioSlides[currentSlide].technologies.map((tech, index) => (
                      <span key={index} className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-4xl font-bold mb-4 animate-slideInLeft">{portfolioSlides[currentSlide].title}</h3>
                  <p className="text-xl text-gray-200 animate-slideInLeft delay-200 max-w-2xl">{portfolioSlides[currentSlide].description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mt-6 w-full bg-white/20 rounded-full h-1">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-emerald-500 h-1 rounded-full transition-all duration-5000"
                      style={{ width: `${((currentSlide + 1) / portfolioSlides.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Animated Floating Elements */}
                <div className="absolute top-8 right-8 animate-bounce delay-1000">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <Eye className="text-white" size={24} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Slider Controls */}
            <button 
              onClick={prevSlide}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-blue-500/25 group"
            >
              <ChevronLeft size={28} className="group-hover:animate-pulse" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white p-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-emerald-500/25 group"
            >
              <ChevronRight size={28} className="group-hover:animate-pulse" />
            </button>

            {/* Enhanced Slider Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {portfolioSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-12 h-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full shadow-lg' 
                      : 'w-4 h-4 bg-gray-300 hover:bg-gray-400 rounded-full hover:scale-125'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.portfolio ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Our Portfolio
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-8">
              Explore our diverse range of successful projects across various industries
            </p>
            
            {/* Portfolio Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setPortfolioFilter(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    portfolioFilter === category
                      ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden border border-gray-200 animate-fadeInUp"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-200">
                          <ExternalLink size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-emerald-600 group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </h3>
                    <span className="bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-500 mb-4 group-hover:text-gray-600 transition-colors duration-300">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white py-2 rounded-lg transition-all duration-300 hover:shadow-lg group-hover:animate-pulse"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-scaleIn">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all duration-300 z-10"
            >
              <X size={24} />
            </button>
            
            <div className="relative">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-3xl font-bold mb-2">{selectedProject.title}</h3>
                <p className="text-gray-200">{selectedProject.description}</p>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="text-emerald-500 mr-3 flex-shrink-0" size={16} />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Project Details</h4>
                  <p className="text-gray-600 mb-6">
                    This project showcases our expertise in creating modern, scalable web applications 
                    that deliver exceptional user experiences and drive business results.
                  </p>
                  
                  <div className="space-y-4">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white py-3 rounded-lg transition-all duration-300 hover:shadow-lg">
                      <ExternalLink className="inline mr-2" size={16} />
                      View Live Site
                    </button>
                    <button 
                      onClick={() => handleGetStarted('Website + Logo')}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg transition-all duration-300"
                    >
                      Start Similar Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Why Websites Matter Section */}
      <section className="py-20 bg-gray-50" id="why" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.why ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Why Every Business Needs a Website
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              In today's digital world, your website is often the first impression customers have of your business. 
              It's your 24/7 sales representative, working to attract and convert customers even while you sleep.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {powerfulPoints.map((point, index) => (
              <div 
                key={index} 
                className={`bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500 hover:scale-105 group animate-fadeInUp shadow-lg`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:animate-bounce`}>
                  {point.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-emerald-600 group-hover:bg-clip-text transition-all duration-300">
                  {point.title}
                </h3>
                <p className="text-gray-500 group-hover:text-gray-600 transition-colors duration-300">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Our Services</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              We offer comprehensive website creation services to help your business succeed online
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`text-center p-8 rounded-2xl bg-gradient-to-br ${service.color} hover:bg-gradient-to-br hover:${service.hoverColor} transition-all duration-500 hover:scale-110 hover:shadow-2xl group animate-slideInUp border border-white/20 backdrop-blur-sm text-white shadow-lg`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-5xl mb-4 group-hover:animate-bounce transition-transform duration-300 group-hover:scale-125">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-yellow-100 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/90 group-hover:text-white transition-colors duration-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.pricing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-4 animate-pulse shadow-lg">
              🔥 Limited Time Discount - Save $100 on All Plans!
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Choose Your Package</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Professional website creation services at unbeatable prices
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 group hover:scale-105 ${plan.popular ? 'ring-2 ring-emerald-500 scale-105' : ''} ${plan.glowColor} hover:shadow-2xl animate-fadeInUp`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold animate-bounce shadow-lg">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-emerald-600 group-hover:bg-clip-text transition-all duration-300">
                    {plan.name}
                  </h3>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-gray-400 line-through text-2xl mr-2">${plan.originalPrice}</span>
                      <span className="text-4xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                        ${plan.currentPrice}
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold inline-block animate-pulse">
                      💰 Save ${plan.savings}!
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center group-hover:animate-slideInLeft" style={{ animationDelay: `${featureIndex * 100}ms` }}>
                        <Check className="text-emerald-500 mr-3 flex-shrink-0 group-hover:animate-spin" size={20} />
                        <span className="text-gray-500 group-hover:text-gray-600 transition-colors duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => handleGetStarted(plan.name)}
                    className={`w-full py-4 text-lg font-bold transition-all duration-300 bg-gradient-to-r ${plan.color} hover:scale-105 hover:shadow-lg text-white border-0 rounded-xl group-hover:animate-pulse`}
                  >
                    <Sparkles className="mr-2 animate-spin" size={20} />
                    Get Started
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-12 max-w-xl w-full relative border border-gray-200 shadow-2xl animate-scaleIn">
            <button 
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all duration-300"
            >
              <X size={28} />
            </button>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Get Started Today!
            </h3>
            <p className="text-lg text-gray-500 mb-8">
              Selected plan: <span className="font-semibold text-blue-600">{selectedPlan}</span>
            </p>
            
            <form onSubmit={handleFormSubmit} className="space-y-8">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  <User className="inline mr-2 text-blue-500" size={22} />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-8 py-5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 text-xl"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  <Mail className="inline mr-2 text-emerald-500" size={22} />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-8 py-5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 text-xl"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  <Phone className="inline mr-2 text-blue-500" size={22} />
                  Phone Number
                </label>
                <div className="flex">
                  <div className="relative">
                    <select
                      value={countryCode}
                      onChange={e => setCountryCode(e.target.value)}
                      className="mr-2 px-4 py-5 bg-gray-50 border border-gray-200 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-gray-900 text-xl appearance-none pr-10"
                      style={{ minWidth: '120px' }}
                    >
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+20">🇪🇬 +20</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+966">🇸🇦 +966</option>
                      <option value="+965">🇰🇼 +965</option>
                      <option value="+974">🇶🇦 +974</option>
                      <option value="+968">🇴🇲 +968</option>
                      <option value="+973">🇧🇭 +973</option>
                      <option value="+962">🇯🇴 +962</option>
                      <option value="+964">🇮🇶 +964</option>
                      <option value="+967">🇾🇪 +967</option>
                      <option value="+81">🇯🇵 +81</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+90">🇹🇷 +90</option>
                      <option value="+212">🇲🇦 +212</option>
                      <option value="+213">🇩🇿 +213</option>
                      <option value="+216">🇹🇳 +216</option>
                      <option value="+249">🇸🇩 +249</option>
                      <option value="+961">🇱🇧 +961</option>
                      <option value="+963">🇸🇾 +963</option>
                      <option value="+970">🇵🇸 +970</option>
                    </select>
                    {/* Custom overlay for selected value: only flag and code */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-xl font-medium text-gray-900" style={{background: 'transparent'}}>
                      {(() => {
                        const options = [
                          { code: '+1', flag: '🇺🇸' },
                          { code: '+44', flag: '🇬🇧' },
                          { code: '+20', flag: '🇪🇬' },
                          { code: '+49', flag: '🇩🇪' },
                          { code: '+33', flag: '🇫🇷' },
                          { code: '+91', flag: '🇮🇳' },
                          { code: '+971', flag: '🇦🇪' },
                          { code: '+966', flag: '🇸🇦' },
                          { code: '+965', flag: '🇰🇼' },
                          { code: '+974', flag: '🇶🇦' },
                          { code: '+968', flag: '🇴🇲' },
                          { code: '+973', flag: '🇧🇭' },
                          { code: '+962', flag: '🇯🇴' },
                          { code: '+964', flag: '🇮🇶' },
                          { code: '+967', flag: '🇾🇪' },
                          { code: '+81', flag: '🇯🇵' },
                          { code: '+61', flag: '🇦🇺' },
                          { code: '+90', flag: '🇹🇷' },
                          { code: '+212', flag: '🇲🇦' },
                          { code: '+213', flag: '🇩🇿' },
                          { code: '+216', flag: '🇹🇳' },
                          { code: '+249', flag: '🇸🇩' },
                          { code: '+961', flag: '🇱🇧' },
                          { code: '+963', flag: '🇸🇾' },
                          { code: '+970', flag: '🇵🇸' },
                        ];
                        const selected = options.find(opt => opt.code === countryCode);
                        return selected ? <span>{selected.flag} {selected.code}</span> : <span>{countryCode}</span>;
                      })()}
                    </div>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-8 py-5 bg-gray-50 border border-gray-200 rounded-r-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 text-xl"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white py-6 text-2xl font-bold mt-8 disabled:opacity-50 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg border-0"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin mr-2 w-6 h-6 border-2 border-white/30 border-t-white rounded-full"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 animate-pulse" size={28} />
                    Submit Request
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              BrandBoost
            </h3>
            <p className="text-gray-400 mb-6">Professional Website Creation Services</p>
            <p className="text-gray-500 text-sm">© 2024 BrandBoost. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

