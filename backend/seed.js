const { db, init } = require('./database');
require('dotenv').config();

// Sample NGO data
const ngoData = [
    // Education NGOs
    {
        name: "Akshaya Patra Foundation",
        category: "education",
        location: "Chennai",
        districts: ["Chennai", "Kanchipuram", "Tiruvallur"],
        focus: "Mid-day meal program for school children",
        impact: "Serving 2 million+ meals daily across Tamil Nadu",
        contact: {
            phone: "+91-44-2345-6789",
            email: "chennai@akshayapatra.org",
            address: "123 Anna Salai, Chennai - 600002"
        },
        website: "https://www.akshayapatra.org",
        description: "Provides nutritious mid-day meals to school children, ensuring better nutrition and increased school attendance.",
        verified: 1,
        rating: 4.8
    },
    {
        name: "Teach For India",
        category: "education",
        location: "Chennai",
        districts: ["Chennai", "Coimbatore", "Madurai"],
        focus: "Quality education for underprivileged children",
        impact: "Impacting 50,000+ students annually",
        contact: {
            phone: "+91-44-3456-7890",
            email: "chennai@teachforindia.org"
        },
        website: "https://www.teachforindia.org",
        verified: 1,
        rating: 4.7
    },
    {
        name: "Aravind Eye Hospital",
        category: "healthcare",
        location: "Madurai",
        districts: ["Madurai", "Dindigul", "Theni", "Virudhunagar"],
        focus: "Eye care and cataract surgeries",
        impact: "4 million+ free eye surgeries performed",
        contact: {
            phone: "+91-452-435-6100",
            email: "info@aravind.org",
            address: "Aravind Eye Hospital, Madurai - 625020"
        },
        website: "https://www.aravind.org",
        verified: 1,
        rating: 4.9
    },
    {
        name: "Sankara Nethralaya",
        category: "healthcare",
        location: "Chennai",
        districts: ["Chennai", "Kanchipuram"],
        focus: "Comprehensive eye care services",
        impact: "Treating 1 million+ patients annually",
        contact: {
            phone: "+91-44-2827-1616",
            email: "info@snmail.org"
        },
        website: "https://www.sankaranethralaya.org",
        verified: 1,
        rating: 4.8
    },
    {
        name: "Environmentalist Foundation of India",
        category: "environment",
        location: "Chennai",
        districts: ["Chennai", "Tiruvallur", "Kanchipuram", "Chengalpattu"],
        focus: "Lake restoration and environmental conservation",
        impact: "Restored 90+ water bodies across Tamil Nadu",
        contact: {
            phone: "+91-98400-12345",
            email: "contact@efi.org.in"
        },
        website: "https://www.efi.org.in",
        verified: 1,
        rating: 4.7
    },
    {
        name: "Nizhal",
        category: "environment",
        location: "Chennai",
        districts: ["Chennai", "Kanchipuram"],
        focus: "Urban greening and tree plantation",
        impact: "Planted 35 million+ trees",
        contact: {
            phone: "+91-44-2815-4213",
            email: "info@nizhal.org"
        },
        website: "https://www.nizhal.org",
        verified: 1,
        rating: 4.6
    },
    {
        name: "SEWA Tamil Nadu",
        category: "women",
        location: "Chennai",
        districts: ["Chennai", "Tiruvallur", "Kanchipuram"],
        focus: "Women's economic empowerment and self-employment",
        impact: "Empowered 125,000+ women",
        contact: {
            phone: "+91-44-2345-8901",
            email: "info@sewatamilnadu.org"
        },
        website: "https://www.sewatamilnadu.org",
        verified: 1,
        rating: 4.5
    },
    {
        name: "CRY - Child Rights and You",
        category: "children",
        location: "Chennai",
        districts: ["Chennai", "Coimbatore", "Madurai", "Salem"],
        focus: "Child rights, education, and protection",
        impact: "Supporting 200,000+ children",
        contact: {
            phone: "+91-44-2345-6780",
            email: "chennai@cry.org"
        },
        website: "https://www.cry.org",
        verified: 1,
        rating: 4.7
    },
    {
        name: "HelpAge India",
        category: "elderly",
        location: "Chennai",
        districts: ["Chennai", "Coimbatore", "Madurai"],
        focus: "Healthcare and support for senior citizens",
        impact: "Serving 55,000+ elderly people",
        contact: {
            phone: "+91-44-2345-9012",
            email: "chennai@helpageindia.org"
        },
        website: "https://www.helpageindia.org",
        verified: 1,
        rating: 4.6
    },
    {
        name: "Vidya Sagar",
        category: "disability",
        location: "Chennai",
        districts: ["Chennai", "Kanchipuram"],
        focus: "Rehabilitation and education for children with disabilities",
        impact: "Supporting 12,000+ persons with disabilities",
        contact: {
            phone: "+91-44-2493-5874",
            email: "info@vidyasagar.org.in"
        },
        website: "https://www.vidyasagar.org.in",
        verified: 1,
        rating: 4.8
    },
    {
        name: "DHAN Foundation",
        category: "rural",
        location: "Madurai",
        districts: ["Madurai", "Dindigul", "Theni", "Ramanathapuram"],
        focus: "Rural development and livelihood programs",
        impact: "Reaching 5 million+ families",
        contact: {
            phone: "+91-452-258-0093",
            email: "info@dhan.org"
        },
        website: "https://www.dhan.org",
        verified: 1,
        rating: 4.7
    }
];

function seedDatabase() {
    try {
        init();
        console.log('✅ SQLite Database Initialized');

        // Clear existing data
        db.prepare('DELETE FROM ngos').run();
        console.log('🗑️  Cleared existing NGO data');

        // Insert new data
        const insert = db.prepare(`
            INSERT INTO ngos (name, category, location, districts, focus, impact, phone, email, address, website, description, verified, rating)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        for (const ngo of ngoData) {
            insert.run(
                ngo.name, ngo.category, ngo.location, JSON.stringify(ngo.districts),
                ngo.focus, ngo.impact, ngo.contact.phone, ngo.contact.email,
                ngo.contact.address || null, ngo.website, ngo.description || null,
                ngo.verified, ngo.rating
            );
        }

        console.log(`✅ Seeded ${ngoData.length} NGOs successfully!`);
        console.log('\n✅ Database seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
