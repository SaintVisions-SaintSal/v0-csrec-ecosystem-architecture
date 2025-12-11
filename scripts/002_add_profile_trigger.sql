-- Add trigger to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- This trigger will be called when a new user signs up
  -- It creates a basic profile record
  -- Users will complete their profile in the onboarding flow
  INSERT INTO public.profiles (id, email, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update the profiles table to make profile_type nullable initially
ALTER TABLE profiles ALTER COLUMN profile_type DROP NOT NULL;
