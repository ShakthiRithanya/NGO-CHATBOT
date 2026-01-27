// ===================================
// Tamil Nadu NGO Connect - Main JavaScript
// Intelligent Chatbot with NGO Database
// ===================================

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// NGO Database for Tamil Nadu (Last Updated: January 2024)
const ngoDatabase = {
  education: [
    {
      name: "Akshaya Patra Foundation",
      location: "Chennai, Madurai, Coimbatore",
      focus: "Mid-day meal program for school children",
      impact: "Serves 1.8 million children daily across Tamil Nadu",
      contact: "chennai@akshayapatra.org",
      website: "www.akshayapatra.org",
      districts: ["Chennai", "Madurai", "Coimbatore", "Tiruchirappalli"]
    },
    {
      name: "Teach for India",
      location: "Chennai",
      focus: "Educational equity through fellowship program",
      impact: "Reaching 10,000+ students in underserved communities",
      contact: "chennai@teachforindia.org",
      website: "www.teachforindia.org",
      districts: ["Chennai"]
    },
    {
      name: "Pratham Tamil Nadu",
      location: "Chennai, Tiruvallur, Kanchipuram",
      focus: "Improving reading and math skills for children",
      impact: "Impacting 75,000+ children annually",
      contact: "tamilnadu@pratham.org",
      website: "www.pratham.org",
      districts: ["Chennai", "Tiruvallur", "Kanchipuram"]
    },
    {
      name: "Isha Vidhya",
      location: "Coimbatore, Erode, Tirupur",
      focus: "Rural education and computer literacy",
      impact: "Operating 206 schools across Tamil Nadu",
      contact: "info@ishavidhya.org",
      website: "www.ishavidhya.org",
      districts: ["Coimbatore", "Erode", "Tirupur", "Nilgiris"]
    },
    {
      name: "Nanban Foundation",
      location: "Chennai",
      focus: "Education and skill development for underprivileged",
      impact: "Supporting 5,000+ students with scholarships",
      contact: "info@nanbanfoundation.org",
      website: "www.nanbanfoundation.org",
      districts: ["Chennai", "Tiruvallur"]
    },
    {
      name: "Sevalaya",
      location: "Tiruvallur",
      focus: "Education, healthcare and community development",
      impact: "Educating 2,000+ rural children",
      contact: "sevalayakasuva@gmail.com",
      website: "www.sevalaya.org",
      districts: ["Tiruvallur", "Chennai"]
    },
    {
      name: "Bhumi",
      location: "Chennai, Coimbatore",
      focus: "Volunteer-driven education support",
      impact: "Reaching 15,000+ children through volunteers",
      contact: "chennai@bhumi.ngo",
      website: "www.bhumi.ngo",
      districts: ["Chennai", "Coimbatore", "Madurai"]
    },
    {
      name: "Agaram Foundation",
      location: "Chennai",
      focus: "Higher education scholarships for rural students",
      impact: "Supporting 10,000+ students with college education",
      contact: "info@agaramfoundation.org",
      website: "www.agaramfoundation.org",
      districts: ["Chennai", "Tiruvallur", "Kanchipuram"]
    },
    {
      name: "Aseema Charitable Trust",
      location: "Chennai",
      focus: "Education for underprivileged children",
      impact: "Educating 3,000+ children",
      contact: "info@aseema.org",
      website: "www.aseema.org",
      districts: ["Chennai"]
    },
    {
      name: "Shanti Bhavan",
      location: "Vellore",
      focus: "Residential education for disadvantaged children",
      impact: "Transforming lives of 300+ children",
      contact: "info@shantibhavan.org",
      website: "www.shantibhavan.org",
      districts: ["Vellore"]
    }
  ],

  healthcare: [
    {
      name: "Aravind Eye Care System",
      location: "Madurai, Coimbatore, Tirunelveli, Pondicherry",
      focus: "Eye care and cataract surgeries",
      impact: "Performed 5+ million eye surgeries, 60% free or subsidized",
      contact: "info@aravind.org",
      website: "www.aravind.org",
      districts: ["Madurai", "Coimbatore", "Tirunelveli", "Pondicherry"]
    },
    {
      name: "TANKER Foundation",
      location: "Chennai",
      focus: "Kidney disease awareness and dialysis support",
      impact: "Providing free dialysis to 1,500+ patients monthly",
      contact: "info@tankerfoundation.org",
      website: "www.tankerfoundation.org",
      districts: ["Chennai", "Kanchipuram", "Tiruvallur"]
    },
    {
      name: "Sankara Nethralaya",
      location: "Chennai",
      focus: "Comprehensive eye care services",
      impact: "Treating 2,000+ patients daily",
      contact: "info@sankaranethralaya.org",
      website: "www.sankaranethralaya.org",
      districts: ["Chennai"]
    },
    {
      name: "Ganga Hospital Foundation",
      location: "Coimbatore",
      focus: "Trauma care and reconstructive surgery",
      impact: "Treating 60,000+ patients annually",
      contact: "info@gangahospital.com",
      website: "www.gangahospital.com",
      districts: ["Coimbatore", "Tirupur", "Erode"]
    },
    {
      name: "Sankara Eye Foundation",
      location: "Coimbatore, Madurai, Salem",
      focus: "Free eye care for the underprivileged",
      impact: "Conducted 500,000+ free eye surgeries",
      contact: "info@sankaraeye.com",
      website: "www.sankaraeye.com",
      districts: ["Coimbatore", "Madurai", "Salem", "Erode"]
    },
    {
      name: "Arogya World",
      location: "Chennai",
      focus: "Diabetes and chronic disease prevention",
      impact: "Reaching 1 million+ people with health education",
      contact: "info@arogyaworld.org",
      website: "www.arogyaworld.org",
      districts: ["Chennai", "Kanchipuram"]
    },
    {
      name: "Scheer Memorial Adventist Hospital",
      location: "Vellore",
      focus: "Rural healthcare and community health",
      impact: "Serving 100,000+ patients annually",
      contact: "info@scheerhospital.org",
      website: "www.scheerhospital.org",
      districts: ["Vellore", "Tirupattur"]
    },
    {
      name: "Rajan Eye Care Hospital",
      location: "Chennai",
      focus: "Affordable eye care services",
      impact: "Treating 100,000+ patients annually",
      contact: "info@rajaneyecare.com",
      website: "www.rajaneyecare.com",
      districts: ["Chennai", "Tiruvallur"]
    },
    {
      name: "Swami Dayananda Medical Mission",
      location: "Coimbatore",
      focus: "Free healthcare for rural poor",
      impact: "Serving 50,000+ patients annually",
      contact: "info@sdmm.org",
      website: "www.sdmm.org",
      districts: ["Coimbatore", "Tirupur"]
    },
    {
      name: "Lifeline Foundation",
      location: "Chennai",
      focus: "Blood donation and organ donation awareness",
      impact: "Facilitated 50,000+ blood donations",
      contact: "info@lifelinefoundation.org",
      website: "www.lifelinefoundation.org",
      districts: ["Chennai", "Kanchipuram"]
    }
  ],

  environment: [
    {
      name: "Environmentalist Foundation of India (EFI)",
      location: "Chennai",
      focus: "Lake and water body restoration",
      impact: "Restored 95+ water bodies across Tamil Nadu",
      contact: "efi@efiglobal.org",
      website: "www.efiglobal.org",
      districts: ["Chennai", "Kanchipuram", "Tiruvallur", "Chengalpattu"]
    },
    {
      name: "Isha Outreach - Project GreenHands",
      location: "Coimbatore",
      focus: "Tree plantation and green cover",
      impact: "Planted 35+ million trees across Tamil Nadu",
      contact: "pgh@ishafoundation.org",
      website: "www.projectgreenhands.org",
      districts: ["Coimbatore", "Erode", "Tirupur", "Nilgiris", "Karur"]
    },
    {
      name: "Care Earth Trust",
      location: "Chennai",
      focus: "Wildlife conservation and biodiversity",
      impact: "Protecting 60+ endangered species",
      contact: "info@careearthtrust.org",
      website: "www.careearthtrust.org",
      districts: ["Chennai", "Kanchipuram", "Tiruvallur"]
    },
    {
      name: "Nizhal",
      location: "Chennai",
      focus: "Urban greening and tree conservation",
      impact: "Planted 150,000+ trees in urban areas",
      contact: "info@nizhal.org",
      website: "www.nizhal.org",
      districts: ["Chennai"]
    },
    {
      name: "Coastal Resource Centre (CRC)",
      location: "Chennai",
      focus: "Coastal ecosystem conservation",
      impact: "Protecting 500+ km of coastline",
      contact: "info@crc-india.org",
      website: "www.crc-india.org",
      districts: ["Chennai", "Kanchipuram", "Nagapattinam", "Ramanathapuram"]
    },
    {
      name: "Keystone Foundation",
      location: "Nilgiris",
      focus: "Indigenous communities and forest conservation",
      impact: "Supporting 5,000+ tribal families",
      contact: "keystone@keystone-foundation.org",
      website: "www.keystone-foundation.org",
      districts: ["Nilgiris"]
    },
    {
      name: "Pitchandikulam Forest",
      location: "Auroville, Villupuram",
      focus: "Forest restoration and biodiversity",
      impact: "Restored 70+ acres of forest",
      contact: "info@pitchandikulam.org",
      website: "www.pitchandikulam.org",
      districts: ["Villupuram"]
    },
    {
      name: "Thanal Conservation Action and Information Network",
      location: "Chennai",
      focus: "Wetland and coastal conservation",
      impact: "Protecting 20+ wetlands",
      contact: "info@thanal.co.in",
      website: "www.thanal.co.in",
      districts: ["Chennai", "Kanchipuram"]
    },
    {
      name: "Green Foundation",
      location: "Salem",
      focus: "Sustainable agriculture and biodiversity",
      impact: "Supporting 5,000+ farmers",
      contact: "info@greenfoundation.in",
      website: "www.greenfoundation.in",
      districts: ["Salem", "Namakkal"]
    }
  ],

  women: [
    {
      name: "SEWA Tamil Nadu",
      location: "Chennai, Tiruchirappalli, Thanjavur",
      focus: "Women's economic empowerment and livelihoods",
      impact: "Supporting 30,000+ women entrepreneurs",
      contact: "sewa.tn@gmail.com",
      website: "www.sewa.org",
      districts: ["Chennai", "Tiruchirappalli", "Thanjavur", "Madurai"]
    },
    {
      name: "Working Women's Forum",
      location: "Chennai",
      focus: "Microfinance and women's rights advocacy",
      impact: "Empowering 120,000+ women",
      contact: "info@workingwomensforum.org",
      website: "www.workingwomensforum.org",
      districts: ["Chennai", "Kanchipuram", "Tiruvallur"]
    },
    {
      name: "Swayam",
      location: "Chennai",
      focus: "Women's health, rights and gender justice",
      impact: "Reaching 60,000+ women annually",
      contact: "swayam@vsnl.com",
      website: "www.swayam.info",
      districts: ["Chennai"]
    },
    {
      name: "SNEHA (Social Need Education and Human Awareness)",
      location: "Chennai",
      focus: "Women and child health, violence prevention",
      impact: "Supporting 100,000+ women and children",
      contact: "info@snehamumbai.org",
      website: "www.snehamumbai.org",
      districts: ["Chennai", "Kanchipuram"]
    },
    {
      name: "Hand in Hand India",
      location: "Chennai, Kanchipuram",
      focus: "Women's self-help groups and microfinance",
      impact: "Empowering 500,000+ women",
      contact: "info@hihseed.org",
      website: "www.hihseed.org",
      districts: ["Chennai", "Kanchipuram", "Tiruvallur", "Villupuram"]
    },
    {
      name: "CARE India",
      location: "Chennai, Madurai",
      focus: "Women empowerment and livelihood programs",
      impact: "Reaching 200,000+ women",
      contact: "info@careindia.org",
      website: "www.careindia.org",
      districts: ["Chennai", "Madurai", "Tiruchirappalli"]
    },
    {
      name: "Kalanjiam Foundation",
      location: "Madurai",
      focus: "Women's financial inclusion and empowerment",
      impact: "Supporting 150,000+ women through SHGs",
      contact: "info@kalanjiam.org",
      website: "www.kalanjiam.org",
      districts: ["Madurai", "Dindigul", "Theni", "Virudhunagar"]
    }
  ],

  children: [
    {
      name: "CRY - Child Rights and You",
      location: "Chennai",
      focus: "Child rights, education and protection",
      impact: "Impacting 250,000+ children",
      contact: "chennai@cry.org",
      website: "www.cry.org",
      districts: ["Chennai", "Kanchipuram", "Tiruvallur", "Vellore"]
    },
    {
      name: "Udavum Karangal",
      location: "Chennai",
      focus: "Orphan care, rehabilitation and education",
      impact: "Caring for 1,200+ children and elderly",
      contact: "info@udavumkarangal.org",
      website: "www.udavumkarangal.org",
      districts: ["Chennai"]
    },
    {
      name: "Anandam Home for Children",
      location: "Coimbatore",
      focus: "Child welfare and holistic education",
      impact: "Supporting 600+ children",
      contact: "info@anandamhome.org",
      website: "www.anandamhome.org",
      districts: ["Coimbatore"]
    },
    {
      name: "Madras Christian Council of Social Service (MCCSS)",
      location: "Chennai",
      focus: "Child protection and family welfare",
      impact: "Serving 10,000+ children annually",
      contact: "info@mccss.org",
      website: "www.mccss.org",
      districts: ["Chennai", "Kanchipuram"]
    },
    {
      name: "Butterflies",
      location: "Chennai",
      focus: "Street and working children support",
      impact: "Reaching 5,000+ children",
      contact: "chennai@butterflieschildrights.org",
      website: "www.butterflieschildrights.org",
      districts: ["Chennai"]
    },
    {
      name: "Bala Mandir Kamaraj",
      location: "Chennai",
      focus: "Orphanage and child education",
      impact: "Caring for 500+ orphaned children",
      contact: "info@balamandir.org",
      website: "www.balamandir.org",
      districts: ["Chennai"]
    },
    {
      name: "Rainbow Homes",
      location: "Chennai",
      focus: "Shelter and education for street children",
      impact: "Rehabilitating 200+ children annually",
      contact: "info@rainbowhomes.in",
      website: "www.rainbowhomes.in",
      districts: ["Chennai"]
    },
    {
      name: "Miracle Foundation India",
      location: "Chennai",
      focus: "Orphan care and family-based solutions",
      impact: "Supporting 10,000+ children",
      contact: "india@miraclefoundation.org",
      website: "www.miraclefoundation.org",
      districts: ["Chennai", "Kanchipuram", "Tiruvallur"]
    }
  ],

  elderly: [
    {
      name: "HelpAge India",
      location: "Chennai, Madurai, Coimbatore",
      focus: "Elderly care, healthcare and advocacy",
      impact: "Serving 60,000+ senior citizens",
      contact: "chennai@helpageindia.org",
      website: "www.helpageindia.org",
      districts: ["Chennai", "Madurai", "Coimbatore", "Tiruchirappalli"]
    },
    {
      name: "Little Drops",
      location: "Chennai",
      focus: "Elder care and community support programs",
      impact: "Supporting 6,000+ elderly persons",
      contact: "info@littledrops.in",
      website: "www.littledrops.in",
      districts: ["Chennai"]
    },
    {
      name: "Dignity Foundation",
      location: "Chennai",
      focus: "Active ageing and elderly empowerment",
      impact: "Engaging 15,000+ senior citizens",
      contact: "chennai@dignityfoundation.com",
      website: "www.dignityfoundation.com",
      districts: ["Chennai", "Kanchipuram"]
    },
    {
      name: "Nightingales Medical Trust",
      location: "Chennai",
      focus: "Elderly care and palliative care",
      impact: "Caring for 2,000+ elderly persons",
      contact: "info@nightingales.in",
      website: "www.nightingales.in",
      districts: ["Chennai"]
    },
    {
      name: "Samarthanam Trust for the Disabled",
      location: "Chennai",
      focus: "Elderly and disability support",
      impact: "Serving 5,000+ beneficiaries",
      contact: "chennai@samarthanam.org",
      website: "www.samarthanam.org",
      districts: ["Chennai", "Kanchipuram"]
    }
  ],

  disability: [
    {
      name: "Vidya Sagar",
      location: "Chennai",
      focus: "Cerebral palsy and multiple disabilities support",
      impact: "Supporting 2,500+ children with disabilities",
      contact: "info@vidyasagar.org",
      website: "www.vidyasagar.org",
      districts: ["Chennai"]
    },
    {
      name: "Amar Seva Sangam",
      location: "Ayikudy, Tirunelveli",
      focus: "Comprehensive disability rehabilitation",
      impact: "Serving 12,000+ persons with disabilities",
      contact: "info@amarseva.org",
      website: "www.amarseva.org",
      districts: ["Tirunelveli", "Thoothukudi"]
    },
    {
      name: "Amar Seva Charitable Trust",
      location: "Madurai",
      focus: "Vocational training for persons with disabilities",
      impact: "Training 3,000+ persons annually",
      contact: "info@amarsevacharitabletrust.org",
      website: "www.amarsevacharitabletrust.org",
      districts: ["Madurai", "Dindigul"]
    },
    {
      name: "Ability Foundation",
      location: "Chennai",
      focus: "Disability rights and accessibility",
      impact: "Advocating for 50,000+ persons with disabilities",
      contact: "ability@abilityfoundation.org",
      website: "www.abilityfoundation.org",
      districts: ["Chennai", "Kanchipuram"]
    },
    {
      name: "Amar Jyoti Charitable Trust",
      location: "Chennai",
      focus: "Education and rehabilitation for disabled",
      impact: "Supporting 1,000+ persons with disabilities",
      contact: "info@amarjyoti.org",
      website: "www.amarjyoti.org",
      districts: ["Chennai"]
    },
    {
      name: "Spastics Society of Tamil Nadu",
      location: "Chennai",
      focus: "Cerebral palsy and developmental disabilities",
      impact: "Treating 1,500+ children",
      contact: "info@spasticssocietytn.org",
      website: "www.spasticssocietytn.org",
      districts: ["Chennai"]
    }
  ],

  rural: [
    {
      name: "DHAN Foundation",
      location: "Madurai",
      focus: "Rural development, livelihoods and water management",
      impact: "Reaching 6 million rural families",
      contact: "info@dhan.org",
      website: "www.dhan.org",
      districts: ["Madurai", "Dindigul", "Theni", "Ramanathapuram", "Sivaganga"]
    },
    {
      name: "MYRADA",
      location: "Dharmapuri",
      focus: "Rural community development and self-help groups",
      impact: "Supporting 150,000+ rural families",
      contact: "myrada@myrada.org",
      website: "www.myrada.org",
      districts: ["Dharmapuri", "Krishnagiri"]
    },
    {
      name: "SEVAI (Social Education and Village Action Institute)",
      location: "Madurai",
      focus: "Rural women empowerment and development",
      impact: "Empowering 100,000+ rural women",
      contact: "sevai@sevai.org",
      website: "www.sevai.org",
      districts: ["Madurai", "Dindigul", "Theni"]
    },
    {
      name: "SPEECH (Society for People's Education and Economic Change)",
      location: "Madurai",
      focus: "Rural livelihoods and sustainable agriculture",
      impact: "Supporting 50,000+ farming families",
      contact: "speech@speechindia.org",
      website: "www.speechindia.org",
      districts: ["Madurai", "Dindigul", "Virudhunagar"]
    },
    {
      name: "PRADAN (Professional Assistance for Development Action)",
      location: "Dharmapuri",
      focus: "Rural livelihoods and women's collectives",
      impact: "Empowering 30,000+ rural families",
      contact: "info@pradan.net",
      website: "www.pradan.net",
      districts: ["Dharmapuri", "Krishnagiri"]
    },
    {
      name: "SCOPE (Society for Community Organization and People's Education)",
      location: "Madurai",
      focus: "Rural development and education",
      impact: "Reaching 25,000+ rural families",
      contact: "scope@scopemadurai.org",
      website: "www.scopemadurai.org",
      districts: ["Madurai", "Dindigul"]
    },
    {
      name: "RUHSA (Rural Unit for Health and Social Affairs)",
      location: "Vellore",
      focus: "Rural health and community development",
      impact: "Serving 100,000+ rural population",
      contact: "ruhsa@cmcvellore.ac.in",
      website: "www.cmch-vellore.edu/ruhsa",
      districts: ["Vellore", "Tirupattur"]
    }
  ],

  animal_welfare: [
    {
      name: "Blue Cross of India",
      location: "Chennai",
      focus: "Animal rescue and welfare",
      impact: "Rescuing 50,000+ animals annually",
      contact: "info@bluecrossofindia.org",
      website: "www.bluecrossofindia.org",
      districts: ["Chennai", "Kanchipuram"]
    },
    {
      name: "People for Animals Tamil Nadu",
      location: "Chennai, Coimbatore",
      focus: "Animal rights and welfare",
      impact: "Protecting 10,000+ animals",
      contact: "pfa.chennai@gmail.com",
      website: "www.pfatamilnadu.org",
      districts: ["Chennai", "Coimbatore"]
    }
  ],

  disaster_relief: [
    {
      name: "Goonj",
      location: "Chennai",
      focus: "Disaster relief and rural development",
      impact: "Reaching 500,000+ people in disasters",
      contact: "chennai@goonj.org",
      website: "www.goonj.org",
      districts: ["Chennai", "Kanchipuram", "Tiruvallur"]
    },
    {
      name: "Rapid Response",
      location: "Chennai",
      focus: "Emergency disaster response",
      impact: "Responded to 50+ disasters",
      contact: "info@rapidresponse.in",
      website: "www.rapidresponse.in",
      districts: ["Chennai", "Cuddalore", "Nagapattinam"]
    }
  ],

  skill_development: [
    {
      name: "Don Bosco Tech Society",
      location: "Chennai, Madurai, Coimbatore",
      focus: "Skill training and employment",
      impact: "Training 20,000+ youth annually",
      contact: "info@donboscotech.in",
      website: "www.donboscotech.in",
      districts: ["Chennai", "Madurai", "Coimbatore", "Tiruchirappalli"]
    },
    {
      name: "IL&FS Skills",
      location: "Chennai",
      focus: "Vocational training and placement",
      impact: "Trained 50,000+ youth",
      contact: "info@ilfsskills.com",
      website: "www.ilfsskills.com",
      districts: ["Chennai", "Kanchipuram"]
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

// AI-powered message processing
async function processMessageWithAI(message) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.reply) {
      const aiText = data.reply;
      return {
        text: aiText,
        quickReplies: [
          { text: "Other categories 📋", value: "show categories" },
          { text: "Other districts 📍", value: "show districts" },
          { text: "How to help? 🤝", value: "how to volunteer" }
        ]
      };
    } else if (data.reply) {
      // Handle case where reply exists without success flag
      return {
        text: data.reply,
        quickReplies: [
          { text: "Other categories 📋", value: "show categories" },
          { text: "Other districts 📍", value: "show districts" },
          { text: "How to help? 🤝", value: "how to volunteer" }
        ]
      };
    } else {
      throw new Error('No AI response received');
    }
  } catch (error) {
    console.error('AI API Error:', error);
    console.log('Falling back to local processing...');
    // Fallback to local processing
    return processMessage(message);
  }
}

// Chatbot state
let conversationHistory = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeNavbar();
  initializeChatbot();
  initializeScrollAnimations();
  initializeStatsCounter();
  initializeBackToTop();
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

// Back to Top functionality
function initializeBackToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '↑';
  scrollBtn.className = 'back-to-top';
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Scroll Animations using Intersection Observer
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Focus on sections that should animate
  const animateElements = document.querySelectorAll('.stat-card, .feature-simple, .impact-simple-card, .category-card, .cta-simple');
  animateElements.forEach(el => {
    el.style.opacity = '0'; // Initial state
    observer.observe(el);
  });
}

// Counting Animation for Stats
function initializeStatsCounter() {
  const stats = document.querySelectorAll('.stat-number, .impact-number-large');

  const countUp = (el) => {
    const target = parseInt(el.textContent.replace(/[^0-9]/g, ''));
    const suffix = el.textContent.replace(/[0-9]/g, '');
    let count = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const update = () => {
      count += increment;
      if (count < target) {
        el.textContent = Math.floor(count) + suffix;
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    };
    update();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
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
async function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();

  if (message === '') return;

  // Add user message
  addMessage(message, 'user');
  input.value = '';

  // Show typing indicator
  showTypingIndicator();

  // Get AI response
  const response = await processMessageWithAI(message);
  removeTypingIndicator();
  addMessage(response.text, 'bot', response.quickReplies);
}

// Send quick reply
async function sendQuickReply(message) {
  addMessage(message, 'user');

  // Show typing indicator
  showTypingIndicator();

  // Get AI response
  const response = await processMessageWithAI(message);
  removeTypingIndicator();
  addMessage(response.text, 'bot', response.quickReplies);
}

// Typing Indicator
function showTypingIndicator() {
  const chatMessages = document.getElementById('chatMessages');
  const indicator = document.createElement('div');
  indicator.id = 'typing-indicator';
  indicator.className = 'message bot';
  indicator.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-content">
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  chatMessages.appendChild(indicator);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) indicator.remove();
}

// Convert markdown to HTML
function markdownToHtml(text) {
  if (!text) return '';

  // Convert **bold** to <strong>bold</strong>
  text = text.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');

  // Convert *italic* to <em>italic</em>
  text = text.replace(/\*([^\*]+)\*/g, '<em>$1</em>');

  // Convert ### Heading to <h3>Heading</h3>
  text = text.replace(/### ([^\n]+)/g, '<h3>$1</h3>');

  // Convert ## Heading to <h2>Heading</h2>
  text = text.replace(/## ([^\n]+)/g, '<h2>$1</h2>');

  // Convert # Heading to <h1>Heading</h1>
  text = text.replace(/# ([^\n]+)/g, '<h1>$1</h1>');

  // Convert line breaks to <br>
  text = text.replace(/\n/g, '<br>');

  return text;
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
  text_p.innerHTML = markdownToHtml(text);

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

  // Greetings (using word boundaries to avoid matching "Which")
  if (lowerMessage.match(/\b(hi|hello|hey|vanakkam|வணக்கம்)\b/)) {
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

  if (lowerMessage.includes('animal') || lowerMessage.includes('pet') || lowerMessage.includes('rescue') || lowerMessage.includes('stray')) {
    return getNGOsByCategory('animal_welfare');
  }

  if (lowerMessage.includes('disaster') || lowerMessage.includes('relief') || lowerMessage.includes('emergency') || lowerMessage.includes('flood') || lowerMessage.includes('cyclone')) {
    return getNGOsByCategory('disaster_relief');
  }

  if (lowerMessage.includes('skill') || lowerMessage.includes('training') || lowerMessage.includes('employment') || lowerMessage.includes('job') || lowerMessage.includes('vocational')) {
    return getNGOsByCategory('skill_development');
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
    rural: "Rural Development 🏘️",
    animal_welfare: "Animal Welfare 🐾",
    disaster_relief: "Disaster Relief 🚨",
    skill_development: "Skill Development 💼"
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
      rural: "🏘️",
      animal_welfare: "🐾",
      disaster_relief: "🚨",
      skill_development: "💼"
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
  const chatbotElement = document.getElementById('chatbot');
  const resultsSection = document.getElementById('category-results-section');

  if (chatbotElement) {
    // Landing Page behavior: Scroll to chatbot
    chatbotElement.scrollIntoView({ behavior: 'smooth' });

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
  } else if (resultsSection) {
    // Categories Page behavior: Display results directly
    displayCategoryResults(category);
  }
}

// Display results on Categories page
function displayCategoryResults(category) {
  const allCategoriesSection = document.getElementById('all-categories-section');
  const resultsSection = document.getElementById('category-results-section');
  const resultsGrid = document.getElementById('category-results-grid');
  const titleElement = document.getElementById('selected-category-title');

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

  titleElement.textContent = `Explore ${categoryNames[category] || category} NGOs`;

  // Get NGOs from database
  const ngos = ngoDatabase[category] || [];

  // Clear previous results
  resultsGrid.innerHTML = '';

  if (ngos.length === 0) {
    resultsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: var(--spacing-xl);">No organizations found in this category yet.</p>';
  } else {
    ngos.forEach(ngo => {
      const ngoCard = document.createElement('div');
      ngoCard.className = 'ngo-result-card fade-in';
      ngoCard.innerHTML = `
        <h3>${ngo.name}</h3>
        <div class="ngo-info-item">
          <span class="ngo-info-label">📍 Location:</span>
          <span class="ngo-info-value">${ngo.location}</span>
        </div>
        <div class="ngo-info-item">
          <span class="ngo-info-label">🎯 Focus:</span>
          <span class="ngo-info-value">${ngo.focus}</span>
        </div>
        <div class="ngo-info-item">
          <span class="ngo-info-label">✨ Impact:</span>
          <span class="ngo-info-value">${ngo.impact}</span>
        </div>
        <div class="ngo-info-item">
          <span class="ngo-info-label">📧 Contact:</span>
          <span class="ngo-info-value">${ngo.contact}</span>
        </div>
        <div class="ngo-card-actions">
          <a href="mailto:${ngo.contact}" class="btn btn-sm btn-primary">Contact</a>
          <a href="https://${ngo.website}" target="_blank" class="btn btn-sm btn-secondary">Website</a>
        </div>
      `;
      resultsGrid.appendChild(ngoCard);
    });
  }

  // Switch sections
  allCategoriesSection.style.display = 'none';
  resultsSection.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hide results and show all categories
function hideResults() {
  const allCategoriesSection = document.getElementById('all-categories-section');
  const resultsSection = document.getElementById('category-results-section');

  resultsSection.style.display = 'none';
  allCategoriesSection.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Export for use in HTML
window.sendMessage = sendMessage;
window.sendQuickReply = sendQuickReply;
window.handleKeyPress = handleKeyPress;
window.selectCategory = selectCategory;
window.hideResults = hideResults;

