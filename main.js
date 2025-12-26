// ===================================
// Tamil Nadu NGO Connect - Main JavaScript
// Intelligent Chatbot with NGO Database
// ===================================

// NGO Database for Tamil Nadu
const ngoDatabase = {
  education: [
    {
      name: "Akshaya Patra Foundation",
      location: "Chennai, Madurai, Coimbatore",
      focus: "Mid-day meal program for school children",
      impact: "Serves 1.8 million children daily across Tamil Nadu",
      contact: "chennai@akshayapatra.org",
      website: "www.akshayapatra.org",
      districts: ["Chennai", "Madurai", "Coimbatore"]
    },
    {
      name: "Teach for India",
      location: "Chennai",
      focus: "Educational equity through fellowship program",
      impact: "Reaching 5,000+ students in underserved communities",
      contact: "chennai@teachforindia.org",
      website: "www.teachforindia.org",
      districts: ["Chennai"]
    },
    {
      name: "Pratham Tamil Nadu",
      location: "Chennai, Tiruvallur",
      focus: "Improving reading and math skills for children",
      impact: "Impacting 50,000+ children annually",
      contact: "tamilnadu@pratham.org",
      website: "www.pratham.org",
      districts: ["Chennai", "Tiruvallur"]
    },
    {
      name: "Isha Vidhya",
      location: "Coimbatore, Erode",
      focus: "Rural education and computer literacy",
      impact: "Operating 200+ schools across Tamil Nadu",
      contact: "info@ishavidhya.org",
      website: "www.ishavidhya.org",
      districts: ["Coimbatore", "Erode", "Tirupur"]
    }
  ],
  
  healthcare: [
    {
      name: "Aravind Eye Care System",
      location: "Madurai, Coimbatore, Pondicherry",
      focus: "Eye care and cataract surgeries",
      impact: "Performed 4 million eye surgeries, 60% free",
      contact: "info@aravind.org",
      website: "www.aravind.org",
      districts: ["Madurai", "Coimbatore", "Tirunelveli"]
    },
    {
      name: "TANKER Foundation",
      location: "Chennai",
      focus: "Kidney disease awareness and dialysis support",
      impact: "Providing free dialysis to 1,000+ patients",
      contact: "info@tankerfoundation.org",
      website: "www.tankerfoundation.org",
      districts: ["Chennai", "Kanchipuram"]
    },
    {
      name: "Sankara Nethralaya",
      location: "Chennai",
      focus: "Comprehensive eye care services",
      impact: "Treating 1,500+ patients daily",
      contact: "info@sankaranethralaya.org",
      website: "www.sankaranethralaya.org",
      districts: ["Chennai"]
    },
    {
      name: "Ganga Hospital Foundation",
      location: "Coimbatore",
      focus: "Trauma care and reconstructive surgery",
      impact: "Treating 50,000+ patients annually",
      contact: "info@gangahospital.com",
      website: "www.gangahospital.com",
      districts: ["Coimbatore"]
    }
  ],
  
  environment: [
    {
      name: "Environmentalist Foundation of India",
      location: "Chennai",
      focus: "Lake and water body restoration",
      impact: "Restored 90+ water bodies across Tamil Nadu",
      contact: "efi@efiglobal.org",
      website: "www.efiglobal.org",
      districts: ["Chennai", "Kanchipuram", "Tiruvallur"]
    },
    {
      name: "Isha Outreach - Project GreenHands",
      location: "Coimbatore",
      focus: "Tree plantation and green cover",
      impact: "Planted 35 million trees across Tamil Nadu",
      contact: "pgh@ishafoundation.org",
      website: "www.projectgreenhands.org",
      districts: ["Coimbatore", "Erode", "Tirupur", "Nilgiris"]
    },
    {
      name: "Care Earth Trust",
      location: "Chennai",
      focus: "Wildlife conservation and biodiversity",
      impact: "Protecting 50+ endangered species",
      contact: "info@careearthtrust.org",
      website: "www.careearthtrust.org",
      districts: ["Chennai", "Kanchipuram"]
    },
    {
      name: "Nizhal",
      location: "Chennai",
      focus: "Urban greening and tree conservation",
      impact: "Planted 100,000+ trees in urban areas",
      contact: "info@nizhal.org",
      website: "www.nizhal.org",
      districts: ["Chennai"]
    }
  ],
  
  women: [
    {
      name: "SEWA Tamil Nadu",
      location: "Chennai, Tiruchirappalli",
      focus: "Women's economic empowerment",
      impact: "Supporting 25,000+ women entrepreneurs",
      contact: "sewa.tn@gmail.com",
      website: "www.sewa.org",
      districts: ["Chennai", "Tiruchirappalli", "Thanjavur"]
    },
    {
      name: "Working Women's Forum",
      location: "Chennai",
      focus: "Microfinance and women's rights",
      impact: "Empowering 100,000+ women",
      contact: "info@workingwomensforum.org",
      website: "www.workingwomensforum.org",
      districts: ["Chennai", "Kanchipuram"]
    },
    {
      name: "Swayam",
      location: "Chennai",
      focus: "Women's health and rights",
      impact: "Reaching 50,000+ women annually",
      contact: "swayam@vsnl.com",
      website: "www.swayam.info",
      districts: ["Chennai"]
    }
  ],
  
  children: [
    {
      name: "CRY - Child Rights and You",
      location: "Chennai",
      focus: "Child rights and education",
      impact: "Impacting 200,000+ children",
      contact: "chennai@cry.org",
      website: "www.cry.org",
      districts: ["Chennai", "Kanchipuram", "Tiruvallur"]
    },
    {
      name: "Udavum Karangal",
      location: "Chennai",
      focus: "Orphan care and rehabilitation",
      impact: "Caring for 1,000+ children",
      contact: "info@udavumkarangal.org",
      website: "www.udavumkarangal.org",
      districts: ["Chennai"]
    },
    {
      name: "Anandam Home for Children",
      location: "Coimbatore",
      focus: "Child welfare and education",
      impact: "Supporting 500+ children",
      contact: "info@anandamhome.org",
      website: "www.anandamhome.org",
      districts: ["Coimbatore"]
    }
  ],
  
  elderly: [
    {
      name: "HelpAge India",
      location: "Chennai, Madurai",
      focus: "Elderly care and support",
      impact: "Serving 50,000+ senior citizens",
      contact: "chennai@helpageindia.org",
      website: "www.helpageindia.org",
      districts: ["Chennai", "Madurai", "Coimbatore"]
    },
    {
      name: "Little Drops",
      location: "Chennai",
      focus: "Elder care and community support",
      impact: "Supporting 5,000+ elderly persons",
      contact: "info@littledrops.in",
      website: "www.littledrops.in",
      districts: ["Chennai"]
    }
  ],
  
  disability: [
    {
      name: "Vidya Sagar",
      location: "Chennai",
      focus: "Cerebral palsy and disability support",
      impact: "Supporting 2,000+ children with disabilities",
      contact: "info@vidyasagar.org",
      website: "www.vidyasagar.org",
      districts: ["Chennai"]
    },
    {
      name: "Amar Seva Sangam",
      location: "Ayikudy, Tirunelveli",
      focus: "Comprehensive disability rehabilitation",
      impact: "Serving 10,000+ persons with disabilities",
      contact: "info@amarseva.org",
      website: "www.amarseva.org",
      districts: ["Tirunelveli"]
    }
  ],
  
  rural: [
    {
      name: "DHAN Foundation",
      location: "Madurai",
      focus: "Rural development and livelihoods",
      impact: "Reaching 5 million rural families",
      contact: "info@dhan.org",
      website: "www.dhan.org",
      districts: ["Madurai", "Dindigul", "Theni"]
    },
    {
      name: "MYRADA",
      location: "Dharmapuri",
      focus: "Rural community development",
      impact: "Supporting 100,000+ rural families",
      contact: "myrada@myrada.org",
      website: "www.myrada.org",
      districts: ["Dharmapuri", "Krishnagiri"]
    }
  ]
};

// District list for Tamil Nadu
const districts = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
  "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur",
  "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris",
  "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga",
  "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
  "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
];

// Chatbot state
let conversationHistory = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeNavbar();
  initializeChatbot();
});

// Navbar scroll effect
function initializeNavbar() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize chatbot
function initializeChatbot() {
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle enter key press
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

// Send message
function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  
  if (message === '') return;
  
  // Add user message
  addMessage(message, 'user');
  input.value = '';
  
  // Process message and get response
  setTimeout(() => {
    const response = processMessage(message);
    addMessage(response.text, 'bot', response.quickReplies);
  }, 500);
}

// Send quick reply
function sendQuickReply(message) {
  addMessage(message, 'user');
  
  setTimeout(() => {
    const response = processMessage(message);
    addMessage(response.text, 'bot', response.quickReplies);
  }, 500);
}

// Add message to chat
function addMessage(text, sender, quickReplies = null) {
  const chatMessages = document.getElementById('chatMessages');
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  
  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = sender === 'bot' ? '🤖' : '👤';
  
  const content = document.createElement('div');
  content.className = 'message-content';
  
  const text_p = document.createElement('p');
  text_p.className = 'message-text';
  text_p.textContent = text;
  
  content.appendChild(text_p);
  
  // Add quick replies if provided
  if (quickReplies && quickReplies.length > 0) {
    const repliesDiv = document.createElement('div');
    repliesDiv.className = 'quick-replies';
    
    quickReplies.forEach(reply => {
      const button = document.createElement('button');
      button.className = 'quick-reply';
      button.textContent = reply.text;
      button.onclick = () => sendQuickReply(reply.value);
      repliesDiv.appendChild(button);
    });
    
    content.appendChild(repliesDiv);
  }
  
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  // Add to conversation history
  conversationHistory.push({ sender, text });
}

// Process message and generate response
function processMessage(message) {
  const lowerMessage = message.toLowerCase();
  
  // Greetings
  if (lowerMessage.match(/^(hi|hello|hey|vanakkam|வணக்கம்)/)) {
    return {
      text: "வணக்கம்! 🙏 Hello! I'm here to help you discover amazing NGOs across Tamil Nadu. You can ask me about:\n\n• NGOs by category (education, healthcare, etc.)\n• NGOs in specific districts\n• How to volunteer or donate\n• Contact information for organizations\n\nWhat would you like to know?",
      quickReplies: [
        { text: "Education NGOs 📚", value: "Show me education NGOs" },
        { text: "Healthcare 🏥", value: "Healthcare organizations" },
        { text: "By District 📍", value: "Show NGOs by district" },
        { text: "How to help? 🤝", value: "How can I help?" }
      ]
    };
  }
  
  // Category queries
  if (lowerMessage.includes('education') || lowerMessage.includes('school') || lowerMessage.includes('learning')) {
    return getNGOsByCategory('education');
  }
  
  if (lowerMessage.includes('health') || lowerMessage.includes('medical') || lowerMessage.includes('hospital')) {
    return getNGOsByCategory('healthcare');
  }
  
  if (lowerMessage.includes('environment') || lowerMessage.includes('tree') || lowerMessage.includes('green')) {
    return getNGOsByCategory('environment');
  }
  
  if (lowerMessage.includes('women') || lowerMessage.includes('girl')) {
    return getNGOsByCategory('women');
  }
  
  if (lowerMessage.includes('child') || lowerMessage.includes('orphan')) {
    return getNGOsByCategory('children');
  }
  
  if (lowerMessage.includes('elderly') || lowerMessage.includes('senior') || lowerMessage.includes('old age')) {
    return getNGOsByCategory('elderly');
  }
  
  if (lowerMessage.includes('disability') || lowerMessage.includes('disabled')) {
    return getNGOsByCategory('disability');
  }
  
  if (lowerMessage.includes('rural') || lowerMessage.includes('village')) {
    return getNGOsByCategory('rural');
  }
  
  // District queries
  const foundDistrict = districts.find(d => lowerMessage.includes(d.toLowerCase()));
  if (foundDistrict || lowerMessage.includes('district')) {
    if (foundDistrict) {
      return getNGOsByDistrict(foundDistrict);
    } else {
      return {
        text: "I can help you find NGOs in any district of Tamil Nadu! Which district are you interested in?",
        quickReplies: [
          { text: "Chennai 🏙️", value: "NGOs in Chennai" },
          { text: "Coimbatore 🌆", value: "NGOs in Coimbatore" },
          { text: "Madurai 🕌", value: "NGOs in Madurai" },
          { text: "Show all districts 📋", value: "List all districts" }
        ]
      };
    }
  }
  
  // List all districts
  if (lowerMessage.includes('all districts') || lowerMessage.includes('list districts')) {
    return {
      text: `Tamil Nadu has 38 districts. Here are some major ones where we have extensive NGO coverage:\n\n🏙️ Chennai\n🌆 Coimbatore\n🕌 Madurai\n🏛️ Tiruchirappalli\n🌊 Kanyakumari\n🏔️ Nilgiris\n🌾 Thanjavur\n⛰️ Dharmapuri\n\nWhich district would you like to explore?`,
      quickReplies: [
        { text: "Chennai", value: "NGOs in Chennai" },
        { text: "Coimbatore", value: "NGOs in Coimbatore" },
        { text: "Madurai", value: "NGOs in Madurai" }
      ]
    };
  }
  
  // Volunteer/Help queries
  if (lowerMessage.includes('volunteer') || lowerMessage.includes('help') || lowerMessage.includes('donate') || lowerMessage.includes('support')) {
    return {
      text: "That's wonderful! 🌟 There are many ways to make a difference:\n\n💰 Donate: Most NGOs accept online donations\n🤝 Volunteer: Offer your time and skills\n📢 Spread awareness: Share their work\n🎁 In-kind donations: Contribute materials or resources\n\nWhich category of NGOs interests you most? I can provide specific contact information.",
      quickReplies: [
        { text: "Education 📚", value: "education NGOs contact" },
        { text: "Healthcare 🏥", value: "healthcare NGOs contact" },
        { text: "Environment 🌱", value: "environment NGOs contact" },
        { text: "Children 👶", value: "child welfare NGOs" }
      ]
    };
  }
  
  // Contact/more info queries
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('website')) {
    return {
      text: "I can provide detailed contact information for any NGO! Which category or specific organization would you like to know about?",
      quickReplies: [
        { text: "Education NGOs", value: "education NGO contacts" },
        { text: "Healthcare NGOs", value: "healthcare NGO contacts" },
        { text: "All categories", value: "show all categories" }
      ]
    };
  }
  
  // Default response
  return {
    text: "I'd be happy to help you find the right NGO! You can ask me about:\n\n📚 NGOs by category (education, healthcare, environment, etc.)\n📍 NGOs in specific districts\n🤝 How to volunteer or donate\n📞 Contact information\n\nWhat would you like to know?",
    quickReplies: [
      { text: "Show categories 📋", value: "show all categories" },
      { text: "Search by district 📍", value: "show NGOs by district" },
      { text: "How to volunteer? 🤝", value: "How can I volunteer?" }
    ]
  };
}

// Get NGOs by category
function getNGOsByCategory(category) {
  const ngos = ngoDatabase[category];
  
  if (!ngos || ngos.length === 0) {
    return {
      text: "I don't have information about that category yet. Please try another category!",
      quickReplies: []
    };
  }
  
  const categoryNames = {
    education: "Education 📚",
    healthcare: "Healthcare 🏥",
    environment: "Environment 🌱",
    women: "Women Empowerment 👩",
    children: "Child Welfare 👶",
    elderly: "Elderly Care 👴",
    disability: "Disability Support ♿",
    rural: "Rural Development 🏘️"
  };
  
  let response = `Here are some amazing ${categoryNames[category]} NGOs in Tamil Nadu:\n\n`;
  
  ngos.forEach((ngo, index) => {
    response += `${index + 1}. **${ngo.name}**\n`;
    response += `   📍 ${ngo.location}\n`;
    response += `   🎯 ${ngo.focus}\n`;
    response += `   ✨ ${ngo.impact}\n`;
    response += `   📧 ${ngo.contact}\n`;
    response += `   🌐 ${ngo.website}\n\n`;
  });
  
  response += "Would you like to know about NGOs in other categories or specific districts?";
  
  return {
    text: response,
    quickReplies: [
      { text: "Other categories 📋", value: "show all categories" },
      { text: "By district 📍", value: "show NGOs by district" },
      { text: "How to help? 🤝", value: "How can I volunteer?" }
    ]
  };
}

// Get NGOs by district
function getNGOsByDistrict(district) {
  let foundNGOs = [];
  
  // Search through all categories
  Object.keys(ngoDatabase).forEach(category => {
    ngoDatabase[category].forEach(ngo => {
      if (ngo.districts.some(d => d.toLowerCase() === district.toLowerCase())) {
        foundNGOs.push({ ...ngo, category });
      }
    });
  });
  
  if (foundNGOs.length === 0) {
    return {
      text: `I don't have specific NGO information for ${district} in my current database. However, Tamil Nadu has NGOs operating across all 38 districts. Would you like to explore NGOs by category instead?`,
      quickReplies: [
        { text: "Education 📚", value: "education NGOs" },
        { text: "Healthcare 🏥", value: "healthcare NGOs" },
        { text: "Environment 🌱", value: "environment NGOs" }
      ]
    };
  }
  
  let response = `Here are NGOs operating in ${district}:\n\n`;
  
  foundNGOs.forEach((ngo, index) => {
    const categoryEmojis = {
      education: "📚",
      healthcare: "🏥",
      environment: "🌱",
      women: "👩",
      children: "👶",
      elderly: "👴",
      disability: "♿",
      rural: "🏘️"
    };
    
    response += `${index + 1}. **${ngo.name}** ${categoryEmojis[ngo.category]}\n`;
    response += `   🎯 ${ngo.focus}\n`;
    response += `   📧 ${ngo.contact}\n`;
    response += `   🌐 ${ngo.website}\n\n`;
  });
  
  response += "Would you like to explore more districts or categories?";
  
  return {
    text: response,
    quickReplies: [
      { text: "Other districts 📍", value: "List all districts" },
      { text: "By category 📋", value: "show all categories" },
      { text: "How to help? 🤝", value: "How can I volunteer?" }
    ]
  };
}

// Category selection from landing page
function selectCategory(category) {
  // Scroll to chatbot
  document.getElementById('chatbot').scrollIntoView({ behavior: 'smooth' });
  
  // Send category query after scroll
  setTimeout(() => {
    const categoryMessages = {
      education: "Show me education NGOs",
      healthcare: "Healthcare organizations",
      environment: "Environment NGOs",
      women: "Women empowerment NGOs",
      children: "Child welfare NGOs",
      elderly: "Elderly care NGOs",
      disability: "Disability support NGOs",
      rural: "Rural development NGOs"
    };
    
    sendQuickReply(categoryMessages[category]);
  }, 800);
}

// Export for use in HTML
window.sendMessage = sendMessage;
window.sendQuickReply = sendQuickReply;
window.handleKeyPress = handleKeyPress;
window.selectCategory = selectCategory;
