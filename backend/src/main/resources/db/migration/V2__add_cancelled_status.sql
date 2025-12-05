-- Drop the old constraint
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check;

-- Add new constraint that includes CANCELLED
ALTER TABLE bookings ADD CONSTRAINT bookings_status_check 
    CHECK (status IN ('PENDING', 'CONFIRMED', 'REJECTED', 'COMPLETED', 'CANCELLED'));
