-- 1. Add status_token column to bookings table if it doesn't exist
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS status_token UUID DEFAULT gen_random_uuid();

-- 2. Revoke and drop blanket public SELECT policies on bookings and messages
DROP POLICY IF EXISTS "Allow public selects" ON bookings;
DROP POLICY IF EXISTS "Allow public selects" ON messages;

-- 3. Ensure Row Level Security is enabled
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 4. Re-affirm public INSERT policy for bookings
DROP POLICY IF EXISTS "Allow public inserts" ON bookings;
CREATE POLICY "Allow public inserts" ON bookings 
    FOR INSERT 
    TO anon, authenticated, service_role 
    WITH CHECK (true);

-- 5. Re-affirm public INSERT policy for messages
DROP POLICY IF EXISTS "Allow public inserts" ON messages;
CREATE POLICY "Allow public inserts" ON messages 
    FOR INSERT 
    TO anon, authenticated, service_role 
    WITH CHECK (true);

-- 6. Ensure Admin-only SELECT for bookings and messages
DROP POLICY IF EXISTS "Allow admin reads" ON bookings;
CREATE POLICY "Allow admin reads" ON bookings
    FOR SELECT USING (
        (auth.jwt() ->> 'email') = 'admin@universalphysio.com' OR 
        (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    );

DROP POLICY IF EXISTS "Allow admin reads" ON messages;
CREATE POLICY "Allow admin reads" ON messages
    FOR SELECT USING (
        (auth.jwt() ->> 'email') = 'admin@universalphysio.com' OR 
        (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    );
