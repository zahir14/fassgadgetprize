/*
  # Initial Schema Setup

  1. New Tables
    - `prizes`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `tier` (text)
      - `quantity` (integer)
      - `remaining_quantity` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `serial_numbers`
      - `id` (uuid, primary key)
      - `serial_number` (text, unique)
      - `customer_name` (text)
      - `customer_phone` (text)
      - `prize_id` (uuid, foreign key)
      - `claimed` (boolean)
      - `generated_date` (timestamp)
      - `redeem_date` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage prizes and serial numbers
    - Add policies for public users to read and update serial numbers
*/

-- Create prizes table
CREATE TABLE IF NOT EXISTS prizes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  tier text NOT NULL CHECK (tier IN ('small', 'medium', 'big')),
  quantity integer NOT NULL CHECK (quantity >= 0),
  remaining_quantity integer NOT NULL CHECK (remaining_quantity >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create serial_numbers table
CREATE TABLE IF NOT EXISTS serial_numbers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  serial_number text UNIQUE NOT NULL,
  customer_name text,
  customer_phone text,
  prize_id uuid REFERENCES prizes(id),
  claimed boolean DEFAULT false,
  generated_date timestamptz DEFAULT now(),
  redeem_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE prizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE serial_numbers ENABLE ROW LEVEL SECURITY;

-- Policies for prizes table
CREATE POLICY "Allow authenticated users full access to prizes"
  ON prizes
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public to read prizes"
  ON prizes
  FOR SELECT
  TO anon
  USING (true);

-- Policies for serial_numbers table
CREATE POLICY "Allow authenticated users full access to serial numbers"
  ON serial_numbers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public to read and update unclaimed serial numbers"
  ON serial_numbers
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public to update unclaimed serial numbers"
  ON serial_numbers
  FOR UPDATE
  TO anon
  USING (claimed = false)
  WITH CHECK (claimed = false);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_prizes_updated_at
  BEFORE UPDATE ON prizes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_serial_numbers_updated_at
  BEFORE UPDATE ON serial_numbers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();