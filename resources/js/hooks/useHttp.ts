import axios from 'axios';
import { useState } from 'react';

export function useHttp() {
    const [loading, setLoading] = useState(false);

    const submit = async <T = any>(url: string, config?: object): Promise<T> => {
        setLoading(true);

        try {
            const response = await axios.get(url, config);

            return response.data;
        } finally {
            setLoading(false);
        }
    };

    return { submit, loading };
}
