-- Add Property Provider account type to the CookinSaints platform
-- These are the wholesalers, funds, companies, and individuals providing properties

-- Update the profile_type constraint to include 'property_provider'
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_profile_type_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_profile_type_check 
  CHECK (profile_type IN ('investor', 'borrower', 'property_provider', 'admin', 'cookinsaint'));

-- Create property provider profiles table
CREATE TABLE IF NOT EXISTS public.property_provider_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name TEXT,
  provider_type TEXT CHECK (provider_type IN ('wholesaler', 'fund', 'property_company', 'individual', 'partner')),
  business_ein TEXT,
  license_number TEXT,
  license_state TEXT,
  years_in_business INTEGER,
  total_properties_provided INTEGER DEFAULT 0,
  average_deal_size DECIMAL(15, 2),
  specialization TEXT[], -- Array of property types they specialize in
  territory_coverage TEXT[], -- States/regions they cover
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'suspended')),
  kyc_verified BOOLEAN DEFAULT FALSE,
  preferred_deal_structure TEXT CHECK (preferred_deal_structure IN ('wholesale', 'jv', 'commission', 'direct_sale')),
  commission_rate DECIMAL(5, 4),
  website_url TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.property_provider_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "property_provider_profiles_select_own" ON public.property_provider_profiles 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "property_provider_profiles_insert_own" ON public.property_provider_profiles 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "property_provider_profiles_update_own" ON public.property_provider_profiles 
  FOR UPDATE USING (auth.uid() = user_id);

-- Update properties table to track which provider submitted it
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS provider_id UUID REFERENCES public.property_provider_profiles(id) ON DELETE SET NULL;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS commission_amount DECIMAL(15, 2);
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS deal_structure TEXT CHECK (deal_structure IN ('wholesale', 'jv', 'commission', 'direct_sale'));

-- Create index
CREATE INDEX IF NOT EXISTS idx_property_provider_profiles_user_id ON public.property_provider_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_properties_provider_id ON public.properties(provider_id);

-- Add updated_at trigger
CREATE TRIGGER update_property_provider_profiles_updated_at 
  BEFORE UPDATE ON public.property_provider_profiles 
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_updated_at_column();

-- Allow property providers to view all properties (for deal sourcing)
CREATE POLICY "property_providers_can_view_all" ON public.properties 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND profile_type = 'property_provider'
    )
  );
