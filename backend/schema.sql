-- 1. Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    address TEXT NOT NULL,
    area VARCHAR(100),
    service VARCHAR(100) NOT NULL,
    booking_date DATE NOT NULL,
    booking_time VARCHAR(20) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies to prevent conflicts
DROP POLICY IF EXISTS "Allow public inserts" ON bookings;
DROP POLICY IF EXISTS "Allow admin reads" ON bookings;
DROP POLICY IF EXISTS "Allow admin updates" ON bookings;
DROP POLICY IF EXISTS "Allow admin deletes" ON bookings;

-- 4. Policy: Allow public inserts
CREATE POLICY "Allow public inserts" ON bookings
    FOR INSERT WITH CHECK (true);

-- 5. Policy: Allow admin reads only
CREATE POLICY "Allow admin reads" ON bookings
    FOR SELECT USING (
        (auth.jwt() ->> 'email') = 'admin@universalphysio.com' OR 
        (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    );

-- 6. Policy: Allow admin updates only
CREATE POLICY "Allow admin updates" ON bookings
    FOR UPDATE USING (
        (auth.jwt() ->> 'email') = 'admin@universalphysio.com' OR 
        (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    );

-- 7. Policy: Allow admin deletes only
CREATE POLICY "Allow admin deletes" ON bookings
    FOR DELETE USING (
        (auth.jwt() ->> 'email') = 'admin@universalphysio.com' OR 
        (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    );
