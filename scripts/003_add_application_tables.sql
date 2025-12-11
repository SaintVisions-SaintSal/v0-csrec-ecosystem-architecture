-- Additional tables for all application forms

-- Credit Applications
CREATE TABLE IF NOT EXISTS public.credit_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  application_data JSONB NOT NULL,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.credit_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "credit_applications_select_own" ON public.credit_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "credit_applications_insert_own" ON public.credit_applications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Investment Applications
CREATE TABLE IF NOT EXISTS public.investment_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  application_data JSONB NOT NULL,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.investment_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "investment_applications_select_own" ON public.investment_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "investment_applications_insert_own" ON public.investment_applications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Merchant Services Applications
CREATE TABLE IF NOT EXISTS public.merchant_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  application_data JSONB NOT NULL,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.merchant_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "merchant_applications_select_own" ON public.merchant_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "merchant_applications_insert_own" ON public.merchant_applications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Development Projects
CREATE TABLE IF NOT EXISTS public.development_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_data JSONB NOT NULL,
  status TEXT DEFAULT 'inquiry' CHECK (status IN ('inquiry', 'quoted', 'in_progress', 'completed', 'on_hold')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.development_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "development_projects_select_own" ON public.development_projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "development_projects_insert_own" ON public.development_projects FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_credit_applications_user_id ON public.credit_applications(user_id);
CREATE INDEX idx_investment_applications_user_id ON public.investment_applications(user_id);
CREATE INDEX idx_merchant_applications_user_id ON public.merchant_applications(user_id);
CREATE INDEX idx_development_projects_user_id ON public.development_projects(user_id);
