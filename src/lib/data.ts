export const PROFILE = {
  name: 'Sofia Naushad', firstName: 'Sofia', initials: 'SN',
  role: 'Python Developer | Backend & Full-Stack Engineering | Generative AI',
  shortRole: 'Python Developer', location: 'Shillong, India',
  email: 'sofianaushad055@gmail.com', phone: '+91 9263406133', phoneHref: 'tel:+919263406133',
  github: 'https://github.com/sofia516', linkedin: 'https://www.linkedin.com/in/sofia-naushad-coder02',
  resume: '/resume/Sofia_Naushad_Master_CV.pdf',
  summary: 'Computer Science graduate (2026) with hands-on experience building Python backend services, full-stack applications, and LLM-powered tools. Built an asynchronous FastAPI URL-auditing service that reduced average response time from 512 ms to 58 ms, a full-stack CRM with an AI agent, a JWT-secured lead-management platform, and a local RAG assistant for 8+ PDFs. Skilled in Python, FastAPI, REST APIs, SQL, PostgreSQL, React, LangChain, LangGraph, FAISS, testing, and Git-based workflows.',
  education: 'B.Tech, Computer Science & Engineering', graduation: '2026', gpa: '7.1/10'
};
export const NAV = [
  {id:'about',label:'About'}, {id:'skills',label:'Skills'}, {id:'work',label:'Work'},
  {id:'certifications',label:'Certifications'}, {id:'experience',label:'Experience'}, {id:'achievements',label:'Achievements'}, {id:'contact',label:'Contact'}
];
export const SKILL_GROUPS = [
  {name:'Programming',skills:['Python','Java','JavaScript','SQL']},
  {name:'Backend & APIs',skills:['FastAPI','Flask','REST APIs','SQLAlchemy','HTTPX','Async programming','JSON']},
  {name:'Frontend',skills:['React.js','HTML','CSS','Streamlit']},
  {name:'AI / Generative AI',skills:['LLMs','Generative AI','RAG','LangChain','LangGraph','Hugging Face embeddings','FAISS','MMR retrieval','Ollama','Groq API']},
  {name:'Databases & Tools',skills:['PostgreSQL','SQLite','Git','GitHub','GitHub Actions','Pytest']},
  {name:'Computer Science',skills:['Data Structures & Algorithms','OOP','DBMS','Operating Systems','Computer Networks']},
  {name:'Languages',skills:['English','Hindi']}
];
export const PROJECTS = [
 {id:'page-pulse',title:'Page Pulse',kicker:'01 / ASYNC SYSTEMS',subtitle:'Asynchronous URL Auditing API',period:'Apr–Jun 2026',description:'Built an asynchronous API that audits public URLs and returns HTTP status, response time, content type/length, and page title.',features:['Reduced average response time from 512 ms to 58 ms (~89%) using TTL caching, HTTP connection reuse, and concurrency limiting.','Added per-client rate limiting, structured JSON logging, request-ID tracing, and automated Pytest checks in GitHub Actions CI.'],tech:['Python','FastAPI','HTTPX','Pytest','GitHub Actions'],github:'https://github.com/sofia516/page-pulse'},
 {id:'ai-hcp-crm',title:'AI-HCP CRM',kicker:'02 / AI WORKFLOWS',subtitle:'Full-Stack CRM with AI Assistant',period:'Jun–Jul 2026',description:'Built a full-stack CRM with six REST endpoints for healthcare-professional profile and interaction management.',features:['Integrated a LangGraph agent using Groq to route natural-language requests to backend tools.','Kept AI orchestration separate from core CRM logic.'],tech:['React','FastAPI','PostgreSQL','SQLAlchemy','LangGraph','Groq'],demo:'https://ai-hcp-crm-chi.vercel.app'},
 {id:'leadflow',title:'LeadFlow',kicker:'03 / PRODUCT ENGINEERING',subtitle:'Full-Stack Lead Management Platform',period:'Jul 2026',description:'Built a sales workflow application that manages leads from public capture through Won/Lost stages.',features:['Implemented JWT authentication and Admin/Sales Member role-based access control across frontend and backend.','Added lead assignment, pipeline status, notes, activity history, search, filtering, and pagination; deployed with PostgreSQL on Render.'],tech:['React','FastAPI','PostgreSQL','JWT','REST APIs','SQLAlchemy'],demo:'https://leadflow-woua.onrender.com'},
 {id:'rag-pdf',title:'PDF RAG Assistant',kicker:'04 / RETRIEVAL SYSTEMS',subtitle:'Conversational Q&A over Documents',period:'Jun–Jul 2026',description:'Built an end-to-end RAG pipeline with semantic retrieval and MMR to answer questions across 8+ PDFs.',features:['Ran Llama 3.2 3B locally through Ollama, avoiding paid inference APIs.','Added multi-document upload, chat history, and page-level source citations.'],tech:['Python','LangChain','Hugging Face Embeddings','FAISS','Ollama','Streamlit'],github:'https://github.com/sofia516/RAG-PDF'},
 {id:'airwayscope',title:'AirwayScope',kicker:'05 / COMPUTER VISION',subtitle:'Computer Vision Research Prototype',description:'Built a prototype that detects facial landmarks from a photograph, applies pixel-to-millimetre calibration, and calculates five airway-relevant facial measurements.',features:['Added measurement-quality warnings and optional SQLite/CSV record handling.','Research prototype; not clinically validated.'],tech:['Python','MediaPipe Face Mesh','OpenCV','Streamlit','SQLite'],github:'https://github.com/sofia516/airwayscope'},
 {id:'xai-dashboard',title:'XAI Dashboard',kicker:'06 / EXPLAINABLE AI',subtitle:'Explainable AI Web Application',period:'Jul 2026',description:'Built an interactive explainability dashboard for image classification using Grad-CAM and tabular/NLP model interpretation using SHAP.',features:['Designed a modular structure to support additional model types.'],tech:['Python','Streamlit','PyTorch','SHAP','Grad-CAM']}
];
export const EXPERIENCE = [
 {date:'Jul–Sep 2025',title:'Web Development Intern',place:'Mills Motors Pvt. Ltd. · Delhi',details:['Developed three responsive web pages—a company portfolio, car listing and inquiry system, and dealership landing page—using HTML, CSS, and JavaScript as part of a four-person team.','Resolved 5–10 frontend bugs and UI/UX issues through debugging and Git-tracked changes.']},
 {date:'Oct–Dec 2025',title:'Business Development Associate Intern',place:'AiVerbalyze Technologies Pvt. Ltd.',details:['Completed a business development internship at a technology company.']}
];
export const EDUCATION = [
 {date:'2022–2026',title:'B.Tech, Computer Science & Engineering',place:'Vivekananda College of Technology and Management (AKTU) · Aligarh, Uttar Pradesh',details:['GPA: 7.1/10']},
 {date:'2021–2022',title:'Higher Secondary (Class XII)',place:'Kendriya Vidyalaya · Shillong, Meghalaya',details:['80%']}
];
export const CERTIFICATIONS = [
 {title:'Agile Project Management Foundation',issuer:'HP',date:'Apr 2025'},
 {title:'Data Science & Analytics',issuer:'HP LIFE',date:'Apr 2025'},
 {title:'Frontend Development Certification',issuer:'OneRoadmap',date:'May 2025'}
];
export const ACHIEVEMENTS = [
 {label:'Community',title:'Coding-club hackathons & workshops',detail:'Co-organized college coding-club hackathons and workshops for 100+ participants.',value:'100+'},
 {label:'Competition',title:'Kaggle Playground Series S6E9',detail:'Participated in EV purchase prediction.',value:'S6E9'},
 {label:'Engineering',title:'Page Pulse performance',detail:'Improved average API response time from 512 ms to 58 ms.',value:'~89%'},
 {label:'Research publication',title:'Adaptive Intelligent Virtual Assistant (AIVA)',detail:'Co-author with K. Khan, P. Sharma, and T. Kafeel. International Journal of Innovative Research in Technology (IJIRT), Vol. 12, Issue 11, April 2026; Paper ID: IJIRT198381. Co-authored a conceptual paper on a context-aware virtual assistant architecture integrating machine learning, NLP, and behavioral analysis.',value:'2026'}
];
