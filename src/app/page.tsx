'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  MessageCircle, 
  Check, 
  X, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Target,
  BarChart3,
  Zap,
  Shield,
  ArrowRight,
  Send,
  Bot,
  User,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight as ArrowRightIcon,
  X as CloseIcon,
  Info
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  actions?: Array<{
    type: 'discovery' | 'trial' | 'demo'
    text: string
    url: string
  }>
}

export default function MindStaqLanding() {
  const [scrollY, setScrollY] = useState(0)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m the MindStaq AI assistant. How can I help you understand our platform today?',
      timestamp: new Date()
    }
  ])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState('projects')
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const [hoveredIcon, setHoveredIcon] = useState<{row: string, col: string} | null>(null)
  
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleChatSend = async () => {
    if (!chatInput.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: chatInput })
      })

      const data = await response.json()
      
      // Extract potential CTAs from the AI response
      const actions = extractActionsFromResponse(data.message)
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
        actions
      }

      setChatMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const extractActionsFromResponse = (message: string) => {
    const actions = []
    
    // Check for discovery call CTA
    if (message.includes('discovery call') || message.includes('book a') || message.includes('personalized demo')) {
      actions.push({
        type: 'discovery' as const,
        text: 'Book Discovery Call',
        url: 'https://cal.com/chandan-jayaswal-md1hei/mindstaq-chandan?duration=30'
      })
    }
    
    // Check for free trial CTA
    if (message.includes('free trial') || message.includes('try it yourself') || message.includes('start your free trial')) {
      actions.push({
        type: 'trial' as const,
        text: 'Start Free Trial',
        url: 'https://app.mindstaq.com/register.html?plan=mindstaq-pro-monthly&mode=trial&cta_source=ai_chat'
      })
    }
    
    // Check for demo CTA
    if (message.includes('demo') || message.includes('show you exactly how')) {
      actions.push({
        type: 'demo' as const,
        text: 'Watch Demo',
        url: 'https://jumpshare.com/share/V5yH03BksBMiMDHWT1OJ?b=h5KBHYgSOBO8Q2167TT2'
      })
    }
    
    return actions
  }

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-200" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1), 0 0 20px rgba(59, 130, 246, 0.3)' }}>
              Mindstaq
            </h1>
          </div>
          <Button 
            onClick={() => setIsChatOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Talk to AI
          </Button>
        </div>
      </nav>

      {/* SECTION 1: Hero - The Chaos You Know */}
      <section 
        ref={el => sectionRefs.current[0] = el}
        className="min-h-screen flex items-center justify-center bg-gray-50 pt-20"
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96">
            {/* Floating square icons with arrows */}
            <div className="absolute inset-0">
              {/* Slack - Top Left */}
              <div 
                className={cn(
                  "absolute top-12 left-12 transition-all duration-300",
                  scrollY > 100 ? "opacity-50 scale-95" : "opacity-100 scale-100"
                )}
                style={{ 
                  animation: 'float 3s ease-in-out infinite',
                  animationDelay: '0ms'
                }}
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                    <span className="text-purple-700 font-bold text-sm">Slack</span>
                  </div>
                  <ArrowUp className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-purple-500 w-6 h-6" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <X className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Jira - Top Right */}
              <div 
                className={cn(
                  "absolute top-12 right-12 transition-all duration-300",
                  scrollY > 100 ? "opacity-50 scale-95" : "opacity-100 scale-100"
                )}
                style={{ 
                  animation: 'float 3s ease-in-out infinite',
                  animationDelay: '500ms'
                }}
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                    <span className="text-blue-700 font-bold text-sm">Jira</span>
                  </div>
                  <ArrowRightIcon className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-blue-500 w-6 h-6" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <X className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Asana - Center */}
              <div 
                className={cn(
                  "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                  scrollY > 100 ? "opacity-50 scale-95" : "opacity-100 scale-100"
                )}
                style={{ 
                  animation: 'float 3s ease-in-out infinite',
                  animationDelay: '1000ms'
                }}
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-pink-100 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                    <span className="text-pink-700 font-bold text-sm">Asana</span>
                  </div>
                  <ArrowUp className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-pink-500 w-6 h-6" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <X className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Monday.com - Bottom Left */}
              <div 
                className={cn(
                  "absolute bottom-12 left-12 transition-all duration-300",
                  scrollY > 100 ? "opacity-50 scale-95" : "opacity-100 scale-100"
                )}
                style={{ 
                  animation: 'float 3s ease-in-out infinite',
                  animationDelay: '1500ms'
                }}
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                    <span className="text-green-700 font-bold text-xs">Monday</span>
                  </div>
                  <ArrowLeft className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-green-500 w-6 h-6" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <X className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Excel - Bottom Right */}
              <div 
                className={cn(
                  "absolute bottom-12 right-12 transition-all duration-300",
                  scrollY > 100 ? "opacity-50 scale-95" : "opacity-100 scale-100"
                )}
                style={{ 
                  animation: 'float 3s ease-in-out infinite',
                  animationDelay: '2000ms'
                }}
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-green-50 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow border border-green-200">
                    <span className="text-green-700 font-bold text-sm">Excel</span>
                  </div>
                  <ArrowDown className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-green-600 w-6 h-6" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <X className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Tired of <span className="text-blue-600">App-Hopping?</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Reunite your tools. Reclaim your team's focus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => window.open('https://cal.com/chandan-jayaswal-md1hei/mindstaq-chandan?duration=30', '_blank')}
              >
                Book a Discovery Call
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => window.open('https://app.mindstaq.com/register.html?plan=mindstaq-pro-monthly&mode=trial&cta_source=home_main', '_blank')}
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: The Cost of Fragmentation */}
      <section 
        ref={el => sectionRefs.current[1] = el}
        className="min-h-screen flex items-center justify-center py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Disconnected Tools, <span className="text-red-600">Real Costs</span>
            </h2>
            <p className="text-xl text-gray-600">
              Hybrid teams lose up to 12 hours/week syncing fragmented systems.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                { label: 'Tool Fatigue', value: '70%', color: 'bg-red-500' },
                { label: 'Manual Status Decks', value: '8 hrs/week', color: 'bg-orange-500' },
                { label: 'Missed Milestones', value: '23%', color: 'bg-yellow-500' },
                { label: 'Lost Hours per Week', value: '12 hrs', color: 'bg-red-600' }
              ].map((stat, index) => (
                <div key={stat.label} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">{stat.label}</span>
                    <span className="font-bold text-gray-900">{stat.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={cn("h-3 rounded-full transition-all duration-1000", stat.color)}
                      style={{ 
                        width: scrollY > 400 ? `${[70, 60, 23, 80][index]}%` : '0%',
                        transitionDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <Card className="p-8 bg-green-50 border-green-200">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-green-600 mb-2">70%</div>
                <p className="text-lg text-gray-700">
                  Teams reduce tool-switching with MindStaq
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 3: Introducing MindStaq */}
      <section 
        ref={el => sectionRefs.current[2] = el}
        className="min-h-screen flex items-center justify-center bg-blue-50 py-20"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            One Workspace. <span className="text-blue-600">Zero Chaos.</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            MindStaq unifies your projects, tasks, messages, and metrics — without the learning curve.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Target, title: 'My Work', desc: 'Personal task hub' },
              { icon: BarChart3, title: 'Projects', desc: 'Waterfall + Agile' },
              { icon: Users, title: 'Team Dynamics', desc: 'Collaboration insights' },
              { icon: MessageCircle, title: 'Task Chat', desc: 'Context-focused messaging' },
              { icon: Shield, title: 'Scorecards', desc: 'OKR tracking' },
              { icon: Zap, title: 'Insights', desc: 'AI-powered analytics' }
            ].map((feature, index) => (
              <Card 
                key={feature.title}
                className={cn(
                  "p-6 transition-all duration-300 hover:shadow-lg hover:scale-105",
                  scrollY > 800 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </Card>
            ))}
          </div>
          
          <Button 
            size="lg"
            onClick={() => window.open('https://jumpshare.com/share/V5yH03BksBMiMDHWT1OJ?b=h5KBHYgSOBO8Q2167TT2', '_blank')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            See It In Action
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* SECTION 4: How It Works - The 5 Pillars */}
      <section 
        ref={el => sectionRefs.current[3] = el}
        className="min-h-screen flex items-center justify-center py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built for Real Work. <span className="text-blue-600">Not Just Agile.</span>
            </h2>
            <p className="text-xl text-gray-600">
              One platform for sprints, milestones, and everything in between.
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="alignment">Alignment</TabsTrigger>
              <TabsTrigger value="team">Team Dynamics</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="mt-8">
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Projects</h3>
                <p className="text-gray-600 mb-6">
                  Waterfall, Agile, and Operational views with OKRs and Issue Management
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Waterfall</h4>
                    <p className="text-sm text-blue-700">Traditional project management with Gantt charts</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Agile</h4>
                    <p className="text-sm text-green-700">Sprints, backlogs, and iterative development</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Operational</h4>
                    <p className="text-sm text-purple-700">Day-to-day task and workflow management</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="communication" className="mt-8">
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Communication</h3>
                <p className="text-gray-600 mb-6">
                  Task-Specific Chat, Messaging Channels, and Direct Messaging
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Task-Specific Messages</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Team Channels</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">Direct Messaging</span>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="alignment" className="mt-8">
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Alignment</h3>
                <p className="text-gray-600 mb-6">
                  OKRs and Enterprise Scorecards for strategic alignment
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-orange-50 rounded-lg">
                    <Target className="w-8 h-8 text-orange-600 mb-3" />
                    <h4 className="font-semibold text-orange-900 mb-2">OKRs</h4>
                    <p className="text-sm text-orange-700">Connect objectives to daily tasks</p>
                  </div>
                  <div className="p-6 bg-indigo-50 rounded-lg">
                    <BarChart3 className="w-8 h-8 text-indigo-600 mb-3" />
                    <h4 className="font-semibold text-indigo-900 mb-2">Scorecards</h4>
                    <p className="text-sm text-indigo-700">Track performance metrics</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="team" className="mt-8">
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Team Dynamics</h3>
                <p className="text-gray-600">
                  Understand team collaboration patterns and optimize workflows
                </p>
              </Card>
            </TabsContent>
            
            <TabsContent value="insights" className="mt-8">
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Insights</h3>
                <p className="text-gray-600">
                  AI-powered analytics and predictive insights for better decision-making
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* SECTION 5: AI That Works For You */}
      <section 
        ref={el => sectionRefs.current[4] = el}
        className="min-h-screen flex items-center justify-center bg-gray-50 py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Smart <span className="text-green-600">Where It Matters</span>
            </h2>
            <p className="text-xl text-gray-600">
              Let AI flag risks, summarize threads, and suggest resource tweaks.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Risk Detection',
                desc: 'AI auto-highlights at-risk milestones',
                icon: AlertTriangle,
                color: 'text-red-600',
                bgColor: 'bg-red-50'
              },
              {
                title: 'Smart Summaries',
                desc: 'AI summarizes long issue threads',
                icon: MessageCircle,
                color: 'text-blue-600',
                bgColor: 'bg-blue-50'
              },
              {
                title: 'Resource Optimization',
                desc: 'Suggests resource rebalancing',
                icon: Users,
                color: 'text-green-600',
                bgColor: 'bg-green-50'
              }
            ].map((feature, index) => (
              <Card 
                key={feature.title}
                className={cn(
                  "p-6 cursor-pointer transition-all duration-300 hover:shadow-xl",
                  hoveredFeature === feature.title ? "scale-105" : ""
                )}
                onMouseEnter={() => setHoveredFeature(feature.title)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={cn("p-4 rounded-lg mb-4", feature.bgColor)}>
                  <feature.icon className={cn("w-12 h-12", feature.color)} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: For Teams That Play By Different Rules */}
      <section 
        ref={el => sectionRefs.current[5] = el}
        className="min-h-screen flex items-center justify-center py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Agile. Waterfall. Tickets. <span className="text-blue-600">All Here.</span>
            </h2>
            <p className="text-xl text-gray-600">
              Finally, a system that adapts to your team — not the other way around.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-700 mb-4">Marketing</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded">
                  <div className="text-sm font-medium text-green-900">Campaign Launch</div>
                  <div className="text-xs text-green-700">Kanban Board</div>
                </div>
                <div className="p-3 bg-green-50 rounded">
                  <div className="text-sm font-medium text-green-900">Content Calendar</div>
                  <div className="text-xs text-green-700">Sprint Planning</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-700 mb-4">Engineering</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded">
                  <div className="text-sm font-medium text-blue-900">Product Release</div>
                  <div className="text-xs text-blue-700">Gantt + Dependencies</div>
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <div className="text-sm font-medium text-blue-900">Sprint Development</div>
                  <div className="text-xs text-blue-700">Agile Board</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-700 mb-4">Support</h3>
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded">
                  <div className="text-sm font-medium text-purple-900">Ticket Resolution</div>
                  <div className="text-xs text-purple-700">Lifecycle Management</div>
                </div>
                <div className="p-3 bg-purple-50 rounded">
                  <div className="text-sm font-medium text-purple-900">SLA Tracking</div>
                  <div className="text-xs text-purple-700">Operational View</div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="mt-12 p-6 bg-yellow-50 rounded-lg text-center">
            <p className="text-lg font-medium text-yellow-900">
              💡 Aha Moment: Drag tasks between workflows — system auto-adjusts dependencies
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: Executive Lens - Single Source of Truth */}
      <section 
        ref={el => sectionRefs.current[6] = el}
        className="min-h-screen flex items-center justify-center bg-blue-50 py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Clarity for <span className="text-blue-600">Every Stakeholder</span>
            </h2>
            <p className="text-xl text-gray-600">
              From team leads to CFOs — one shared view of progress and risk.
            </p>
          </div>
          
          <Card className="p-8 bg-white shadow-xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-blue-50 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-semibold text-blue-900 mb-2">Portfolio Health</h4>
                <div className="text-2xl font-bold text-blue-600">87%</div>
                <p className="text-sm text-blue-700">On-track projects</p>
              </div>
              
              <div className="p-6 bg-green-50 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                <Target className="w-8 h-8 text-green-600 mb-3" />
                <h4 className="font-semibold text-green-900 mb-2">OKR Progress</h4>
                <div className="text-2xl font-bold text-green-600">72%</div>
                <p className="text-sm text-green-700">Q3 objectives</p>
              </div>
              
              <div className="p-6 bg-orange-50 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                <Users className="w-8 h-8 text-orange-600 mb-3" />
                <h4 className="font-semibold text-orange-900 mb-2">Resource Heatmap</h4>
                <div className="text-2xl font-bold text-orange-600">94%</div>
                <p className="text-sm text-orange-700">Utilization rate</p>
              </div>
              
              <div className="p-6 bg-purple-50 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                <Zap className="w-8 h-8 text-purple-600 mb-3" />
                <h4 className="font-semibold text-purple-900 mb-2">Task Burndown</h4>
                <div className="text-2xl font-bold text-purple-600">142</div>
                <p className="text-sm text-purple-700">Tasks this week</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 8: Why MindStaq, Not the Rest? */}
      <section 
        ref={el => sectionRefs.current[7] = el}
        className="min-h-screen flex items-center justify-center py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Teams Choose <span className="text-blue-600">MindStaq</span>
            </h2>
            <p className="text-xl text-gray-600">
              Less friction. More visibility. One platform that flexes with your org.
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="p-4 text-left font-bold text-gray-800">Feature</th>
                      <th className="p-4 text-center font-bold text-blue-600 bg-blue-50 rounded-t-lg">MindStaq</th>
                      <th className="p-4 text-center font-bold text-gray-700">Asana</th>
                      <th className="p-4 text-center font-bold text-gray-700">Monday</th>
                      <th className="p-4 text-center font-bold text-gray-700">Jira</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: 'Unified Messaging', mindstaq: '✅', asana: '❌', monday: '⚠️', jira: '❌' },
                      { feature: 'OKR-to-Task Linking', mindstaq: '✅', asana: '❌', monday: '❌', jira: '❌' },
                      { feature: 'MS Teams Integration', mindstaq: '✅', asana: '⚠️', monday: '⚠️', jira: '❌' },
                      { feature: 'Waterfall+Agile Support', mindstaq: '✅', asana: '⚠️', monday: '❌', jira: '❌' },
                      { feature: 'Minimalist Learning Curve', mindstaq: '✅', asana: '⚠️', monday: '❌', jira: '⚠️' }
                    ].map((row, index) => (
                      <tr 
                        key={row.feature}
                        className={cn(
                          "border-b transition-all duration-200 hover:bg-white hover:shadow-md",
                          index % 2 === 0 ? "bg-gray-50/50" : "bg-white/50"
                        )}
                      >
                        <td className="p-4 font-semibold text-gray-900">{row.feature}</td>
                        <td className="p-4 text-center bg-blue-50/50">
                          <span className="text-2xl text-green-600 font-bold drop-shadow-sm">{row.mindstaq}</span>
                        </td>
                        <td className="p-4 text-center relative">
                          <div 
                            className="inline-block relative"
                            onMouseEnter={() => setHoveredIcon({row: row.feature, col: 'asana'})}
                            onMouseLeave={() => setHoveredIcon(null)}
                          >
                            <span className={cn(
                              "text-2xl font-bold cursor-pointer transition-transform hover:scale-110",
                              row.asana === '✅' ? 'text-green-600' : 
                              row.asana === '⚠️' ? 'text-yellow-600' : 'text-red-600'
                            )}>{row.asana}</span>
                            {hoveredIcon?.row === row.feature && hoveredIcon?.col === 'asana' && row.asana !== '✅' && (
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-10 shadow-xl">
                                {row.asana === '⚠️' ? 'Partially available for higher cost' : 'This feature is not available'}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                                  <div className="border-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-center relative">
                          <div 
                            className="inline-block relative"
                            onMouseEnter={() => setHoveredIcon({row: row.feature, col: 'monday'})}
                            onMouseLeave={() => setHoveredIcon(null)}
                          >
                            <span className={cn(
                              "text-2xl font-bold cursor-pointer transition-transform hover:scale-110",
                              row.monday === '✅' ? 'text-green-600' : 
                              row.monday === '⚠️' ? 'text-yellow-600' : 'text-red-600'
                            )}>{row.monday}</span>
                            {hoveredIcon?.row === row.feature && hoveredIcon?.col === 'monday' && row.monday !== '✅' && (
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-10 shadow-xl">
                                {row.monday === '⚠️' ? 'Partially available for higher cost' : 'This feature is not available'}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                                  <div className="border-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-center relative">
                          <div 
                            className="inline-block relative"
                            onMouseEnter={() => setHoveredIcon({row: row.feature, col: 'jira'})}
                            onMouseLeave={() => setHoveredIcon(null)}
                          >
                            <span className={cn(
                              "text-2xl font-bold cursor-pointer transition-transform hover:scale-110",
                              row.jira === '✅' ? 'text-green-600' : 
                              row.jira === '⚠️' ? 'text-yellow-600' : 'text-red-600'
                            )}>{row.jira}</span>
                            {hoveredIcon?.row === row.feature && hoveredIcon?.col === 'jira' && row.jira !== '✅' && (
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-10 shadow-xl">
                                {row.jira === '⚠️' ? 'Partially available for higher cost' : 'This feature is not available'}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                                  <div className="border-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: Call to Action */}
      <section 
        ref={el => sectionRefs.current[8] = el}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 py-20"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Replace Your <span className="text-blue-600">Patchwork</span>. Reclaim Your <span className="text-green-600">Focus</span>.
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            See how 60+ engineers saved hours — and hit every milestone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
              onClick={() => window.open('https://cal.com/chandan-jayaswal-md1hei/mindstaq-chandan?duration=30', '_blank')}
            >
              Book a Discovery Call
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg"
              onClick={() => window.open('https://app.mindstaq.com/register.html?plan=mindstaq-pro-monthly&mode=trial&cta_source=home_main', '_blank')}
            >
              Start Free Trial
              <Badge variant="secondary" className="ml-2">30 days</Badge>
            </Button>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">
              ✅ No credit card required • ✅ Full feature access • ✅ Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10: Trust & Footer */}
      <section 
        ref={el => sectionRefs.current[9] = el}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Teams Who <span className="text-blue-600">Live the Work</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Used by hybrid teams managing 500+ concurrent tasks
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {['Healthcare', 'Fintech', 'Logistics', 'IT Consultancy'].map((industry) => (
              <div key={industry} className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-gray-500 font-bold">{industry[0]}</span>
                </div>
                <p className="text-sm text-gray-600">{industry}</p>
              </div>
            ))}
          </div>
          
          <Card className="p-8 bg-blue-50 border-blue-200 text-center">
            <blockquote className="text-lg text-gray-700 italic mb-4">
              "We built MindStaq because we lived the chaos."
            </blockquote>
            <cite className="text-gray-600">
              — Abu Moniruzzaman, CEO
            </cite>
          </Card>
          
          <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>&copy; 2024 MindStaq. All rights reserved.</p>
          </footer>
        </div>
      </section>

      {/* AI Chatbot */}
      <div className={cn(
        "fixed bottom-6 right-6 z-50 transition-all duration-300",
        isChatOpen ? "scale-100" : "scale-100"
      )}>
        {!isChatOpen && (
          <Button
            onClick={() => setIsChatOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 rounded-full w-14 h-14 shadow-lg"
            size="icon"
          >
            <Bot className="w-6 h-6" />
          </Button>
        )}
        
        {isChatOpen && (
          <Card className="w-96 h-[500px] shadow-2xl">
            <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <span className="font-semibold">MindStaq AI Assistant</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-blue-700"
              >
                <CloseIcon className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="h-[350px] overflow-y-auto p-4 space-y-3">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-lg",
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    )}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === 'assistant' && (
                        <Bot className="w-4 h-4 mt-0.5 text-blue-600" />
                      )}
                      <p className="text-sm">{message.content}</p>
                      {message.role === 'user' && (
                        <User className="w-4 h-4 mt-0.5 text-blue-200" />
                      )}
                    </div>
                    {message.actions && message.actions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.actions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => window.open(action.url, '_blank')}
                            className={cn(
                              "w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors",
                              action.type === 'discovery' 
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : action.type === 'trial'
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-purple-600 text-white hover:bg-purple-700'
                            )}
                          >
                            {action.text}
                            <ArrowRight className="inline-block w-3 h-3 ml-1" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-blue-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder="Ask about MindStaq..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  onClick={handleChatSend}
                  disabled={!chatInput.trim() || isTyping}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}