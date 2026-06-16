<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Profile;
use App\Models\Statistic;
use App\Models\AboutCard;
use App\Models\SkillCategory;
use App\Models\Skill;
use App\Models\Project;
use App\Models\Experience;
use App\Models\Certification;
use App\Models\Blog;
use App\Models\Comment;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat Akun Admin Utama untuk Login CMS Admin Panel
        User::updateOrCreate([
            'name' => 'Afif Admin',
            'email' => 'afif@example.com',
            'password' => Hash::make('password123'), // Silakan ganti saat produksi
            'role' => 'admin',
        ]);

        // 2. Seed Hero Profile Data
        Profile::updateOrCreate([
            'name' => 'Afif',
            'title' => 'Informatics Student | Fullstack Developer',
            'tagline' => 'Building digital solutions through software engineering, AI, and modern web technologies.',
            'short_introduction' => 'I am an Informatics student passionate about backend engineering, software architecture, AI-powered applications, and creating impactful digital products. Through internships, academic projects, and continuous learning, I enjoy solving real-world problems using technology.',
            'typing_effects' => ['Informatics Student', 'Fullstack Developer', 'AI Integration Enthusiast', 'Product Thinker'],
            'email' => 'afif@example.com',
            'phone' => '+628123456789',
            'github_url' => 'https://github.com/afif-dev',
            'linkedin_url' => 'https://linkedin.com',
            'instagram_url' => 'https://instagram.com',
        ]);

        // 3. Seed Counter Statistics
        Statistic::updateOrCreate(['label' => 'Projects Completed', 'value' => 24, 'order_index' => 1]);
        Statistic::updateOrCreate(['label' => 'Internship Experiences', 'value' => 3, 'order_index' => 2]);
        Statistic::updateOrCreate(['label' => 'Certifications Obtained', 'value' => 12, 'order_index' => 3]);
        Statistic::updateOrCreate(['label' => 'Years Learning Stack', 'value' => 4, 'order_index' => 4]);

        // 4. Seed About Cards
        AboutCard::updateOrCreate([
            'icon' => 'fa-graduation-cap',
            'title' => 'Education',
            'description' => 'Informatics Computer Science major focusing on core software infrastructure systems design, algorithms, complexity tracking, and applied technical practices.',
            'order_index' => 1
        ]);
        AboutCard::updateOrCreate([
            'icon' => 'fa-microchip',
            'title' => 'Current Focus',
            'description' => 'Deepening architecture mechanics across robust runtime microservices, cloud container isolation models, and complex data pipeline aggregations.',
            'order_index' => 2
        ]);
        AboutCard::updateOrCreate([
            'icon' => 'fa-brain',
            'title' => 'Interests',
            'description' => 'Combining artificial intelligence patterns with modern human interfaces to forge responsive systems capable of high computational throughput.',
            'order_index' => 3
        ]);
        AboutCard::updateOrCreate([
            'icon' => 'fa-rocket',
            'title' => 'Career Goal',
            'description' => 'To grow as a lead technical architect building global-scale software ecosystems, pushing parameters of human-centric UX delivery.',
            'order_index' => 4
        ]);

        // 5. Seed Skill Categories & Multi-Skills
        $coreEng = SkillCategory::updateOrCreate(['name' => 'Core Engineering', 'icon' => 'fa-terminal', 'order_index' => 1]);
        Skill::updateOrCreate(['skill_category_id' => $coreEng->id, 'name' => 'Backend & Architecture (Node.js/Laravel/FastAPI)', 'proficiency_percentage' => 92]);
        Skill::updateOrCreate(['skill_category_id' => $coreEng->id, 'name' => 'Frontend Architecture (React/Modern JS)', 'proficiency_percentage' => 85]);
        Skill::updateOrCreate(['skill_category_id' => $coreEng->id, 'name' => 'Systems & APIs (RESTful/GraphQL/gRPC)', 'proficiency_percentage' => 88]);

        $cloudInfra = SkillCategory::updateOrCreate(['name' => 'Cloud Infrastructure', 'icon' => 'fa-server', 'order_index' => 2]);
        Skill::updateOrCreate(['skill_category_id' => $cloudInfra->id, 'name' => 'Containers & Virtualization (Docker)', 'proficiency_percentage' => 90]);
        Skill::updateOrCreate(['skill_category_id' => $cloudInfra->id, 'name' => 'Relational Data (MySQL/PostgreSQL Structures)', 'proficiency_percentage' => 89]);
        Skill::updateOrCreate(['skill_category_id' => $cloudInfra->id, 'name' => 'AI Agent Modeling & Vectors', 'proficiency_percentage' => 80]);

        // Seed Tag Luar (Other Skills)
        $otherCat = SkillCategory::updateOrCreate(['name' => 'Other Competences', 'icon' => 'fa-tags', 'order_index' => 3]);
        $tags = ['Git / Version Control', 'CI/CD Automations', 'Linux Server Tuning', 'Redis Cache Networks', 'Product Thinking Map', 'UI Wireframing & Prototyping'];
        foreach ($tags as $tag) {
            Skill::updateOrCreate(['skill_category_id' => $otherCat->id, 'name' => $tag, 'is_featured_tag' => true]);
        }

        // 6. Seed Featured Projects & Case Studies (The Apple Standard Content)
        Project::updateOrCreate([
            'title' => 'Scholarship Lab',
            'tagline' => 'AI Scholarship Recommendation Platform',
            'description' => 'An intelligent context engine designed to index academic criteria datasets, matching prospective student vectors safely with ideal regional funding frameworks automatically.',
            'tech_stack' => ['React', 'Node.js', 'FastAPI', 'Docker', 'MySQL'],
            'status' => 'Production Ready',
            'is_active_deployment' => true,
            'my_role' => 'Lead Systems Architect & Core Engineer',
            'problem_statement' => 'Thousands of students fail to locate niche financial grants due to fragmented public documentation repositories, causing significant funding matching inefficiencies globally.',
            'solution_design' => 'Constructed an automated processing engine that uses FastAPI endpoints to perform contextual token extraction on multi-structured scholarship forms, providing real-time accuracy scoring.',
            'challenges_mitigation' => 'Handling concurrent PDF vector analysis requests caused system process blocks; engineered custom background queue handlers inside Docker instances to stabilize standard runtime loops.',
            'architecture_overview' => 'React front interface communicating with a decoupled FastAPI model processing tier, leveraging isolated Node wrappers to process multi-tenant operations securely.',
            'order_index' => 1
        ]);

        Project::updateOrCreate([
            'title' => 'Campus IT Website',
            'tagline' => 'Corporate Internal Infrastructure System',
            'description' => 'Central processing asset built to regulate multi-department workspace resource tickets, internal technical document indexes, and real-time hardware telemetry diagnostics dashboards.',
            'tech_stack' => ['Laravel', 'Docker', 'MySQL', 'TailwindCSS'],
            'status' => 'Active Operational',
            'is_active_deployment' => true,
            'my_role' => 'Fullstack System Designer',
            'problem_statement' => 'Legacy campus notification mechanisms caused significant communication delays between technical operations clusters and student user blocks.',
            'solution_design' => 'Designed a centralized portal structured completely under secure MVC models, speeding up operational incident dispatches through clean cache-isolated relational storage indexes.',
            'challenges_mitigation' => 'Encountered data race states when parsing thousands of simulation logs simultaneously; built transaction lock handlers inside Laravel\'s database layer to protect entry states.',
            'architecture_overview' => 'Fully containerized deployment using Docker environments executing highly performant multi-stage caching processes.',
            'order_index' => 2
        ]);

        Project::updateOrCreate([
            'title' => 'QR Restaurant Ordering System',
            'tagline' => 'Asynchronous Payment & POS Automation Engine',
            'description' => 'High-throughput contact-free menu routing engine running secure external payment gateways alongside continuous web-socket update systems.',
            'tech_stack' => ['Laravel', 'Midtrans API', 'MySQL'],
            'status' => 'Beta Active',
            'is_active_deployment' => true,
            'my_role' => 'Primary Backend Engineer',
            'problem_statement' => 'High order latency periods during high-volume seating intervals resulted in manual logging processing discrepancies and lost revenue pipelines.',
            'solution_design' => 'Integrated structured payment APIs directly into immediate web hooks, triggering immediate reactive notification queues across kitchen execution arrays.',
            'challenges_mitigation' => 'Managing external network communication Drops without dropping active in-memory user sessions. Designed callback verify loops to double-confirm execution strings.',
            'architecture_overview' => 'Highly cohesive REST framework routing event states down to asynchronous relational table logs safely.',
            'order_index' => 3
        ]);

        Project::updateOrCreate([
            'title' => 'Decision Support System (SAW)',
            'tagline' => 'Analytical Vector Priority Calculator',
            'description' => 'Algorithmic decision optimization processor executing Simple Additive Weighting logic vectors across extensive matrix evaluation criteria lists.',
            'tech_stack' => ['Native PHP', 'MySQL'],
            'status' => 'Completed Deployment',
            'is_active_deployment' => false,
            'my_role' => 'Algorithmic Developer',
            'problem_statement' => 'Human resource selection panels suffered from implicit cognitive bias parameters and lack of repeatable scoring methods.',
            'solution_design' => 'Programmed a mathematical computation system translating human attributes into standardized structural weight coefficients, instantly returning absolute accuracy ranks.',
            'challenges_mitigation' => 'Floating point accuracy limitations across legacy servers; handled using custom mathematical scaling mechanisms to enforce total precision compliance.',
            'architecture_overview' => 'Minimal footprint standalone PHP module executing direct raw database operations with sub-millisecond compile timing metrics.',
            'order_index' => 4
        ]);

        // 7. Seed Experiences (Professional)
        Experience::updateOrCreate([
            'time_period' => '2025 - Present',
            'company' => 'Enterprise Tech Stack Lab',
            'title' => 'Fullstack Developer Intern',
            'description' => 'Spearheaded secure database management configurations, component updates across primary web platforms, and isolated interface scaling protocols.',
            'type' => 'professional'
        ]);
        Experience::updateOrCreate([
            'time_period' => '2024 - 2025',
            'company' => 'University Computer Science Center',
            'title' => 'Assistant Lecturer - Database Management Systems',
            'description' => 'Instructed advanced relational algebra optimization pipelines, procedural query execution techniques, and structural indexing strategies to hundreds of juniors.',
            'type' => 'professional'
        ]);
        Experience::updateOrCreate([
            'time_period' => '2023 - 2024',
            'company' => 'Academic Development Cluster',
            'title' => 'Assistant Lecturer - Web Programming Core Infrastructure',
            'description' => 'Guided deep architectural reviews concerning client-side security management frameworks, native lifecycle patterns, and modular styling architectures.',
            'type' => 'professional'
        ]);

        // 7b. Seed Educations / Academic Journey
        Experience::updateOrCreate([
            'time_period' => '2022 - Present',
            'company' => 'Universitas KH Bahaudin Mudhary Madura (UNIBA)',
            'title' => 'Bachelor of Informatics',
            'description' => "Focus on Software Engineering\nDatabase Systems\nWeb Development\nArtificial Intelligence\nDecision Support Systems",
            'type' => 'academic'
        ]);
        Experience::updateOrCreate([
            'time_period' => '2024',
            'company' => 'Self-paced / Academics',
            'title' => 'Started Web Development Journey',
            'description' => "Learned HTML, CSS, and JavaScript\nBuilt personal and academic projects\nExplored responsive web design",
            'type' => 'academic'
        ]);
        Experience::updateOrCreate([
            'time_period' => '2025',
            'company' => 'Self-paced / Academics',
            'title' => 'Advanced Software Development',
            'description' => "Learned Laravel Framework\nDatabase Design & SQL\nREST API Development\nFullstack Web Development",
            'type' => 'academic'
        ]);
        Experience::updateOrCreate([
            'time_period' => '2026',
            'company' => 'Self-paced / Academics',
            'title' => 'System Architecture & AI Integration',
            'description' => "Docker & Containerization\nBackend Architecture\nAI-Powered Applications\nScholarship Lab Development",
            'type' => 'academic'
        ]);

        // 8. Seed Certifications
        Certification::updateOrCreate(['title' => 'Advanced Cloud & Container Architecture', 'issuer' => 'AWS Cluster Node Group', 'year' => 2025]);
        Certification::updateOrCreate(['title' => 'Enterprise Microservice Scalability Credentials', 'issuer' => 'Global Engineering Association', 'year' => 2026]);
        Certification::updateOrCreate(['title' => 'Fullstack System Engineering Frameworks Certification', 'issuer' => 'Tech Institute Consortium', 'year' => 2024]);
        Certification::updateOrCreate(['title' => 'Interactive Human Interface Design System Principles', 'issuer' => 'Design Core Academy', 'year' => 2025]);

        // 9. Seed Blogs
        Blog::updateOrCreate([
            'title' => 'My Docker Learning Journey: Containerization Deep Dive',
            'slug' => 'my-docker-learning-journey',
            'excerpt' => 'An empirical examination regarding virtualization costs, namespaces isolation tactics, and optimized layered assembly strategies.'
        ]);
        Blog::updateOrCreate([
            'title' => 'Building Scholarship Lab: Scaling AI Vector Inferences',
            'slug' => 'building-scholarship-lab',
            'excerpt' => 'A detailed retrospective breakdown concerning memory allocation boundaries and context generation parsing configurations.'
        ]);
        Blog::updateOrCreate([
            'title' => 'Internship Retrospective: Transitioning to Production Environments',
            'slug' => 'internship-retrospective',
            'excerpt' => 'Key operational lessons learned managing large codebase standard changes across tight enterprise schedules without downtime errors.'
        ]);

        // 10. Seed Testimonials & Comments
        Testimonial::updateOrCreate([
            'content' => 'Afif possesses a rare dual expertise profile, showing deep understanding of complex infrastructure architecture while keeping precise control over small interactive interface elements.',
            'author_name' => 'Dr. Jonathan Vance',
            'author_role' => 'Director of Informatics Systems Research'
        ]);
        Testimonial::updateOrCreate([
            'content' => 'His ability to resolve bottleneck processes during intense system development phases proved incredibly valuable for our team\'s product deliveries.',
            'author_name' => 'Sarah Jenkins',
            'author_role' => 'Lead Solutions Product Manager'
        ]);

        Comment::updateOrCreate([
            'name' => 'Prof. Amanda Lee',
            'comment' => 'The structural cleanliness, combined with premium micro-interactions, reflects the true product-first mindset required by elite platforms like Apple.',
            'rating' => 5,
            'is_approved' => true
        ]);
    }
}
