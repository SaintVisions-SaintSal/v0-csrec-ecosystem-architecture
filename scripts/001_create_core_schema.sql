-- SaintSal™ CSREC Core Database Schema
-- Company: Saint Vision Group LLC
-- System: Church and Spiritually-based Real Estate Credit (CSREC)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USER PROFILES & AUTHENTICATION
-- ============================================

-- User profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  profile_type TEXT NOT NULL CHECK (profile_type IN ('investor', 'borrower', 'admin', 'cookinsaint')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- ============================================
-- INVESTOR PROFILES
-- ============================================

CREATE TABLE IF NOT EXISTS public.investor_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  investor_type TEXT NOT NULL CHECK (investor_type IN ('accredited', 'institutional', 'qualified_purchaser')),
  accreditation_status TEXT NOT NULL CHECK (accreditation_status IN ('pending', 'verified', 'expired')),
  accreditation_date TIMESTAMPTZ,
  net_worth DECIMAL(15, 2),
  annual_income DECIMAL(15, 2),
  investment_capacity DECIMAL(15, 2),
  risk_tolerance TEXT CHECK (risk_tolerance IN ('conservative', 'moderate', 'aggressive')),
  kyc_verified BOOLEAN DEFAULT FALSE,
  aml_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.investor_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "investor_profiles_select_own" ON public.investor_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "investor_profiles_insert_own" ON public.investor_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "investor_profiles_update_own" ON public.investor_profiles FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- BORROWER PROFILES
-- ============================================

CREATE TABLE IF NOT EXISTS public.borrower_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  organization_name TEXT,
  organization_type TEXT CHECK (organization_type IN ('church', 'ministry', 'nonprofit', 'faith_based_org')),
  ein TEXT,
  tax_exempt_status TEXT CHECK (tax_exempt_status IN ('501c3', '501c19', 'other', 'pending')),
  years_in_operation INTEGER,
  annual_revenue DECIMAL(15, 2),
  current_debt DECIMAL(15, 2),
  credit_score INTEGER,
  mission_statement TEXT,
  spiritual_alignment_score INTEGER CHECK (spiritual_alignment_score BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.borrower_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "borrower_profiles_select_own" ON public.borrower_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "borrower_profiles_insert_own" ON public.borrower_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "borrower_profiles_update_own" ON public.borrower_profiles FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- PROPERTY LISTINGS
-- ============================================

CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  borrower_id UUID NOT NULL REFERENCES public.borrower_profiles(id) ON DELETE CASCADE,
  property_name TEXT NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('church', 'worship_center', 'community_center', 'residential', 'commercial', 'mixed_use')),
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  country TEXT DEFAULT 'USA',
  property_value DECIMAL(15, 2) NOT NULL,
  loan_amount_requested DECIMAL(15, 2) NOT NULL,
  loan_to_value_ratio DECIMAL(5, 2),
  property_description TEXT,
  property_photos JSONB DEFAULT '[]',
  appraisal_value DECIMAL(15, 2),
  appraisal_date TIMESTAMPTZ,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'approved', 'funded', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "properties_select_all" ON public.properties FOR SELECT USING (TRUE);
CREATE POLICY "properties_insert_own" ON public.properties FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.borrower_profiles WHERE id = borrower_id AND user_id = auth.uid())
);
CREATE POLICY "properties_update_own" ON public.properties FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.borrower_profiles WHERE id = borrower_id AND user_id = auth.uid())
);

-- ============================================
-- LOAN APPLICATIONS
-- ============================================

CREATE TABLE IF NOT EXISTS public.loan_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  borrower_id UUID NOT NULL REFERENCES public.borrower_profiles(id) ON DELETE CASCADE,
  loan_amount DECIMAL(15, 2) NOT NULL,
  loan_term_months INTEGER NOT NULL,
  interest_rate DECIMAL(5, 4),
  loan_purpose TEXT NOT NULL,
  loan_type TEXT NOT NULL CHECK (loan_type IN ('acquisition', 'refinance', 'construction', 'bridge', 'term')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'under_review', 'saintsal_analysis', 'approved', 'rejected', 'funded')),
  saintsal_score INTEGER CHECK (saintsal_score BETWEEN 0 AND 100),
  saintsal_analysis JSONB,
  risk_assessment TEXT CHECK (risk_assessment IN ('low', 'medium', 'high', 'very_high')),
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  decision_at TIMESTAMPTZ,
  decision_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "loan_applications_select_own" ON public.loan_applications FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.borrower_profiles WHERE id = borrower_id AND user_id = auth.uid())
);
CREATE POLICY "loan_applications_insert_own" ON public.loan_applications FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.borrower_profiles WHERE id = borrower_id AND user_id = auth.uid())
);
CREATE POLICY "loan_applications_update_own" ON public.loan_applications FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.borrower_profiles WHERE id = borrower_id AND user_id = auth.uid())
);

-- ============================================
-- INVESTMENTS
-- ============================================

CREATE TABLE IF NOT EXISTS public.investments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_id UUID NOT NULL REFERENCES public.investor_profiles(id) ON DELETE CASCADE,
  loan_application_id UUID NOT NULL REFERENCES public.loan_applications(id) ON DELETE CASCADE,
  investment_amount DECIMAL(15, 2) NOT NULL,
  investment_date TIMESTAMPTZ DEFAULT NOW(),
  expected_return_rate DECIMAL(5, 4),
  investment_term_months INTEGER,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'defaulted', 'cancelled')),
  total_returns DECIMAL(15, 2) DEFAULT 0,
  payment_schedule JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "investments_select_own" ON public.investments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.investor_profiles WHERE id = investor_id AND user_id = auth.uid())
);
CREATE POLICY "investments_insert_own" ON public.investments FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.investor_profiles WHERE id = investor_id AND user_id = auth.uid())
);

-- ============================================
-- PAYMENT TRANSACTIONS
-- ============================================

CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investment_id UUID REFERENCES public.investments(id) ON DELETE CASCADE,
  loan_application_id UUID REFERENCES public.loan_applications(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('investment', 'payment', 'disbursement', 'fee', 'return')),
  amount DECIMAL(15, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  payment_method TEXT,
  transaction_date TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "transactions_select_own" ON public.transactions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.investments i
    INNER JOIN public.investor_profiles ip ON i.investor_id = ip.id
    WHERE i.id = investment_id AND ip.user_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM public.loan_applications la
    INNER JOIN public.borrower_profiles bp ON la.borrower_id = bp.id
    WHERE la.id = loan_application_id AND bp.user_id = auth.uid()
  )
);

-- ============================================
-- DOCUMENTS
-- ============================================

CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  loan_application_id UUID REFERENCES public.loan_applications(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('ppm', 'subscription_agreement', 'loan_agreement', 'deed', 'appraisal', 'financial_statement', 'tax_return', 'insurance', 'other')),
  document_name TEXT NOT NULL,
  document_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'deleted'))
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "documents_select_own" ON public.documents FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.loan_applications la
    INNER JOIN public.borrower_profiles bp ON la.borrower_id = bp.id
    WHERE la.id = loan_application_id AND bp.user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM public.properties p
    INNER JOIN public.borrower_profiles bp ON p.borrower_id = bp.id
    WHERE p.id = property_id AND bp.user_id = auth.uid()
  )
);

-- ============================================
-- SAINTSAL AI ANALYSIS LOGS
-- ============================================

CREATE TABLE IF NOT EXISTS public.saintsal_analysis_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  loan_application_id UUID NOT NULL REFERENCES public.loan_applications(id) ON DELETE CASCADE,
  analysis_type TEXT NOT NULL CHECK (analysis_type IN ('underwriting', 'risk_assessment', 'spiritual_alignment', 'financial_analysis')),
  input_data JSONB NOT NULL,
  output_data JSONB NOT NULL,
  confidence_score DECIMAL(5, 4),
  processing_time_ms INTEGER,
  model_version TEXT,
  analyzed_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.saintsal_analysis_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "saintsal_logs_admin_only" ON public.saintsal_analysis_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND profile_type = 'admin')
);

-- ============================================
-- AUTO-CREATE PROFILE TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, profile_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'profile_type', 'borrower')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_investor_profiles_updated_at BEFORE UPDATE ON public.investor_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_borrower_profiles_updated_at BEFORE UPDATE ON public.borrower_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_loan_applications_updated_at BEFORE UPDATE ON public.loan_applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_investments_updated_at BEFORE UPDATE ON public.investments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_investor_profiles_user_id ON public.investor_profiles(user_id);
CREATE INDEX idx_borrower_profiles_user_id ON public.borrower_profiles(user_id);
CREATE INDEX idx_properties_borrower_id ON public.properties(borrower_id);
CREATE INDEX idx_loan_applications_borrower_id ON public.loan_applications(borrower_id);
CREATE INDEX idx_loan_applications_status ON public.loan_applications(status);
CREATE INDEX idx_investments_investor_id ON public.investments(investor_id);
CREATE INDEX idx_investments_loan_application_id ON public.investments(loan_application_id);
CREATE INDEX idx_transactions_investment_id ON public.transactions(investment_id);
CREATE INDEX idx_documents_loan_application_id ON public.documents(loan_application_id);
