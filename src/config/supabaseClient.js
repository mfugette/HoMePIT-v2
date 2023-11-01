//import dotenv from 'dotenv'
//const dotenv = require('dotenv').config().parsed;
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mtaopnhdnqjdeympkjtm.supabase.co'; //process.env.NEXT_PUBLIC_HOMEPIT_SUPABASE_URL;
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10YW9wbmhkbnFqZGV5bXBranRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQwMzA2NzMsImV4cCI6MjAwOTYwNjY3M30.j_rLIxRxqXGuieosZmiJfm2ROjRRjY7-Zo0c018idkQ'; //process.env.NEXT_PUBLIC_HOMEPIT_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
