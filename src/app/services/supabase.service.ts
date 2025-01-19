import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseUrl = 'https://cswdadlxiubwdzvqzywc.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzd2RhZGx4aXVid2R6dnF6eXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2MTkxODAsImV4cCI6MjAxODE5NTE4MH0.m2uvFmJvUoNc2qLndRZT0WhpMARVk7D4L1QveHsoapQ';
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async insertData(data: any[]) {
    const { error } = await this.supabase.from('nomina_aapp_2023_10').insert(data);
    if (error) {
      console.error('Error al insertar los datos:', error);
      throw error;
    }
    console.log('Datos insertados correctamente.');
  }
}
