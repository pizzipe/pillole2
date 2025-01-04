import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PocketbaseService {
  private pb: PocketBase;


  constructor() {
    this.pb = new PocketBase(environment.apiUrl);
  }


  getApiUrl() {
    return environment.apiUrl;
  }


  // Metodo per ottenere tutti i record di una collezione
  async getAllRecords(collection: string): Promise<any[]> {
    try {
      return await this.pb.collection(collection).getFullList();
    } catch (error) {
      console.error('Error fetching records:', error);
      throw error;
    }
  }

  // Metodo per ottenere un singolo record
  async getRecordById(collection: string, id: string): Promise<any> {
    try {
      return await this.pb.collection(collection).getOne(id);
    } catch (error) {
      console.error('Error fetching record:', error);
      throw error;
    }
  }

  // Metodo per creare un nuovo record
  async createRecord(collection: string, data: any): Promise<any> {
    try {
      return await this.pb.collection(collection).create(data);
    } catch (error) {
      console.error('Error creating record:', error);
      throw error;
    }
  }

  // Metodo per aggiornare un record
  async updateRecord(collection: string, id: string, data: any): Promise<any> {
    try {
      return await this.pb.collection(collection).update(id, data);
    } catch (error) {
      console.error('Error updating record:', error);
      throw error;
    }
  }

  // Metodo per eliminare un record
  async deleteRecord(collection: string, id: string): Promise<void> {
    try {
      await this.pb.collection(collection).delete(id);
    } catch (error) {
      console.error('Error deleting record:', error);
      throw error;
    }
  }
}
