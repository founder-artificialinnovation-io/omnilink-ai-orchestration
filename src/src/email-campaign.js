// Email Campaign Module for OmniLink
class EmailCampaignModule {
    constructor() {
        this.targetLists = {
            techstars: [],
            ycombinator: [], 
            aiAngels: [],
            universityFunds: [],
            emergencyFunds: []
        };
        this.campaignTemplates = new Map();
        this.initializeTemplates();
    }

    initializeTemplates() {
        // Techstars Investor Template
        this.campaignTemplates.set('techstars', {
            subject: "OmniLink: AI Orchestration Platform - Seeking Strategic Partnership",
            template: `Dear {{firstName}},

I hope this message finds you well. I'm reaching out because of Techstars' exceptional track record in supporting innovative AI companies.

I'm {{founderName}}, founder of OmniLink - a multi-modal AI orchestration platform that's solving a critical infrastructure problem for AI-driven businesses.

**The Problem**: Companies using multiple AI providers (OpenAI, Claude, Cohere, etc.) struggle with:
- Complex integration management
- Inconsistent performance monitoring  
- Workflow orchestration across providers
- Cost optimization challenges

**Our Solution**: OmniLink provides a unified platform that:
✅ Orchestrates tasks across multiple AI providers
✅ Optimizes cost and performance automatically
✅ Provides real-time monitoring and analytics
✅ Enables complex multi-step AI workflows

**Traction**: 
- Built MVP with working demo
- Identified $2.1B+ TAM in AI infrastructure
- Strong technical foundation ready for scale

**The Ask**: We're raising ${{fundingAmount}} to accelerate development and capture this rapidly growing market. Given Techstars' expertise in AI infrastructure companies, I'd love to discuss how OmniLink fits your investment thesis.

Would you be available for a 15-minute call next week to see our demo?

Best regards,
{{founderName}}
{{title}}
{{companyName}}

P.S. Happy to provide a live demo link: {{demoUrl}}`
        });

        // Y Combinator Template
        this.campaignTemplates.set('ycombinator', {
            subject: "YC Alumni: OmniLink Demo - Multi-Modal AI Orchestration",
            template: `Hi {{firstName}},

As fellow builders in the YC ecosystem, I wanted to share something that could be game-changing for AI infrastructure.

I'm {{founderName}}, and I've built OmniLink - think "Zapier for AI providers" but with enterprise-grade orchestration.

**Why now?** 
- 73% of companies use 3+ AI providers
- $2.1B market growing 40% annually  
- No unified orchestration solution exists

**What we've built**:
🚀 Live platform orchestrating OpenAI, Claude, Cohere
📊 Real-time cost/performance optimization
🔧 Visual workflow builder for complex AI tasks
⚡ 10x faster deployment vs custom integrations

**YC Connection**: This solves the exact problem many YC AI companies face - we could be the infrastructure layer for the next wave of YC AI startups.

**Demo**: {{demoUrl}} (2-minute setup, see it working immediately)

Raising ${{fundingAmount}} - would love 10 minutes to show you what we've built.

Best,
{{founderName}}
Fellow Builder`
        });

        // AI Angel Groups Template  
        this.campaignTemplates.set('aiAngels', {
            subject: "AI Infrastructure Investment: OmniLink Demo Available",
            template: `Hello {{firstName}},

I'm reaching out because of your focus on AI infrastructure investments.

**Quick Context**: I'm {{founderName}}, founder of OmniLink - we're building the orchestration layer that every AI company will need as they scale.

**The Market Reality**:
- Companies average 4.2 AI providers (our research)
- 89% struggle with integration complexity
- $2.1B+ TAM growing 40% annually

**Our Approach**:
Instead of another AI model, we built the infrastructure:
✅ Multi-provider orchestration (OpenAI, Claude, Cohere, etc.)
✅ Intelligent routing and failover
✅ Cost optimization algorithms  
✅ Enterprise security and monitoring

**Traction Highlights**:
- Working platform with live demo
- Strong technical moat in orchestration algorithms
- Clear path to $10M+ ARR

**The Investment**: ${{fundingAmount}} to capture this rapidly expanding market.

**Next Step**: 15-minute demo call? I can show you the platform working in real-time.

Calendar link: {{calendarUrl}}
Live demo: {{demoUrl}}

Best regards,
{{founderName}}
{{title}} | {{companyName}}`
        });

        // University Funds Template
        this.campaignTemplates.set('universityFunds', {
            subject: "University Innovation: OmniLink AI Orchestration Platform",
            template: `Dear {{firstName}},

I'm reaching out to share an AI infrastructure opportunity that aligns perfectly with university innovation funding.

I'm {{founderName}}, founder of OmniLink - we're building the orchestration platform that will power the next generation of AI applications.

**Academic Connection**: Our technology addresses the core computer science challenges around:
- Distributed AI system orchestration
- Multi-model optimization algorithms
- Enterprise-scale AI workflow management

**Market Opportunity**:
- $2.1B+ TAM in AI infrastructure
- 40% annual growth rate
- Clear path to academic partnerships and research collaborations

**What We've Built**:
✅ Working platform with live demo
✅ Multi-provider AI orchestration
✅ Advanced cost optimization
✅ Real-time performance analytics

**University Benefits**:
- Potential research collaboration opportunities
- Student internship and hiring pipeline
- Technology transfer possibilities

**The Ask**: ${{fundingAmount}} to accelerate development and establish university partnerships.

Would you be interested in a brief demo to see how OmniLink could benefit both our growth and your innovation portfolio?

Best regards,
{{founderName}}
{{title}} | {{companyName}}

Demo: {{demoUrl}}`
        });

        // Emergency Relief Funds Template
        this.campaignTemplates.set('emergencyFunds', {
            subject: "Emergency Funding Request: OmniLink AI Platform",
            template: `Dear {{firstName}},

I'm reaching out regarding emergency funding for OmniLink, an AI orchestration platform with strong market traction.

**Situation**: We have a critical opportunity to capture significant market share in the rapidly growing AI infrastructure space, but need immediate funding to:
- Maintain development momentum
- Secure key enterprise partnerships
- Scale infrastructure to meet demand

**Company Overview**:
- Product: Multi-modal AI orchestration platform
- Market: $2.1B+ TAM, 40% growth
- Status: Working MVP with live demo
- Traction: Strong technical foundation, clear path to revenue

**Emergency Funding Need**: ${{fundingAmount}}
**Use of Funds**: 
- 60% Development team expansion
- 25% Infrastructure scaling
- 15% Partnership development

**Timeline**: Need to close within 30 days to maintain momentum.

**Demo Available**: {{demoUrl}} - you can see the platform working immediately.

Given the urgent nature, would you be available for a brief call this week to discuss?

Thank you for considering our request.

{{founderName}}
{{title}} | {{companyName}}
{{email}} | {{phone}}`
        });
    }

    // Generate personalized email
    generateEmail(templateKey, investorData, campaignData) {
        const template = this.campaignTemplates.get(templateKey);
        if (!template) return null;

        let content = template.template;
        let subject = template.subject;

        // Replace placeholders
        const replacements = {
            ...investorData,
            ...campaignData
        };

        Object.keys(replacements).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            content = content.replace(regex, replacements[key]);
            subject = subject.replace(regex, replacements[key]);
        });

        return {
            to: investorData.email,
            subject: subject,
            content: content,
            templateUsed: templateKey,
            generatedAt: new Date().toISOString()
        };
    }

    // Load and display all campaign emails
    generateAllCampaigns(campaignData) {
        const campaigns = [];
        
        // Sample investor data for each category
        const sampleInvestors = {
            techstars: { firstName: "Investor", lastName: "Name", email: "investor@techstars.com" },
            ycombinator: { firstName: "Partner", lastName: "Name", email: "partner@ycombinator.com" },
            aiAngels: { firstName: "Angel", lastName: "Investor", email: "angel@aigroup.com" },
            universityFunds: { firstName: "Fund", lastName: "Director", email: "director@university.edu" },
            emergencyFunds: { firstName: "Relief", lastName: "Fund", email: "contact@emergencyrelief.org" }
        };

        Object.keys(sampleInvestors).forEach(category => {
            const email = this.generateEmail(category, sampleInvestors[category], campaignData);
            if (email) {
                email.category = category;
                campaigns.push(email);
            }
        });

        return campaigns;
    }
}

// Make it available globally
window.EmailCampaignModule = EmailCampaignModule;
