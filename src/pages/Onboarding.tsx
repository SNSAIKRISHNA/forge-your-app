import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2, ArrowLeft } from 'lucide-react';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { GradientButton } from '@/components/ui/GradientButton';
import { GradientInput } from '@/components/ui/GradientInput';
import { SelectionCard } from '@/components/ui/SelectionCard';
import { useAuth } from '@/contexts/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProfileType = 'individual' | 'organization' | null;
type Step = 1 | 2 | 3;

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'E-commerce',
  'Media & Entertainment',
  'Manufacturing',
  'Real Estate',
  'Consulting',
  'Non-profit',
  'Other',
];

const teamSizes = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '500+',
];

const orgRoles = [
  { value: 'owner', label: 'Owner (Full access)' },
  { value: 'admin', label: 'Admin (Manage team)' },
  { value: 'member', label: 'Member (Limited access)' },
];

const Onboarding = () => {
  const [step, setStep] = useState<Step>(1);
  const [profileType, setProfileType] = useState<ProfileType>(null);
  
  // Individual fields
  const [fullName, setFullName] = useState('');
  const [occupation, setOccupation] = useState('');
  
  // Organization fields
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [orgRole, setOrgRole] = useState('owner');
  const [website, setWebsite] = useState('');
  
  const { setUserProfile, createOrganization, user } = useAuth();
  const navigate = useNavigate();

  const handleProfileTypeSelect = (type: ProfileType) => {
    setProfileType(type);
    setStep(2);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setProfileType(null);
    }
  };

  const handleIndividualSubmit = () => {
    setUserProfile({
      fullName,
      occupation,
      role: 'individual',
    });
    navigate('/dashboard');
  };

  const handleOrganizationSubmit = () => {
    createOrganization({
      name: companyName,
      industry,
      teamSize,
      website: website || undefined,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen px-4 py-8 relative">
      <ParticlesBackground />
      
      <div className="max-w-4xl mx-auto z-10 relative">
        <ProgressBar 
          step={step} 
          totalSteps={3} 
          className="mb-12"
        />

        {/* Step 1: Profile Type Selection */}
        {step === 1 && (
          <div className="fade-in">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-xs font-mono font-semibold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                PROFILE SETUP
              </span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
              Choose your profile
            </h1>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-6">
              Type that defines everything
            </h2>
            
            <p className="text-muted-foreground font-mono text-sm mb-12 max-w-xl">
              This choice shapes your onboarding, recommendations, and how your content is generated later.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <SelectionCard
                icon={User}
                label="FOR CREATORS"
                title="Individual"
                description="Perfect for freelancers, artists, and solo professionals building their personal brand and portfolio."
                features={[
                  'Personal brand voice & tone setup',
                  'Audience-specific content preferences',
                  'Creator-focused workflows',
                  'AI outputs tailored to you',
                ]}
                selected={profileType === 'individual'}
                onClick={() => handleProfileTypeSelect('individual')}
              />
              
              <SelectionCard
                icon={Building2}
                label="FOR TEAMS"
                title="Organization"
                description="Ideal for companies, agencies, and teams collaborating on projects and managing workflows together."
                features={[
                  'Shared brand voice across teams',
                  'Centralized guidelines & assets',
                  'Multi-user workflows & roles',
                  'Scales with growing teams',
                ]}
                selected={profileType === 'organization'}
                onClick={() => handleProfileTypeSelect('organization')}
              />
            </div>
          </div>
        )}

        {/* Step 2: Individual Setup */}
        {step === 2 && profileType === 'individual' && (
          <div className="fade-in max-w-lg mx-auto">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Change profile type
            </button>
            
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              Let's personalize
            </h1>
            <h2 className="font-display text-4xl font-bold text-gradient-accent mb-6">
              your experience
            </h2>
            
            <p className="text-muted-foreground font-mono text-sm mb-8">
              These details help us tailor your brand voice, content style, and recommendations just for you.
            </p>

            <div className="space-y-6">
              <GradientInput
                label="Full name"
                placeholder="e.g. Alex Johnson"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              
              <GradientInput
                label="What do you do?"
                helperText="Helps us adapt tone, examples, and content suggestions"
                placeholder="e.g. Frontend Developer, Content Creator"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />

              <GradientButton
                onClick={handleIndividualSubmit}
                className="w-full"
                size="lg"
                disabled={!fullName}
              >
                Next: Preferences →
              </GradientButton>
              
              <p className="text-center text-muted-foreground text-xs">
                You can update these details later.
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Organization Setup */}
        {step === 2 && profileType === 'organization' && (
          <div className="fade-in max-w-lg mx-auto">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Change profile type
            </button>
            
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              Let's tailor this for
            </h1>
            <h2 className="font-display text-4xl font-bold text-gradient mb-6">
              your team
            </h2>
            
            <p className="text-muted-foreground font-mono text-sm mb-8">
              Create an organization and assign your role. You can add or join multiple organizations later.
            </p>

            <div className="space-y-5">
              <GradientInput
                label="Company name"
                placeholder="e.g. Acme Technologies"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Industry
                </label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger className="input-dark w-full h-12">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((ind) => (
                      <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Team size
                </label>
                <Select value={teamSize} onValueChange={setTeamSize}>
                  <SelectTrigger className="input-dark w-full h-12">
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamSizes.map((size) => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Your role in this organization
                </label>
                <Select value={orgRole} onValueChange={setOrgRole}>
                  <SelectTrigger className="input-dark w-full h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {orgRoles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <GradientInput
                label="Website"
                helperText="(optional)"
                placeholder="https://yourcompany.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />

              <GradientButton
                onClick={handleOrganizationSubmit}
                className="w-full"
                size="lg"
                disabled={!companyName || !industry || !teamSize}
              >
                Create organization →
              </GradientButton>
              
              <p className="text-center text-muted-foreground text-xs">
                You can create or join multiple organizations later.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
