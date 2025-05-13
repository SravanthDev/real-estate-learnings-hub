
export interface QuestionData {
  id: string;
  question: string;
  answer: string;
  category: string;
  userType: string;
  featured?: boolean; // Added missing featured property
}

export const learningData: QuestionData[] = [
  // For Beginners - Buyers
  {
    id: "b1",
    question: "What documents should I verify before buying a property?",
    answer: "Before purchasing a property, you should verify the title deed, encumbrance certificate, approved building plan, completion certificate, and property tax receipts. These documents ensure the property has a clear legal title and complies with local regulations.",
    category: "beginners",
    userType: "buyers",
    featured: true // Mark this question as featured
  },
  {
    id: "b2",
    question: "How do I calculate the total cost of buying a property?",
    answer: "The total cost includes the property price, stamp duty (3-7% of property value), registration charges (1-2%), GST (if applicable), loan processing fees, legal fees, and brokerage. Factor in these additional costs which typically add 8-12% to the property value.",
    category: "beginners",
    userType: "buyers"
  },
  
  // For Beginners - Sellers
  {
    id: "b3",
    question: "When is the best time to sell my property?",
    answer: "The best time to sell depends on market conditions, property location, and personal circumstances. Generally, spring and early fall see more buyer activity. Monitor local market trends, interest rates, and economic conditions to identify favorable selling periods.",
    category: "beginners",
    userType: "sellers",
    featured: true // Mark this question as featured
  },
  
  // Insights - NRIs
  {
    id: "i1",
    question: "What are the current trends in the Indian real estate market for NRI investors?",
    answer: "Current trends include growing interest in luxury housing, sustainable properties, and commercial real estate. Major cities are seeing stable appreciation, while tier-2 cities offer higher potential returns. The RERA Act has improved transparency, making the market more attractive for NRI investors.",
    category: "insights",
    userType: "nris",
    featured: true // Mark this question as featured
  },
  
  // Investment - HNIs
  {
    id: "inv1",
    question: "What are the best real estate investment strategies for portfolio diversification?",
    answer: "For portfolio diversification, consider a mix of residential properties in prime locations, commercial properties for stable rental income, REITs for liquidity, and land investments for long-term appreciation. Different asset classes hedge against market fluctuations and provide varied returns.",
    category: "investment",
    userType: "hnis"
  },
  
  // Legal - Agents
  {
    id: "l1",
    question: "What are the legal responsibilities of real estate agents towards their clients?",
    answer: "Real estate agents have fiduciary duties including loyalty, confidentiality, full disclosure, lawful obedience, reasonable care, and accounting. Agents must disclose material facts about properties, avoid conflicts of interest, and maintain proper documentation of all transactions.",
    category: "legal",
    userType: "agents"
  },
  
  // Financial - Developers
  {
    id: "f1",
    question: "How can developers structure financing for large-scale projects?",
    answer: "Developers can structure financing through a combination of equity investment, construction loans, mezzanine financing, and pre-selling units. Joint ventures with financial institutions or investment funds can provide capital while sharing risk. Project-specific bonds and REITs are also emerging options.",
    category: "financial",
    userType: "developers"
  },
  
  // Ownership - Buyers
  {
    id: "o1",
    question: "What are the different types of property ownership structures?",
    answer: "Common ownership structures include freehold (absolute ownership), leasehold (right to use for a specific period), co-operative ownership (shares in a society), and condominium ownership (individual units with shared common areas). Each has different legal implications and rights.",
    category: "ownership",
    userType: "buyers"
  },
  
  // Legal - Sellers
  {
    id: "l2",
    question: "What are my disclosure obligations when selling a property?",
    answer: "Sellers must disclose material defects, past flooding or water damage, structural issues, title disputes, boundary conflicts, and environmental hazards. Failure to disclose known problems can lead to legal action and financial liability after the sale is complete.",
    category: "legal",
    userType: "sellers"
  },
  
  // Financial - Buyers
  {
    id: "f2",
    question: "How do I determine my budget and mortgage eligibility?",
    answer: "Your budget should align with your debt-to-income ratio (ideally below 40%). Lenders typically consider income stability, credit score, existing debt, and down payment amount. A general rule is that your home should cost no more than 3-5 times your annual household income.",
    category: "financial",
    userType: "buyers"
  },
  
  // Insights - Developers
  {
    id: "i2",
    question: "What amenities are most valued by today's homebuyers?",
    answer: "Today's homebuyers increasingly value sustainable features (solar panels, energy efficiency), wellness amenities (fitness centers, outdoor spaces), smart home technology, flexible spaces for work-from-home arrangements, and community-focused facilities. Security features and low-maintenance designs are also highly desired.",
    category: "insights",
    userType: "developers"
  },
  
  // Investment - Agents
  {
    id: "inv2",
    question: "How can I help clients identify properties with the best appreciation potential?",
    answer: "Look for upcoming infrastructure developments, emerging business districts, improving school districts, and neighborhood gentrification. Properties in locations with limited supply but growing demand typically appreciate faster. Research historical price trends and rental yields in different areas to provide data-backed recommendations.",
    category: "investment",
    userType: "agents"
  },
  
  // Ownership - NRIs
  {
    id: "o2",
    question: "What are the restrictions on property ownership for NRIs in India?",
    answer: "NRIs can purchase residential and commercial properties in India but cannot buy agricultural land, plantation properties, or farmhouses without RBI approval. They can receive rental income in India, which can be repatriated after paying applicable taxes. Properties can be sold after a minimum holding period.",
    category: "ownership",
    userType: "nris"
  }
];
