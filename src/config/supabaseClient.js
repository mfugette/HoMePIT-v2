//import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
//const dotenv = require('dotenv').config().parsed;

const supabaseUrl = process.env.NEXT_PUBLIC_HOMEPIT_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_HOMEPIT_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase