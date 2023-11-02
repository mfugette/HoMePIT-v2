//import dotenv from 'dotenv'
//const dotenv = require('dotenv').config().parsed;
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_HOMEPIT_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_HOMEPIT_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
