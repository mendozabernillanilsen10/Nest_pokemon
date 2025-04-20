import axios, { AxiosInstance } from 'axios';

import { Injectable } from '@nestjs/common';

import { HttpAdapter } from '../interfaces/http_adapter.interface';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
    private  axion: AxiosInstance = axios;
    async get<T>(url: string): Promise<T> {
        try{
                const { data } = await this.axion.get<T>(url);
                return data;
        }catch (error) {
                throw new Error('No se pudo realizar la petición');
        }
    }
}